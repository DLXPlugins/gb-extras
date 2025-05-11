import { useEffect, useState } from 'react';
import { setDefaultBlockName, cloneBlock } from '@wordpress/blocks';
import { addAction } from '@wordpress/hooks';
import { isEmpty } from '@wordpress/rich-text';
import { PluginBlockSettingsMenuItem } from '@wordpress/edit-post';
import { useSelect, useDispatch, store } from '@wordpress/data';
import { registerPlugin } from '@wordpress/plugins';
import { debounce } from '@wordpress/compose';
import uniqueId from 'lodash.uniqueid';
import './js/blocks/pattern-importer/index.js';
import './js/blocks/commands/index.js';
import ContainerLogo from './js/blocks/components/ContainerIcon.js';
import ReplaceIcon from './js/blocks/components/ReplaceIcon.js';
import { v1Blocks, v2Blocks } from './js/blocks/utils/BlockTypes.js';

let previousSelectedBlock = null;
let previousParentClientId = null;
let previousSelectedBlockIndex = null;

const UnGroupIcon = ( props ) => {
	return (
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="24" height="24" { ...props }>
			<path fill="currentColor" d="M0 64c0 29.8 20.4 54.9 48 62v100c-27.6 7.1-48 32.2-48 62 0 35.3 28.7 64 64 64 29.8 0 54.9-20.4 62-48h196c7.1 27.6 32.2 48 62 48 35.3 0 64-28.7 64-64 0-29.8-20.4-54.9-48-62V126c27.6-7.1 48-32.2 48-62 0-35.3-28.7-64-64-64-29.8 0-54.9 20.4-62 48H126C118.9 20.4 93.8 0 64 0 28.7 0 0 28.7 0 64zm322 16c5.8 22.5 23.5 40.2 46 46v100c-22.5 5.8-40.2 23.5-46 46H126c-5.8-22.5-23.5-40.2-46-46V126c22.5-5.8 40.2-23.5 46-46h196zm158 128h-16v32h50c5.8 22.5 23.5 40.2 46 46v100c-22.5 5.8-40.2 23.5-46 46H318c-5.8-22.5-23.5-40.2-46-46v-50h-32v50c-27.6 7.1-48 32.2-48 62 0 35.3 28.7 64 64 64 29.8 0 54.9-20.4 62-48h196c7.1 27.6 32.2 48 62 48 35.3 0 64-28.7 64-64 0-29.8-20.4-54.9-48-62V286c27.6-7.1 48-32.2 48-62 0-35.3-28.7-64-64-64-29.8 0-54.9 20.4-62 48h-34zm96 48a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm-32 192a32 32 0 1 1 64 0 32 32 0 1 1-64 0zm-288 32a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm96-192a32 32 0 1 1 64 0 32 32 0 1 1-64 0zM64 320a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM352 64a32 32 0 1 1 64 0 32 32 0 1 1-64 0zM64 96a32 32 0 1 1 0-64 32 32 0 1 1 0 64z" />
		</svg>
	)
};

// Run on load.
( function( wp ) {
	/**
	 * Add a toolbar option to wrap selected blocks in a container.
	 * 
	 * Updated for v2 blocks.
	 */
	registerPlugin( 'dlx-gb-extras-wrap-container', {
		render: () => {
			const [ clientIds, setClientIds ] = useState( [] );

			// Get the selected block clientIds.
			const { selectedBlocks, getMultiSelectedBlockClientIds } = useSelect( ( select ) => {
				return {
					selectedBlocks: select( 'core/block-editor' ).getMultiSelectedBlocks(),
					getMultiSelectedBlockClientIds: select( 'core/block-editor' ).getMultiSelectedBlockClientIds,
				}
			}, [] );

			const { replaceBlocks } = useDispatch( store )( 'core/block-editor' );

			useEffect( () => {
				setClientIds( selectedBlocks );
			}, [ selectedBlocks ] );

			// If no blocks are selected, return.
			if ( clientIds.length === 0 ) {
				return null;
			}

			// If more than one block is selected, add toolbar option to wrap container.
			if ( clientIds.length > 1 ) {
				return (
					<PluginBlockSettingsMenuItem
						icon={ <ContainerLogo /> }
						label="Wrap in Container"
						onClick={ () => {
							const innerBlocks = [];
							clientIds.forEach( ( clientId ) => {
								innerBlocks.push( cloneBlock( clientId ) );
							} );
							replaceBlocks(
								getMultiSelectedBlockClientIds(),
								wp.blocks.createBlock(
									'generateblocks/element', {}, innerBlocks
								)
							);
						} }
					/>
				);
			}
			return null;
		},
	} );

	// Unique ID storing.
	const uniqueIds = [];
	/**
	 * Generate New Unique IDs for selected blocks.
	 * 
	 * For v1 blocks.
	 */
	registerPlugin( 'dlx-gb-extras-generate-unique-ids', {
		render: () => {
			const selectedBlock = useSelect( ( select ) => {
				return select( 'core/block-editor' ).getSelectedBlock();
			}, [] );

			/**
			 * Return and generate a new unique ID.
			 *
			 * @param {string} clientId The client ID of the block.
			 *
			 * @return {string} The uniqueId.
			 */
			const generateUniqueId = ( clientId ) => {
				// Get the substr of current client ID for prefix.
				const prefix = clientId.substring( 2, 9 ).replace( '-', '' );
				const newUniqueId = uniqueId( prefix );

				// Make sure it isn't in the array already. Recursive much?
				if ( uniqueIds.includes( newUniqueId ) ) {
					return generateUniqueId();
				}
				return newUniqueId;
			};

			/**
			 * Replace uniqueId attribute with new uniqueId.
			 *
			 * @param {Object} block The block object.
			 */
			const replaceUniqueId = ( block ) => {
				const blockClientId = block.clientId;
				const blockAttributes = block.attributes;

				// If block has a `uniqueId` attribute, generate a new one.
				if ( 'undefined' !== typeof blockAttributes.uniqueId ) {
					const newUniqueId = generateUniqueId( blockClientId );
					wp.data.dispatch( 'core/block-editor' ).updateBlockAttributes( blockClientId, { uniqueId: newUniqueId } );
				}

				// Now check if block has innerBlocks.
				if ( 'undefined' !== typeof block.innerBlocks && block.innerBlocks.length > 0 ) {
					block.innerBlocks.forEach( ( innerBlock ) => {
						replaceUniqueId( innerBlock );
					} );
				}
			};

			/**
			 * Return early if no block is selected.
			 */
			if ( null === selectedBlock ) {
				return null;
			}

			// Get the block name.
			const { name } = selectedBlock;

			// If name contains `generateblocks`, proceed.
			if ( ! v1Blocks.includes( name ) && ! v2Blocks.includes( name ) ) {
				return null;
			}

			// If more than one block is selected, add toolbar option to replace the Unique ID.
			return (
				<PluginBlockSettingsMenuItem
					icon={ <ReplaceIcon /> }
					label="Generate New Unique IDs"
					onClick={ () => {
						replaceUniqueId( selectedBlock ); // This gets the selected block and all innerBlocks.
					} }
				/>
			);
		},
	} );

	/**
	 * Register a plugin that unwraps (flattens) a container block.
	 *
	 * Updated to use the v2 blocks.
	 */
	registerPlugin( 'dlx-gb-extras-unwrap-container', {
		render: () => {
			const selectedBlock = useSelect( ( select ) => {
				return select( 'core/block-editor' ).getSelectedBlock();
			}, [] );

			// If no block is selected, return.
			if ( null === selectedBlock ) {
				return null;
			}

			// If block is not a container, return.
			if ( selectedBlock.name !== 'generateblocks/container' && selectedBlock.name !== 'generateblocks/element' ) {
				return null;
			}

			// If block has no innerBlocks, return.
			if ( selectedBlock.innerBlocks.length === 0 ) {
				return null;
			}

			// Get the first child block.
			const firstChildBlock = selectedBlock.innerBlocks[ 0 ] || null;

			// If more than one block is selected, add toolbar option to unwrap container.
			return (
				<PluginBlockSettingsMenuItem
					icon={ <UnGroupIcon /> }
					label="Unwrap Container"
					onClick={ () => {
						const innerBlocks = selectedBlock.innerBlocks;
						wp.data.dispatch( 'core/block-editor' ).replaceBlocks( selectedBlock.clientId, innerBlocks );

						// Select the first child block in the editor.
						wp.data.dispatch( 'core/block-editor' ).selectBlock( firstChildBlock.clientId );
					} }
				/>
			);
		},
	} );

	/**
	 * Allow transform from group block.
	 *
	 * Updated for v2 blocks.
	 */
	wp.hooks.addFilter( 'blocks.registerBlockType', 'generateblocks/transform/group', ( blockSettings ) => {
		if ( blockSettings.name === 'core/group' ) {
			const transformsTo = blockSettings.transforms?.to || [];
			transformsTo.push( {
				type: 'block',
				blocks: [ 'generateblocks/element' ],
				transform: ( attributes, innerBlocks ) => {
					return wp.blocks.createBlock( 'generateblocks/element', {}, innerBlocks );
				},
			} );
			blockSettings.transforms.to = transformsTo;
		}
		return blockSettings;
	} );

	/**
	 * Allow markdown to transform to the headline (text) block.
	 *
	 * Updated for v2 blocks.
	 */
	if ( gbExtrasPatternInserter.enableMarkdownToHeadlineBlock ) {
		wp.hooks.addFilter( 'blocks.registerBlockType', 'generateblocks/transform/markdown', ( blockSettings ) => {
			if ( blockSettings.name === 'core/paragraph' || blockSettings.name === 'generateblocks/text' ) {
				const transformFrom = blockSettings.transforms?.from || [];
				transformFrom.push( {
					type: 'prefix',
					prefix: '#',
					transform: ( content ) => {
						return wp.blocks.createBlock( 'generateblocks/text', { content, tagName: 'h1' } );
					},
					priority: 1,
				} );
				transformFrom.push( {
					type: 'prefix',
					prefix: '##',
					transform: ( content ) => {
						return wp.blocks.createBlock( 'generateblocks/text', { content, tagName: 'h2' } );
					},
					priority: 1,
				} );
				transformFrom.push( {
					type: 'prefix',
					prefix: '###',
					transform: ( content ) => {
						return wp.blocks.createBlock( 'generateblocks/text', { content, tagName: 'h3' } );
					},
					priority: 1,
				} );
				transformFrom.push( {
					type: 'prefix',
					prefix: '####',
					transform: ( content ) => {
						return wp.blocks.createBlock( 'generateblocks/text', { content, tagName: 'h4' } );
					},
					priority: 1,
				} );
				transformFrom.push( {
					type: 'prefix',
					prefix: '#####',
					transform: ( content ) => {
						return wp.blocks.createBlock( 'generateblocks/text', { content, tagName: 'h5' } );
					},
					priority: 1,
				} );
				transformFrom.push( {
					type: 'prefix',
					prefix: '######',
					transform: ( content ) => {
						return wp.blocks.createBlock( 'generateblocks/text', { content, tagName: 'h6' } );
					},
					priority: 1,
				} );

				blockSettings.transforms.from = transformFrom;
			}
			return blockSettings;
		} );
	}	
}( window.wp ) );
