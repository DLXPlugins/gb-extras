<?php
/**
 * Admin class.
 *
 * @package GBHacks
 */

namespace DLXPlugins\GBHacks;

/**
 * Admin class.
 */
class Admin {

	/**
	 * Class runner.
	 */
	public function run() {
		// Init the admin menu.
		add_action( 'admin_menu', array( $this, 'add_admin_menu' ) );

		// Enqueue scripts for the admin page.
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_scripts' ) );

		// For retrieving the options.
		add_action( 'wp_ajax_dlx_gb_hacks_get_options', array( $this, 'ajax_get_options' ) );

		// For saving the options.
		add_action( 'wp_ajax_dlx_gb_hacks_save_options', array( $this, 'ajax_save_options' ) );

		// For resetting the options.
		add_action( 'wp_ajax_dlx_gb_hacks_reset_options', array( $this, 'ajax_reset_options' ) );

		// For getting license options.
		add_action( 'wp_ajax_dlx_gb_hacks_license_get_options', array( $this, 'ajax_license_get_options' ) );

		// For revoking a license.
		add_action( 'wp_ajax_dlx_gb_hacks_revoke_license', array( $this, 'ajax_revoke_license' ) );

		// For saving a license.
		add_action( 'wp_ajax_dlx_gb_hacks_save_license', array( $this, 'ajax_save_license' ) );

		// For initializing EDD license.
		add_action( 'admin_init', array( $this, 'init_license_system' ) );

		// For initializing settings links on the plugins screen.
		add_action( 'admin_init', array( $this, 'init_settings_links' ) );
	}

	/**
	 * Validate a form submitted in the preview modal.
	 */
	public function ajax_admin_preview_validate() {
		// Do permissions check.
		$nonce = filter_input( INPUT_GET, 'nonce', FILTER_DEFAULT );
		if ( ! \wp_verify_nonce( $nonce, 'dlx-gb-hacks-admin-preview-iframe') || ! current_user_can( 'manage_options' ) ) {
			\wp_send_json_error( array() );
		}

		// Get secret key.
		$secret_key = filter_input( INPUT_GET, 'secretKey', FILTER_DEFAULT );

		// Get token.
		$token = filter_input( INPUT_GET, 'turnstyleToken', FILTER_DEFAULT );

		$can_proceed = false;

		// Make sure token is valid.
		if ( $token ) {

			$cloudflare_endpoint_api = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

			// Build data envelope.
			$data = array(
				'secret'   => sanitize_text_field( $secret_key ),
				'response' => sanitize_text_field( $token ),
			);

			$args = array(
				'body'      => $data,
				'method'    => 'POST',
				'sslverify' => true,
			);

			$response = wp_remote_post( esc_url( $cloudflare_endpoint_api ), $args );

			// If error, show response.
			if ( is_wp_error( $response ) ) {
				$can_proceed = false;
			}

			// Get body.
			$body = json_decode( wp_remote_retrieve_body( $response ), true );

			$is_success = $body['success'] ?? false;
			// If not a success, error.
			if ( ! $is_success ) {
				$can_proceed = false;
			} else {
				$can_proceed = true;
			}

			// Success!
			if ( $can_proceed ) {
				\wp_send_json_success( array() );
			}
		}
		\wp_send_json_error( array() );
	}

	/**
	 * Initialize the setting links for the plugin page.
	 */
	public function init_settings_links() {
		$prefix = Functions::is_multisite() ? 'network_admin_' : '';
		add_action( $prefix . 'plugin_action_links_' . plugin_basename( GB_HACKS_FILE ), array( $this, 'plugin_settings_link' ) );
	}

	/**
	 * Adds plugin settings page link to plugin links in WordPress Dashboard Plugins Page
	 *
	 * @since 1.0.0
	 *
	 * @param array $settings Uses $prefix . "plugin_action_links_$plugin_file" action.
	 * @return array Array of settings
	 */
	public function plugin_settings_link( $settings ) {
		$setting_links = array(
			'settings' => sprintf( '<a href="%s">%s</a>', esc_url( Functions::get_settings_url() ), esc_html__( 'Settings', 'dlx-gb-hacks' ) ),
			'docs'     => sprintf( '<a href="%s">%s</a>', esc_url( 'https://docs.dlxplugins.com/' ), esc_html__( 'Docs', 'dlx-gb-hacks' ) ),
			'site'     => sprintf( '<a href="%s" style="color: #f60098;">%s</a>', esc_url( 'https://dlxplugins.com/plugins/gb-hacks/' ), esc_html__( 'Plugin Home', 'dlx-gb-hacks' ) ),
		);
		if ( ! is_array( $settings ) ) {
			return $setting_links;
		} else {
			return array_merge( $setting_links, $settings );
		}
	}

	/**
	 * Ajax revoke license.
	 */
	public function ajax_revoke_license() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'dlx-gb-hacks-admin-license-revoke' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array() );
		}

		$form_data = filter_input( INPUT_POST, 'formData', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );
		if ( ! $form_data ) {
			wp_send_json_error( array() );
		}
		$form_data = Functions::sanitize_array_recursive( $form_data );

		// Get license.
		$license_key    = $form_data['licenseKey'] ?? '';
		$license_helper = new Plugin_License( $license_key );
		$response       = $license_helper->perform_action( 'deactivate_license', $license_key, true );

		// Overrride options.
		$options = Options::get_options();

		// Clear options.
		$options['licenseValid']     = false;
		$options['licenseActivated'] = false;
		$options['licenseKey']       = '';
		$options['licenseData']      = false;

		Options::update_options( $options );
		if ( $response['license_errors'] ) {
			$license_helper->set_activated_status( false );
			wp_send_json_error( $response );
		}

		$license_helper->set_activated_status( false );
		$options['licenseValid']     = false;
		$options['licenseActivated'] = false;
		$options['licenseKey']       = '';
		$options['licenseData']      = false;

		// Update options (force).
		Options::update_options( $options );

		wp_send_json_success( $options );
	}

	/**
	 * Save/Check a license key.
	 */
	public function ajax_save_license() {
		if ( ! wp_verify_nonce( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ), 'dlx-gb-hacks-admin-license-save' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error( array() );
		}

		$form_data = filter_input( INPUT_POST, 'formData', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );
		if ( ! $form_data ) {
			wp_send_json_error( array() );
		}
		$form_data = Functions::sanitize_array_recursive( $form_data );

		// Get license.
		$license_key    = $form_data['licenseKey'] ?? '';
		$license_helper = new Plugin_License( $license_key );
		$response       = $license_helper->perform_action( 'activate_license', $license_key, true );

		if ( $response['license_errors'] ) {
			$license_helper->set_activated_status( false );
			wp_send_json_error( $response );
		}

		// Get latest options.
		$options                = Options::get_options( true );
		$options['licenseKey']  = $license_key;
		$options['licenseData'] = get_site_transient( 'dlxgbhacks_core_license_check', array() );
		wp_send_json_success( $options );
	}

	/**
	 * Allow for automatic updates.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function init_license_system() {
		$options = Options::get_options();

		$license_valid = $options['licenseValid'] ?? '';
		if ( isset( $options['licenseKey'] ) && 'valid' === $license_valid ) {
			// setup the updater.
			$edd_updater = new Plugin_Updater(
				'https://dlxplugins.com',
				__FILE__,
				array(
					'version' => Functions::get_plugin_version(),
					'license' => $options['licenseKey'],
					'item_id' => GB_HACKS_PRODUCT_ID,
					'author'  => 'Ronald Huereca',
					'beta'    => true,
					'url'     => home_url(),
				)
			);
		}
	}

	/**
	 * Get license options via Ajax.
	 */
	public function ajax_license_get_options() {
		// Get nonce.
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Verify nonce.
		$nonce_action = 'dlx-gb-hacks-admin-license-get';
		if ( ! wp_verify_nonce( $nonce, $nonce_action ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce or permission verification failed.', 'dlx-gb-hacks' ),
					'type'        => 'error',
					'dismissable' => true,
					'title'       => __( 'Error', 'dlx-gb-hacks' ),
				)
			);
		}
		$options                = Options::get_options( true );
		$options['licenseData'] = get_site_transient( 'dlxgbhacks_core_license_check', array() );
		wp_send_json_success( $options );
	}

	/**
	 * Save the options via Ajax.
	 */
	public function ajax_save_options() {
		// Get form data.
		$form_data = filter_input( INPUT_POST, 'formData', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );

		$nonce = $form_data['saveNonce'] ?? false;
		if ( ! wp_verify_nonce( $nonce, 'dlx-gb-hacks-admin-save-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce or permission verification failed.', 'dlx-gb-hacks' ),
					'type'        => 'critical',
					'dismissable' => true,
					'title'       => __( 'Error', 'dlx-gb-hacks' ),
				)
			);
		}

		// If no font data, assume empty array.
		if ( ! isset( $form_data['allowedGoogleFonts'] ) ) {
			$form_data['allowedGoogleFonts'] = array();
		}

		$form_enabled_post_types = $form_data['enabledPostTypes'] ?? array();
		$enabled_post_types      = array();
		
		// Loop through enabled post types to save them in the right format.
		foreach ( $form_enabled_post_types as $post_type => $enabled ) {
			$post_type = trim( sanitize_text_field( $post_type ) );
			if ( is_numeric( $post_type ) ) {
				continue;
			}
			$enabled_post_types[ $post_type ] = filter_var( $enabled, FILTER_VALIDATE_BOOLEAN );
		}

		// Assign back.
		$form_data['enabledPostTypes'] = $enabled_post_types;

		// Get array values.
		$form_data = Functions::sanitize_array_recursive( $form_data );

		// Update options.
		Options::update_options( $form_data );

		// Send success message.
		wp_send_json_success(
			array(
				'message'     => __( 'Options saved.', 'dlx-gb-hacks' ),
				'type'        => 'success',
				'dismissable' => true,
			)
		);
	}

	/**
	 * Reset the options.
	 */
	public function ajax_reset_options() {
		// Get form data.
		$form_data = filter_input( INPUT_POST, 'formData', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );

		$nonce = $form_data['resetNonce'] ?? false;
		if ( ! wp_verify_nonce( $nonce, 'dlx-gb-hacks-admin-reset-options' ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce or permission verification failed.', 'dlx-gb-hacks' ),
					'type'        => 'error',
					'dismissable' => true,
					'title'       => __( 'Error', 'dlx-gb-hacks' ),
				)
			);
		}

		// Get existing options.
		$options = Options::get_options();

		// Get defaults and reset.
		$default_options = Options::get_defaults();

		// Don't reset license.
		$license_keys = array(
			'licenseKey',
			'licenseValid',
			'licenseActivated',
			'licenseData',
		);
		foreach ( $license_keys as $license_key ) {
			$default_options[ $license_key ] = $options[ $license_key ];
		}

		Options::update_options( $default_options );

		// Pull in nonces to default options before returning.
		$default_options['saveNonce']  = $options['saveNonce'];
		$default_options['resetNonce'] = $options['resetNonce'];

		// Format empty arrays into false. This is so they can be reset at the form level.
		$default_options['membershipLevelsToExclude'] = false;
		$default_options['checkoutLevelsToExclude']   = false;

		// Send success message.
		wp_send_json_success(
			array(
				'message'     => __( 'Options reset.', 'dlx-gb-hacks' ),
				'type'        => 'success',
				'dismissable' => true,
				'formData'    => $default_options,
			)
		);
	}

	/**
	 * Retrieve options via Ajax.
	 */
	public function ajax_get_options() {
		// Get nonce.
		$nonce = sanitize_text_field( filter_input( INPUT_POST, 'nonce', FILTER_DEFAULT ) );

		// Verify nonce.
		$nonce_action = 'dlx-gb-hacks-admin-get-options';
		if ( ! wp_verify_nonce( $nonce, $nonce_action ) || ! current_user_can( 'manage_options' ) ) {
			wp_send_json_error(
				array(
					'message'     => __( 'Nonce or permission verification failed.', 'dlx-gb-hacks' ),
					'type'        => 'error',
					'dismissable' => true,
					'title'       => __( 'Error', 'dlx-gb-hacks' ),
				)
			);
		}
		$options = Options::get_options();
		wp_send_json_success( $options );
	}

	/**
	 * Add the admin menu.
	 */
	public function add_admin_menu() {
		add_submenu_page(
			'generateblocks',
			__( 'Hacks', 'pmpro-turnstile' ),
			__( 'Hacks', 'pmpro-turnstile' ),
			'manage_options',
			'dlx-gb-hacks',
			array( $this, 'admin_page' ),
			4
		);
	}

	/**
	 * Enqueue scripts for the admin page.
	 *
	 * @param string $hook The current admin page.
	 */
	public function enqueue_scripts( $hook ) {
		if ( 'generateblocks_page_dlx-gb-hacks' !== $hook ) {
			return;
		}

		$options = Options::get_options();
		$current_tab = Functions::get_admin_tab();
		if ( null === $current_tab || 'settings' === $current_tab ) {
			// Enqueue main scripts.
			wp_enqueue_script(
				'dlx-gb-hacks-admin',
				Functions::get_plugin_url( 'dist/gb-hacks-admin.js' ),
				array(),
				Functions::get_plugin_version(),
				true
			);

			// Get all show in menu post types.
			$post_types = get_post_types(
				array(
					'show_ui' => true,
				),
				'objects'
			);
			$excluded   = array( 'attachment', 'revision', 'nav_menu_item', 'gblocks_templates', 'gblocks_global_style'  );
			foreach ( $excluded as $exclude ) {
				if ( isset( $post_types[ $exclude ] ) ) {
					unset( $post_types[ $exclude ] );
				}
			}

			wp_localize_script(
				'dlx-gb-hacks-admin',
				'dlxGBHacksAdmin',
				array(
					'getNonce'   => wp_create_nonce( 'dlx-gb-hacks-admin-get-options' ),
					'saveNonce'  => wp_create_nonce( 'dlx-gb-hacks-admin-save-options' ),
					'resetNonce' => wp_create_nonce( 'dlx-gb-hacks-admin-reset-options' ),
					'previewNonce' => wp_create_nonce( 'dlx-gb-hacks-admin-preview' ),
					'ajaxurl'	=> admin_url( 'admin-ajax.php' ),
					'postTypes'     => $post_types,
				)
			);
		} elseif ( 'license' === $current_tab ) {
			wp_enqueue_script(
				'dlx-gb-hacks-admin-license',
				Functions::get_plugin_url( 'dist/gb-hacks-admin-license.js' ),
				array(),
				Functions::get_plugin_version(),
				true
			);
			wp_localize_script(
				'dlx-gb-hacks-admin-license',
				'dlxGBHacksLicense',
				array(
					'getNonce'    => wp_create_nonce( 'dlx-gb-hacks-admin-license-get' ),
					'saveNonce'   => wp_create_nonce( 'dlx-gb-hacks-admin-license-save' ),
					'revokeNonce' => wp_create_nonce( 'dlx-gb-hacks-admin-license-revoke' ),
				)
			);
		}

		// Enqueue admin styles.
		wp_enqueue_style(
			'dlx-gb-hacks-admin-css',
			Functions::get_plugin_url( 'dist/gb-hacks-admin-css.css' ),
			array(),
			Functions::get_plugin_version(),
			'all'
		);
	}

	/**
	 * Render the admin page.
	 */
	public function admin_page() {
		?>
		<div class="dlx-gb-hacks-admin-wrap">
			<header class="dlx-gb-hacks-admin-header">
				<div class="dlx-gb-hacks-logo-wrapper">
					<div class="dlx-gb-hacks-logo">
						<h2 id="dlx-gb-hacks-admin-header">
							<img src="<?php echo esc_url( Functions::get_plugin_url( 'assets/img/logo.png' ) ); ?>" alt="GenerateBlocks Hacks" />
						</h2>
					</div>
					<div class="header__btn-wrap">
						<a href="<?php echo esc_url( 'https://docs.dlxplugins.com/v/gb-hacks/' ); ?>" target="_blank" rel="noopener noreferrer" class="has__btn-primary"><?php esc_html_e( 'Docs', 'dlx-gb-hacks' ); ?></a>
						<a href="<?php echo esc_url( 'https://dlxplugins.com/support/' ); ?>" target="_blank" rel="noopener noreferrer" class="has__btn-primary"><?php esc_html_e( 'Support', 'dlx-gb-hacks' ); ?></a>
					</div>
				</div>
			</header>
			<?php
			$current_tab        = Functions::get_admin_tab();
			$settings_tab_class = array( 'nav-tab' );
			if ( null === $current_tab || 'settings' === $current_tab ) {
				$settings_tab_class[] = 'nav-tab-active';
			}
			$license_tab_class = array( 'nav-tab' );
			if ( 'license' === $current_tab ) {
				$license_tab_class[] = 'nav-tab-active';
			}
			$help_tab_class = array( 'nav-tab' );
			if ( 'help' === $current_tab ) {
				$help_tab_class[] = 'nav-tab-active';
			}
			?>
			<main class="dlx-gb-hacks-admin-body-wrapper">
				<div class="has-admin-container-body">
					<nav class="nav-tab-wrapper">
						<a  class="<?php echo esc_attr( implode( ' ', $settings_tab_class ) ); ?>" href="<?php echo esc_url( Functions::get_settings_url() ); ?>"><?php esc_html_e( 'Settings', 'dlx-gb-hacks' ); ?></a>
						<a  class="<?php echo esc_attr( implode( ' ', $license_tab_class ) ); ?>" href="<?php echo esc_url( Functions::get_settings_url( 'license' ) ); ?>"><?php esc_html_e( 'License', 'dlx-gb-hacks' ); ?></a>
					</nav>
				</div>
				<div class="dlx-gb-hacks-body__content">
					<?php
					if ( null === $current_tab || 'settings' === $current_tab ) {
						?>
							<div id="dlx-gb-hacks"></div>
						<?php
					} elseif ( 'license' === $current_tab ) {
						?>
							<div id="dlx-gb-hacks-license"></div>
						<?php
					}
					?>
				</div>
			</main>
		</div>
		<?php
	}
}
