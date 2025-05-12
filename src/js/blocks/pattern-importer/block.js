/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/**
 * External dependencies
 */
import './editor.scss';
import classnames from 'classnames';
import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import uniqueId from 'lodash.uniqueid';
import {
	Button,
	TextareaControl,
	Card,
	CardHeader,
	CardFooter,
	CardBody,
	CheckboxControl,
	Spinner,
} from '@wordpress/components';

import { parse } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';

import {
	useBlockProps,
	store,
} from '@wordpress/block-editor';

import { useInstanceId } from '@wordpress/compose';
import SendCommand from '../utils/SendCommand';
import { replaceUniqueIds, generateUniqueId } from '../utils/ReplaceUniqueIds';
// Image RegEx.
const imageUrlRegex = /(http(?:s?):)([\/|.|@|\w|\s|-])*\.(?:jpg|gif|png|jpeg|webp|avif)/gi;
const uniqueIdRegex = /\"uniqueId\"\:\"([^"]+)\"/gi;

// Unique ID storing.
const uniqueIds = [];

// For storing the number of images imported.
let imageCount = 0;

const PatternImporter = ( props ) => {
	// Shortcuts.
	const { attributes, setAttributes, clientId } = props;

	const [ patternText, setPatternText ] = useState( '' );
	const [ patternImages, setPatternImages ] = useState( [] );
	const [ importing, setImporting ] = useState( false );
	const [ imageProcessingCount, setImageProcessingCount ] = useState( 0 );
	const [ doNotImportRemoteImages, setDoNotImportRemoteImages ] = useState( false );

	const { replaceBlock } = useDispatch( store );

	const onPatternSubmit = async() => {
		setImporting( true );
		const processImage = async( imgUrl, imgAlt ) => {
			const response = await SendCommand(
				gbExtrasPatternInserter.restNonce,
				{
					imgUrl,
					imgAlt,
				},
				gbExtrasPatternInserter.restUrl + '/process_image'
			);
			return response;
		};

		/**
		 * Import a pattern.
		 *
		 * @param {string} pattern The pattern.
		 */
		const importPattern = async( pattern ) => {
			try {
				const patternBlocks = parse( pattern );

				const newPatternBlocks = [];

				for ( let i = 0; i < patternBlocks.length; i++ ) {
					newPatternBlocks.push( replaceUniqueIds( patternBlocks[ i ] ) );
				}

				await replaceBlock( clientId, newPatternBlocks );

				// Insert block in place of this one.
				//replaceInnerBlocks( clientId, patternBlocks );
			} catch ( error ) {
				console.error( error );
			}
		};

		const matches = [ ...patternText.matchAll( imageUrlRegex ) ];
		const imagesToProcess = [];
		let localPatternText = patternText;

		if ( ! doNotImportRemoteImages ) {
			// If there are matches, we need to process them.
			if ( matches.length ) {
				matches.forEach( ( match ) => {
					// Push if not a duplicate.
					if ( ! imagesToProcess.includes( match[ 0 ] ) ) {
						imagesToProcess.push( match[ 0 ] );
					}
				} );
				setPatternImages( imagesToProcess );
			}

			const imagesProcessed = [];
			let imagePromises = [];

			// Let's loop through images and process.
			if ( imagesToProcess.length ) {
				imagePromises = imagesToProcess.map( ( image ) => {
					try {
						const response = processImage( image, '' );
						response.then( ( restResponse ) => {
							imagesProcessed.push( image );
							const { data, success } = restResponse.data;
							if ( success ) {
								imageCount++;
								setImageProcessingCount( imageCount );

								// Get the image URL and replace in pattern.
								const newImageUrl = data.attachmentUrl;

								// Replace old URL with new URL.
								localPatternText = localPatternText.replace( image, newImageUrl );
								setPatternText( localPatternText );
							} else {
								// Fail silently.
								imageCount++;
								setImageProcessingCount( imageCount );
							}
						} ).catch( ( error ) => {
							// Fail silently.
							imageCount++;
							setImageProcessingCount( imageCount );
						} );
						return response;
					} catch ( error ) {
						// Fail silently.
						imageCount++;
						setImageProcessingCount( imageCount );
					}
				} );
			}

			Promise.all( imagePromises ).then( () => {
				importPattern( localPatternText );
			} ).catch( ( error ) => {
				importPattern( localPatternText );
			} );
		} else {
			importPattern( localPatternText );
		}
	};

	const block = (
		<>
			<Card className="dlx-pattern-inserter">
				<CardHeader>
					{ __( 'Pattern Importer', 'alerts-dlx' ) }
				</CardHeader>
				<CardBody>
					<TextareaControl
						label={ __( 'Paste your pattern here', 'alerts-dlx' ) }
						placeholder={ __( 'Paste your pattern here', 'alerts-dlx' ) }
						value={ patternText }
						onChange={ ( value ) => setPatternText( value ) }
						disabled={ importing }
					/>
					<CheckboxControl
						label={ __( 'Do not import remote images', 'dlx-pattern-wrangler' ) }
						checked={ doNotImportRemoteImages }
						onChange={ ( value ) => setDoNotImportRemoteImages( value ) }
						disabled={ importing }
						className="gb-extras-card-checkbox"
					/>
				</CardBody>
				<CardFooter>
					<Button
						variant="primary"
						disabled={ ! patternText || importing }
						onClick={ onPatternSubmit }
					>
						{ __( 'Import', 'alerts-dlx' ) }
					</Button>
					{ importing && (
						<span className="gb-pattern-importer-image">
							<Spinner />
							{
								`Processing ${ imageProcessingCount } of ${ patternImages.length } images.`
							}
						</span>
					) }
				</CardFooter>
			</Card>
		</>
	);

	const blockProps = useBlockProps( { className: 'dlx-pattern-inserter-wrapper' } );

	return (
		<>
			<div { ...blockProps }>{ block }</div>
		</>
	);
};

export default PatternImporter;
