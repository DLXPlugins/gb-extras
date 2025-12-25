/**
 * Command to refresh GenerateBlocks CSS files.
 */

import { useState } from 'react';
import { useCommand } from '@wordpress/commands';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import RefreshCSSFilesModal from '../modals/RefreshCSSFilesModal';
import GBIcon from '../icons/GBIcon';

/**
 * Hook to register the Refresh CSS Files command.
 *
 * @return {JSX.Element|null} The RefreshCSSFiles component.
 */
export function useRefreshCSSFilesCommand() {
	const [ isOpen, setIsOpen ] = useState( false );
	const [ isLoading, setIsLoading ] = useState( false );
	const [ message, setMessage ] = useState( '' );
	const [ error, setError ] = useState( false );

	useCommand( {
		name: 'dlx-gb-extras-refresh-css-files',
		label: 'GenerateBlocks: Generate CSS Files',
		keywords: [ 'generate', 'css', 'files', 'generateblocks', 'regenerate' ],
		icon: <GBIcon width="16" height="16" />,
		callback: () => {
			setIsOpen( true );
			setIsLoading( true );
			setError( false );
			setMessage( '' );

			apiFetch( {
				path: '/generateblocks/v1/regenerate_css_files',
				method: 'POST',
			} )
				.then( ( result ) => {
					setIsLoading( false );
					if ( result.success ) {
						setMessage( result.response || __( 'CSS files regenerated successfully.', 'dlx-gb-extras' ) );
						setTimeout( () => {
							setIsOpen( false );
						}, 2000 );
					} else {
						setError( true );
						setMessage( result.response || __( 'Failed to regenerate CSS files.', 'dlx-gb-extras' ) );
					}
				} )
				.catch( ( err ) => {
					setIsLoading( false );
					setError( true );
					setMessage( err.message || __( 'An error occurred while regenerating CSS files.', 'dlx-gb-extras' ) );
				} );
		},
		context: 'admin', // Works in both admin and block editor.
	} );

	return (
		<RefreshCSSFilesModal
			isOpen={ isOpen }
			onClose={ () => setIsOpen( false ) }
			isLoading={ isLoading }
			message={ message }
			error={ error }
		/>
	);
}

