/**
 * Frontend commands registration.
 */
import { createRoot } from 'react-dom/client';
import { registerPlugin } from '@wordpress/plugins';
import { useRefreshCSSFilesCommand } from './components/commands/RefreshCSSFiles';

/**
 * Commands frontend component.
 *
 * @return {JSX.Element|null} The CommandsFrontend component.
 */
const CommandsFrontend = () => {
	const refreshCSSFilesModal = useRefreshCSSFilesCommand();
	return refreshCSSFilesModal;
};

registerPlugin( 'dlxgb-commands-frontend', {
	render: CommandsFrontend,
} );
const rootElement = document.getElementById( 'gb-extras-commands-frontend' );
if ( rootElement ) {
	const root = createRoot( rootElement );
	root.render( <CommandsFrontend /> );
}

