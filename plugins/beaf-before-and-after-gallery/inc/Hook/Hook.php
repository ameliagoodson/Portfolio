<?php
// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

class Hook {

	public function init() {
		/**
		 * Include wp plugin.php file 
		 */
		if ( ! function_exists( 'is_plugin_active' ) ) {
			require_once ABSPATH . 'wp-admin/includes/plugin.php';
		}

		/**
		 * Include admin function file
		 */
		if ( defined( 'BEAF_ADMIN_PATH' ) && ! empty( BEAF_ADMIN_PATH ) ) {
			require_once BEAF_ADMIN_PATH . 'inc/functions.php';
		}

		/**
		 * Option framework include
		 */
		if ( defined( 'BEAF_OPTIONS_PATH' ) && ! empty( BEAF_OPTIONS_PATH ) ) {
			require_once BEAF_OPTIONS_PATH . 'BEAF_Options.php';
		} else {
			self::beaf_file_missing( BEAF_OPTIONS_PATH . 'BEAF_Options.php' );
		}

		/*
		 * Enqueue css and js for BAFG
		 */

		require_once( BEAF_PLUGIN_PATH . 'inc/Hook/LoadAssets.php' );
		$loadAssets = new LoadAssest();

		add_action( 'wp_enqueue_scripts', array( $loadAssets, 'bafg_image_before_after_foucs_scripts' ), 999 );

		// Check if Elementor installed and activated
		if ( did_action( 'elementor/loaded' ) ) {
			add_action( 'elementor/editor/before_enqueue_scripts', [ $loadAssets,'bafg_image_before_after_foucs_scripts' ] ); 
		}

		/*
		 * BAFG init
		 */
		require_once( BEAF_INC_PATH . 'Hook/PostType.php' );
		add_action( 'init', array( new PostType, 'bafg_image_before_after_foucs_posttype' ) );

		/**
		 * Register Meta box For
		 */
		add_action( 'add_meta_boxes', array( new PostType, 'bafg_add_slider_metabox' ) );

		/*
		 * Require admin file
		 */
		if ( is_admin() ) {
			require_once( BEAF_PLUGIN_PATH . 'admin/bafg-admin.php' );
		}

		require_once( BEAF_INC_PATH . 'Hook/Shortcode.php' );
		new BAFG_Shortcode();

		/*
		 * Submenu for pro version
		 */
		require_once( BEAF_INC_PATH . 'Hook/AdminMenu.php' );
		add_action( 'admin_menu', array( new AdminMenu, 'bafg_register_menu_page' ) );

		/*
		 * Require bafg wp widget
		 */
		require_once( BEAF_PLUGIN_PATH . 'inc/widget/bafg-widget.php' );

		/*
		 * Require function file
		 */
		require_once( BEAF_PLUGIN_PATH . 'inc/functions.php' );

		/*
		 * Require elementor widget
		 */
		require_once( BEAF_PLUGIN_PATH . 'inc/bafg-elementor/bafg-elementor.php' );

		/* 
		 * Filter the single_template with our custom function
		 */
		add_filter( 'single_template', array( $this, 'bafg_custom_single_template' ) );

		//enqueue scripts
		add_action( 'admin_enqueue_scripts', [ $loadAssets, 'BEAF_tourfic_admin_denqueue_script' ], 20 );
	}

	public function bafg_custom_single_template( $single ) {

		global $post;

		/* Checks for single template by post type */
		if ( $post->post_type == 'bafg' ) {
			if ( file_exists( BEAF_PLUGIN_PATH . 'inc/templates/single-bafg.php' ) ) {
				return BEAF_PLUGIN_PATH . 'inc/templates/single-bafg.php';
			}
		}
		return $single;
	}

	/**
	 * File missing notice
	 * @author Abu Hena
	 * @since 5.0.0
	 */
	public static function beaf_file_missing( $files = '' ) {
		if ( is_admin() ) {
			if ( ! empty( $files ) ) {
				$class = 'notice notice-error';
				$message = '<strong>' . $files . '</strong>' . __( ' file is missing! It is required to function properly!', 'bafg' );
				printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), esc_attr( $message ) );

			}
		}
	}

	/**
	 * Global Admin Get Option
	 */
	public static function beaf_opt( $option = '', $default = null ) {
		$options = get_option( 'beaf_settings' );
		return ( isset( $options[ $option ] ) ) ? $options[ $option ] : $default;
	}


}