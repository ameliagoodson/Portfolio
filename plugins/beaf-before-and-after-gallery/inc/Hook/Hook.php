<?php
// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

class Hook {

	public function init() {

		/**
		 * We delay including ANY plugin file that might use translations
		 * until init/admin_init/etc. This prevents early __() calls.
		 */

		// Core helper (safe to load on init very early)
		add_action( 'init', function() {
			if ( ! function_exists( 'is_plugin_active' ) ) {
				require_once ABSPATH . 'wp-admin/includes/plugin.php';
			}
		}, 0 );

		/**
		 * Admin helpers/functions that might localize strings.
		 */
		add_action( 'init', function() {
			if ( defined( 'BEAF_ADMIN_PATH' ) && ! empty( BEAF_ADMIN_PATH ) ) {
				// If this file has any __(), it's now safe.
				require_once BEAF_ADMIN_PATH . 'inc/functions.php';
			}
		}, 5 );


		/**
		 * Option framework — IMPORTANT:
		 * Include and instantiate ONLY after init so its constructor
		 * and metabox loader (which require files using __()) run late.
		 */
		add_action( 'init', function() {
			if ( defined( 'BEAF_OPTIONS_PATH' ) && ! empty( BEAF_OPTIONS_PATH ) ) {
				require_once BEAF_OPTIONS_PATH . 'BEAF_Options.php';
				// Instance now created AFTER init → safe for translations.
				if ( class_exists( 'BEAF_Options' ) ) {
					BEAF_Options::instance();
				}
			} else {
				// Show missing file notice after init (safe for translations)
				self::beaf_file_missing( BEAF_OPTIONS_PATH . 'BEAF_Options.php' );
			}
		}, 6 );

		/**
		 * Register Post Type on init (as WP expects).
		 * Include file INSIDE the hook to avoid top-level __() early calls.
		 */
		add_action( 'init', function() {
			require_once BEAF_INC_PATH . 'Hook/PostType.php';
			if ( class_exists( 'PostType' ) ) {
				(new PostType)->bafg_image_before_after_foucs_posttype();
			}
		}, 8 );

		/**
		 * Register Meta Boxes.
		 * Include file inside the hook to avoid early translations in that file.
		 */
		add_action( 'add_meta_boxes', function() {
			require_once BEAF_INC_PATH . 'Hook/PostType.php';
			if ( class_exists( 'PostType' ) ) {
				(new PostType)->bafg_add_slider_metabox();
			}
		} );

		/**
		 * Shortcodes — many shortcode classes use __() in labels.
		 */
		add_action( 'init', function() {
			require_once BEAF_INC_PATH . 'Hook/Shortcode.php';
			if ( class_exists( 'BAFG_Shortcode' ) ) {
				new BAFG_Shortcode();
			}
		}, 9 );

		/**
		 * Admin Menu — include inside the hook.
		 */
		add_action( 'admin_menu', function() {
			require_once BEAF_INC_PATH . 'Hook/AdminMenu.php';
			if ( class_exists( 'AdminMenu' ) ) {
				(new AdminMenu)->bafg_register_menu_page();
			}
		} );

		/**
		 * Widgets — include and register at widgets_init.
		 */
		require_once( BEAF_PLUGIN_PATH . 'inc/widget/bafg-widget.php' );

		/**
		 * Admin-only file(s) — defer until admin_init.
		 */
		if ( is_admin() ) {
			require_once( BEAF_PLUGIN_PATH . 'admin/bafg-admin.php' );
		}

		/*
		 * Require function file
		 */
		add_action( 'init', function() {

			require_once( BEAF_PLUGIN_PATH . 'inc/functions.php' );

		}, 99 );

		/**
		 * Elementor integration — include after init as well.
		 * (Its internal hooks will wire up with Elementor when available.)
		 */
		require_once( BEAF_PLUGIN_PATH . 'inc/bafg-elementor/bafg-elementor.php' );

		
		/**
		 * Frontend assets — include loader only when enqueuing.
		 */
		add_action( 'wp_enqueue_scripts', function() {
			require_once BEAF_PLUGIN_PATH . 'inc/Hook/LoadAssets.php';
			if ( class_exists( 'LoadAssest' ) ) {
				$loader = new LoadAssest();
				$loader->bafg_image_before_after_foucs_scripts();
			}
		}, 999 );

		

		/**
		 * Elementor editor assets — safe: the action only fires when Elementor is loaded.
		 */
		require_once( BEAF_PLUGIN_PATH . 'inc/Hook/LoadAssets.php' );
		$loadAssets = new LoadAssest();

		if ( did_action( 'elementor/loaded' ) ) {
			add_action( 'elementor/editor/before_enqueue_scripts', [ $loadAssets,'bafg_image_before_after_foucs_scripts' ] ); 
		}

		/**
		 * Admin assets.
		 */
		add_action( 'admin_enqueue_scripts', function( $hook ) {
			require_once BEAF_PLUGIN_PATH . 'inc/Hook/LoadAssets.php';
			if ( class_exists( 'LoadAssest' ) ) {
				$loader = new LoadAssest();
				$loader->BEAF_tourfic_admin_denqueue_script( $hook );
			}
		}, 20 );

		/**
		 * Template override filter (safe; only checks file existence).
		 */
		add_filter( 'single_template', array( $this, 'bafg_custom_single_template' ) );
	}

	public function bafg_custom_single_template( $single ) {
		global $post;
		if ( $post && $post->post_type === 'bafg' ) {
			$template = BEAF_PLUGIN_PATH . 'inc/templates/single-bafg.php';
			if ( file_exists( $template ) ) {
				return $template;
			}
		}
		return $single;
	}

	/**
	 * File missing notice — runs after init so translations are safe.
	 */
	public static function beaf_file_missing( $files = '' ) {
		if ( is_admin() && ! empty( $files ) ) {
			$class   = 'notice notice-error';
			$message = '<strong>' . esc_html( $files ) . '</strong>' . ' ' . esc_html__( 'file is missing! It is required to function properly!', 'bafg' );
			printf( '<div class="%1$s"><p>%2$s</p></div>', esc_attr( $class ), $message );
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
