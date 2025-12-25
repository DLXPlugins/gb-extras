import { useEffect, useRef } from '@wordpress/element';
import { addFilter, removeFilter } from '@wordpress/hooks';
import { useSelect } from '@wordpress/data';
import {
	registerBlockType,
	unregisterBlockType,
	getBlockVariations,
	unregisterBlockVariation,
	registerBlockVariation,
} from '@wordpress/blocks';
import { escapeAttribute } from '@wordpress/escape-html';
import { v1Blocks } from '../../utils/BlockTypes';

// Add custom category
function addGenerateBlocksV1Category( categories ) {
	return [
		...categories,
		{
			slug: 'generateblocks-v1',
			title: 'GenerateBlocks V1',
			icon: null,
		},
	];
}

// Modify block registration for v1 and v2 blocks.
function modifyBlockRegistration( settings, name ) {
	if ( v1Blocks.includes( name ) && gbExtrasPatternInserter.enableV1Blocks ) {
		return {
			...settings,
			category: 'generateblocks-v1',
		};
	}
	return settings;
}

// Register filters
addFilter(
	'blocks.registerBlockType',
	'gbcm/modify-block-category',
	modifyBlockRegistration,
	1000
);

addFilter(
	'blocks.getCategories',
	'gbcm/add-v1-category',
	addGenerateBlocksV1Category
);
if ( 'true' === gbExtrasPatternInserter.enableV1Blocks ) {
	removeFilter( 'blocks.registerBlockType', 'generateblocks/disableBlocks' );
}

// Register a plugin to get all blocks.
wp.plugins.registerPlugin( 'generateblocks-custom', {
	render: () => {
		if ( 'true' !== gbExtrasPatternInserter.enableV1Blocks ) {
			return null;
		}

		const hasModifiedBlocks = useRef( false );
		const allBlocks = useSelect( ( select ) => select( 'core/blocks' ).getBlockTypes(), [] );

		useEffect( () => {
			if ( allBlocks.length === 0 || hasModifiedBlocks.current ) {
				return;
			}

			allBlocks.forEach( ( block ) => {
				if ( block.name.includes( 'generateblocks' ) ) {
					if ( v1Blocks.includes( block.name ) ) {
						/**
						 * Re-Register v1 Blocks with updated Title and __experimentalLabel.
						 */
						unregisterBlockType( block.name );
						// Get the original __experimentalLabel function if it exists.
						const originalLabel = block.__experimentalLabel;
						const v1Suffix = escapeAttribute( gbExtrasPatternInserter.v1BlockSuffix );

						// Remove suffix from title if it already exists (from filter hook).
						let originalTitle = block.title;
						if ( originalTitle.endsWith( ' ' + v1Suffix ) ) {
							originalTitle = originalTitle.slice( 0, -( ' ' + v1Suffix ).length );
						}

						// Re-register with updated title and override __experimentalLabel.
						registerBlockType( block.name, {
							...block,
							title: originalTitle + ' ' + v1Suffix,
							category: 'generateblocks-v1',
							__experimentalLabel: originalLabel
								? ( attrs, context ) => {
									const customName = attrs?.metadata?.name || '';
									if ( 'list-view' === context?.context && customName ) {
										// For custom names, don't add suffix if already present.
										return customName;
									}
									return originalLabel( attrs, context ) + ' ' + v1Suffix;
								}
								: undefined,
						} );

						// Get all variations of the v1 Blocks and update the title.
						const variations = getBlockVariations( block.name );

						if ( variations ) {
							variations.forEach( ( variation ) => {
								// Find the specific variation.
								unregisterBlockVariation( block.name, variation.name );

								// Change title of variation.
								variation.title = variation.title + ' ' + v1Suffix;

								registerBlockVariation( block.name, variation );
							} );
						}
					} else {
						/**
						 * Re-Register v2 Blocks with updated Title.
						 */
						unregisterBlockType( block.name );
						// Re-register with updated title.
						registerBlockType( block.name, {
							...block,
							title: block.title + ' ' + escapeAttribute( gbExtrasPatternInserter.v2BlockSuffix ),
						} );

						// Get all variations of the v2 Blocks and update the title.
						const variations = getBlockVariations( block.name );

						if ( variations ) {
							variations.forEach( ( variation ) => {
								// Find the specific variation.
								unregisterBlockVariation( block.name, variation.name );

								// Change title of variation.
								variation.title = variation.title + ' ' + escapeAttribute( gbExtrasPatternInserter.v2BlockSuffix );

								registerBlockVariation( block.name, variation );
							} );
						}
					}
				}
			} );

			// Mark as modified to prevent re-triggering
			hasModifiedBlocks.current = true;
		}, [ allBlocks ] );

		return null;
	},
} );
