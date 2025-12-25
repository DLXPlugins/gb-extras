/**
 * Utilities for calculating block nesting.
 */

import { select } from '@wordpress/data';

/**
 * Get block nesting level.
 *
 * @param {Array} blocks Array of blocks to check.
 * @return {number} Maximum nesting level.
 */
export function getBlockNestingLevel( blocks = null ) {
	const blocksToCheck = blocks || select( 'core/block-editor' ).getBlocks();
	let maxLevel = 0;

	blocksToCheck.forEach( ( block ) => {
		if ( block.innerBlocks.length > 0 ) {
			const innerLevel = 1 + getBlockNestingLevel( block.innerBlocks );
			maxLevel = Math.max( maxLevel, innerLevel );
		}
	} );

	return maxLevel;
}

