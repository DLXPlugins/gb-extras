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
 * @param {boolean}  props.warning   - Boolean indicating warning state.
 * @return {JSX.Element|null} The RefreshCSSFilesModal component.
 */
const RefreshCSSFilesModal = ( { isOpen, onClose, isLoading, message, error, warning } ) => {
	if ( ! isOpen ) {
		return null;
	}

	// Determine message color.
	let messageColor = '#00a32a'; // Success color.
	if ( error ) {
		messageColor = '#d63638'; // Error color.
	} else if ( warning ) {
		messageColor = '#dba617'; // Warning color.
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
				<p style={ { color: messageColor } }>
					{ message }
				</p>
			) }
		</Modal>
	);
};

export default RefreshCSSFilesModal;
