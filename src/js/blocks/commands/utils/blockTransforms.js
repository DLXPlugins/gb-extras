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
 * Whether a block is a v1 block (or v1 variation).
 *
 * @param {Object} block Block object.
 * @return {boolean} True if block is v1.
 */
export function isV1Block( block ) {
	return (
		( block && block.name && ( v1Blocks.includes( block.name ) || v1VariationNames.includes( block.name ) ) ) || false
	);
}

/**
 * Whether the block or any of its descendants is a v1 block.
 *
 * @param {Object} block Block object (with innerBlocks).
 * @return {boolean} True if block or any descendant is v1.
 */
export function hasV1BlockInSubtree( block ) {
	if ( ! block ) {
		return false;
	}
	if ( isV1Block( block ) ) {
		return true;
	}
	if ( block.innerBlocks && block.innerBlocks.length > 0 ) {
		return block.innerBlocks.some( ( child ) => hasV1BlockInSubtree( child ) );
	}
	return false;
}

/**
 * Transform a single block to v2 and replace it in the editor (shared logic).
 *
 * @param {Object}   block         Block to transform.
 * @param {Function} storeDispatch Global store dispatch (from @wordpress/data).
 * @return {Promise<?Object>} The transform result if replaced, null otherwise.
 */
export async function replaceBlockWithV2Transform( block, storeDispatch ) {
	if ( ! isV1Block( block ) ) {
		return null;
	}
	const transformOptions = getBlockTransforms( 'to', block.name );
	if ( ! transformOptions ) {
		return null;
	}
	for ( const transform of transformOptions ) {
		if ( ! transform.blocks ) {
			continue;
		}
		for ( const transformBlockName of transform.blocks ) {
			if ( ! v2Blocks.includes( transformBlockName ) ) {
				continue;
			}
			const result = transform.transform(
				block.attributes,
				block.innerBlocks
			);
			if ( result ) {
				await storeDispatch( 'core/block-editor' ).replaceBlocks(
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
	return null;
}

/**
 * Transform a block.
 *
 * @param {Object} block Block to transform.
 * @return {Promise} Promise that resolves when the block is transformed.
 */
export async function transformBlock( block ) {
	return replaceBlockWithV2Transform( block, dispatch );
}

/**
 * Recursively get all blocks.
 *
 * @param {Array} blocks Array of blocks to transform.
 * @return {Promise<Array>} Promise that resolves with the same blocks array when all are transformed.
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

/**
 * Transform the given block and its descendants from v1 to v2 (outside-in).
 * Uses position-based resolution after each replace so the replacement block
 * is found reliably. Non-v1 blocks are skipped but their inner blocks are still processed.
 *
 * @param {Object}   block         The block to process (selected block or a child).
 * @param {Function} storeSelect   Store select (from @wordpress/data).
 * @param {Function} storeDispatch Global store dispatch (from @wordpress/data).
 * @return {Promise<void>} Resolves when the subtree has been processed.
 */
export async function transformBlockSubtreeFromContext( block, storeSelect, storeDispatch ) {
	if ( ! block || ! block.clientId ) {
		return;
	}

	const blockEditorSelect = storeSelect( 'core/block-editor' );

	if ( isV1Block( block ) ) {
		const rootClientId = blockEditorSelect.getBlockRootClientId( block.clientId );
		const index = blockEditorSelect.getBlockIndex( block.clientId, rootClientId ?? '' );
		const didReplace = await replaceBlockWithV2Transform( block, storeDispatch );
		if ( ! didReplace ) {
			return;
		}
		const order = blockEditorSelect.getBlockOrder( rootClientId === '' ? undefined : rootClientId );
		const newClientId = order && order[ index ] !== undefined ? order[ index ] : null;
		if ( ! newClientId ) {
			return;
		}
		const newBlock = blockEditorSelect.getBlock( newClientId );
		if ( ! newBlock ) {
			return;
		}
		const childIds = blockEditorSelect.getBlockOrder( newClientId );
		if ( childIds && childIds.length > 0 ) {
			for ( const childId of childIds ) {
				const childBlock = blockEditorSelect.getBlock( childId );
				if ( childBlock ) {
					await transformBlockSubtreeFromContext( childBlock, storeSelect, storeDispatch );
				}
			}
		}
	} else {
		const childIds = blockEditorSelect.getBlockOrder( block.clientId );
		if ( childIds && childIds.length > 0 ) {
			for ( const childId of childIds ) {
				const childBlock = blockEditorSelect.getBlock( childId );
				if ( childBlock ) {
					await transformBlockSubtreeFromContext( childBlock, storeSelect, storeDispatch );
				}
			}
		}
	}
}

