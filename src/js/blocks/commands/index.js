import { useState, useEffect } from 'react';
import { useCommand } from '@wordpress/commands';
import { registerPlugin } from '@wordpress/plugins';
import { settings, replace } from '@wordpress/icons';
import { select, dispatch } from '@wordpress/data';
import { getBlockTransforms, switchToBlockType } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';

import { Modal, Button, Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import {
	v1Blocks,
	v1VariationNames,
	v2Blocks,
	vdVariationNames,
} from '../utils/BlockTypes';

// Create a global state for outline visibility.
let globalShowContainerOutlines = false;

const OutlineIcon = ( props ) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlSpace="preserve"
			width="16"
			height="16"
			viewBox="0 0 384 384"
			aria-hidden="true"
			{ ...props }
		>
			<path
				fill="currentColor"
				d="M85.333 341.333H128V384H85.333zM256 341.333h42.667V384H256zM341.333 341.333H384V384h-42.667zM170.667 341.333h42.667V384h-42.667zM341.333 256H384v42.667h-42.667z"
			/>
			<path
				fill="currentColor"
				d="M0 0v384h42.667V42.667H384V0zM341.333 170.667H384v42.667h-42.667z"
			/>
			<path fill="currentColor" d="M341.333 85.333H384V128h-42.667z" />
		</svg>
	);
};

const GBIcon = ( props ) => {
	return (
		<svg viewBox="0 0 50 60.12" xmlns="http://www.w3.org/2000/svg" { ...props }>
			<path d="M6.686 31.622V18.918a.077.077 0 0 1 .05-.072l6.5-2.313 6.5-2.313 9.682-3.445L39.1 7.33a.067.067 0 0 0 .036-.028.074.074 0 0 0 .014-.044V.076a.077.077 0 0 0-.032-.062.076.076 0 0 0-.069-.009l-13 4.625-13 4.625-6.5 2.313-6.5 2.313a.067.067 0 0 0-.036.028.097.097 0 0 0-.013.046V52.067c0 .026.013.048.032.062s.044.018.069.009l3.267-1.163 3.267-1.163c.015-.005.028-.015.036-.028s.014-.028.014-.044V37.999l.001-6.377c-.001 0 0 0 0 0z" />
			<path d="m23.949 29.976 13-4.625 13-4.625c.015-.005.028-.015.036-.028s.015-.028.015-.044V8.056a.077.077 0 0 0-.032-.062.076.076 0 0 0-.069-.009l-13 4.625-13 4.625-6.5 2.313-6.5 2.313a.067.067 0 0 0-.036.028.074.074 0 0 0-.014.044V60.045c0 .026.013.048.032.062a.076.076 0 0 0 .069.009l6.475-2.304 6.475-2.304 6.525-2.322 6.525-2.322 6.5-2.313 6.5-2.313c.015-.005.028-.015.036-.028s.014-.025.014-.041V27.193a.077.077 0 0 0-.032-.062.076.076 0 0 0-.069-.009l-6.45 2.295L37 31.711a.067.067 0 0 0-.036.028.074.074 0 0 0-.014.044v6.272a.077.077 0 0 1-.05.072l-6.45 2.295L24 42.715a.075.075 0 0 1-.101-.071V30.046c0-.016.005-.031.014-.044a.08.08 0 0 1 .036-.026z" />
		</svg>
	);
};

/**
 * Add outline classes to blocks.
 */
const addOutlineClasses = createHigherOrderComponent( ( BlockListBlock ) => {
	return ( props ) => {
		const { name, attributes } = props;
		const { styles } = attributes;

		// Only add classes if outlines are enabled.
		if ( ! globalShowContainerOutlines ) {
			return <BlockListBlock { ...props } />;
		}

		// Add classes based on block type.
		if ( name === 'generateblocks/container' ) {
			props.className = `${ props.className || '' } dlx-gb-outline dlx-gb-outline-container`.trim();
		}

		if ( name === 'generateblocks/element' ) {
			props.className = `${ props.className || '' } dlx-gb-outline dlx-gb-outline-element`.trim();
		}

		// Add grid class if display is grid.
		if ( styles?.display === 'grid' ) {
			props.className = `${ props.className || '' } dlx-gb-outline-grid`.trim();
		}

		return <BlockListBlock { ...props } />;
	};
}, 'withOutlineClasses' );

// Register the filter.
addFilter(
	'editor.BlockListBlock',
	'dlx-gb-extras/with-outline-classes',
	addOutlineClasses
);

const GBCommands = () => {
	const [ isModalOpen, setIsModalOpen ] = useState( false );
	const [ showContainerOutlines, setShowContainerOutlines ] = useState( false );
	const [ groupsLoading, setGroupsLoading ] = useState( false );
	const [ blockTransformConfirmation, setBlockTransformConfirmation ] =
		useState( false );

	// Update global state when local state changes.
	useEffect( () => {
		globalShowContainerOutlines = showContainerOutlines;
	}, [ showContainerOutlines ] );

	/**
	 * Get block nesting level.
	 *
	 * @param {Array} blocks Array of blocks to check.
	 * @return {number} Maximum nesting level.
	 */
	const getBlockNestingLevel = ( blocks = null ) => {
		const blocksToCheck = blocks || select( 'core/block-editor' ).getBlocks();
		let maxLevel = 0;

		blocksToCheck.forEach( ( block ) => {
			if ( block.innerBlocks.length > 0 ) {
				const innerLevel = 1 + getBlockNestingLevel( block.innerBlocks );
				maxLevel = Math.max( maxLevel, innerLevel );
			}
		} );

		return maxLevel;
	};
	/**
	 * Recursively get all blocks.
	 *
	 * @param {Array} blocks Array of blocks to transform.
	 * @return {Promise} Promise that resolves when all blocks are transformed.
	 */
	const transformBlocks = async( blocks ) => {
		const transformPromises = blocks.map( async( block ) => {
			// First, recursively transform children and update them before working on parent.
			if ( block.innerBlocks.length > 0 ) {
				await transformBlock( block );
				await transformBlocks( block.innerBlocks );
			} else {
				await transformBlock( block );
			}
		} );

		await Promise.all( transformPromises );
		return blocks;
	};

	/**
	 * Transform a block.
	 *
	 * @param {Object} block Block to transform.
	 * @return {Promise} Promise that resolves when the block is transformed.
	 */
	const transformBlock = async( block ) => {
		if (
			v1Blocks.includes( block.name ) ||
			v1VariationNames.includes( block.name )
		) {
			// Get transform options for the block.
			const transformOptions = getBlockTransforms( 'to', block.name );
			if ( transformOptions ) {
				for ( const transform of transformOptions ) {
					// Has transform.blocks, which is an array of blocks it can transform to.
					if ( transform.blocks ) {
						for ( const transformBlockName of transform.blocks ) {
							if ( v2Blocks.includes( transformBlockName ) ) {
								// Now do the transform.
								const result = transform.transform(
									block.attributes,
									block.innerBlocks
								);
								if ( result ) {
									await dispatch( 'core/block-editor' ).replaceBlocks(
										[ block.clientId ],
										result
									);
									return result;
								}
								console.error(
									'Failed to transform',
									block.name,
									'to',
									transformBlockName
								);
							}
						}
					}
				}
			}
		}
		return null;
	};
	useCommand( {
		name: 'dlx-gb-admin-settings',
		label: 'Go to GenerateBlocks Settings',
		icon: <GBIcon width="16" height="16" />,
		callback: () => {
			document.location.href = 'admin.php?page=generateblocks-settings';
		},
		context: 'block-editor',
	} );
	useCommand( {
		name: 'dlx-gb-local-patterns',
		label: 'Go to GenerateBlocks Patterns',
		icon: <GBIcon width="16" height="16" />,
		callback: () => {
			document.location.href = 'edit.php?post_type=wp_block';
		},
		context: 'block-editor',
	} );
	useCommand( {
		name: 'dlx-gb-global-styles-new',
		label: 'Go to GenerateBlocks Global Styles (New)',
		searchLabel: 'Go to GenerateBlocks Global Styles (New - 2.x)',
		icon: <GBIcon width="16" height="16" />,
		callback: () => {
			document.location.href = 'admin.php?page=generateblocks-styles';
		},
		context: 'block-editor',
	} );
	useCommand( {
		name: 'dlx-gb-global-styles-legacy',
		label: 'Go to GenerateBlocks Global Styles (Legacy)',
		searchLabel: 'Go to GenerateBlocks Global Styles (Legacy - 1.x)',
		icon: <GBIcon width="16" height="16" />,
		callback: () => {
			document.location.href = 'edit.php?post_type=gblocks_templates';
		},
		context: 'block-editor',
	} );
	useCommand( {
		name: 'dlx-gb-asset-library',
		label: 'Go to GenerateBlocks Asset Library',
		icon: <GBIcon width="16" height="16" />,
		callback: () => {
			document.location.href = 'admin.php?page=generateblocks-asset-library';
		},
		context: 'block-editor',
	} );
	useCommand( {
		name: 'dlx-gb-extras-Settings',
		label: 'Go to GB Extras Settings',
		icon: settings,
		callback: () => {
			document.location.href = 'admin.php?page=dlx-gb-extras';
		},
		context: 'block-editor',
	} );
	useCommand( {
		name: 'dlx-gb-extras-toggle-container-outlines',
		label: 'Toggle Container Block Outlines',
		icon: <OutlineIcon />,
		callback: ( { close } ) => {
			const selector = [
				'.gb-container[data-type="generateblocks/container"]',
				'.wp-block-generateblocks-element[data-type="generateblocks/element"]',
			].join( ',' );
			const containerOutlines = document.querySelectorAll( selector );
			if ( showContainerOutlines ) {
				containerOutlines.forEach( ( container ) => {
					container.classList.remove( 'dlx-gb-outline' );
					container.classList.remove( 'dlx-gb-outline-container' );
					container.classList.remove( 'dlx-gb-outline-element' );
					container.classList.remove( 'dlx-gb-outline-grid' );
				} );
				setShowContainerOutlines( false );
			} else {
				setShowContainerOutlines( true );
				containerOutlines.forEach( ( container ) => {
					container.classList.add( 'dlx-gb-outline' );
					// If the container is a v1 container, add `dlx-gb-outline-v1`
					if ( container.dataset.type === 'generateblocks/container' ) {
						container.classList.add( 'dlx-gb-outline-container' ); // v1 - Green outline.
					}
					// If the container is a v2 element, add `dlx-gb-outline-v2`
					if ( container.dataset.type === 'generateblocks/element' ) {
						container.classList.add( 'dlx-gb-outline-element' ); // v2 - Blue outline.
					}

					// If container has a display type of grid, add `dlx-gb-outline-grid`
					if ( /Grid/.test( container.dataset.title ) ) {
						console.log( 'Grid match found, adding class...' );
						container.classList.add( 'dlx-gb-outline-grid' );
					}
					setShowContainerOutlines( true );
				} );
				
			}
			close();
		},
		context: 'block-editor',
	} );
	console.log( gbExtrasPatternInserter );
	console.log( gbExtrasPatternInserter.enableV1Transformations );
	useCommand( {
		name: 'dlx-transform-v1-blocks-to-v2',
		label: 'GenerateBlocks: Transform V1 Blocks to V2 (Experimental)',
		searchLabel: 'Transform GenerateBlocks V1 Blocks to V2 (Experimental)',
		icon: replace,
		callback: () => {
			setBlockTransformConfirmation( true );
		},
		disabled:
			'false' === ( gbExtrasPatternInserter.enableV1Transformations || 'false' ),
	} );

	if ( blockTransformConfirmation ) {
		return (
			<Modal
				isDismissible={ true }
				shouldCloseOnClickOutside={ false }
				shouldCloseOnEsc={ true }
				onRequestClose={ () => {
					setBlockTransformConfirmation( false );
				} }
				title="Transform V1 Blocks to V2"
			>
				<p>Are you sure you want to transform all V1 blocks to V2?</p>
				<Button
					variant="primary"
					onClick={ async() => {
						const nestingLevel = getBlockNestingLevel();

						for ( let i = 0; i < nestingLevel; i++ ) {
							await transformBlocks( select( 'core/block-editor' ).getBlocks() );
						}

						setBlockTransformConfirmation( false );
					} }
				>
					{ __( 'Transform', 'dlx-gb-extras' ) }
				</Button>
				<Button
					variant="secondary"
					onClick={ () => {
						setBlockTransformConfirmation( false );
					} }
				>
					{ __( 'Cancel', 'dlx-gb-extras' ) }
				</Button>
			</Modal>
		);
	}
	return (
		<>
			{ isModalOpen && (
				<Modal
					isDismissible={ true }
					shouldCloseOnClickOutside={ false }
					shouldCloseOnEsc={ true }
					title="Save SVG to Asset Library"
					onRequestClose={ () => {
						setIsModalOpen( false );
					} }
				>
					{ groupsLoading && (
						<>
							<Spinner />
						</>
					) }
				</Modal>
			) }
		</>
	);
};

registerPlugin( 'dlxgb-commands', {
	render: GBCommands,
} );
