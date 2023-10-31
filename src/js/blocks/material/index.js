import { registerBlockType, createBlock } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import MaterialIconsLogo from '../components/icons/MaterialIconsLogo';

import Edit from './edit';

registerBlockType( metadata, {
	edit: Edit,
	save() {
		return <InnerBlocks.Content />;
	},
	icon: <MaterialIconsLogo />,
	transforms: {
		from: [
			{
				type: 'block',
				blocks: [ 'mediaron/alerts-dlx-bootstrap' ],
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
					attributes.variant = 'default';
					attributes.className = 'is-style-success';
					attributes.alertGroup = 'material';
					return createBlock( 'mediaron/alerts-dlx-material', attributes, innerBlocks );
				},
			},
		],
		to: [
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
			{
				type: 'block',
				blocks: [ 'mediaron/alerts-dlx-bootstrap' ],
				transform: ( attributes, innerBlocks ) => {
					attributes.alertType = 'success';
					attributes.variant = 'default';
					attributes.className = 'is-style-success';
					attributes.alertGroup = 'bootstrap';
					return createBlock( 'mediaron/alerts-dlx-bootstrap', attributes, innerBlocks );
				},
			},
		],
	},
} );
