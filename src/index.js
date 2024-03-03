import { useEffect, useState } from 'react';
import { setDefaultBlockName, cloneBlock } from '@wordpress/blocks';
import { addAction } from '@wordpress/hooks';
import { isEmpty } from '@wordpress/rich-text';
import { PluginBlockSettingsMenuItem } from '@wordpress/edit-post';
import { useSelect, useDispatch, store } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';
import { debounce } from '@wordpress/compose';
import uniqueId from 'lodash.uniqueid';
import './js/blocks/pattern-importer/index.js';
import './js/blocks/commands/index.js';
import ContainerLogo from './js/blocks/components/ContainerIcon.js';
import ReplaceIcon from './js/blocks/components/ReplaceIcon.js';

let previousSelectedBlock = null;
let previousParentClientId = null;
let previousSelectedBlockIndex = null;

const UnGroupIcon = ( props ) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="24" height="24" { ...props }>
			<path fill="currentColor" d="M0 64c0 29.8 20.4 54.9 48 62v100c-27.6 7.1-48 32.2-48 62 0 35.3 28.7 64 64 64 29.8 0 54.9-20.4 62-48h196c7.1 27.6 32.2 48 62 48 35.3 0 64-28.7 64-64 0-29.8-20.4-54.9-48-62V126c27.6-7.1 48-32.2 48-62 0-35.3-28.7-64-64-64-29.8 0-54.9 20.4-62 48H126C118.9 20.4 93.8 0 64 0 28.7 0 0 28.7 0 64zm322 16c5.8 22.5 23.5 40.2 46 46v100c-22.5 5.8-40.2 23.5-46 46H126c-5.8-22.5-23.5-40.2-46-46V126c22.5-5.8 40.2-23.5 46-46h196zm158 128h-16v32h50c5.8 22.5 23.5 40.2 46 46v100c-22.5 5.8-40.2 23.5-46 46H318c-5.8-22.5-23.5-40.2-46-46v-50h-32v50c-27.6 7.1-48 32.2-48 62 0 35.3 28.7 64 64 64 29.8 0 54.9-20.4 62-48h196c7.1 27.6 32.2 48 62 48 35.3 0 64-28.7 64-64 0-29.8-20.4-54.9-48-62V286c27.6-7.1 48-32.2 48-62 0-35.3-28.7-64-64-64-29.8 0-54.9 20.4-62 48h-34zm96 48a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm-32 192a32 32 0 1 1 64 0 32 32 0 1 1-64 0zm-288 32a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm96-192a32 32 0 1 1 64 0 32 32 0 1 1-64 0zM64 320a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM352 64a32 32 0 1 1 64 0 32 32 0 1 1-64 0zM64 96a32 32 0 1 1 0-64 32 32 0 1 1 0 64z" />
		</svg>
	)
};

// Run on load.
( function( wp ) {
	/**
	 * Add a toolbar option to wrap selected blocks in a container.
	 */
	registerPlugin( 'dlx-gb-hacks-wrap-container', {
		render: () => {
			const [ clientIds, setClientIds ] = useState( [] );

			// Get the selected block clientIds.

			const { selectedBlocks, getMultiSelectedBlockClientIds } = useSelect( ( select ) => {
				return {
					selectedBlocks: select( 'core/block-editor' ).getMultiSelectedBlocks(),
					getMultiSelectedBlockClientIds: select( 'core/block-editor' ).getMultiSelectedBlockClientIds,
				}
			}, [] );

			const { replaceBlocks } = useDispatch( store )( 'core/block-editor' );

			useEffect( () => {
				setClientIds( selectedBlocks );
			}, [ selectedBlocks ] );

			// If no blocks are selected, return.
			if ( clientIds.length === 0 ) {
				return null;
			}

			// If more than one block is selected, add toolbar option to wrap container.
			if ( clientIds.length > 1 ) {
				return (
					<PluginBlockSettingsMenuItem
						icon={ <ContainerLogo /> }
						label="Wrap in Container"
						onClick={ () => {
							const innerBlocks = [];
							clientIds.forEach( ( clientId ) => {
								innerBlocks.push( cloneBlock( clientId ) );
							} );
							replaceBlocks(
								getMultiSelectedBlockClientIds(),
								wp.blocks.createBlock(
									'generateblocks/container', {}, innerBlocks
								)
							);
						} }
					/>
				);
			}
			return null;
		},
	} );

	// Unique ID storing.
	const uniqueIds = [];
	/**
	 * Generate New Unique IDs for selected blocks.
	 */
	registerPlugin( 'dlx-gb-hacks-generate-unique-ids', {
		render: () => {
			const selectedBlock = useSelect( ( select ) => {
				return select( 'core/block-editor' ).getSelectedBlock();
			}, [] );

			/**
			 * Return and generate a new unique ID.
			 *
			 * @param {string} clientId The client ID of the block.
			 *
			 * @return {string} The uniqueId.
			 */
			const generateUniqueId = ( clientId ) => {
				// Get the substr of current client ID for prefix.
				const prefix = clientId.substring( 2, 9 ).replace( '-', '' );
				const newUniqueId = uniqueId( prefix );

				// Make sure it isn't in the array already. Recursive much?
				if ( uniqueIds.includes( newUniqueId ) ) {
					return generateUniqueId();
				}
				return newUniqueId;
			};

			/**
			 * Replace uniqueId attribute with new uniqueId.
			 *
			 * @param {Object} block The block object.
			 */
			const replaceUniqueId = ( block ) => {
				const blockClientId = block.clientId;
				const blockAttributes = block.attributes;

				// If block has a `uniqueId` attribute, generate a new one.
				if ( 'undefined' !== typeof blockAttributes.uniqueId ) {
					const newUniqueId = generateUniqueId( blockClientId );
					wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes( blockClientId, { uniqueId: newUniqueId } );
				}

				// Now check if block has innerBlocks.
				if ( 'undefined' !== typeof block.innerBlocks && block.innerBlocks.length > 0 ) {
					block.innerBlocks.forEach( ( innerBlock ) => {
						replaceUniqueId( innerBlock );
					} );
				}
			};

			/**
			 * Return early if no block is selected.
			 */
			if ( null === selectedBlock ) {
				return null;
			}

			// Get the block name.
			const { name } = selectedBlock;

			// If name contains `generateblocks`, proceed.
			if ( name.indexOf( 'generateblocks' ) === -1 ) {
				return null;
			}

			// If more than one block is selected, add toolbar option to replace the Unique ID.
			return (
				<PluginBlockSettingsMenuItem
					icon={ <ReplaceIcon /> }
					label="Generate New Unique IDs"
					onClick={ () => {
						replaceUniqueId( selectedBlock ); // This gets the selected block and all innerBlocks.
					} }
				/>
			);
		},
	} );

	/**
	 * Register a plugin that unwraps (flattens) a container block.
	 */
	registerPlugin( 'dlx-gb-hacks-unwrap-container', {
		render: () => {
			const selectedBlock = useSelect( ( select ) => {
				return select( 'core/block-editor' ).getSelectedBlock();
			}, [] );

			// If no block is selected, return.
			if ( null === selectedBlock ) {
				return null;
			}

			// If block is not a container, return.
			if ( selectedBlock.name !== 'generateblocks/container' ) {
				return null;
			}

			// If block has no innerBlocks, return.
			if ( selectedBlock.innerBlocks.length === 0 ) {
				return null;
			}

			// Get the first child block.
			const firstChildBlock = selectedBlock.innerBlocks[ 0 ] || null;

			// If more than one block is selected, add toolbar option to unwrap container.
			return (
				<PluginBlockSettingsMenuItem
					icon={ <UnGroupIcon /> }
					label="Unwrap Container"
					onClick={ () => {
						const innerBlocks = selectedBlock.innerBlocks;
						wp.data.dispatch( 'core/block-editor' ).replaceBlocks( selectedBlock.clientId, innerBlocks );

						// Select the first child block in the editor.
						wp.data.dispatch( 'core/block-editor' ).selectBlock( firstChildBlock.clientId );
					} }
				/>
			);
		},
	} );

	/**
	 * Register a plugin that unwraps (flattens) a group block.
	 */
	registerPlugin( 'dlx-gb-hacks-unwrap-group', {
		render: () => {
			const selectedBlock = useSelect( ( select ) => {
				return select( 'core/block-editor' ).getSelectedBlock();
			}, [] );

			// If no block is selected, return.
			if ( null === selectedBlock ) {
				return null;
			}

			// If block is not a container, return.
			if ( selectedBlock.name !== 'core/graoup' ) {
				return null;
			}

			// If block has no innerBlocks, return.
			if ( selectedBlock.innerBlocks.length === 0 ) {
				return null;
			}

			// If more than one block is selected, add toolbar option to unwrap container.
			return (
				<PluginBlockSettingsMenuItem
					icon={ <UnGroupIcon /> }
					label="Ungroup Blocks"
					onClick={ () => {
						const innerBlocks = selectedBlock.innerBlocks;
						wp.data.dispatch( 'core/block-editor' ).replaceBlocks( selectedBlock.clientId, innerBlocks );
					} }
				/>
			);
		},
	} );

	/**
	 * Allow transform from group block.
	 */
	wp.hooks.addFilter( 'blocks.registerBlockType', 'generateblocks/transform/group', ( blockSettings ) => {
		if ( blockSettings.name === 'core/group' ) {
			const transformsTo = blockSettings.transforms?.to || [];
			transformsTo.push( {
				type: 'block',
				blocks: [ 'generateblocks/container' ],
				transform: ( attributes, innerBlocks ) => {
					return wp.blocks.createBlock( 'generateblocks/container', {}, innerBlocks );
				},
			} );
			blockSettings.transforms.to = transformsTo;
		}
		return blockSettings;
	} );
	// Check to see if the default block is a headline. If not, return.
	const defaultHeadlineBlockEnabled = gbHacksPatternInserter.defaultHeadlineBlockEnabled;
	if ( ! defaultHeadlineBlockEnabled ) {
		return;
	}

	// Get the default element name.
	const defaultHeadlineElement = gbHacksPatternInserter.defaultHeadlineBlockElement;

	registerPlugin( 'dlx-gb-hacks-default-headline', {
		render: () => {
			useEffect( () => {
				setDefaultBlockName( 'generateblocks/headline' );
			}, [] );
		},
	} );

	/**
	 * Watch for block changes and set the default block to headline.
	 */
	const watchForBlockChanges = () => {
		// Try to find if the paragraph needs to be converted to a headline.
		const currentBlock = wp.data.select( 'core/block-editor' ).getSelectedBlock();

		// If no block is selected, no need to go further.
		if ( null === currentBlock || 'undefined' === typeof currentBlock ) {
			return;
		}

		// Store history vars.
		const parentClientId = wp.data.select( 'core/block-editor' ).getBlockRootClientId( currentBlock.clientId );
		const currentBlockIndex = wp.data.select( 'core/block-editor' ).getBlockIndex( currentBlock.clientId );

		if ( null !== previousSelectedBlock && null !== previousSelectedBlockIndex ) {
			// If previous selected block is a headline,  current block is a paragraph, and they both have the same parent client ID and index, then we're in a transform and should return.
			if ( previousSelectedBlock.name !== 'core/paragraph' && currentBlock.name === 'core/paragraph' && parentClientId === previousParentClientId && currentBlockIndex === previousSelectedBlockIndex ) {
				return;
			}
		}

		// Check if previous block is a headline block. If so, current block should be headline too and not a paragraph.
		if ( currentBlockIndex > 0 ) {
			const adjacentBlockClientId = wp.data.select( 'core/block-editor' ).getAdjacentBlockClientId( currentBlock.clientId, -1 );
			if ( null !== adjacentBlockClientId ) {
				const adjacentBlock = wp.data.select( 'core/block-editor' ).getBlock( adjacentBlockClientId );
				const currentBlockContent = currentBlock.attributes.content;
				const currentBlockContentLength = currentBlockContent?.length || null;

				// In WP 6.4, the content attribute is a string, but in 6.5, it's a richtext object.
				// If length is null, then it's a richtext object.
				if ( null !== adjacentBlock && adjacentBlock.name === 'generateblocks/headline' && currentBlock.name === 'core/paragraph' && ( '' === currentBlock.attributes.content || ( null === currentBlockContentLength && isEmpty( currentBlock.attributes.content ) ) ) ) {
					// If previous block is a headline, replace current block with a headline.
					wp.data.dispatch( 'core/block-editor' ).replaceBlocks( currentBlock.clientId, [
						wp.blocks.createBlock( 'generateblocks/headline', {
							uniqueId: '',
							content: currentBlock.attributes.content,
							element: defaultHeadlineElement,
						} ),
					] );
				} else if ( null !== adjacentBlock && adjacentBlock.name === 'core/paragraph' && currentBlock.name === 'core/paragraph' && ( '' === currentBlock.attributes.content || ( null === currentBlockContentLength && isEmpty( currentBlock.attributes.content ) ) ) ) {
					// If previous block is a paragraph, convert current block to headline.
					wp.data.dispatch( 'core/block-editor' ).replaceBlocks( currentBlock.clientId, [
						wp.blocks.createBlock( 'generateblocks/headline', {
							uniqueId: '',
							content: currentBlock.attributes.content,
							element: defaultHeadlineElement,
						} ),
					] );
				}
			}
		}

		// Story history to detect transforms.
		previousParentClientId = parentClientId;
		previousSelectedBlockIndex = currentBlockIndex;
		previousSelectedBlock = currentBlock;
	};

	// Run the block change watcher. Debounce to run every 150ms.
	wp.data.subscribe( debounce( watchForBlockChanges, 150 ) );

	/**
	 * Change default headline element to paragraph.
	 */
	addAction( 'generateblocks.editor.renderBlock', 'generateblocks/editor/renderBlock', function( props ) {
		if ( props.attributes.uniqueId === '' ) {
			props.attributes.element = defaultHeadlineElement;

			// Max iterations.
			const maxIterations = 50;
			let currentIteration = 0;

			const intervalId = setInterval( function() {
				if ( currentIteration > maxIterations ) {
					clearInterval( intervalId );
				}
				if ( 'undefined' !== typeof props.headlineRef && props.headlineRef.current !== null ) {
					const headline = props.headlineRef.current;
					headline.querySelector( '.block-editor-rich-text__editable' ).focus();
					clearInterval( intervalId );
				}
				currentIteration++;
			}, 200 );
		}
	} );
}( window.wp ) );
