/**
 * Modal for confirming paragraph block transformation.
 */

import { Modal, Button, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * TransformParagraphModal component.
 *
 * @param {Object}   props              - Component props.
 * @param {boolean}  props.isOpen       - Boolean to control modal visibility.
 * @param {Function} props.onClose      - Callback when modal is closed.
 * @param {Function} props.onConfirm    - Callback when transformation is confirmed.
 * @param {boolean}  props.transforming - Boolean indicating transformation in progress.
 * @param {number}   props.paragraphCount - Number of paragraph blocks to transform.
 * @return {JSX.Element|null} The TransformParagraphModal component.
 */
const TransformParagraphModal = ( { isOpen, onClose, onConfirm, transforming, paragraphCount = 0 } ) => {
	if ( ! isOpen ) {
		return null;
	}

	return (
		<Modal
			isDismissible={ true }
			shouldCloseOnClickOutside={ false }
			shouldCloseOnEsc={ true }
			onRequestClose={ onClose }
			title={ __( 'Convert Paragraphs to GenerateBlocks Text Blocks', 'dlx-gb-extras' ) }
		>
			<p>
				{ __(
					'This will convert all core/paragraph blocks to GenerateBlocks v2 text blocks with element set to paragraph.',
					'dlx-gb-extras'
				) }
			</p>
			{ paragraphCount > 0 && (
				<>
					<p>
						{ __( 'Found ', 'dlx-gb-extras' ) }
						<strong>{ paragraphCount }</strong>
						{ paragraphCount === 1
							? __( ' paragraph block to convert.', 'dlx-gb-extras' )
							: __( ' paragraph blocks to convert.', 'dlx-gb-extras' ) }
					</p>
					<p>
						<strong>
							{ __( 'Please back up your content before converting. There is no undo for this operation.', 'dlx-gb-extras' ) }
						</strong>
					</p>
				</>
			) }
			{
				paragraphCount === 0 && (
					<p>
						{ __( 'No paragraph blocks found to convert.', 'dlx-gb-extras' ) }
					</p>
				)
			}
			<div style={ { display: 'flex', gap: '10px', marginTop: '20px' } }>
				<Button
					variant="primary"
					isDestructive={ true }
					onClick={ onConfirm }
					disabled={ transforming || paragraphCount === 0 }
					icon={ transforming ? <Spinner /> : null }
				>
					{ transforming ? __( 'Converting…', 'dlx-gb-extras' ) : __( 'Convert Paragraphs', 'dlx-gb-extras' ) }
				</Button>
				<Button
					variant="secondary"
					onClick={ onClose }
					disabled={ transforming }
				>
					{ __( 'Cancel', 'dlx-gb-extras' ) }
				</Button>
			</div>
		</Modal>
	);
};

export default TransformParagraphModal;

