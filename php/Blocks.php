<?php
/**
 * Set up the blocks and their attributes.
 *
 * @package GBExtras
 */

namespace DLXPlugins\GBExtras;

/**
 * Helper class for registering blocks.
 */
class Blocks {

	/**
	 * Main class runner.
	 *
	 * @return Blocks.
	 */
	public static function run() {
		$self = new self();
		add_action( 'init', array( $self, 'init' ) );
		add_action( 'rest_api_init', array( $self, 'init_rest_api' ) );
		add_filter( 'block_type_metadata', array( $self, 'add_block_metadata' ), 10, 1 );
		add_filter( 'generateblocks_typography_font_family_list', array( $self, 'add_adobe_fonts' ), 10, 1 );
		add_filter( 'generateblocks_typography_font_family_list', array( $self, 'add_blocksy_adobe_fonts' ), 10, 1 );
		add_filter( 'generateblocks_do_content', array( $self, 'add_post_type_content' ), 10, 2 );

		// Add any block categories needed.
		add_filter( 'block_categories_all', array( $self, 'add_block_categories' ), 500, 1 ); // High priority so others can add their categories first.
		return $self;
	}

	/**
	 * Add any block categories needed.
	 *
	 * @param array $categories List of categories.
	 */
	public function add_block_categories( $categories ) {
		$block_labels_enabled = true; // @TODO: Make this dynamic.
		if ( ! $block_labels_enabled ) {
			return $categories;
		}

		$options  = Options::get_options();
		$v1_label = $options['v1CategoryLabel'] ?? __( 'GenerateBlocks v1 (Legacy Blocks)', 'gb-extras' );
		$v2_label = $options['v2CategoryLabel'] ?? __( 'GenerateBlocks v2 (New Blocks)', 'gb-extras' );

		// Now add the GenerateBlocks category.
		$generateblocks_category = array(
			'slug'  => 'generateblocks-v1',
			'title' => esc_html( $v1_label ),
		);
		// Find the index of the `generateblocks` category.
		$generateblocks_index = array_search( 'generateblocks', array_column( $categories, 'slug' ), true );
		if ( false !== $generateblocks_index ) {
			// Rename category to `GenerateBlocks v2 (New Blocks)` and remove from array.
			$gb_v2_category = $categories[ $generateblocks_index ];
			unset( $categories[ $generateblocks_index ] );
			$gb_v2_category['title'] = esc_html( $v2_label );

			// Add V2 blocks to the beginning.
			array_unshift( $categories, $gb_v2_category );

			// Add V1 blocks to the end.
			$categories[] = $generateblocks_category;
		}
		return $categories;
	}

	/**
	 * Add post type content.
	 *
	 * @param string $content Post content.
	 */
	public function add_post_type_content( $content ) {
		global $post;
		// Get the ID.
		$post_id = $post->ID ?? 0;
		// Bail if no ID.
		if ( ! $post_id ) {
			return $content;
		}
		$options            = Options::get_options();
		$enabled_post_types = $options['enabledPostTypes'] ?? array();
		$current_post_type  = get_post_type( $post_id );

		// If post or page, bail.
		if ( in_array( $current_post_type, array( 'post', 'page' ), true ) ) {
			return $content;
		}

		if ( in_array( $current_post_type, $enabled_post_types, true ) ) {
			$block_element = get_post( $post_id );
			if ( $block_element ) {
				if ( 'publish' === $block_element->post_status && empty( $block_element->post_password ) ) {
					$content .= $block_element->post_content;
				}
			}
		}
		return $content;
	}


	/**
	 * Add Adobe Fonts to the list of fonts.
	 *
	 * @param array $fonts List of fonts.
	 */
	public function add_adobe_fonts( $fonts ) {
		$options = Options::get_options();
		if ( ! (bool) $options['enableAdobeFonts'] ) {
			return $fonts;
		}

		// Get the adobe fonts.
		$fonts_group = array();
		if ( defined( 'CUSTOM_TYPEKIT_FONTS_FILE' ) ) {
			$adobe_fonts = get_option( 'custom-typekit-fonts', array() );
			if ( isset( $adobe_fonts['custom-typekit-font-details'] ) ) {
				foreach ( $adobe_fonts['custom-typekit-font-details'] as $font_name => $font_details ) {
					$fonts_group[] = array(
						'value' => $font_name,
						'label' => $font_name,
					);
				}
			}
		}
		if ( ! empty( $fonts_group ) ) {
			$fonts[] = array(
				'label'   => __( 'Adobe Fonts', 'gb-extras' ),
				'options' => $fonts_group,
			);
		}
		return $fonts;
	}

	/**
	 * Add Adobe Fonts to the list of fonts.
	 *
	 * @param array $fonts List of fonts.
	 */
	public function add_blocksy_adobe_fonts( $fonts ) {
		$options = Options::get_options();
		if ( ! (bool) $options['enableAdobeFonts'] ) {
			return $fonts;
		}

		// Get blocksy adobe fonts.
		$options       = get_option( 'blocksy_ext_adobe_typekit_settings', array() );
		$font_families = $options['fonts'] ?? array();
		$project_id    = $options['project_id'] ?? '';
		if ( ! empty( $project_id ) ) {
			// Add fonts to list.
			if ( ! empty( $font_families ) ) {
				$fonts_group = array();
				foreach ( $font_families as $font_family ) {
					$fonts_group[] = array(
						'value' => $font_family['slug'],
						'label' => $font_family['name'] . 'asdflkj',
					);
				}
				$fonts[] = array(
					'label'   => __( 'Adobe Fonts', 'gb-extras' ),
					'options' => $fonts_group,
				);
			}
		}

		// Get blocksy google fonts.
		$google_fonts = get_option( 'blocksy_ext_local_google_fonts_settings', array() );
		if ( $google_fonts && isset( $google_fonts['fonts'] ) ) {
			$fonts_group = array();
			foreach ( $google_fonts['fonts'] as $font_family ) {
				$fonts_group[] = array(
					'value' => $font_family['name'],
					'label' => $font_family['name'],
				);
			}
			$fonts[] = array(
				'label'   => __( 'Google Fonts', 'gb-extras' ),
				'options' => $fonts_group,
			);
		}
		return $fonts;
	}

	/**
	 * Set Paragraph defaults.
	 *
	 * @param array $metadata {
	 *    An array of arguments.
	 *
	 *    @type string $name       Block name.
	 *    @type array  $attributes Block attributes.
	 * }
	 */
	public function add_block_metadata( $metadata ) {
		// Check the block type.
		if ( 'generateblocks/headline' !== $metadata['name'] ) {
			return $metadata;
		}

		// Add accordion view (collapsed view).
		$metadata['attributes']['element']['default'] = 'p';

		// Return the metadata.
		return $metadata;
	}

	/**
	 * Register the rest routes needed.
	 */
	public function init_rest_api() {
		register_rest_route(
			'dlxplugins/gb-extras/v1',
			'/process_image',
			array(
				'methods'             => 'POST',
				'callback'            => array( $this, 'rest_add_remote_image' ),
				'permission_callback' => array( $this, 'rest_image_sideload_permissions' ),
			)
		);
		register_rest_route(
			'dlxplugins/gb-extras/v1',
			'/get_asset_icon_groups',
			array(
				'methods'             => 'GET',
				'callback'            => array( $this, 'rest_get_gb_groups' ),
				'permission_callback' => array( $this, 'rest_image_sideload_permissions' ),
			)
		);
	}

	/**
	 * Process a list of images for a plugin.
	 *
	 * @param WP_Rest $request REST request.
	 */
	public function rest_add_remote_image( $request ) {
		$image_url = filter_var( $request->get_param( 'imgUrl' ), FILTER_VALIDATE_URL );
		$image_alt = sanitize_text_field( $request->get_param( 'imgAlt' ) );

		if ( $image_url ) {
			// Check file extension.
			$extension = pathinfo( $image_url, PATHINFO_EXTENSION );

			// Strip query vars from extension.
			$extension = preg_replace( '/\?.*/', '', $extension );

			// Get current domain.
			$domain = parse_url( $image_url, PHP_URL_HOST );

			// If we're on same domain, bail successfully.
			if ( $domain === $_SERVER['HTTP_HOST'] ) {
				\wp_send_json_success(
					array(
						'attachmentId'  => 0,
						'attachmentUrl' => esc_url( $image_url ),
					)
				);
			}

			if ( ! $extension ) {
				\wp_send_json_error(
					array(
						'message' => __( 'File extension not found.', 'gb-extras' ),
					),
					400
				);
			}
			$valid_extensions = Functions::get_supported_file_extensions();
			if ( ! in_array( $extension, $valid_extensions, true ) ) {
				\wp_send_json_error(
					array(
						'message' => __( 'Invalid file extension.', 'gb-extras' ),
					),
					400
				);
			}

			// Save the image to the media library.
			if ( ! function_exists( 'media_sideload_image' ) ) {
				require_once ABSPATH . 'wp-admin/includes/image.php';
				require_once ABSPATH . 'wp-admin/includes/file.php';
				require_once ABSPATH . 'wp-admin/includes/media.php';
			}
			$attachment_id = media_sideload_image( $image_url, 0, '', 'id' );

			// Add order to attachment.
			if ( ! is_wp_error( $attachment_id ) ) {

				// Get attachment URL.
				$attachment_url_src = wp_get_attachment_image_src( $attachment_id, 'full' );
				$attachment_url     = $attachment_url_src[0];

				// Update alt attribute.
				update_post_meta( $attachment_id, '_wp_attachment_image_alt', $image_alt );

				// Send success.
				\wp_send_json_success(
					array(
						'attachmentId'  => absint( $attachment_id ),
						'attachmentUrl' => esc_url( $attachment_url ),
					)
				);
			} else {
				\wp_send_json_error(
					array(
						'message' => $attachment_id->get_error_message(),
					),
					400
				);
			}
		}
		\wp_send_json_error(
			array(
				'message' => __( 'Invalid image URL.', 'gb-extras' ),
			),
			400
		);
	}

	/**
	 * Process a list of images for a plugin.
	 *
	 * @param WP_Rest $request REST request.
	 */
	public function rest_get_gb_groups( $request ) {

		// Get existing SVGs.
		$existing_svg_assets = get_option( 'generateblocks_svg_icons', array() );

		// Loop through and get `group`.
		$groups = array();
		foreach ( $existing_svg_assets as $svg_asset ) {
			$groups[] = $svg_asset['group'];
		}

		// If the group is empty, then on JS side, prompt for a group name.
		$groups = array_unique( $groups );

		// Send success.
		\wp_send_json_success(
			array(
				'groups' => $groups,
			)
		);
	}

	/**
	 * Check if user has access to REST API for retrieving and sideloading images.
	 */
	public function rest_image_sideload_permissions() {
		return current_user_can( 'publish_posts' );
	}

	/**
	 * Init action callback.
	 */
	public function init() {
		if ( function_exists( 'wp_register_block_types_from_metadata_collection' ) ) {
			wp_register_block_types_from_metadata_collection( Functions::get_plugin_dir( 'build' ), Functions::get_plugin_dir( 'build/blocks-manifest.php' ) );
		} else {
			if ( function_exists( 'wp_register_block_metadata_collection' ) ) {
				wp_register_block_metadata_collection( Functions::get_plugin_dir( 'build' ), Functions::get_plugin_dir( 'build/blocks-manifest.php' ) );
			}
			$manifest_data = require Functions::get_plugin_dir( 'build/blocks-manifest.php' );
			foreach ( array_keys( $manifest_data ) as $block_type ) {
				register_block_type( __DIR__ . "/build/js/blocks/{$block_type}" );
			}
		}

		// Enqueue block assets.
		add_action( 'enqueue_block_assets', array( $this, 'register_block_styles' ) );
		add_action( 'enqueue_block_assets', array( $this, 'register_block_editor_scripts' ) );

		// Enqueue command scripts.
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_commands' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_admin_commands' ) );
		add_action( 'admin_footer', array( $this, 'admin_commands_footer' ) );
	}

	/**
	 * Register the block editor styles.
	 */
	public function register_block_styles() {
		if ( ! is_admin() ) {
			return;
		}
		wp_register_style(
			'gb-extras-block-editor-styles',
			false
		);
		wp_enqueue_style( 'gb-extras-block-editor-styles' );
		wp_add_inline_style(
			'gb-extras-block-editor-styles',
			'[data-container-type] {
				position: relative;
			}
			[data-container-type]::after {
				content: "";
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				pointer-events: none;
				z-index: 9999;
				border: 3px solid #949494;
			}
			[data-container-type="container"]::after {
				border-color: #00a32a;
				z-index: 20;
			}
			[data-container-type="element"]::after {
				border-color: #007cba;
				z-index: 20;
			}
			[data-container-type="grid"]::after {
				border-color: #333333;
				z-index: 30;
			}'
		);
	}

	/**
	 * Register the block editor script with localized vars.
	 */
	public function register_block_editor_scripts() {
		if ( ! is_admin() ) {
			return;
		}
		$options = Options::get_options();

		wp_register_style(
			'gb-extras-pattern-inserter-block-css',
			Functions::get_plugin_url( 'build/index.css' ),
			array(),
			Functions::get_plugin_version(),
			'all'
		);

		$deps = require Functions::get_plugin_dir( 'build/index.asset.php' );

		wp_enqueue_script(
			'gb-extras-pattern-inserter-block',
			Functions::get_plugin_url( 'build/index.js' ),
			$deps['dependencies'],
			$deps['version'],
			true
		);

		wp_localize_script(
			'gb-extras-pattern-inserter-block',
			'gbExtrasPatternInserter',
			array(
				'restUrl'                       => rest_url( 'dlxplugins/gb-extras/v1' ),
				'restNonce'                     => wp_create_nonce( 'wp_rest' ),
				'allowedGoogleFonts'            => $options['allowedGoogleFonts'] ?? array(),
				'enableMarkdownToHeadlineBlock' => ( ( $options['enableMarkdownToHeadlineBlock'] ?? false ) ? 'true' : 'false' ),
				'enableV1Transformations'       => ( ( $options['enableV1Transformations'] ?? false ) ? 'true' : 'false' ),
				'enableV1Blocks'                => ( ( $options['enableV1Blocks'] ?? false ) ? 'true' : 'false' ),
				'v1CategoryLabel'               => esc_html( $options['v1CategoryLabel'] ?? esc_html__( 'GenerateBlocks v1', 'gb-extras' ) ),
				'v2CategoryLabel'               => esc_html( $options['v2CategoryLabel'] ?? esc_html__( 'GenerateBlocks v2', 'gb-extras' ) ),
				'v1BlockSuffix'                 => esc_html( $options['v1BlockSuffix'] ?? esc_html__( '(v1)', 'gb-extras' ) ),
				'v2BlockSuffix'                 => esc_html( $options['v2BlockSuffix'] ?? esc_html__( '(v2)', 'gb-extras' ) ),
			)
		);

		// Enqueue the block labels script.
		$block_labels_enabled = true; // @TODO: Make this dynamic.
		if ( $block_labels_enabled ) {
			$deps = require Functions::get_plugin_dir( 'build/gb-extras-block-labels.asset.php' );
			wp_enqueue_script(
				'gb-extras-block-labels',
				Functions::get_plugin_url( 'build/gb-extras-block-labels.js' ),
				$deps['dependencies'],
				$deps['version'],
				true
			);
		}
	}

	/**
	 * Enqueue block editor commands.
	 */
	public function enqueue_block_editor_commands() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$deps = require Functions::get_plugin_dir( 'build/gb-extras-commands-block-editor.asset.php' );
		wp_enqueue_script(
			'gb-extras-commands-block-editor',
			Functions::get_plugin_url( 'build/gb-extras-commands-block-editor.js' ),
			$deps['dependencies'],
			$deps['version'],
			true
		);
	}

	/**
	 * Enqueue admin-wide commands.
	 */
	public function enqueue_admin_commands() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		if ( get_current_screen()->is_block_editor() ) {
			return;
		}

		$deps = require Functions::get_plugin_dir( 'build/gb-extras-commands-admin.asset.php' );
		wp_enqueue_script(
			'gb-extras-commands-admin',
			Functions::get_plugin_url( 'build/gb-extras-commands-admin.js' ),
			$deps['dependencies'],
			$deps['version'],
			true
		);
	}

	/**
	 * Add hidden div for admin-wide command palette.
	 */
	public function admin_commands_footer() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		echo '<div id="gb-extras-commands-admin" style="display: none; visibility: hidden; position: absolute; top: 0; left: 0; width: 0; height: 0; overflow: hidden;"></div>';
	}
}
