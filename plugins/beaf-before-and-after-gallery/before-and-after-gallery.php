<?php
/**
 * Plugin Name: BEAF - Ultimate Before After Image Slider & Gallery
 * Plugin URI: https://themefic.com/plugins/beaf/
 * Description: Would you like to show a comparison of two images? With BEAF, you can easily create before and after image sliders or galleries. Elementor Supported.
 * Version: 4.7.1
 * Tested up to: 6.8
 * Author: Themefic
 * Author URI: https://themefic.com/
 * License: GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain: bafg
 * Domain Path: /languages
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

class BAFG_Before_After_Gallery {

	public function __construct() {

		$this->define_constants();

		add_action( 'plugins_loaded', array( $this, 'init_plugin' ) );

	}

	/**
	 * define all necessary constants
	 */
	public function define_constants() {
		define( 'BEAF_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
		define( 'BEAF_VERSION', '4.7.1' );
		define( 'BEAF_ADMIN_PATH', BEAF_PLUGIN_PATH . 'admin/' );
		define( 'BEAF_INC_PATH', BEAF_PLUGIN_PATH . 'inc/' );
		define( 'BEAF_OPTIONS_PATH', BEAF_ADMIN_PATH . 'tf-options/' );
		define( 'BAFG_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
		define( 'BEAF_ASSETS_URL', BAFG_PLUGIN_URL . 'assets/' );
		define( 'BAFG_PLUGIN_PATH', BEAF_PLUGIN_PATH );
	}

	/**
	 * Initializes a singleton instance
	 *
	 * @return \BAFG_Before_After_Gallery
	 */
	public static function init() {
		static $instance = false;

		if ( ! $instance ) {
			$instance = new self();
		}

		return $instance;
	}

	/**
	 * Initialize the plugin
	 * 
	 * @return void
	 */
	public function init_plugin() {
		/*
		 * Require admin hook file
		 */
		require_once( 'inc/Hook/Hook.php' );

		$hook = new Hook;
		$hook->init();

	}

}

/**
 * Initializes the main plugin
 * @return \BAFG_Before_After_Gallery
 */
function beaf_gallery_slider() {
	return BAFG_Before_After_Gallery::init();
}

// kick-off the plugin
beaf_gallery_slider();
