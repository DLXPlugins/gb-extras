/**
 * Utilities for block transformation.
 */

import { getBlockTransforms } from '@wordpress/blocks';
import { dispatch } from '@wordpress/data';
import {
	v1Blocks,
	v1VariationNames,
	v2Blocks,
} from '../../utils/BlockTypes';

/**
 * Transform a block.
 *
 * @param {Object} block Block to transform.
 * @return {Promise} Promise that resolves when the block is transformed.
 */
export async function transformBlock( block ) {
	if (
		v1Blocks.includes( block.name ) ||
		v1VariationNames.includes( block.name )
	) {
		// Get transform options for the block.
		const transformOptions = getBlockTransforms( 'to', block.name );
		if ( transformOptions ) {
			for ( const transform of transformOptions ) {
				// Has transform.blocks, which is an array of blocks it can transform to.
				if ( transform.blocks ) {
					for ( const transformBlockName of transform.blocks ) {
						if ( v2Blocks.includes( transformBlockName ) ) {
							// Now do the transform.
							const result = transform.transform(
								block.attributes,
								block.innerBlocks
							);
							if ( result ) {
								await dispatch( 'core/block-editor' ).replaceBlocks(
									[ block.clientId ],
									result
								);
								return result;
							}
							// eslint-disable-next-line no-console
							console.error(
								'Failed to transform',
								block.name,
								'to',
								transformBlockName
							);
						}
					}
				}
			}
		}
	}
	return null;
}

/**
 * Recursively get all blocks.
 *
 * @param {Array} blocks Array of blocks to transform.
 * @return {Promise} Promise that resolves when all blocks are transformed.
 */
export async function transformBlocks( blocks ) {
	const transformPromises = blocks.map( async( block ) => {
		// First, recursively transform children and update them before working on parent.
		if ( block.innerBlocks.length > 0 ) {
			await transformBlock( block );
			await transformBlocks( block.innerBlocks );
		} else {
			await transformBlock( block );
		}
	} );

	await Promise.all( transformPromises );
	return blocks;
}

