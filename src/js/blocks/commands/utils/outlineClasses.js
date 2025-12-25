/**
 * Utilities for managing outline classes.
 */

// Create a global state for outline visibility (for reference).
let globalShowContainerOutlines = false;

/**
 * Set the global outline visibility state.
 *
 * @param {boolean} value - The value to set.
 */
export function setGlobalShowContainerOutlines( value ) {
	globalShowContainerOutlines = value;
}

/**
 * Get the global outline visibility state.
 *
 * @return {boolean} The current state.
 */
export function getGlobalShowContainerOutlines() {
	return globalShowContainerOutlines;
}

/**
 * Get the iframe document if it exists, otherwise return main document.
 *
 * @return {Document} The document to use.
 */
export function getEditorDocument() {
	const iframe = document.querySelector( '.editor-canvas__iframe' ) || document.querySelector( 'iframe[name="editor-canvas"]' );
	return iframe?.contentDocument || iframe?.contentWindow?.document || document;
}
