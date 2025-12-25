/**
 * Utilities for transforming paragraph blocks.
 */

import { createBlock } from '@wordpress/blocks';
import { dispatch, select } from '@wordpress/data';

/**
 * Recursively find all paragraph blocks in the editor.
 *
 * @param {Array} blocks Array of blocks to search.
 * @return {Array} Array of paragraph block objects.
 */
export function getAllParagraphBlocks( blocks ) {
	const paragraphBlocks = [];

	blocks.forEach( ( block ) => {
		if ( block.name === 'core/paragraph' ) {
			paragraphBlocks.push( block );
		}
		// Recursively search inner blocks.
		if ( block.innerBlocks && block.innerBlocks.length > 0 ) {
			paragraphBlocks.push( ...getAllParagraphBlocks( block.innerBlocks ) );
		}
	} );

	return paragraphBlocks;
}

/**
 * Transform a core/paragraph block to generateblocks/text.
 *
 * @param {Object} block The paragraph block to transform.
 * @return {Promise} Promise that resolves when the block is transformed.
 */
export async function transformParagraphBlock( block ) {
	if ( block.name !== 'core/paragraph' ) {
		return null;
	}

	// Get the paragraph block attributes.
	const { content = '', align, anchor, textColor, backgroundColor, fontSize, style } = block.attributes || {};

	// Create the new GenerateBlocks text block attributes.
	// Start with essential attributes: tagName (p for paragraph) and content.
	const newAttributes = {
		tagName: 'p',
		element: 'paragraph',
		content: content || '',
	};

	// Preserve alignment if set.
	if ( align ) {
		newAttributes.align = align;
	}

	// Preserve anchor if set (for linking to specific paragraphs).
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
 * Transform all paragraph blocks in the editor.
 *
 * @return {Promise} Promise that resolves when all blocks are transformed.
 */
export async function transformAllParagraphBlocks() {
	const blocks = select( 'core/block-editor' ).getBlocks();
	const paragraphBlocks = getAllParagraphBlocks( blocks );

	// Transform all paragraph blocks.
	const transformPromises = paragraphBlocks.map( ( block ) => transformParagraphBlock( block ) );

	await Promise.all( transformPromises );

	return paragraphBlocks.length;
}

