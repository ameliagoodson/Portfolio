<?php
// Exit if accessed directly
if (!defined('ABSPATH')) {
	exit();
}

class LoadAssest{

    /*
	 * Enqueue css and js in frontend
	 */
	public function bafg_image_before_after_foucs_scripts() {
		$version = time();

		wp_register_style( 'bafg_twentytwenty', BEAF_ASSETS_URL . 'css/twentytwenty.css', array(), BEAF_VERSION );
		wp_register_style( 'bafg-style', BEAF_ASSETS_URL . 'css/bafg-style.css', array(), BEAF_VERSION );

		$debug_mode = is_array( get_option( 'beaf_settings' ) ) && ! empty( get_option( 'beaf_settings' )['enable_debug_mode'] ) ? get_option( 'beaf_settings' )['enable_debug_mode'] : '';

		$in_footer = false;
		if ( ! empty( $debug_mode ) ) {
			$in_footer = true;
		}

		wp_register_script( 'eventMove', BEAF_ASSETS_URL . 'js/jquery.event.move.js', array( 'jquery' ), BEAF_VERSION, $in_footer );
		wp_register_script( 'bafg_twentytwenty', BEAF_ASSETS_URL . 'js/jquery.twentytwenty.js', array( 'jquery', 'eventMove' ), BEAF_VERSION, $in_footer );
		wp_register_script( 'bafg_custom_js', BEAF_ASSETS_URL . 'js/bafg-custom-js.js', array( 'jquery', 'bafg_twentytwenty' ), BEAF_VERSION, true );

		/*
		 *  Localize the script
		 *  Return @perams
		 */
		wp_localize_script( 'bafg_custom_js', 'bafg_constant_obj',
			array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'site_url' => BEAF_PLUGIN_PATH
			)
		);

	}


    /*
	 *Admin setting option dequeue 
	 */
	public function BEAF_tourfic_admin_denqueue_script( $screen ) {
		global $post_type;
		$BEAF_options_screens = array(
			'bafg_page_beaf_settings',
			'bafg_page_bafg-pro-license',
		);
		$Beaf_options_post_type = array( 'bafg' );
		
		//The tourfic admin js Listings Directory Compatibility
		if ( in_array( $screen, $BEAF_options_screens ) || in_array( $post_type, $Beaf_options_post_type ) ) {
			wp_dequeue_style( 'tf-admin' );
			wp_deregister_style( 'tf-admin' );
			wp_dequeue_style( 'tf-pro' );
			wp_dequeue_script( 'tf-pro' );
			wp_deregister_script('tf-pro');
		}
	}
    

}