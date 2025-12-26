/**
 * Command to transform core/paragraph blocks to GenerateBlocks v2 text blocks.
 */

import { useState, useEffect } from 'react';
import { useCommand } from '@wordpress/commands';
import { select } from '@wordpress/data';
import TransformParagraphModal from '../modals/TransformParagraphModal';
import { getAllParagraphBlocks, transformAllParagraphBlocks } from '../../utils/paragraphTransforms';
import GBIcon from '../icons/GBIcon';

/**
 * Hook to register the Transform Paragraph to GB Text command.
 *
 * @return {JSX.Element|null} The TransformParagraphToGBText component.
 */
export function useTransformParagraphToGBTextCommand() {
	const [ paragraphTransformConfirmation, setParagraphTransformConfirmation ] = useState( false );
	const [ transforming, setTransforming ] = useState( false );
	const [ paragraphCount, setParagraphCount ] = useState( 0 );

	// Update paragraph count when modal opens.
	useEffect( () => {
		if ( paragraphTransformConfirmation ) {
			const blocks = select( 'core/block-editor' ).getBlocks();
			const paragraphs = getAllParagraphBlocks( blocks );
			setParagraphCount( paragraphs.length );
		}
	}, [ paragraphTransformConfirmation ] );

	useCommand( {
		name: 'dlx-transform-paragraphs-to-gb-text',
		label: 'GenerateBlocks: Convert Paragraphs to Text Blocks',
		searchLabel: 'Convert/transform all core paragraph blocks to GenerateBlocks v2 text blocks',
		keywords: [ 'generateblocks', 'transform', 'convert', 'paragraph', 'text', 'block', 'core', 'p', 'bulk' ],
		icon: <GBIcon width="16" height="16" />,
		callback: () => {
			setParagraphTransformConfirmation( true );
		},
	} );

	const handleConfirm = async() => {
		setTransforming( true );
		try {
			await transformAllParagraphBlocks();
		} catch ( error ) {
			// eslint-disable-next-line no-console
			console.error( 'Error transforming paragraph blocks:', error );
		} finally {
			setParagraphTransformConfirmation( false );
			setTransforming( false );
		}
	};

	return (
		<TransformParagraphModal
			isOpen={ paragraphTransformConfirmation }
			onClose={ () => setParagraphTransformConfirmation( false ) }
			onConfirm={ handleConfirm }
			transforming={ transforming }
			paragraphCount={ paragraphCount }
		/>
	);
}

