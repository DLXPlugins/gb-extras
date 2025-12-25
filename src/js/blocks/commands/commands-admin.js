/**
 * Admin-wide commands registration.
 */

import { createRoot } from 'react-dom/client';
import { registerPlugin } from '@wordpress/plugins';

/**
 * Shared function to register all commands.
 *
 * @return {void}
 */
const registerCommands = () => {
	// todo - add commands here
	return null;
};

// Works in the block editor.
registerPlugin( 'dlxgb-commands-admin', {
	render: () => {
		registerCommands();
		return null;
	},
} );

// Works in the admin area (non-block editor).
const CommandsAdmin = () => {
	registerCommands();
	return null;
};

// Attach to admin footer div.
const rootElement = document.getElementById( 'gb-extras-commands-admin' );
if ( rootElement ) {
	const root = createRoot( rootElement );
	root.render( <CommandsAdmin /> );
}

