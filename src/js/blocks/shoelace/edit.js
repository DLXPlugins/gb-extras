/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/**
 * External dependencies
 */

import classnames from 'classnames';

import { useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	PanelRow,
	ToggleControl,
	TextControl,
	Button,
	ButtonGroup,
	RangeControl,
	BaseControl,
} from '@wordpress/components';

import { rawHandler } from '@wordpress/blocks';
import { useDispatch } from '@wordpress/data';

import {
	InspectorControls,
	RichText,
	useBlockProps,
	useInnerBlocksProps,
	store,
} from '@wordpress/block-editor';

import { useInstanceId } from '@wordpress/compose';

import AlertButton from '../components/AlertButton';
import UnitChooser from '../components/unit-picker';
import IconPicker from '../components/IconPicker';
import BootstrapIcons from '../components/icons/BootstrapIcons';

const ShoelaceAlerts = ( props ) => {
	const generatedUniqueId = useInstanceId(
		ShoelaceAlerts,
		'adlx-shoelace'
	);

	const innerBlocksRef = useRef( null );
	const innerBlockProps = useInnerBlocksProps(
		{
			className: 'alerts-dlx-content',
			ref: innerBlocksRef,
		},
		{
			allowedBlocks: [ 'core/paragraph' ],
			template: [ [ 'core/paragraph', { placeholder: '' } ] ],
		}
	);
	const { replaceInnerBlocks } = useDispatch( store );

	// Shortcuts.
	const { attributes, setAttributes, clientId } = props;

	const {
		uniqueId,
		alertType,
		alertTitle,
		alertDescription,
		buttonEnabled,
		maximumWidthUnit,
		maximumWidth,
		icon,
		descriptionEnabled,
		titleEnabled,
		iconEnabled,
		className,
		baseFontSize,
		enableCustomFonts,
		variant,
		iconVerticalAlignment,
		mode,
	} = attributes;

	/**
	 * Migrate RichText to InnerBlocks.
	 */
	useEffect( () => {
		// Port shareText attribute to use innerBlocks instead.
		if ( alertDescription !== '' && null !== innerBlocksRef.current ) {
			// Convert text over to blocks.
			const richTextConvertedToBlocks = rawHandler( { HTML: alertDescription } );
			replaceInnerBlocks( clientId, richTextConvertedToBlocks );
			setAttributes( { alertDescription: '' } );
		}
	}, [ innerBlocksRef ] );

	const inspectorControls = (
		<>
			<PanelBody initialOpen={ true } title={ __( 'Appearance', 'quotes-dlx' ) }>
				<>
					<UnitChooser
						label={ __( 'Maximum Width', 'quotes-dlx' ) }
						value={ maximumWidthUnit }
						units={ [ 'px', '%', 'vw' ] }
						onClick={ ( value ) => {
							setAttributes( {
								maximumWidthUnit: value,
							} );
						} }
					/>

					<TextControl
						type={ 'text' }
						value={ maximumWidth }
						onChange={ ( value ) => {
							setAttributes( {
								maximumWidth: value,
							} );
						} }
					/>
				</>
				<PanelRow>
					<BaseControl id="alerts-dlx-variants-button-group" label={ __( 'Set the Alert Variant', 'quotes-dlx' ) } className="alerts-dlx-shoelace-variants">
						<ButtonGroup>
							<Button
								variant={ variant === 'top-accent' ? 'primary' : 'secondary' }
								onClick={ ( e ) => {
									setAttributes( {
										variant: 'top-accent',
									} );
								} }
							>
								{ __( 'Top Accent', 'alerts-dlx' ) }
							</Button>
							<Button
								variant={ variant === 'left-accent' ? 'primary' : 'secondary' }
								onClick={ ( e ) => {
									setAttributes( {
										variant: 'left-accent',
									} );
								} }
							>
								{ __( 'Left Accent', 'alerts-dlx' ) }
							</Button>
							<Button
								variant={ variant === 'solid' ? 'primary' : 'secondary' }
								onClick={ ( e ) => {
									setAttributes( {
										variant: 'solid',
									} );
								} }
							>
								{ __( 'Solid', 'alerts-dlx' ) }
							</Button>
							<Button
								variant={ variant === 'centered' ? 'primary' : 'secondary' }
								onClick={ ( e ) => {
									setAttributes( {
										variant: 'centered',
									} );
								} }
							>
								{ __( 'Centered', 'alerts-dlx' ) }
							</Button>
						</ButtonGroup>
					</BaseControl>
				</PanelRow>
				<PanelRow>
					<BaseControl id="alerts-dlx-mode-button-group" label={ __( 'Set Light or Dark Mode', 'quotes-dlx' ) } className="alerts-dlx-shoelace-mode">
						<ButtonGroup>
							<Button
								variant={ mode === 'light' ? 'primary' : 'secondary' }
								onClick={ ( e ) => {
									setAttributes( {
										mode: 'light',
									} );
								} }
							>
								{ __( 'Light Mode', 'alerts-dlx' ) }
							</Button>
							<Button
								variant={ mode === 'dark' ? 'primary' : 'secondary' }
								onClick={ ( e ) => {
									setAttributes( {
										mode: 'dark',
									} );
								} }
							>
								{ __( 'Dark Mode', 'alerts-dlx' ) }
							</Button>
						</ButtonGroup>
					</BaseControl>
				</PanelRow>
				{ ( iconEnabled && 'centered' !== variant && 'left-accent' !== variant ) && (
					<PanelRow>
						<BaseControl id="alerts-dlx-button-group-icon-alignment" label={ __( 'Icon Vertical Alignment', 'quotes-dlx' ) } className="alerts-dlx-material-variants">
							<ButtonGroup>
								<Button
									variant={ iconVerticalAlignment === 'top' ? 'primary' : 'secondary' }
									onClick={ ( e ) => {
										setAttributes( {
											iconVerticalAlignment: 'top',
										} );
									} }
								>
									{ __( 'Top', 'alerts-dlx' ) }
								</Button>
								<Button
									variant={ iconVerticalAlignment === 'centered' ? 'primary' : 'secondary' }
									onClick={ ( e ) => {
										setAttributes( {
											iconVerticalAlignment: 'centered',
										} );
									} }
								>
									{ __( 'Centered', 'alerts-dlx' ) }
								</Button>
							</ButtonGroup>
						</BaseControl>
					</PanelRow>
				) }
				<PanelRow>
					<RangeControl
						label={ __( 'Set the Base Font Size', 'alerts-dlx' ) }
						step={ 1 }
						value={ baseFontSize }
						max={ 36 }
						min={ 12 }
						currentInput={ 16 }
						initialPosition={ 16 }
						allowReset={ true }
						onChange={ ( fontSizeValue ) => {
							setAttributes( {
								baseFontSize: fontSizeValue,
							} );
						} }
						help={ __( 'Set the base font size for the alert.', 'alerts-dlx' ) }
					/>
				</PanelRow>
			</PanelBody>
			<PanelBody initialOpen={ false } title={ __( 'Alert Settings', 'quotes-dlx' ) }>
				<>
					<PanelRow>
						<ToggleControl
							label={ __( 'Enable Alert Icon', 'alerts-dlx' ) }
							checked={ iconEnabled }
							onChange={ ( value ) => {
								setAttributes( {
									iconEnabled: value,
								} );
							} }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Enable Title', 'alerts-dlx' ) }
							checked={ titleEnabled }
							onChange={ ( value ) => {
								setAttributes( {
									titleEnabled: value,
								} );
							} }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Enable Alert Description', 'alerts-dlx' ) }
							checked={ descriptionEnabled }
							onChange={ ( value ) => {
								setAttributes( {
									descriptionEnabled: value,
								} );
							} }
						/>
					</PanelRow>
					<PanelRow>
						<ToggleControl
							label={ __( 'Enable Alert Button', 'alerts-dlx' ) }
							checked={ buttonEnabled }
							onChange={ ( value ) => {
								setAttributes( {
									buttonEnabled: value,
								} );
							} }
						/>
					</PanelRow>
				</>
			</PanelBody>
		</>
	);

	useEffect( () => {
		setAttributes( { uniqueId: generatedUniqueId } );
	}, [] );

	/**
	 * Attempt to check when block styles are changed.
	 */
	useEffect( () => {
		if ( undefined === className ) {
			return;
		}

		const styleMatch = new RegExp( /is-style-([^\s]*)/g ).exec( className );
		if ( null !== styleMatch ) {
			const match = styleMatch[ 1 ];
			setAttributes( { alertType: match } );
		}
	}, [ className ] );

	const getIconSets = () => {
		return BootstrapIcons;
	};

	// Calculate max width.
	const maxWidthStyle = {
		maxWidth: maximumWidth + maximumWidthUnit,
	};
	const baseFontSizeStyles = `#${ uniqueId } { font-size: ${ parseInt( baseFontSize ) }px; }`;
	const block = (
		<>
			<InspectorControls>{ inspectorControls }</InspectorControls>
			<style>{ baseFontSizeStyles }</style>
			<figure
				role="alert"
				className={ classnames( 'alerts-dlx-alert alerts-dlx-shoelace', {
					'alerts-dlx-has-icon': iconEnabled,
					'alerts-dlx-has-description': descriptionEnabled,
					'alerts-dlx-has-button': buttonEnabled,
				} ) }
				style={ maxWidthStyle }
				id={ uniqueId }
			>
				{ iconEnabled && (
					<div className="alerts-dlx-icon" aria-hidden="true">
						<IconPicker
							defaultSvg={ icon }
							setAttributes={ setAttributes }
							alertType={ alertType }
							icons={ getIconSets() }
						/>
					</div>
				) }
				<figcaption>
					{ titleEnabled && (
						<RichText
							tagName="h2"
							placeholder={ __( 'Alert title', 'quotes-dlx' ) }
							value={ alertTitle }
							className="alerts-dlx-title"
							disableLineBreaks={ true }
							allowedFormats={ [] }
							onChange={ ( value ) => {
								setAttributes( { alertTitle: value } );
							} }
						/>
					) }
					<div className="alerts-dlx-content-wrapper">
						{ descriptionEnabled && (
							<div { ...innerBlockProps } />
						) }
						{ buttonEnabled && (
							<AlertButton
								attributes={ attributes }
								setAttributes={ setAttributes }
							/>
						) }
					</div>
				</figcaption>
			</figure>
		</>
	);

	const blockProps = useBlockProps( {
		className: classnames( className, `alerts-dlx template-shoelace is-style-${ alertType }`, {
			'custom-fonts-enabled': enableCustomFonts,
			'is-appearance-left-accent': 'left-accent' === variant,
			'is-appearance-top-accent': 'top-accent' === variant,
			'is-appearance-default': 'default' === variant,
			'is-appearance-centered': 'centered' === variant,
			'is-appearance-solid': 'solid' === variant,
			'icon-vertical-align-top': 'top' === iconVerticalAlignment,
			'icon-vertical-align-centered': 'centered' === iconVerticalAlignment,
			'is-dark-mode': 'dark' === mode,
		} ),
	} );

	return (
		<>
			<div { ...blockProps }>{ block }</div>
		</>
	);
};

export default ShoelaceAlerts;
