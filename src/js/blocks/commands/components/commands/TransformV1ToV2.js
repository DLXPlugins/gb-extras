/**
 * Command to transform v1 blocks to v2.
 */

import { useState } from 'react';
import { useCommand } from '@wordpress/commands';
import { replace } from '@wordpress/icons';
import { select } from '@wordpress/data';
import TransformV1ToV2Modal from '../modals/TransformV1ToV2Modal';
import { getBlockNestingLevel } from '../../utils/blockNesting';
import { transformBlocks } from '../../utils/blockTransforms';

/**
 * Hook to register the Transform V1 to V2 command.
 *
 * @return {JSX.Element|null} The TransformV1ToV2 component.
 */
export function useTransformV1ToV2Command() {
	const [ blockTransformConfirmation, setBlockTransformConfirmation ] = useState( false );
	const [ transforming, setTransforming ] = useState( false );
	useCommand( {
		name: 'dlx-transform-v1-blocks-to-v2',
		label: 'GenerateBlocks: Convert v1 Blocks to v2 (Experimental)',
		searchLabel: 'Transform/convert all GB GenerateBlocks V1 Blocks to V2 (Experimental)',
		icon: replace,
		callback: () => {
			setBlockTransformConfirmation( true );
		},
		disabled:
			typeof gbExtrasPatternInserter !== 'undefined' &&
			'false' === ( gbExtrasPatternInserter.enableV1Transformations || 'false' ),
	} );

	const handleConfirm = async() => {
		const nestingLevel = getBlockNestingLevel();
		setTransforming( true );
		for ( let i = 0; i < nestingLevel; i++ ) {
			await transformBlocks( select( 'core/block-editor' ).getBlocks() );
		}

		setBlockTransformConfirmation( false );
		setTransforming( false );
	};

	return (
		<TransformV1ToV2Modal
			isOpen={ blockTransformConfirmation }
			onClose={ () => setBlockTransformConfirmation( false ) }
			onConfirm={ handleConfirm }
			transforming={ transforming }
		/>
	);
}

