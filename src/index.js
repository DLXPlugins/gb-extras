import { useEffect, useState } from 'react';
import { setDefaultBlockName, cloneBlock } from '@wordpress/blocks';
import { addAction } from '@wordpress/hooks';
import { PluginBlockSettingsMenuItem } from '@wordpress/edit-post';
import { useSelect, select, useDispatch, store } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';
import './js/blocks/pattern-importer/index.js';
import './js/blocks/commands/index.js';

let previousBlocks = [];

// Run on load.
( function( wp ) {
	// Check to see if the default block is a headline. If not, return.
	const defaultHeadlineBlockEnabled = gbHacksPatternInserter.defaultHeadlineBlockEnabled;
	if ( ! defaultHeadlineBlockEnabled ) {
		return;
	}

	// Get the default element name.
	const defaultHeadlineElement = gbHacksPatternInserter.defaultHeadlineBlockElement;

	wp.data.subscribe( () => {
		// Try to find if the paragraph needs to be converted to a headline.
		const currentBlocks = wp.data.select( 'core/block-editor' ).getBlocks();
		const currentBlock = wp.data.select( 'core/block-editor' ).getSelectedBlock();

		// Set the default block. Needs to run every render otherwise is forgotten.
		setDefaultBlockName( 'generateblocks/headline' );

		// If no block is selected, no need to go further.
		if ( null === currentBlock || 'undefined' === typeof currentBlock ) {
			previousBlocks = currentBlocks;
			return;
		}

		// Check that selected block's client ID is not in previous blocks.
		if ( previousBlocks.includes( currentBlock.clientId ) ) {
			previousBlocks = currentBlocks;
			return;
		}
		previousBlocks = currentBlocks;

		// Get the block's index.
		const blockIndex = wp.data.select( 'core/block-editor' ).getBlockIndex( currentBlock.clientId );

		// If previous block is a headline, then the next block should be a headline too.
		if ( blockIndex > 0 ) {
			const previousBlock = wp.data.select( 'core/block-editor' ).getBlocks()[ blockIndex - 1 ];
			if ( previousBlock.name === 'generateblocks/headline' && currentBlock.name === 'core/paragraph' && currentBlock.attributes.content === '' ) {
				wp.data.dispatch( 'core/block-editor' ).replaceBlocks( currentBlock.clientId, [
					wp.blocks.createBlock( 'generateblocks/headline', {
						uniqueId: '',
						content: currentBlock.attributes.content,
						element: defaultHeadlineElement,
					} ),
				] );
			}
		}
	} );

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

	registerPlugin( 'dlx-gb-hacks', {
		render: () => {

			const [ clientIds, setClientIds ] = useState( [] );

			// Get the selected block clientIds.

			const selectedBlocks = useSelect( ( select ) => {
				return select( 'core/block-editor' ).getMultiSelectedBlocks();
			}, [] );

			const { replaceBlocks, clearSelectedBlock } = useDispatch( store )( 'core/block-editor');

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
						icon="editor-table"
						label="Wrap in Container"
						onClick={ () => {
							const innerBlocks = [];
							clientIds.forEach( ( clientId ) => {
								innerBlocks.push( cloneBlock( clientId ) );
							} );
							replaceBlocks(
								select( 'core/block-editor' ).getMultiSelectedBlockClientIds(),
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
}( window.wp ) );
