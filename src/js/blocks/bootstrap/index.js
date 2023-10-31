import { registerBlockType, createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import BootstrapLogo from '../components/icons/BootstrapLogo';
import Edit from './edit';

registerBlockType( metadata, {
	edit: Edit,
	save() {
		return <InnerBlocks.Content />;
	},
	icon: <BootstrapLogo />,
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'mediaron/alerts-dlx-chakra' ],
				transform: ( attributes, innerBlocks ) => {
					attributes.alertType = 'success';
					attributes.variant = 'default';
					attributes.className = 'is-style-success';
					attributes.alertGroup = 'bootstrap';
					return createBlock( 'mediaron/alerts-dlx-bootstrap', attributes, innerBlocks );
				},
			},
			{
				type: 'block',
				blocks: [ 'mediaron/alerts-dlx-material' ],
				transform: ( attributes, innerBlocks ) => {
					attributes.alertType = 'success';
					attributes.variant = 'default';
					attributes.className = 'is-style-success';
					attributes.alertGroup = 'bootstrap';
					return createBlock( 'mediaron/alerts-dlx-bootstrap', attributes, innerBlocks );
				},
			},
		],
		to: [
			{
				type: 'block',
				blocks: [ 'mediaron/alerts-dlx-material' ],
				transform: ( attributes, innerBlocks ) => {
					attributes.alertType = 'success';
					attributes.variant = 'default';
					attributes.className = 'is-style-success';
					attributes.alertGroup = 'material';
					return createBlock( 'mediaron/alerts-dlx-material', attributes, innerBlocks );
				},
			},
			{
				type: 'block',
				blocks: [ 'mediaron/alerts-dlx-chakra' ],
				transform: ( attributes, innerBlocks ) => {
					attributes.alertType = 'success';
					attributes.variant = 'subtle';
					attributes.className = 'is-style-success';
					attributes.alertGroup = 'chakra';
					return createBlock( 'mediaron/alerts-dlx-chakra', attributes, innerBlocks );
				},
			},
		],
	},
} );
