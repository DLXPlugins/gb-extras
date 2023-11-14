import { useCommand } from '@wordpress/commands';
import { registerPlugin } from '@wordpress/plugins';
import { settings } from '@wordpress/icons';

const GBCommands = () => {
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
	return null;
};

registerPlugin( 'dlxgb-commands', {
	render: GBCommands,
} );
