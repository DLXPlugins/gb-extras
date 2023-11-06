import { setDefaultBlockName } from '@wordpress/blocks';
import { addFilter, addAction } from '@wordpress/hooks';
import './js/blocks/pattern-importer/index.js';

// Run on load.
document.addEventListener( 'DOMContentLoaded', function() {
	
	addFilter( 'generateblocks.editor.blockContext', 'generateblocks/editor/blockContext/default', function( blockContext, props ) {
		return blockContext;
	} );
} );

// Run on load.
( function( wp ) {
	wp.data.subscribe(() => {
		const { getBlockCount } = wp.data.select('core/block-editor');
	
		setDefaultBlockName('generateblocks/headline');
	} );

	document.addEventListener( 'DOMContentLoaded', () => {
		const observer = new MutationObserver( ( mutations ) => {
			for ( const mutation of mutations ) {
				if ( ! mutation.addedNodes ) {
					continue;
				}
		
				for ( const node of mutation.addedNodes ) {
					// Assuming 'advanced-select-container' is the class of the container for AdvancedSelect
					console.log( node.classList );
					if ( node.classList && node.classList.contains( 'generate-advanced-select__menu-portal' ) ) {
						
						// Modify internal blocks so only selected fonts show.
						const selectOptions = node.querySelectorAll( '.generate-advanced-select__menu-portal .generate-advanced-select__option' );

						// Remove from dom.
						selectOptions.forEach( ( option ) => {
							option.remove();
						} );
						

						observer.disconnect(); // If you only need to run this once
					}
				}
			}
		} );
		
		observer.observe( document.body, {
			childList: true,
			subtree: true,
		} );
	} );

	/**
	 * Change default headline element to paragraph.
	 */
	addAction( 'generateblocks.editor.renderBlock', 'generateblocks/editor/renderBlock', function( props, headlineRef ) {
		if ( props.attributes.uniqueId === '' ) {
			props.setAttributes( {
				element: 'p',
			} );
		}
		props.onSplit = ( value, isOriginal ) => {
			console.log( 'blah' );
			const block = wp.blocks.createBlock( 'generateblocks/headline', {
				...props.attributes,
				content: value,
			} );
			return block;
		};
	} );
}( window.wp ) );