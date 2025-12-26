/**
 * Command to toggle container/element outlines.
 */

import { useState, useEffect, useRef } from 'react';
import { useCommand } from '@wordpress/commands';
import { select } from '@wordpress/data';
import { setGlobalShowContainerOutlines, getEditorDocument } from '../../utils/outlineClasses';
import GBIcon from '../icons/GBIcon';

/**
 * Hook to register the Toggle Container Outlines command.
 *
 * @return {void}
 */
export function useToggleContainerOutlinesCommand() {
	const [ showContainerOutlines, setShowContainerOutlines ] = useState( false );
	const observerRef = useRef( null );

	// Update global state when local state changes.
	useEffect( () => {
		setGlobalShowContainerOutlines( showContainerOutlines );
	}, [ showContainerOutlines ] );

	// Set up MutationObserver to maintain outline classes.
	useEffect( () => {
		const editorDoc = getEditorDocument();

		// Function to remove outline data attributes from all blocks.
		const removeOutlineAttributes = () => {
			const blocks = select( 'core/block-editor' ).getBlocks();

			const processBlock = ( block ) => {
				const blockElement = editorDoc.querySelector( `[data-block="${ block.clientId }"]` );
				if ( ! blockElement ) {
					return;
				}

				// Remove outline data attribute.
				blockElement.removeAttribute( 'data-container-type' );

				// Process inner blocks.
				if ( block.innerBlocks ) {
					block.innerBlocks.forEach( processBlock );
				}
			};

			blocks.forEach( processBlock );
		};

		if ( ! showContainerOutlines ) {
			// Remove all outline data attributes when disabled.
			removeOutlineAttributes();

			// Clean up observer when outlines are disabled.
			if ( observerRef.current ) {
				observerRef.current.disconnect();
				observerRef.current = null;
			}
			return;
		}

		// Function to add outline data attributes to blocks.
		const addOutlineAttributes = () => {
			const blocks = select( 'core/block-editor' ).getBlocks();

			const processBlock = ( block ) => {
				const blockElement = editorDoc.querySelector( `[data-block="${ block.clientId }"]` );
				if ( ! blockElement ) {
					return;
				}

				const isContainer = blockElement.getAttribute( 'data-type' ) === 'generateblocks/container';
				const isElement = blockElement.getAttribute( 'data-type' ) === 'generateblocks/element';
				const isGrid = blockElement.getAttribute( 'data-title' ) === 'Grid';

				if ( isGrid ) {
					blockElement.setAttribute( 'data-container-type', 'grid' );
				} else if ( isContainer ) {
					blockElement.setAttribute( 'data-container-type', 'container' );
				} else if ( isElement ) {
					blockElement.setAttribute( 'data-container-type', 'element' );
				}

				// Process inner blocks.
				if ( block.innerBlocks ) {
					block.innerBlocks.forEach( processBlock );
				}
			};

			blocks.forEach( processBlock );
		};

		// Initial add.
		addOutlineAttributes();

		// Set up MutationObserver to re-add data attributes when blocks are added/changed.
		const observer = new MutationObserver( () => {
			// Reapply attributes when DOM changes (debounced).
			setTimeout( addOutlineAttributes, 10 );
		} );

		// Observe the editor container for DOM changes.
		const editorContainer = editorDoc.querySelector( '.block-editor-writing-flow' ) || editorDoc.body;
		if ( editorContainer ) {
			observer.observe( editorContainer, {
				childList: true,
				subtree: true,
			} );
			observerRef.current = observer;
		}

		// Cleanup.
		return () => {
			if ( observerRef.current ) {
				observerRef.current.disconnect();
				observerRef.current = null;
			}
		};
	}, [ showContainerOutlines ] );

	useCommand( {
		name: 'dlx-gb-extras-toggle-container-outlines',
		label: 'GenerateBlocks: Toggle Container/Element Outlines',
		keywords: [ 'generateblocks', 'outline', 'container', 'element', 'grid', 'toggle', 'show', 'hide', 'visual', 'debug' ],
		icon: <GBIcon width="16" height="16" />,
		callback: ( { close } ) => {
			setShowContainerOutlines( ( prev ) => ! prev );
			close();
		},
		context: 'block-editor',
	} );
}
