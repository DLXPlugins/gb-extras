import { useState } from 'react';
import { useCommand } from '@wordpress/commands';
import { registerPlugin } from '@wordpress/plugins';
import { settings, upload } from '@wordpress/icons';
import { select, dispatch } from '@wordpress/data';
import { getBlockTransforms, switchToBlockType } from '@wordpress/blocks';

import {
	Modal,
	Button,
	Spinner,
} from '@wordpress/components';
import SendCommand from '../utils/SendCommand';
import { __ } from '@wordpress/i18n';
/**
 * Begin v1 legacy block modifications.
 */
const v1Blocks = [
	'generateblocks/button',
	'generateblocks/headline',
	'generateblocks/container',
	'generateblocks/grid',
	'generateblocks/image',
	'generateblocks/query-loop',
];
const v1VariationNames = [
	'tabs',
	'accordion',
];

/**
 * V2 blocks that need to be labeled.
 */
const v2Blocks = [
	'generateblocks/text',
	'generateblocks/element',
	'generateblocks/media',
	'generateblocks/shape',
	'generateblocks/query',
	'generateblocks/looper',
	'generateblocks/query-no-results',
	'generateblocks/query-page-numbers',
	'generateblocks/loop-item',
	'generateblocks-pro/accordion',
	'generateblocks-pro/accordion-item',
	'generateblocks-pro/accordion-toggle',
	'generateblocks-pro/accordion-toggle-icon',
	'generateblocks-pro/accordion-content',
	'generateblocks-pro/tabs',
	'generateblocks-pro/tabs-menu',
	'generateblocks-pro/tab-menu-item',
	'generateblocks-pro/tab-items',
	'generateblocks-pro/tab-item',
	'generateblocks/button-container',
	'generateblocks/grid',
	'generateblocks/image',
	'generateblocks/shape',
];

const v1Variations = [];
const OutlineIcon = ( props ) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlSpace="preserve"
			width="16"
			height="16"
			viewBox="0 0 384 384"
			aria-hidden="true"
			{ ...props }
		>
			<path fill="currentColor" d="M85.333 341.333H128V384H85.333zM256 341.333h42.667V384H256zM341.333 341.333H384V384h-42.667zM170.667 341.333h42.667V384h-42.667zM341.333 256H384v42.667h-42.667z" />
			<path fill="currentColor" d="M0 0v384h42.667V42.667H384V0zM341.333 170.667H384v42.667h-42.667z" />
			<path fill="currentColor" d="M341.333 85.333H384V128h-42.667z" />
		</svg>
	);
};

const GBCommands = () => {
	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const [ showContainerOutlines, setShowContainerOutlines ] = useState( false );
	const [ groupsLoading, setGroupsLoading ] = useState( false );
	const [ blockTransformConfirmation, setBlockTransformConfirmation ] = useState( false );

	/**
	 * Recursively get all blocks.
	 *
	 * @param  blocks
	 */
	const transformBlocks = ( blocks ) => {
		blocks.forEach( ( block ) => {
			// First, recursively transform children and update them before working on parent
			if ( block.innerBlocks.length > 0 ) {
				transformBlock( block );
				block.innerBlocks = select( 'core/block-editor' ).getBlock( block.clientId )?.innerBlocks || [];
				transformBlocks( block.innerBlocks );
				
			} else {
				transformBlock( block );
			}
		} );
		return blocks;
	};

	/**
	 * Transform a block.
	 *
	 * @param  block
	 */
	const transformBlock = ( block ) => {
		if ( v1Blocks.includes( block.name ) || v1VariationNames.includes( block.name ) ) {
			// Get transform options for the block.
			const transformOptions = getBlockTransforms( 'to', block.name );
			if ( transformOptions ) {
				transformOptions.forEach( ( transform ) => {
					// Has transform.blocks, which is an array of blocks it can transform to.
					if ( transform.blocks ) {
						transform.blocks.forEach( ( transformBlockName ) => {
							if ( v2Blocks.includes( transformBlockName ) ) {
								// Now do the transform.
								const result = transform.transform( block.attributes, block.innerBlocks );
								if ( result ) {
									dispatch( 'core/block-editor' ).replaceBlocks( [ block.clientId ], result );
								} else {
									console.error( 'Failed to transform', block.name, 'to', transformBlockName );
								}
							}
						} );
					}
				} );
			}
		}
	}
	useCommand( {
		name: 'dlx-gb-admin-settings',
		label: 'Go to GenerateBlocks Settings',
		icon: settings,
		callback: () => {
			document.location.href = 'admin.php?page=generateblocks-settings';
		},
		context: 'block-editor',
	} );
	useCommand( {
		name: 'dlx-gb-local-patterns',
		label: 'Go to GenerateBlocks Local Patterns',
		icon: settings,
		callback: () => {
			document.location.href = 'edit.php?post_type=gblocks_templates';
		},
		context: 'block-editor',
	} );
	useCommand( {
		name: 'dlx-gb-global-styles',
		label: 'Go to GenerateBlocks Global Styles',
		icon: settings,
		callback: () => {
			document.location.href = 'edit.php?post_type=gblocks_templates';
		},
		context: 'block-editor',
	} );
	useCommand( {
		name: 'dlx-gb-extras-Settings',
		label: 'Go to GenerateBlocks (GB) Hacks Settings',
		icon: settings,
		callback: () => {
			document.location.href = 'admin.php?page=dlx-gb-extras';
		},
		context: 'block-editor',
	} );
	useCommand( {
		name: 'dlx-gb-extras-toggle-container-outlines',
		label: 'Toggle Container Block Outlines',
		icon: <OutlineIcon />,
		callback: ( { close } ) => {
			const selector = '.gb-container[data-type="generateblocks/container"]';
			const containerOutlines = document.querySelectorAll( selector );
			if ( showContainerOutlines ) {
				containerOutlines.forEach( ( container ) => {
					container.classList.remove( 'dlx-gb-outline' );
				} );
				setShowContainerOutlines( false );
			} else {
				setShowContainerOutlines( true );
				containerOutlines.forEach( ( container ) => {
					container.classList.add( 'dlx-gb-outline' );
				} );
			}
			close();
		},
		context: 'block-editor',
	} );
	useCommand( {
		name: 'dlx-transform-v1-blocks-to-v2',
		label: 'GenerateBlocks: Transform V1 Blocks to V2',
		icon: settings,
		callback: () => {
			setBlockTransformConfirmation( true );
		},
	} );
	// useCommand( {
	// 	name: 'dlx-gb-svg-add-asset-library',
	// 	label: 'Add an SVG to the GenerateBlocks Asset Library',
	// 	icon: upload,
	// 	callback: async() => {
	// 		setIsModalOpen( true );
	// 		setGroupsLoading( true );
	// 		const response = await SendCommand(
	// 			gbExtrasPatternInserter.restNonce,
	// 			{},
	// 			gbExtrasPatternInserter.restUrl + '/get_asset_icon_groups',
	// 			'get'
	// 		);
	// 		// Extract out data.
	// 		const { data, success } = response.data;
	// 		if ( success ) {
	// 			setGroups( data.groups );
	// 		}
	// 		setGroupsLoading( false );
	// 	},
	// 	context: 'block-editor',
	// } );

	// const getGroups = () => {

	// }
	if ( blockTransformConfirmation ) {
		return (
			<Modal
				isDismissible={ true }
				shouldCloseOnClickOutside={ false }
				shouldCloseOnEsc={ true }
				title="Transform V1 Blocks to V2"
			>
				<p>Are you sure you want to transform all V1 blocks to V2?</p>
				<Button variant="primary" onClick={ () => {
					// Let's get all the blocks, and let's parse until infinity.
					transformBlocks( select( 'core/block-editor' ).getBlocks() );

					setBlockTransformConfirmation( false );
				} }>
					{ __( 'Transform', 'dlx-gb-extras' ) }
				</Button>
				<Button variant="secondary" onClick={ () => {
					setBlockTransformConfirmation( false );
				} }>
					{ __( 'Cancel', 'dlx-gb-extras' ) }
				</Button>
			</Modal>
		);
	}
	return (
		<>
			{ isModalOpen && (
				<Modal
					isDismissible={ true }
					shouldCloseOnClickOutside={ false }
					shouldCloseOnEsc={ true }
					title="Save SVG to Asset Library"
					onRequestClose={ () => {
						setIsModalOpen( false );
					} }
				>
					{ groupsLoading && (
						<>
							<Spinner />
						</>
					) }
				</Modal>
			) }
		</>
	);
};

registerPlugin( 'dlxgb-commands', {
	render: GBCommands,
} );
