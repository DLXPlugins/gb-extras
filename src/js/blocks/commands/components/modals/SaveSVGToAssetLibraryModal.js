/**
 * Modal for saving SVG to asset library (currently placeholder).
 */

import { Modal, Spinner } from '@wordpress/components';

/**
 * SaveSVGToAssetLibraryModal component.
 *
 * @param {Object}   props         - Component props.
 * @param {boolean}  props.isOpen  - Boolean to control modal visibility.
 * @param {Function} props.onClose - Callback when modal is closed.
 * @return {JSX.Element|null} The SaveSVGToAssetLibraryModal component.
 */
const SaveSVGToAssetLibraryModal = ( { isOpen, onClose } ) => {
	if ( ! isOpen ) {
		return null;
	}

	return (
		<Modal
			isDismissible={ true }
			shouldCloseOnClickOutside={ false }
			shouldCloseOnEsc={ true }
			title="Save SVG to Asset Library"
			onRequestClose={ onClose }
		>
			<Spinner />
		</Modal>
	);
};

export default SaveSVGToAssetLibraryModal;

