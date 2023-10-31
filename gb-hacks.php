<?php
/**
 * Plugin Name:       GB Hacks
 * Plugin URI:        https://dlxplugins.com/plugins/gb-hacks/
 * Description:       A collection of enhancements for the GenerateBlocks plugins.
 * Version:           1.0.0
 * Requires at least: 5.9
 * Requires PHP:      7.2
 * Author:            DLX Plugins
 * Author URI:        https://dlxplugins.com
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       gb-hacks
 * Domain Path:       /languages
 *
 * @package GBHacks
 */

namespace DLXPlugins\GBHacks;

define( 'GB_HACKS_VERSION', '1.0.0' );
define( 'GB_HACKS_FILE', __FILE__ );

// Support for site-level autoloading.
if ( file_exists( __DIR__ . '/lib/autoload.php' ) ) {
	require_once __DIR__ . '/lib/autoload.php';
}

/**
 * GBHacks class.
 */
class GBHacks {

	/**
	 * Holds the class instance.
	 *
	 * @var GBHacks $instance
	 */
	private static $instance = null;

	/**
	 * Return an instance of the class
	 *
	 * Return an instance of the ReflectorDLX Class.
	 *
	 * @since 1.0.0
	 *
	 * @return GBHacks class instance.
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
			'gb-hacks',
			false,
			basename( __DIR__ ) . '/languages'
		);

		Blocks::run();

		/**
		 * When GBHacks can be extended.
		 *
		 * Filter when GBHacks can be extended.
		 *
		 * @since 1.0.0
		 */
		do_action( 'gb_hacks_loaded' );
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
		$alerts_dlx = GBHacks::get_instance();
		$alerts_dlx->plugins_loaded();
	}
);
