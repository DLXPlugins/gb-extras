/**
 * Modal for refreshing CSS files.
 */

import { Modal, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/**
 * RefreshCSSFilesModal component.
 *
 * @param {Object}   props           - Component props.
 * @param {boolean}  props.isOpen    - Boolean to control modal visibility.
 * @param {Function} props.onClose   - Callback when modal is closed.
 * @param {boolean}  props.isLoading - Boolean indicating loading state.
 * @param {string}   props.message   - Message to display.
 * @param {boolean}  props.error     - Boolean indicating error state.
 * @return {JSX.Element|null} The RefreshCSSFilesModal component.
 */
const RefreshCSSFilesModal = ( { isOpen, onClose, isLoading, message, error } ) => {
	if ( ! isOpen ) {
		return null;
	}

	return (
		<Modal
			isDismissible={ ! isLoading }
			shouldCloseOnClickOutside={ false }
			onRequestClose={ () => {
				onClose();
			} }
			title={ __( 'Generate CSS Files', 'dlx-gb-extras' ) }
		>
			{ isLoading && (
				<div style={ { display: 'flex', alignItems: 'center', gap: '10px' } }>
					<Spinner />
					<p>{ __( 'Refreshing CSS files…', 'dlx-gb-extras' ) }</p>
				</div>
			) }
			{ ! isLoading && message && (
				<p style={ { color: error ? '#d63638' : '#00a32a' } }>
					{ message }
				</p>
			) }
		</Modal>
	);
};

export default RefreshCSSFilesModal;

