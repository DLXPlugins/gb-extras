// eslint-disable-next-line no-unused-vars
import React, { Suspense, useState } from 'react';
import {
	ToggleControl,
	CheckboxControl,
	SelectControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useForm, Controller, useWatch, useFormState } from 'react-hook-form';
import { useAsyncResource } from 'use-async-resource';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation as TriangleExclamation, faCircleCheck as CircleCheck } from '@fortawesome/free-solid-svg-icons';

// Local imports.
import SendCommand from '../../utils/SendCommand';
import Notice from '../../components/Notice';
import SaveResetButtons from '../../components/SaveResetButtons';

const retrieveOptions = () => {
	return SendCommand( 'dlx_gb_extras_get_options', {
		nonce: dlxGBExtrasAdmin.getNonce,
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
					<h2>{ __( 'Loading…', 'gb-extras' ) }</h2>
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
			saveNonce: dlxGBExtrasAdmin.saveNonce,
			resetNonce: dlxGBExtrasAdmin.resetNonce,
			enabledPostTypes: data.enabledPostTypes,
			allowedGoogleFonts: data.allowedGoogleFonts,
			enableMarkdownToHeadlineBlock: data.enableMarkdownToHeadlineBlock,
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
					message={ __( 'Thank you for supporting this plugin. Your license key is active and you are receiving updates and support.', 'gb-extras' ) }
					status="success"
					politeness="assertive"
					inline={ false }
					icon={ () => <FontAwesomeIcon icon={ CircleCheck } style={ { color: 'currentColor' } } /> }
				/>
			);
		}
		return (
			<Notice
				message={ __( 'Your license key is not active. Please activate your license key to receive updates and support.', 'gb-extras' ) }
				status="warning"
				politeness="assertive"
				inline={ false }
				icon={ () => <FontAwesomeIcon size="1x" icon={ TriangleExclamation } style={ { color: 'currentColor' } } /> }
			/>
		);
	};
	return (
		<>
			<div className="dlx-gb-extras-admin-content-heading">
				<h1><span className="dlx-gb-extras-content-heading-text">{ __( 'Settings for GB Extras', 'gb-extras' ) }</span></h1>
				<p className="description">
					{
						__( 'Configure the settings below for various additions to GenerateBlocks.', 'gb-extras' )
					}
				</p>
				{
					getPrompt()
				}
			</div>
			{ /* eslint-disable-next-line no-unused-vars */ }
			<form onSubmit={ handleSubmit( ( formData ) => { } ) }>
				<div id="dlx-gb-extras-admin-table">
					<table className="form-table form-table-row-sections">
						<tbody>
							<tr>
								<th scope="row">
									{ __( 'Adobe Fonts', 'gb-extras' ) }
								</th>
								<td>
									<div className="dlx-admin__row">
										<Controller
											name="enableAdobeFonts"
											control={ control }
											render={ ( { field: { onChange } } ) => (
												<ToggleControl
													label={ __( 'Enable Adobe Fonts in the Block Editor', 'gb-extras' ) }
													checked={ getValues( 'enableAdobeFonts' ) }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'If you are using Adobe Fonts, you can display these in the block editor.', 'gb-extras' ) }
												/>
											) }
										/>
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">
									{ __( 'Block Settings', 'gb-extras' ) }
								</th>
								<td>
									<div className="dlx-admin__row">
										<Controller
											name="enableDefaultHeadlineBlock"
											control={ control }
											render={ ( { field: { onChange } } ) => (
												<ToggleControl
													label={ __( 'Enable Default Headline Block (Experimental)', 'gb-extras' ) }
													checked={ getValues( 'enableDefaultHeadlineBlock' ) }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'Enable the GenerateBlocks headline block to be the default block. This feature is still experimental, and does not support markdown.', 'gb-extras' ) }
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
																label={ __( 'Headline Block Element', 'gb-extras' ) }
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
																help={ __( 'Select the default headline block element.', 'gb-extras' ) }
															/>
														) }
													/>
												</>
											)
										}
									</div>
									<div className="dlx-admin__row">
										<Controller
											name="enableMarkdownToHeadlineBlock"
											control={ control }
											render={ ( { field: { onChange } } ) => (
												<ToggleControl
													label={ __( 'Enable Markdown to Headline Block', 'gb-extras' ) }
													checked={ getValues( 'enableMarkdownToHeadlineBlock' ) }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'By default, the markdown syntax for headings creates Core heading blocks. By enabling this, the markdown will now be converted to the Headline block.', 'gb-extras' ) }
												/>
											) }
										/>
										{
											( getValues( 'enableDefaultHeadlineBlock' ) && getValues( 'enableMarkdownToHeadlineBlock' ) ) && (
												<Notice
													message={ __( 'Markdown syntax is unavailable if the default block is set to the headline block.', 'gb-extras' ) }
													status="warning"
													politeness="assertive"
													inline={ true }
													icon={ () => <FontAwesomeIcon icon={ TriangleExclamation } style={ { color: 'currentColor' } } /> }
												/>
											)
										}
									</div>
								</td>
							</tr>
							<tr>
								<th scope="row">
									{ __( 'Post Type Styles', 'gb-extras' ) }
								</th>
								<td>
									<div className="dlx-admin__row">
										<p className="description">
											{ __( 'Select the post types that you would like to enable GenerateBlocks styles for.', 'gb-extras' ) }
										</p>
									</div>
									<div className="dlx-admin__row">
										{
											Object.values( dlxGBExtrasAdmin.postTypes ).map( ( postType ) => {
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
