/**
 * Frontend commands registration.
 */
import { createRoot } from 'react-dom/client';
import { registerPlugin } from '@wordpress/plugins';
import { useToggleContainerOutlinesCommand } from './components/commands/ToggleContainerOutlines';
/**
 * Commands frontend component.
 *
 * @return {null} The CommandsFrontend component.
 */
const CommandsFrontend = () => {
	// Frontend-specific commands will go here.
	// Currently placeholder for future use.
	useToggleContainerOutlinesCommand();
	return null;
};

registerPlugin( 'dlxgb-commands-frontend', {
	render: CommandsFrontend,
} );
const rootElement = document.getElementById( 'gb-extras-commands-frontend' );
if ( rootElement ) {
	const root = createRoot( rootElement );
	root.render( <CommandsFrontend /> );
}

