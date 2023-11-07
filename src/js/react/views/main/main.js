// eslint-disable-next-line no-unused-vars
import React, { Suspense, useState } from 'react';
import {
	ToggleControl,
	TextControl,
	CheckboxControl,
	ComboboxControl,
	BaseControl,
	SelectControl,
	PanelBody,
	Button,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import { useAsyncResource } from 'use-async-resource';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation as TriangleExclamation, faCircleCheck as CircleCheck, faEye, faExternalLink as ExternalLink } from '@fortawesome/free-solid-svg-icons';
import { faCircleExclamation as CircularExclamation } from '@fortawesome/free-solid-svg-icons/faCircleExclamation';
import classNames from 'classnames';

// Local imports.
import SendCommand from '../../utils/SendCommand';
import Notice from '../../components/Notice';
import SaveResetButtons from '../../components/SaveResetButtons';
import gfontJson from '../../google-fonts.json';

const gfontJsonArr = [];
for ( const [ key, value ] of Object.entries( gfontJson ) ) {
	gfontJsonArr.push( { label: key, value: key } );
}

const retrieveOptions = () => {
	return SendCommand( 'dlx_gb_hacks_get_options', {
		nonce: dlxGBHacksAdmin.getNonce,
	} );
};

const Main = ( props ) => {
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

	const [ licenseValid ] = useState( data.licenseValid );
	const [ currentGoogleFont, setCurrentGoogleFont ] = useState( '' );
	const [ comboxFormValue, setComboboxFormValue ] = useState( '' );
	const [ comboboxRef, setComboboxRef ] = useState( null );

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
			enableAdobeFonts: data.enableAdobeFonts,
			enableDefaultHeadlineBlock: data.enableDefaultHeadlineBlock,
			headlineBlockElement: data.headlineBlockElement,
			saveNonce: dlxGBHacksAdmin.saveNonce,
			resetNonce: dlxGBHacksAdmin.resetNonce,
			enabledPostTypes: data.enabledPostTypes,
			allowedGoogleFonts: data.allowedGoogleFonts,
		},
	} );
	const formValues = useWatch( { control } );
	const { errors, isDirty, dirtyFields } = useFormState( {
		control,
	} );

	// Retrieve a prompt based on the license status.
	const getPrompt = () => {
		// Check to see if the license nag is disabled.
		if ( 'valid' === licenseValid && ! getValues( 'enableLicenseAlerts' ) ) {
			return null;
		}
		if ( 'valid' === licenseValid ) {
			return (
				<Notice
					message={ __( 'Thank you for supporting this plugin. Your license key is active and you are receiving updates and support.', 'dlx-gb-hacks' ) }
					status="success"
					politeness="assertive"
					inline={ false }
					icon={ () => <FontAwesomeIcon icon={ CircleCheck } style={ { color: 'currentColor' } } /> }
				/>
			);
		}
		return (
			<Notice
				message={ __( 'Your license key is not active. Please activate your license key to receive updates and support.', 'dlx-gb-hacks' ) }
				status="warning"
				politeness="assertive"
				inline={ false }
				icon={ () => <FontAwesomeIcon size="1x" icon={ TriangleExclamation } style={ { color: 'currentColor' } } /> }
			/>
		);
	};
	return (
		<>
			<div className="dlx-gb-hacks-admin-content-heading">
				<h1><span className="dlx-gb-hacks-content-heading-text">{ __( 'Settings for GB Hacks', 'dlx-gb-hacks' ) }</span></h1>
				<p className="description">
					{
						__( 'Configure the settings below for various additions to GenerateBlocks.', 'dlx-gb-hacks' )
					}
				</p>
				{
					getPrompt()
				}
			</div>
			{ /* eslint-disable-next-line no-unused-vars */ }
			<form onSubmit={ handleSubmit( ( formData ) => { } ) }>
				<div id="dlx-gb-hacks-admin-table">
					<table className="form-table form-table-row-sections">
						<tbody>
							<tr>
								<th scope="row">
									{ __( 'Adobe Fonts', 'dlx-gb-hacks' ) }
								</th>
								<td>
									<div className="dlx-admin__row">
										<Controller
											name="enableAdobeFonts"
											control={ control }
											render={ ( { field: { onChange } } ) => (
												<ToggleControl
													label={ __( 'Enable Adobe Fonts in the Block Editor', 'dlx-gb-hacks' ) }
													checked={ getValues( 'enableAdobeFonts' ) }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'If you are using Adobe Fonts, you can display these in the block editor.', 'dlx-gb-hacks' ) }
												/>
											) }
										/>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">
									{ __( 'Block Settings', 'dlx-gb-hacks' ) }
								</th>
								<td>
									<div className="dlx-admin__row">
										<Controller
											name="enableDefaultHeadlineBlock"
											control={ control }
											render={ ( { field: { onChange } } ) => (
												<ToggleControl
													label={ __( 'Enable Default Headline Block', 'dlx-gb-hacks' ) }
													checked={ getValues( 'enableDefaultHeadlineBlock' ) }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'Enable the GenerateBlocks headline block to be the default block.', 'dlx-gb-hacks' ) }
												/>
											) }
										/>
										{
											getValues( 'enableDefaultHeadlineBlock' ) && (
												<>
													<Controller
														name="headlineBlockElement"
														control={ control }
														render={ ( { field: { onChange } } ) => (
															<SelectControl
																label={ __( 'Headline Block Element', 'dlx-gb-hacks' ) }
																value={ getValues( 'headlineBlockElement' ) }
																onChange={ ( value ) => {
																	onChange( value );
																} }
																options={ [
																	{ label: 'h1', value: 'h1' },
																	{ label: 'h2', value: 'h2' },
																	{ label: 'h3', value: 'h3' },
																	{ label: 'h4', value: 'h4' },
																	{ label: 'h5', value: 'h5' },
																	{ label: 'h6', value: 'h6' },
																	{ label: 'div', value: 'div' },
																	{ label: 'p', value: 'p' },
																] }
																help={ __( 'Select the default headline block element.', 'dlx-gb-hacks' ) }
															/>
														) }
													/>
												</>
											)
										}
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">
									{ __( 'Post Type Styles', 'dlx-gb-hacks' ) }
								</th>
								<td>
									<div className="dlx-admin__row">
										<p className="description">
											{ __( 'Select the post types that you would like to enable GenerateBlocks styles for.', 'dlx-gb-hacks' ) }
										</p>
									</div>
									<div className="dlx-admin__row">
										{
											Object.values( dlxGBHacksAdmin.postTypes ).map( ( postType ) => {
												const postTypeSlug = postType.name;
												const enabledPostTypes = getValues( 'enabledPostTypes' );
												const checked = enabledPostTypes && enabledPostTypes[ postTypeSlug ] ? true : false;
												return (
													<Controller
														key={ postTypeSlug }
														name={ `enabledPostTypes[${ postTypeSlug }]` }
														control={ control }
														render={ ( { field: { onChange } } ) => (
															<CheckboxControl
																label={ postType.label }
																className="dlx-admin__checkbox-control"
																checked={ getValues( `enabledPostTypes[${ postTypeSlug }]` ) ?? false }
																onChange={ ( boolValue ) => {
																	setValue( `enabledPostTypes[${ postTypeSlug }]`, boolValue );
																	onChange( boolValue );
																} }
															/>
														) }
													/>
												);
											} )
										}
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<SaveResetButtons
						formValues={ formValues }
						setError={ setError }
						reset={ reset }
						errors={ errors }
						isDirty={ isDirty }
						dirtyFields={ dirtyFields }
						trigger={ trigger }
					/>
				</div>
			</form>
		</>
	);
};

export default Main;
