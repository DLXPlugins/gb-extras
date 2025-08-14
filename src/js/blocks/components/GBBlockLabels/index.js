import { useEffect, useRef } from '@wordpress/element';
import { addFilter, removeFilter } from '@wordpress/hooks';
import { useSelect, select } from '@wordpress/data';
import { registerBlockType, unregisterBlockType } from '@wordpress/blocks';
import { getBlockVariations, unregisterBlockVariation, registerBlockVariation } from '@wordpress/blocks';
import { escHtml, escapeAttribute } from '@wordpress/escape-html';
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
		settings.title = settings.title + ' ' + escapeAttribute( gbExtrasPatternInserter.v1BlockSuffix );
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

wp.domReady( () => {
	if ( 'true' !== gbExtrasPatternInserter.enableV1Blocks ) {
		return;
	}

	// Get GB 1.0 variations of the container block.
	const blockName = 'generateblocks/container';
	const variationNames = [
		'tabs',
		'accordion',
	];

	// Get all variations of the block
	const variations = getBlockVariations( blockName );

	if ( typeof variations !== 'undefined' ) {
		variationNames.forEach( ( variationName ) => {
			// Find the specific variation
			const variation = variations.find( ( v ) => v.name === variationName );

			if ( typeof variation !== 'undefined' ) {
				unregisterBlockVariation( blockName, variationName );

				// Change title of variation.
				variation.title = variation.title + ' ' + escapeAttribute( gbExtrasPatternInserter.v1BlockSuffix );

				registerBlockVariation( blockName, variation );
			}
		} );
	}
} );

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
				if ( block.name.includes( 'generateblocks' ) && ! v1Blocks.includes( block.name ) ) {
					/**
					 * Re-Register Blocks with updated v2 Title.
					 */
					unregisterBlockType( block.name );
					// Re-register with updated title
					registerBlockType( block.name, {
						...block,
						title: block.title + ' ' + escapeAttribute( gbExtrasPatternInserter.v2BlockSuffix ),
					} );

					// Get all variations of the v2 Blocks and upadate the title.
					const variations = getBlockVariations( block.name );

					variations.forEach( ( variation ) => {
						// Find the specific variation
						unregisterBlockVariation( block.name, variation.name );

						// Change title of variation.
						variation.title = variation.title + ' ' + escapeAttribute( gbExtrasPatternInserter.v2BlockSuffix );

						registerBlockVariation( block.name, variation );
					} );
				}
			} );

			// Mark as modified to prevent re-triggering
			hasModifiedBlocks.current = true;
		}, [ allBlocks ] );

		return null;
	},
} );
