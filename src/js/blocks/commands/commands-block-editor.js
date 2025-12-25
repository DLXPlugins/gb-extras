/**
 * Block editor commands registration.
 */

import { registerPlugin } from '@wordpress/plugins';
import { useToggleContainerOutlinesCommand } from './components/commands/ToggleContainerOutlines';
import { useTransformV1ToV2Command } from './components/commands/TransformV1ToV2';

/**
 * Commands block editor component.
 *
 * @return {JSX.Element|null} The CommandsBlockEditor component.
 */
const CommandsBlockEditor = () => {
	useToggleContainerOutlinesCommand();
	const transformModal = useTransformV1ToV2Command();

	return transformModal; // Return the modal if it's open, otherwise null.
};

registerPlugin( 'dlxgb-commands-block-editor', {
	render: CommandsBlockEditor,
} );

