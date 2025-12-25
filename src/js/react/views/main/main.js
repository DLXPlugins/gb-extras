// eslint-disable-next-line no-unused-vars
import React, { Suspense, useState } from 'react';
import {
	ToggleControl,
	CheckboxControl,
	SelectControl,
	TextControl,
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
			saveNonce: dlxGBExtrasAdmin.saveNonce,
			resetNonce: dlxGBExtrasAdmin.resetNonce,
			enabledPostTypes: data.enabledPostTypes,
			allowedGoogleFonts: data.allowedGoogleFonts,
			enableMarkdownToHeadlineBlock: data.enableMarkdownToHeadlineBlock,
			enableV1Transformations: data.enableV1Transformations,
			enableV1Blocks: data.enableV1Blocks,
			v1CategoryLabel: data.v1CategoryLabel,
			v2CategoryLabel: data.v2CategoryLabel,
			v1BlockSuffix: data.v1BlockSuffix,
			v2BlockSuffix: data.v2BlockSuffix,
			adminMenuBar: data.adminMenuBar || {
				enabled: true,
				replaceWithFullMenu: false,
			},
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
											name="enableV1Transformations"
											control={ control }
											render={ ( { field: { onChange } } ) => (
												<ToggleControl
													label={ __( 'Enable v1 Transformations Block Command', 'gb-extras' ) }
													help={ __( 'Enable a command in the block editor to transform GenerateBlocks 1.x blocks to 2.x blocks.', 'gb-extras' ) }
													checked={ getValues( 'enableV1Transformations' ) }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
												/>
											) }
										/>
									</div>
									<div className="dlx-admin__row">
										<Controller
											name="enableV1Blocks"
											control={ control }
											render={ ( { field: { onChange } } ) => (
												<ToggleControl
													label={ __( 'Enable v1 and v2 Blocks (Both Visible)', 'gb-extras' ) }
													checked={ getValues( 'enableV1Blocks' ) }
													help={ __( 'Enable the use of v1 blocks in the block editor. This can help with the migration from GenerateBlocks 1.x to 2.x.', 'gb-extras' ) }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
												/>
											) }
										/>
									</div>
									{
										getValues( 'enableV1Blocks' ) && (
											<>
												<div className="dlx-admin__row">
													<Controller
														name="v1CategoryLabel"
														control={ control }
														render={ ( { field: { onChange } } ) => (
															<TextControl
																label={ __( 'v1 Category Label', 'gb-extras' ) }
																value={ getValues( 'v1CategoryLabel' ) }
																onChange={ ( textValue ) => {
																	onChange( textValue );
																} }
																help={ __( 'This label will be the category label for v1 blocks. These will be displayed towards the end of the category list.', 'gb-extras' ) }
															/>
														) }
													/>
												</div>
												<div className="dlx-admin__row">
													<Controller
														name="v2CategoryLabel"
														control={ control }
														render={ ( { field: { onChange } } ) => (
															<TextControl
																label={ __( 'v2 Category Label', 'gb-extras' ) }
																value={ getValues( 'v2CategoryLabel' ) }
																onChange={ ( textValue ) => {
																	onChange( textValue );
																} }
																help={ __( 'This label will be the category label for v2 blocks. These will be displayed towards the beginning of the category list.', 'gb-extras' ) }
															/>
														) }
													/>
												</div>
												<div className="dlx-admin__row">
													<Controller
														name="v1BlockSuffix"
														control={ control }
														render={ ( { field: { onChange } } ) => (
															<TextControl
																label={ __( 'v1 Block Suffix', 'gb-extras' ) }
																value={ getValues( 'v1BlockSuffix' ) }
																onChange={ ( textValue ) => {
																	onChange( textValue );
																} }
																help={ __( 'This suffix will be added to the end of the block name for v1 blocks. Leave blank to not add a suffix.', 'gb-extras' ) }
															/>
														) }
													/>
												</div>
												<div className="dlx-admin__row">
													<Controller
														name="v2BlockSuffix"
														control={ control }
														render={ ( { field: { onChange } } ) => (
															<TextControl
																label={ __( 'v2 Block Suffix', 'gb-extras' ) }
																value={ getValues( 'v2BlockSuffix' ) }
																onChange={ ( textValue ) => {
																	onChange( textValue );
																} }
																help={ __( 'This suffix will be added to the end of the block name for v2 blocks. Leave blank to not add a suffix.', 'gb-extras' ) }
															/>
														) }
													/>
												</div>
											</>
										)
									}
									<div className="dlx-admin__row">
										<Controller
											name="enableMarkdownToHeadlineBlock"
											control={ control }
											render={ ( { field: { onChange } } ) => (
												<ToggleControl
													label={ __( 'Enable Markdown to Text Block', 'gb-extras' ) }
													checked={ getValues( 'enableMarkdownToHeadlineBlock' ) }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
													} }
													help={ __( 'By default, the markdown syntax for headings creates Core heading blocks. By enabling this, the markdown will now be converted to the Text block.', 'gb-extras' ) }
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
							{
								dlxGBExtrasAdmin.isProActive && (
									<>
									</>
								)
							}
							<tr>
								<th scope="row">
									{ __( 'Admin Menu Bar', 'gb-extras' ) }
								</th>
								<td>
									<div className="dlx-admin__row">
										<Controller
											name="adminMenuBar.enabled"
											control={ control }
											render={ ( { field: { onChange, value } } ) => (
												<ToggleControl
													label={ __( 'Enable GenerateBlocks Admin Bar Menu', 'gb-extras' ) }
													checked={ value ?? true }
													onChange={ ( boolValue ) => {
														onChange( boolValue );
														// If disabling the main menu, also disable replace with full menu.
														if ( ! boolValue ) {
															setValue( 'adminMenuBar.replaceWithFullMenu', false );
														}
													} }
													help={ __( 'When disabled, all GenerateBlocks admin bar menu items will be hidden from the top toolbar.', 'gb-extras' ) }
												/>
											) }
										/>
									</div>
									{ getValues( 'adminMenuBar.enabled' ) && (
										<div className="dlx-admin__row">
											<Controller
												name="adminMenuBar.replaceWithFullMenu"
												control={ control }
												render={ ( { field: { onChange, value } } ) => (
													<ToggleControl
														label={ __( 'Replace Overlay Panels with Full GenerateBlocks Menu', 'gb-extras' ) }
														checked={ value ?? false }
														onChange={ onChange }
														help={ __( 'When enabled, replaces the Overlay Panels menu with a full GenerateBlocks menu containing Settings, Local Patterns, Global Styles, Overlay Panels, Conditions, Asset Library, and GB Extras.', 'gb-extras' ) }
													/>
												) }
											/>
										</div>
									) }
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
