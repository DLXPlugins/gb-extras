<?php
/**
 * Plugin Name:       GB Extras
 * Plugin URI:        https://dlxplugins.com/plugins/gb-extras/
 * Description:       A collection of enhancements for the GenerateBlocks plugins.
 * Version:           1.5.0
 * Requires at least: 5.9
 * Requires PHP:      7.2
 * Author:            DLX Plugins
 * Author URI:        https://dlxplugins.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gb-extras
 * Domain Path:       /languages
 * Requires Plugins: generateblocks
 *
 * @package GBExtras
 */

namespace DLXPlugins\GBExtras;

define( 'GB_EXTRAS_VERSION', '1.5.0' );
define( 'GB_EXTRAS_FILE', __FILE__ );
define( 'GB_EXTRAS_PRODUCT_ID', 37604 );

// Support for site-level autoloading.
if ( file_exists( __DIR__ . '/lib/autoload.php' ) ) {
	require_once __DIR__ . '/lib/autoload.php';
}

/**
 * GBExtras class.
 */
class GBExtras {

	/**
	 * Holds the class instance.
	 *
	 * @var GBExtras $instance
	 */
	private static $instance = null;

	/**
	 * Return an instance of the class
	 *
	 * Return an instance of the ReflectorDLX Class.
	 *
	 * @since 1.0.0
	 *
	 * @return GBExtras class instance.
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
			'gb-extras',
			false,
			basename( __DIR__ ) . '/languages'
		);

		Blocks::run();

		$admin = new Admin();
		$admin->run();

		/**
		 * When GBExtras can be extended.
		 *
		 * Filter when GBExtras can be extended.
		 *
		 * @since 1.0.0
		 */
		do_action( 'gb_extras_loaded' );
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
		$gb = GBExtras::get_instance();
		$gb->plugins_loaded();
	}
);
