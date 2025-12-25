/**
 * Command to toggle container/element outlines.
 */

import { useState, useEffect } from 'react';
import { useCommand } from '@wordpress/commands';
import { select } from '@wordpress/data';
import OutlineIcon from '../icons/OutlineIcon';
import { setGlobalShowContainerOutlines, getEditorDocument } from '../../utils/outlineClasses';

/**
 * Recursively get all block client IDs from blocks.
 *
 * @param {Array} blocks - Array of blocks.
 * @return {Array} Array of client IDs.
 */
function getAllBlockClientIds( blocks ) {
	let clientIds = [];
	blocks.forEach( ( block ) => {
		clientIds.push( block.clientId );
		if ( block.innerBlocks && block.innerBlocks.length > 0 ) {
			clientIds = clientIds.concat( getAllBlockClientIds( block.innerBlocks ) );
		}
	} );
	return clientIds;
}

/**
 * Hook to register the Toggle Container Outlines command.
 *
 * @return {void}
 */
export function useToggleContainerOutlinesCommand() {
	const [ showContainerOutlines, setShowContainerOutlines ] = useState( false );

	// Update global state when local state changes.
	useEffect( () => {
		setGlobalShowContainerOutlines( showContainerOutlines );
	}, [ showContainerOutlines ] );

	useCommand( {
		name: 'dlx-gb-extras-toggle-container-outlines',
		label: 'Toggle GenerateBlocks Container/Element Outlines',
		icon: <OutlineIcon width="16" height="16" />,
		callback: ( { close } ) => {
			const editorDoc = getEditorDocument();
			const blocks = select( 'core/block-editor' ).getBlocks();
			const allClientIds = getAllBlockClientIds( blocks );
			const newState = ! showContainerOutlines;

			// Loop through all block client IDs and find their DOM elements.
			allClientIds.forEach( ( clientId ) => {
				const blockElement = editorDoc.querySelector( `[data-block="${ clientId }"]` );
				if ( ! blockElement ) {
					return;
				}

				// Check if this is a container or element block.
				const isContainer = blockElement.querySelector( '[data-type="generateblocks/container"]' );
				const isElement = blockElement.querySelector( '[data-type="generateblocks/element"]' );
				const isGrid = blockElement.querySelector( '[data-title="Grid"]' );

				// Find the actual container/element wrapper.
				let targetElement = null;
				if ( isContainer || isElement || isGrid ) {
					targetElement = blockElement;
				}

				if ( ! targetElement ) {
					return;
				}

				if ( newState ) {
					// Add outline classes.
					targetElement.classList.add( 'dlx-gb-outline' );
					if ( isContainer ) {
						targetElement.classList.add( 'dlx-gb-outline-container' );
					}
					if ( isElement ) {
						targetElement.classList.add( 'dlx-gb-outline-element' );
					}
					if ( isGrid ) {
						targetElement.classList.add( 'dlx-gb-outline-grid' );
					}

					// Check for grid display.
				} else {
					// Remove outline classes.
					targetElement.classList.remove( 'dlx-gb-outline' );
					targetElement.classList.remove( 'dlx-gb-outline-container' );
					targetElement.classList.remove( 'dlx-gb-outline-element' );
					targetElement.classList.remove( 'dlx-gb-outline-grid' );
				}
			} );

			setShowContainerOutlines( newState );
			close();
		},
		context: 'block-editor',
	} );
}

