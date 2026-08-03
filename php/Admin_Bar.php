<?php
/**
 * Admin Bar class.
 *
 * @package GBExtras
 */

namespace DLXPlugins\GBExtras;

if ( ! defined( 'ABSPATH' ) ) {
	die( 'No direct access.' );
}

/**
 * Class that handles admin bar menu modifications.
 */
class Admin_Bar {

	/**
	 * Class runner.
	 */
	public function run() {
		// Only run if GenerateBlocks Pro is active (this feature is Pro-only).
		if ( ! Functions::is_generateblocks_pro_active() ) {
			return;
		}

		// Use priority 101 to run after GenerateBlocks Pro adds its items (which uses priority 100).
		add_action( 'admin_bar_menu', array( $this, 'modify_admin_bar_items' ), 101 );
	}

	/**
	 * Whether the current user may receive GB Extras admin bar changes (hide menu or full menu replacement).
	 *
	 * @return bool True when the user is an administrator or editor.
	 */
	private function current_user_can_use_admin_bar_customizations() {
		if ( is_multisite() && is_super_admin() ) {
			return true;
		}

		return current_user_can( 'manage_options' );
	}

	/**
	 * Modify admin bar items based on options.
	 *
	 * @param \WP_Admin_Bar $admin_bar The admin bar object.
	 */
	public function modify_admin_bar_items( $admin_bar ) {
		if ( ! $this->current_user_can_use_admin_bar_customizations() ) {
			return;
		}

		$options                = Options::get_options();
		$admin_menu_bar         = $options['adminMenuBar'] ?? array();
		$enabled                = (bool) ( $admin_menu_bar['enabled'] ?? true );
		$replace_with_full_menu = (bool) ( $admin_menu_bar['replaceWithFullMenu'] ?? false );

		// If admin menu bar is disabled, remove all GenerateBlocks items.
		if ( ! $enabled ) {
			$this->remove_all_generateblocks_items( $admin_bar );
			return; // Exit early if disabled.
		}

		// If replace with full menu is enabled, remove Overlay Panels and add full menu.
		if ( $replace_with_full_menu ) {
			// Remove the Overlay Panels menu (confirmed ID: gb_overlays-menu).
			// Note: We're already in a Pro-only context (checked in run()).
			$admin_bar->remove_node( 'gb_overlays-menu' );

			// Add full GenerateBlocks menu with all sub-items.
			$this->add_full_generateblocks_menu( $admin_bar );
		}
	}

	/**
	 * Remove all GenerateBlocks admin bar items.
	 *
	 * @param \WP_Admin_Bar $admin_bar The admin bar object.
	 */
	private function remove_all_generateblocks_items( $admin_bar ) {
		// Remove known GenerateBlocks Pro items.
		// Note: We're already in a Pro-only context (checked in run()).
		$admin_bar->remove_node( 'gb_overlays-menu' );

		// Remove our custom full menu if it exists.
		$admin_bar->remove_node( 'generateblocks-menu' );

		// TODO: Add removal for other GenerateBlocks items as they are identified.
		// Common pattern: inspect admin bar HTML to find node IDs.
	}

	/**
	 * Get GenerateBlocks icon SVG for admin bar.
	 *
	 * @return string SVG icon HTML.
	 */
	private function get_generateblocks_icon() {
		$svg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 60.12" width="16" height="16" style="vertical-align: middle; margin-right: 5px; fill: #FFFFFF;"><path d="M6.686 31.622V18.918a.077.077 0 0 1 .05-.072l6.5-2.313 6.5-2.313 9.682-3.445L39.1 7.33a.067.067 0 0 0 .036-.028.074.074 0 0 0 .014-.044V.076a.077.077 0 0 0-.032-.062.076.076 0 0 0-.069-.009l-13 4.625-13 4.625-6.5 2.313-6.5 2.313a.067.067 0 0 0-.036.028.097.097 0 0 0-.013.046V52.067c0 .026.013.048.032.062s.044.018.069.009l3.267-1.163 3.267-1.163c.015-.005.028-.015.036-.028s.014-.028.014-.044V37.999l.001-6.377c-.001 0 0 0 0 0z" /><path d="m23.949 29.976 13-4.625 13-4.625c.015-.005.028-.015.036-.028s.015-.028.015-.044V8.056a.077.077 0 0 0-.032-.062.076.076 0 0 0-.069-.009l-13 4.625-13 4.625-6.5 2.313-6.5 2.313a.067.067 0 0 0-.036.028.074.074 0 0 0-.014.044V60.045c0 .026.013.048.032.062a.076.076 0 0 0 .069.009l6.475-2.304 6.475-2.304 6.525-2.322 6.525-2.322 6.5-2.313 6.5-2.313c.015-.005.028-.015.036-.028s.014-.025.014-.041V27.193a.077.077 0 0 0-.032-.062.076.076 0 0 0-.069-.009l-6.45 2.295L37 31.711a.067.067 0 0 0-.036.028.074.074 0 0 0-.014.044v6.272a.077.077 0 0 1-.05.072l-6.45 2.295L24 42.715a.075.075 0 0 1-.101-.071V30.046c0-.016.005-.031.014-.044a.08.08 0 0 1 .036-.026z" /></svg>';
		return $svg;
	}

	/**
	 * Add full GenerateBlocks admin bar menu with all sub-items.
	 *
	 * @param \WP_Admin_Bar $admin_bar The admin bar object.
	 */
	private function add_full_generateblocks_menu( $admin_bar ) {
		// Check if menu already exists to avoid duplicates.
		$existing_node = $admin_bar->get_node( 'generateblocks-menu' );
		if ( $existing_node ) {
			return;
		}

		// Get GenerateBlocks icon.
		$icon = $this->get_generateblocks_icon();

		// Add main GenerateBlocks menu item.
		$admin_bar->add_menu(
			array(
				'id'    => 'generateblocks-menu',
				'title' => $icon . __( 'GenerateBlocks', 'gb-extras' ),
				'href'  => admin_url( 'admin.php?page=generateblocks-settings' ),
			)
		);

		// Add Settings submenu (available in free version).
		$admin_bar->add_node(
			array(
				'parent' => 'generateblocks-menu',
				'id'     => 'generateblocks-settings',
				'title'  => __( 'Settings', 'gb-extras' ),
				'href'   => admin_url( 'admin.php?page=generateblocks-settings' ),
			)
		);

		// Add GB Extras shortcut.
		$admin_bar->add_node(
			array(
				'parent' => 'generateblocks-menu',
				'id'     => 'generateblocks-extras',
				'title'  => __( 'Extras', 'gb-extras' ),
				'href'   => admin_url( 'admin.php?page=dlx-gb-extras' ),
			)
		);

		// Add Pro items (redundant check but kept for safety - we're already in Pro context).
		if ( Functions::is_generateblocks_pro_active() ) {
			// Get GenerateBlocks settings to check if features are enabled.
			// Defaults: enable_overlay_panels and enable_block_conditions both default to true.
			$gb_options = get_option( 'generateblocks', array() );

			// Check if overlay panels and conditions are enabled (default to true if not set).
			$overlay_panels_enabled = isset( $gb_options['enable_overlay_panels'] ) ? (bool) $gb_options['enable_overlay_panels'] : true;
			$conditions_enabled     = isset( $gb_options['enable_block_conditions'] ) ? (bool) $gb_options['enable_block_conditions'] : true;

			// Add Local Patterns.
			$admin_bar->add_node(
				array(
					'parent' => 'generateblocks-menu',
					'id'     => 'generateblocks-local-patterns',
					'title'  => __( 'Local Patterns', 'gb-extras' ),
					'href'   => admin_url( 'edit.php?post_type=wp_block' ),
				)
			);

			// Add Global Styles.
			$admin_bar->add_node(
				array(
					'parent' => 'generateblocks-menu',
					'id'     => 'generateblocks-global-styles',
					'title'  => __( 'Global Styles', 'gb-extras' ),
					'href'   => admin_url( 'admin.php?page=generateblocks-styles' ),
				)
			);

			// Add Overlay Panels only if enabled in GenerateBlocks settings.
			if ( $overlay_panels_enabled ) {
				$admin_bar->add_node(
					array(
						'parent' => 'generateblocks-menu',
						'id'     => 'generateblocks-overlay-panels',
						'title'  => __( 'Overlay Panels', 'gb-extras' ),
						'href'   => admin_url( 'admin.php?page=generateblocks-overlay-panels' ),
					)
				);
			}

			// Add Conditions only if enabled in GenerateBlocks settings.
			if ( $conditions_enabled ) {
				$admin_bar->add_node(
					array(
						'parent' => 'generateblocks-menu',
						'id'     => 'generateblocks-conditions',
						'title'  => __( 'Conditions', 'gb-extras' ),
						'href'   => admin_url( 'admin.php?page=generateblocks-conditions' ),
					)
				);
			}

			// Add Asset Library.
			$admin_bar->add_node(
				array(
					'parent' => 'generateblocks-menu',
					'id'     => 'generateblocks-asset-library',
					'title'  => __( 'Asset Library', 'gb-extras' ),
					'href'   => admin_url( 'admin.php?page=generateblocks-asset-library' ),
				)
			);

			// Add Forms only if enabled in GenerateBlocks Pro.
			if ( function_exists( 'generateblocks_pro_forms_enabled' ) && generateblocks_pro_forms_enabled() ) {
				$admin_bar->add_node(
					array(
						'parent' => 'generateblocks-menu',
						'id'     => 'generateblocks-forms',
						'title'  => __( 'Forms', 'gb-extras' ),
						'href'   => admin_url( 'admin.php?page=generateblocks-forms' ),
					)
				);
			}

			// Add Editor Access only if available in GenerateBlocks Pro.
			if ( function_exists( 'generateblocks_pro_editor_access_enabled' ) && generateblocks_pro_editor_access_enabled() ) {
				$admin_bar->add_node(
					array(
						'parent' => 'generateblocks-menu',
						'id'     => 'generateblocks-editor-access',
						'title'  => __( 'Editor Access', 'gb-extras' ),
						'href'   => admin_url( 'admin.php?page=generateblocks-editor-access' ),
					)
				);
			}
		}
	}
}
