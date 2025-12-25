/**
 * Modal for confirming v1 to v2 block transformation.
 */

import { Modal, Button, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * TransformV1ToV2Modal component.
 *
 * @param {Object}   props              - Component props.
 * @param {boolean}  props.isOpen       - Boolean to control modal visibility.
 * @param {Function} props.onClose      - Callback when modal is closed.
 * @param {Function} props.onConfirm    - Callback when transformation is confirmed.
 * @param {boolean}  props.transforming - Boolean indicating transformation in progress.
 * @return {JSX.Element|null} The TransformV1ToV2Modal component.
 */
const TransformV1ToV2Modal = ( { isOpen, onClose, onConfirm, transforming } ) => {
	if ( ! isOpen ) {
		return null;
	}

	return (
		<Modal
			isDismissible={ true }
			shouldCloseOnClickOutside={ false }
			shouldCloseOnEsc={ true }
			onRequestClose={ onClose }
			title="Transform v1 Blocks to v2"
		>
			<p>{ __( 'Please back up your blocks before transforming. There is no undo for this operation.', 'dlx-gb-extras' ) }</p>
			<p>{ __( 'This will convert all v1 blocks to v2 blocks.', 'dlx-gb-extras' ) }</p>
			<div style={ { display: 'flex', gap: '10px' } }>
				<Button
					variant="primary"
					isDestructive={ true }
					onClick={ onConfirm }
					help={ __( 'Please back up your blocks before transforming. There is no undo for this operation.', 'dlx-gb-extras' ) }
					disabled={ transforming }
					icon={ transforming ? <Spinner /> : null }
				>
					{ transforming ? __( 'Transforming…', 'dlx-gb-extras' ) : __( 'Transform', 'dlx-gb-extras' ) }
				</Button>
				<Button
					variant="secondary"
					onClick={ onClose }
				>
					{ __( 'Cancel', 'dlx-gb-extras' ) }
				</Button>
			</div>
		</Modal>
	);
};

export default TransformV1ToV2Modal;

