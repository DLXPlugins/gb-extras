import { useState } from 'react';
import { useCommand } from '@wordpress/commands';
import { registerPlugin } from '@wordpress/plugins';
import { settings, upload } from '@wordpress/icons';
import {
	Modal,
	SelectControl,
	TextControl,
	Spinner,
} from '@wordpress/components';
import SendCommand from '../utils/SendCommand';

const OutlineIcon = ( props ) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlSpace="preserve"
			width="24"
			height="24"
			viewBox="0 0 384 384"
			{ ...props }
		>
			<path fill="currentColor" d="M85.333 341.333H128V384H85.333zM256 341.333h42.667V384H256zM341.333 341.333H384V384h-42.667zM170.667 341.333h42.667V384h-42.667zM341.333 256H384v42.667h-42.667z" />
			<path fill="currentColor" d="M0 0v384h42.667V42.667H384V0zM341.333 170.667H384v42.667h-42.667z" />
			<path fill="currentColor" d="M341.333 85.333H384V128h-42.667z" />
		</svg>
	);
}

const GBCommands = () => {
	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const [ showContainerOutlines, setShowContainerOutlines ] = useState( false );
	const [ groupsLoading, setGroupsLoading ] = useState( false );
	const [ groups, setGroups ] = useState( [] );

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
		name: 'dlx-gb-hacks-Settings',
		label: 'Go to GenerateBlocks (GB) Hacks Settings',
		icon: settings,
		callback: () => {
			document.location.href = 'admin.php?page=dlx-gb-hacks';
		},
		context: 'block-editor',
	} );
	useCommand( {
		name: 'dlx-gb-hacks-toggle-container-outlines',
		label: 'Toggle Container Outlines',
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
	// useCommand( {
	// 	name: 'dlx-gb-svg-add-asset-library',
	// 	label: 'Add an SVG to the GenerateBlocks Asset Library',
	// 	icon: upload,
	// 	callback: async() => {
	// 		setIsModalOpen( true );
	// 		setGroupsLoading( true );
	// 		const response = await SendCommand(
	// 			gbHacksPatternInserter.restNonce,
	// 			{},
	// 			gbHacksPatternInserter.restUrl + '/get_asset_icon_groups',
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
