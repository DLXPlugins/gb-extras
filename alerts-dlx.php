<?php
/**
 * Plugin Name:       AlertsDLX
 * Plugin URI:        https://dlxplugins.com/plugins/alertsdlx/
 * Description:       Create beautiful and impactful alerts and notifications in your content, inspired by Bootstrap, Material, Chakra UI, and Shoelace.
 * Version:           1.3.1
 * Requires at least: 5.9
 * Requires PHP:      7.2
 * Author:            DLX Plugins
 * Author URI:        https://dlxplugins.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       alerts-dlx
 * Domain Path:       /languages
 *
 * @package AlertsDLX
 */

namespace DLXPlugins\AlertsDLX;

define( 'ALERTS_DLX_VERSION', '1.3.1' );
define( 'ALERTS_DLX_FILE', __FILE__ );

// Support for site-level autoloading.
if ( file_exists( __DIR__ . '/lib/autoload.php' ) ) {
	require_once __DIR__ . '/lib/autoload.php';
}

/**
 * AlertsDLX class.
 */
class AlertsDLX {

	/**
	 * Holds the class instance.
	 *
	 * @var AlertsDLX $instance
	 */
	private static $instance = null;

	/**
	 * Return an instance of the class
	 *
	 * Return an instance of the ReflectorDLX Class.
	 *
	 * @since 1.0.0
	 *
	 * @return AlertsDLX class instance.
	 */
	public static function get_instance() {
		if ( null === self::$instance ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Class initializer.
	 */
	public function plugins_loaded() {
		load_plugin_textdomain(
			'alerts-dlx',
			false,
			basename( __DIR__ ) . '/languages'
		);

		Blocks::run();

		/**
		 * When AlertsDLX can be extended.
		 *
		 * Filter when AlertsDLX can be extended.
		 *
		 * @since 1.0.0
		 */
		do_action( 'alerts_dlx_loaded' );
	}

	/**
	 * Init all the things.
	 */
	public function init() {

		// Nothing here yet.
	}
}

add_action(
	'plugins_loaded',
	function () {
		$alerts_dlx = AlertsDLX::get_instance();
		$alerts_dlx->plugins_loaded();
	}
);

// Custom the_content filter for output and no conflicts.
global $wp_embed;
add_filter( 'alerts_dlx_the_content', array( $wp_embed, 'run_shortcode' ), 8 );
add_filter( 'alerts_dlx_the_content', array( $wp_embed, 'autoembed' ), 8 );
add_filter( 'alerts_dlx_the_content', 'wptexturize' );
add_filter( 'alerts_dlx_the_content', 'convert_chars' );
add_filter( 'alerts_dlx_the_content', 'wpautop' );
add_filter( 'alerts_dlx_the_content', 'shortcode_unautop' );
add_filter( 'alerts_dlx_the_content', 'do_shortcode' );
