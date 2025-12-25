/**
 * Modal for confirming heading block transformation.
 */

import { Modal, Button, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * TransformHeadingModal component.
 *
 * @param {Object}   props              - Component props.
 * @param {boolean}  props.isOpen       - Boolean to control modal visibility.
 * @param {Function} props.onClose      - Callback when modal is closed.
 * @param {Function} props.onConfirm    - Callback when transformation is confirmed.
 * @param {boolean}  props.transforming - Boolean indicating transformation in progress.
 * @param {number}   props.headingCount - Number of heading blocks to transform.
 * @return {JSX.Element|null} The TransformHeadingModal component.
 */
const TransformHeadingModal = ( { isOpen, onClose, onConfirm, transforming, headingCount = 0 } ) => {
	if ( ! isOpen ) {
		return null;
	}

	return (
		<Modal
			isDismissible={ true }
			shouldCloseOnClickOutside={ false }
			shouldCloseOnEsc={ true }
			onRequestClose={ onClose }
			title={ __( 'Convert Headings to GenerateBlocks Text Blocks', 'dlx-gb-extras' ) }
		>
			<p>
				{ __(
					'This will convert all core/heading blocks to GenerateBlocks v2 text blocks.',
					'dlx-gb-extras'
				) }
			</p>
			{ headingCount > 0 && (
				<p>
					{ __( 'Found ', 'dlx-gb-extras' ) }
					<strong>{ headingCount }</strong>
					{ headingCount === 1
						? __( ' heading block to convert.', 'dlx-gb-extras' )
						: __( ' heading blocks to convert.', 'dlx-gb-extras' ) }
				</p>
			) }
			<p>
				<strong>
					{ __( 'Please back up your content before converting. There is no undo for this operation.', 'dlx-gb-extras' ) }
				</strong>
			</p>
			<div style={ { display: 'flex', gap: '10px', marginTop: '20px' } }>
				<Button
					variant="primary"
					isDestructive={ true }
					onClick={ onConfirm }
					disabled={ transforming || headingCount === 0 }
					icon={ transforming ? <Spinner /> : null }
				>
					{ transforming ? __( 'Converting…', 'dlx-gb-extras' ) : __( 'Convert Headings', 'dlx-gb-extras' ) }
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

export default TransformHeadingModal;

