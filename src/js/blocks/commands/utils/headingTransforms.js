/**
 * Utilities for transforming heading blocks.
 */

import { createBlock } from '@wordpress/blocks';
import { dispatch, select } from '@wordpress/data';

/**
 * Recursively find all heading blocks in the editor.
 *
 * @param {Array} blocks Array of blocks to search.
 * @return {Array} Array of heading block objects.
 */
export function getAllHeadingBlocks( blocks ) {
	const headingBlocks = [];

	blocks.forEach( ( block ) => {
		if ( block.name === 'core/heading' ) {
			headingBlocks.push( block );
		}
		// Recursively search inner blocks.
		if ( block.innerBlocks && block.innerBlocks.length > 0 ) {
			headingBlocks.push( ...getAllHeadingBlocks( block.innerBlocks ) );
		}
	} );

	return headingBlocks;
}

/**
 * Transform a core/heading block to generateblocks/text.
 *
 * @param {Object} block The heading block to transform.
 * @return {Promise} Promise that resolves when the block is transformed.
 */
export async function transformHeadingBlock( block ) {
	if ( block.name !== 'core/heading' ) {
		return null;
	}

	// Get the heading block attributes.
	const { level = 2, content = '', align, anchor, textColor, backgroundColor, fontSize, style } = block.attributes || {};

	// Map level to tagName (h1-h6).
	const tagName = `h${ level }`;

	// Create the new GenerateBlocks text block attributes.
	// Start with essential attributes: tagName and content.
	const newAttributes = {
		tagName,
		content: content || '',
	};

	// Preserve alignment if set.
	if ( align ) {
		newAttributes.align = align;
	}

	// Preserve anchor if set (for linking to specific headings).
	if ( anchor ) {
		newAttributes.anchor = anchor;
	}

	// Preserve style object if it exists (contains custom CSS and other style properties).
	// This preserves colors, spacing, typography, and other custom styles.
	if ( style && typeof style === 'object' ) {
		newAttributes.style = { ...style };
	}

	// Preserve text color slug if set (WordPress theme color support).
	if ( textColor ) {
		newAttributes.textColor = textColor;
	}

	// Preserve background color slug if set (WordPress theme color support).
	if ( backgroundColor ) {
		newAttributes.backgroundColor = backgroundColor;
	}

	// Preserve font size if set (WordPress core typography support).
	if ( fontSize ) {
		newAttributes.fontSize = fontSize;
	}

	// Create the new block.
	const newBlock = createBlock( 'generateblocks/text', newAttributes, block.innerBlocks || [] );

	// Replace the old block with the new one.
	await dispatch( 'core/block-editor' ).replaceBlocks( [ block.clientId ], [ newBlock ] );

	return newBlock;
}

/**
 * Transform all heading blocks in the editor.
 *
 * @return {Promise} Promise that resolves when all blocks are transformed.
 */
export async function transformAllHeadingBlocks() {
	const blocks = select( 'core/block-editor' ).getBlocks();
	const headingBlocks = getAllHeadingBlocks( blocks );

	// Transform all heading blocks.
	const transformPromises = headingBlocks.map( ( block ) => transformHeadingBlock( block ) );

	await Promise.all( transformPromises );

	return headingBlocks.length;
}

