/**
 * Command to transform core/heading blocks to GenerateBlocks v2 text blocks.
 */

import { useState, useEffect } from 'react';
import { useCommand } from '@wordpress/commands';
import { heading } from '@wordpress/icons';
import { select } from '@wordpress/data';
import TransformHeadingModal from '../modals/TransformHeadingModal';
import { getAllHeadingBlocks, transformAllHeadingBlocks } from '../../utils/headingTransforms';

/**
 * Hook to register the Transform Heading to GB Text command.
 *
 * @return {JSX.Element|null} The TransformHeadingToGBText component.
 */
export function useTransformHeadingToGBTextCommand() {
	const [ headingTransformConfirmation, setHeadingTransformConfirmation ] = useState( false );
	const [ transforming, setTransforming ] = useState( false );
	const [ headingCount, setHeadingCount ] = useState( 0 );

	// Update heading count when modal opens.
	useEffect( () => {
		if ( headingTransformConfirmation ) {
			const blocks = select( 'core/block-editor' ).getBlocks();
			const headings = getAllHeadingBlocks( blocks );
			setHeadingCount( headings.length );
		}
	}, [ headingTransformConfirmation ] );

	useCommand( {
		name: 'dlx-transform-headings-to-gb-text',
		label: 'GenerateBlocks: Convert Headings to Text Blocks',
		searchLabel: 'Convert/transform all core heading blocks to GenerateBlocks v2 text blocks',
		icon: heading,
		callback: () => {
			setHeadingTransformConfirmation( true );
		},
	} );

	const handleConfirm = async() => {
		setTransforming( true );
		try {
			await transformAllHeadingBlocks();
		} catch ( error ) {
			// eslint-disable-next-line no-console
			console.error( 'Error transforming heading blocks:', error );
		} finally {
			setHeadingTransformConfirmation( false );
			setTransforming( false );
		}
	};

	return (
		<TransformHeadingModal
			isOpen={ headingTransformConfirmation }
			onClose={ () => setHeadingTransformConfirmation( false ) }
			onConfirm={ handleConfirm }
			transforming={ transforming }
			headingCount={ headingCount }
		/>
	);
}

