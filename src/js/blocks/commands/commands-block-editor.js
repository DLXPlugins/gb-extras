/**
 * Block editor commands registration.
 */

import { registerPlugin } from '@wordpress/plugins';
import { useToggleContainerOutlinesCommand } from './components/commands/ToggleContainerOutlines';
import { useTransformV1ToV2Command } from './components/commands/TransformV1ToV2';
import { useTransformHeadingToGBTextCommand } from './components/commands/TransformHeadingToGBText';

/**
 * Commands block editor component.
 *
 * @return {JSX.Element} The CommandsBlockEditor component.
 */
const CommandsBlockEditor = () => {
	useToggleContainerOutlinesCommand();
	const transformModal = useTransformV1ToV2Command();
	const headingTransformModal = useTransformHeadingToGBTextCommand();

	// Return both modals (they handle their own visibility).
	return (
		<>
			{ transformModal }
			{ headingTransformModal }
		</>
	);
};

registerPlugin( 'dlxgb-commands-block-editor', {
	render: CommandsBlockEditor,
} );

