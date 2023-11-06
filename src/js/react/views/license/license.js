// eslint-disable-next-line no-unused-vars
import React, { Suspense, useState } from 'react';
import {
	Button,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import { useAsyncResource } from 'use-async-resource';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye as EyeIcon, faCircleCheck as CircleCheck, faKey as Key } from '@fortawesome/free-solid-svg-icons';
import { faEyeSlash as EyeSlash } from '@fortawesome/free-solid-svg-icons/faEyeSlash';
import { faCircleExclamation as CircularExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation';
import { faLoader as Loader } from '@fortawesome/pro-duotone-svg-icons/faLoader';

// Local imports.
import SendCommand from '../../utils/SendCommand';
import Notice from '../../components/Notice';

const retrieveOptions = () => {
	return SendCommand( 'dlx_gb_hacks_license_get_options', {
		nonce: dlxGBHacksLicense.getNonce,
	} );
};

const License = ( props ) => {
	const [ defaults ] = useAsyncResource(
		retrieveOptions,
		[]
	);
	return (
		<Suspense
			fallback={
				<>
					<h2>{ __( 'Loading…', 'dlx-gb-hacks' ) }</h2>
				</>
			}
		>
			<Interface defaults={ defaults } { ...props } />
		</Suspense>
	);
};

const Interface = ( props ) => {
	const { defaults } = props;
	const response = defaults();
	const { data } = response.data;

	const [ showSecret, setShowSecret ] = useState( data.licenseValid ? false : true );
	const [ licenseData, setLicenseData ] = useState( data.licenseData );
	const [ saving, setSaving ] = useState( false );
	const [ isSaved, setIsSaved ] = useState( false );
	const [ betaSaving, setBetaSaving ] = useState( false );
	const [ betaEnabled, setBetaEnabled ] = useState( data.beta );
	const [ revokingLicense, setRevokingLicense ] = useState( false );
	const [ isRevoked, setIsRevoked ] = useState( false );
	const [ validLicense, setValidLicense ] = useState( data.licenseKey );

	const hasErrors = () => {
		return Object.keys( errors ).length > 0;
	};

	const {
		control,
		handleSubmit,
		getValues,
		reset,
		setError,
		trigger,
		setValue,
	} = useForm( {
		defaultValues: {
			licenseKey: data.licenseKey,
			priceId: data.priceId,
			licenseValid: data.licenseValid,
		},
	} );


	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields } = useFormState( {
		control,
	} );
	

	const onSubmit = ( formData ) => {
		setSaving( true );
		SendCommand( 'dlx_gb_hacks_save_license', {
			nonce: dlxGBHacksLicense.saveNonce,
			formData,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;

				
				if ( ajaxSuccess ) {
					reset( ajaxData, {
						keepErrors: false,
						keepDirty: false,
					} );
					setLicenseData( ajaxData.licenseData );
					setIsSaved( true );

					// Reset count.
					setTimeout( () => {
						setIsSaved( false );
					}, 3000 );
				} else {
					// Error stuff.
					setError( 'licenseKey', {
						type: 'validate',
						message: ajaxData.message,
					} );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setSaving( false );
			} );
	};

	const revokeLicense = ( e ) => {
		setRevokingLicense( true );
		SendCommand( 'dlx_gb_hacks_revoke_license', {
			nonce: dlxGBHacksLicense.revokeNonce,
			formData: formValues,
		} )
			.then( ( ajaxResponse ) => {
				const ajaxData = ajaxResponse.data.data;
				const ajaxSuccess = ajaxResponse.data.success;
				if ( ajaxSuccess ) {
					// // Reset count.
					setIsRevoked( true );
					reset( ajaxData, {
						keepErrors: false,
						keepDirty: false,
					} );
					setTimeout( () => {
						setIsRevoked( false );
					}, 3000 );
				} else {
					setError( 'licenseKey', {
						type: 'validate',
						message: __(
							'Revoking the license resulted in an error and could not be deactivated. Please reactivate the license and try again.',
							'dlx-gb-hacks'
						),
					} );
				}
			} )
			.catch( ( ajaxResponse ) => {} )
			.then( ( ajaxResponse ) => {
				setRevokingLicense( false );
			} );
	};

	/**
	 * Retrieve a license type for a user.
	 *
	 * @return {string} License type.
	 */
	const getLicenseType = () => {
		switch ( getValues( 'priceId' ) ) {
			case '1':
				return 'Guru';
			case '2':
				return 'Freelancer';
			case '3':
				return 'Agency';
			case '4':
				return 'Unlimited';
			default:
				return 'Subscriber';
		}
	};

	/**
	 * Retrieve a license notice.
	 *
	 * @return {React.ReactElement} Notice.
	 */
	const getLicenseNotice = () => {
		if ( getValues( 'licenseValid' ) ) {
			return (
				<Notice
					message={ __( 'Your license is valid. Thank you so much for purchasing a license.', 'dlx-gb-hacks' ) }
					status="success"
					politeness="polite"
					icon={ () => <FontAwesomeIcon icon={ CircleCheck } style={ { color: 'currentColor' } } /> }
				/>
			);
		}
		return (
			<Notice
				message={ __(
					'Please enter a valid license to receive support and updates.',
					'dlx-gb-hacks'
				) }
				status="warning"
				politeness="polite"
				icon={ () => <FontAwesomeIcon icon={ Key } style={ { color: 'currentColor' } } /> }
			/>
		);
	};

	const getSaveButton = () => {
		let saveText = __( 'Save License', 'dlx-gb-hacks' );
		let saveTextLoading = __( 'Saving…', 'dlx-gb-hacks' );

		if ( ! getValues( 'licenseValid' ) ) {
			saveText = __( 'Activate License', 'dlx-gb-hacks' );
			saveTextLoading = __( 'Activating…', 'dlx-gb-hacks' );
		}
		return (
			<>
				<Button
					className={ classNames(
						'qdlx__btn qdlx__btn-primary qdlx__btn--icon-right',
						{ 'has-error': hasErrors() },
						{ 'has-icon': saving },
						{ 'is-saving': { saving } }
					) }
					type="submit"
					text={ saving ? saveTextLoading : saveText }
					icon={ saving ? <FontAwesomeIcon icon={ Loader } style={ { color: 'currentColor' } } /> : false }
					iconSize="1x"
					iconPosition="right"
					disabled={ saving || revokingLicense }
					variant="primary"
				/>
			</>
		);
	};

	return (
		<>
			<div className="dlx-gb-hacks-admin-content-heading">
				<h1><span className="dlx-gb-hacks-content-heading-text">{ __( 'License', 'dlx-gb-hacks' ) }</span></h1>
				{
					getLicenseNotice()
				}
			</div>
			{ /* eslint-disable-next-line no-unused-vars */ }
			<form onSubmit={ handleSubmit( onSubmit ) }>
				<div className="dlx-admin__license--wrapper is-required">
					<div className="dlx-admin__license--input-wrapper">
						<Controller
							name="licenseKey"
							control={ control }
							rules={ {
								required: true,
								pattern: /^[0-9A-Za-z]+$/i,
								validate: true,
							} }
							render={ ( { field: { onChange, value } } ) => (
								<TextControl
									value={ value }
									label={ __( 'License Key', 'dlx-gb-hacks' ) }
									id="search-dlx-gb-hacks-license-secret"
									className={ classNames(
										'dlx-admin__text-control-license',
										{
											'has-error':
												'pattern' === errors.licenseKey?.type ||
												'required' === errors.licenseKey?.type || 'validate' === errors.licenseKey?.type,
											'is-required': true,
										}
									) }
									onChange={ onChange }
									disabled={ getValues( 'licenseValid' ) }
									aria-required="true"
									help={ __(
										'Entering a license will enable support and updates.',
										'dlx-gb-hacks'
									) }
									type={ showSecret ? 'text' : 'password' }
								/>
							) }
						/>
						<div className="dlx-admin__license--input-preview">
							<input
								id="dlx-gb-hacks-license-show-hide"
								type="checkbox"
								aria-label={ __(
									'Click to Show or Hide the License',
									'dlx-gb-hacks'
								) }
								onClick={ () => {
									if ( showSecret ) {
										setShowSecret( false );
									} else {
										setShowSecret( true );
									}
								} }
								title={
									showSecret
										? __( 'Hide License', 'dlx-gb-hacks' )
										: __( 'Show License', 'dlx-gb-hacks' )
								}
							/>
							<label htmlFor="dlx-gb-hacks-license-show-hide not-is-required">
								<span className="dlx-gb-hacks-license-show-hide--label">
									{ __( 'Click to Show or Hide the License', 'dlx-gb-hacks' ) }
								</span>
								<span className="dlx-gb-hacks-license-show-hide--icon">
									{ ! showSecret ? (
										<Button
											label={ __( 'Show License', 'dlx-gb-hacks' ) }
											size={ 20 }
											icon={ () => <FontAwesomeIcon icon={ EyeIcon } style={ { color: 'currentColor' } } /> }
											className="button-reset"
										/>
									) : (
										<Button
											label={ __( 'Hide License', 'dlx-gb-hacks' ) }
											size={ 20 }
											icon={ () => <FontAwesomeIcon icon={ EyeSlash } style={ { color: 'currentColor' } } /> }
											className="button-reset"
										/>
									) }
								</span>
							</label>
						</div>
						{ 'required' === errors.licenseKey?.type && (
							<Notice
								message={ __( 'This field is a required field.' ) }
								status="error"
								politeness="assertive"
								inline={ true }
								icon={ () => <FontAwesomeIcon icon={ CircularExclamation } style={ { color: 'currentColor' } } /> }
							/>
						) }
						{ 'pattern' === errors.licenseKey?.type && (
							<Notice
								message={ __(
									'It appears there are invalid characters in the license.'
								) }
								status="error"
								politeness="assertive"
								inline={ true }
								icon={ () => <FontAwesomeIcon icon={ CircularExclamation } style={ { color: 'currentColor' } } /> }
							/>
						) }
						{ 'validate' === errors.licenseKey?.type && (
							<Notice
								message={ errors.licenseKey.message }
								status="error"
								politeness="assertive"
								inline={ true }
								icon={ () => <FontAwesomeIcon icon={ CircularExclamation } style={ { color: 'currentColor' } } /> }
							/>
						) }
					</div>
					<div
						className={ classNames(
							'dlx-admin__tabs--content-actions dlx-admin-buttons dlx-gb-hacks-admin-buttons',
							{
								'can-revoke': getValues( 'licenseValid' ),
							}
						) }
					>
						{ ! getValues( 'licenseValid' ) && getSaveButton() }
						{ getValues( 'licenseValid' ) && (
							<Button
								className={ classNames(
									'dlx-gbhacks__btn dlx-gbhacks__btn-danger dlx-gbhacks__btn--icon-right',
									{ 'has-icon': revokingLicense },
									{ 'is-resetting': { revokingLicense } }
								) }
								type="button"
								text={
									revokingLicense
										? __( 'Revoking License…', 'dlx-gb-hacks' )
										: __( 'Revoke License', 'dlx-gb-hacks' )
								}
								icon={ revokingLicense ? <FontAwesomeIcon icon={ Loader } style={ { color: 'currentColor' } } /> : false }
								iconSize="1x"
								iconPosition="right"
								disabled={ saving || revokingLicense }
								onClick={ ( e ) => {
									setRevokingLicense( true );
									revokeLicense( e );
								} }
								isDestructive={ true }
								variant="secondary"
							/>
						) }
					</div>
					{ hasErrors() && (
						<Notice
							message={ __(
								'There are form validation errors. Please correct them above.',
								'dlx-gb-hacks'
							) }
							status="error"
							politeness="polite"
						/>
					) }
					{ isSaved && (
						<Notice
							message={ __( 'Your settings have been saved.', 'dlx-gb-hacks' ) }
							status="success"
							politeness="assertive"
						/>
					) }
					{ isRevoked && (
						<Notice
							message={ __(
								'Your license has been deactivated for this site.',
								'dlx-gb-hacks'
							) }
							status="success"
							politeness="assertive"
						/>
					) }
				</div>
				{ getValues( 'licenseValid' ) && (
					<>
						<div className="dlx-admin-admin-panel-area">
							<div className="dlx-admin-panel-row">
								<div className="dlx-admin-admin__tabs--content-wrap">
									<div className="dlx-admin-admin__tabs--content-panel">
										<div className="dlx-admin-admin__tabs--content-heading">
											<h1>
												<span className="dlx-admin-admin__heading--text">
													{ __( 'License Information', 'dlx-gb-hacks' ) }
												</span>
											</h1>
										</div>
										<div className="dlx-admin-admin__tabs--content-inner">
											<table className="dlx-gb-hacks-table dlx-gb-hacks-table--responsive dlx-gb-hacks-table--license-ui">
												<thead>
													<tr>
														<th scope="col">{ __( 'Item Name', 'dlx-gb-hacks' ) }</th>
														<th scope="col">{ __( 'License Type', 'dlx-gb-hacks' ) }</th>
														<th scope="col">
															{ __( 'License Activations', 'dlx-gb-hacks' ) }
														</th>
														<th scope="col">{ __( 'Expires On', 'dlx-gb-hacks' ) }</th>
														<th scope="col">{ __( 'Days Left', 'dlx-gb-hacks' ) }</th>
													</tr>
												</thead>
												<tbody>
													<tr>
														<td data-header="Item Name">
															<p>{ licenseData.item_name }</p>
														</td>
														<td data-header="License Type">
															<p>{ getLicenseType() }</p>
														</td>
														<td data-header="License Activations">
															<p>
																<span className="">
																	{ licenseData.site_count } of{ ' ' }
																	{ licenseData.license_limit === 0
																		? __( 'Unlimited', 'dlx-gb-hacks' )
																		: licenseData.license_limit }
																</span>
															</p>
														</td>
														<td data-header="Expires On">
															<p>{ licenseData.expires }</p>
														</td>
														<td data-header="Days Left">
															<p>{ licenseData.expires_human_time_diff }</p>
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</>
				) }
			</form>
		</>
	);
};

export default License;
