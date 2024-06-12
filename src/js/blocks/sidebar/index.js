import { registerPlugin } from '@wordpress/plugins';
import { PluginSidebar } from '@wordpress/edit-post';
import { PanelBody } from '@wordpress/components';
import GBExtrasIcon from '../components/GBExtrasIcon';
const MySidebar = () => (
	<PluginSidebar
		name="gb-extras"
		title="GB Extras"
	>
		<PanelBody>
			asdfsadf
		</PanelBody>
	</PluginSidebar>
);

registerPlugin( 'dlx-gb-sidebar', {
	icon: <GBExtrasIcon />,
	render: MySidebar,
} );
