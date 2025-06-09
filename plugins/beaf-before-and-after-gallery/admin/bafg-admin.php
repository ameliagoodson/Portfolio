<?php

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) {
	exit();
}

class BAFG_Options {

	public function __construct()
	{
		/*
		* Enqueue css and js for bafg
		*/
		add_action( 'admin_enqueue_scripts', [ $this , 'bafg_admin_enqueue_scripts'] );

		/**
		 * admin column
		 */
		add_filter( 'manage_bafg_posts_columns', [ $this , 'bafg_custom_columns'], 10 );
		add_action( 'manage_posts_custom_column', [ $this ,'bafg_custom_columns_image'], 10, 2 );
		add_action( 'manage_posts_custom_column', [ $this ,'bafg_custom_columns_shortcode'], 10, 2 );

		/*
		* Adding gallery column
		*/
		add_filter( "manage_edit-bafg_gallery_columns", [ $this , 'bafg_gallery_columns'] );
		add_filter( 'manage_bafg_gallery_custom_column', [ $this ,'bafg_gallery_column_content'], 10, 3 );

		/*
		* Shortcode copied alert text
		*/
		add_action( 'admin_footer', [$this, 'beaf_footer_toast']);

		/**
		 * Admin Notice
		 */
		add_action( 'admin_notices', [$this, 'bafg_new_feature_notice'] );
		add_action( 'admin_init', [$this,'bafg_new_feature_notice_dismissed'] );
		
	}

	public function beaf_footer_toast(){
		$screen = get_current_screen();

		if ( 'bafg' === $screen->post_type || 'edit-bafg_taxonomy' === $screen->taxonomy ) {
			echo '<div id="bafg_copy">' . esc_html__( 'Shortcode Copied!', 'bafg' ) . '</div>';
		}
	}

	/**
	 * Enqueue script in admin area
	 */
	public function bafg_admin_enqueue_scripts( $screen ) {
		global $post_type;
		$tf_options_screens = array(
			'bafg_page_beaf_settings',
			'bafg_page_bafg_gallery',
			'bafg_page_bafg-pro-license',
		);
		$tf_options_post_type = array( 'bafg' );

		if ( in_array( $screen, $tf_options_screens ) || in_array( $post_type, $tf_options_post_type ) ) {
			wp_enqueue_style( 'beaf-admin-options', BEAF_ASSETS_URL . 'css/beaf-admin-options.css', array() );

			wp_enqueue_script( 'beaf-options', BEAF_ASSETS_URL . 'js/beaf-options.js', array( 'jquery' ), true );

			wp_localize_script( 'beaf-options', 'beaf_options', array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce' => wp_create_nonce( 'beaf_option_nonce' ),
			) );

			// Enqueue styles
			wp_enqueue_style( 'beaf-notyf', BEAF_ASSETS_URL . 'libs/notyf/notyf.min.css', array() );
			wp_enqueue_style( 'bafg_admin_style', plugins_url( '../assets/css/bafg-admin-style.css', __FILE__ ), array() );

			// Enqueue scripts
			wp_enqueue_script( 'wp-color-picker-alpha', plugins_url( '../assets/js/wp-color-picker-alpha.min.js', __FILE__ ), array( 'wp-color-picker' ), true );
			wp_enqueue_script( 'beaf-notyf', BEAF_ASSETS_URL . 'libs/notyf/notyf.min.js', array( 'jquery' ), true );

			wp_enqueue_script( 'beaf-admin', plugins_url( '../assets/js/bafg-script.js', __FILE__ ), array( 'jquery', 'wp-color-picker', 'wp-color-picker-alpha' ), true );
			wp_localize_script( 'beaf-admin', 'beaf_options', array(
				'ajax_url' => admin_url( 'admin-ajax.php' ),
				'nonce' => wp_create_nonce( 'beaf_options_nonce' ),
			) );

			wp_localize_script('beaf-admin', 'beaf_admin_data', [
				'beaf_nonce' => wp_create_nonce('beaf_admin_nonce'),
				'themefic_nonce' => wp_create_nonce('themefic_plugin_nonce'),
			]);

			if ( ! wp_script_is( 'jquery-ui-sortable' ) ) {
				wp_enqueue_script( 'jquery-ui-sortable' );
			}

		}
	}

	/**
	 * Manage beaf posts column
	 */
	public function bafg_custom_columns( $columns ) {
		$columns = array(
			'cb' => '<input type="checkbox" />',
			'title' => esc_html__( 'Title', 'bafg' ),
			'bafg_shortcode' => esc_html__( 'Shortcode', 'bafg' ),
			'bimage' => esc_html__( 'Before Image', 'bafg' ),
			'second_image' => esc_html__( 'Middle Image', 'bafg' ),
			'aimage' => esc_html__( 'After Image', 'bafg' ),
			'date' => __( 'Date' )
		);
		return $columns;
	}

	/**
	 * Manage beaf posts image column
	 */
	public function bafg_custom_columns_image( $column_name, $id ) {

		$meta = ! empty( get_post_meta( $id, 'beaf_meta', true ) ) ? get_post_meta( $id, 'beaf_meta', true ) : '';
	
		//After Image column in posts
		if ( $column_name === 'bimage' ) {
	
			$bafg_before_after_method = ! empty( $meta['bafg_before_after_method'] ) ? $meta['bafg_before_after_method'] : 'method_1';
	
			if ( is_plugin_active( 'beaf-before-and-after-gallery-pro/before-and-after-gallery-pro.php' ) ) {
	
				if ( $bafg_before_after_method == 'method_2' ) {
	
					$image_url = ! empty( $meta['bafg_before_after_image'] ) ? $meta['bafg_before_after_image'] : '';
	
				} else if ( $bafg_before_after_method == 'method_3' ) {
	
					$image_url = ! empty( $meta['bafg_first_image'] ) ? $meta['bafg_first_image'] : '';
				} else {
					$image_url = ! empty( $meta['bafg_before_image'] ) ? $meta['bafg_before_image'] : '';
	
				}
			} else {
				$image_url = ! empty( $meta['bafg_before_image'] ) ? $meta['bafg_before_image'] : '';
			}
	
			$image_id = attachment_url_to_postid( $image_url );
			$before_image = wp_get_attachment_image( $image_id, 'thumbnail' );
			echo wp_kses_post( $before_image );
		}
	
		//After Image column in posts
		if ( $column_name === 'aimage' ) {
	
			$bafg_before_after_method = ! empty( $meta['bafg_before_after_method'] ) ? $meta['bafg_before_after_method'] : 'method_1';
	
			if ( is_plugin_active( 'beaf-before-and-after-gallery-pro/before-and-after-gallery-pro.php' ) ) {
	
				if ( $bafg_before_after_method == 'method_2' ) {
	
					$image_url = ! empty( $meta['bafg_before_after_image'] ) ? $meta['bafg_before_after_image'] : '';
	
				} else if ( $bafg_before_after_method == 'method_3' ) {
	
					$image_url = ! empty( $meta['bafg_third_image'] ) ? $meta['bafg_third_image'] : '';
				} else {
					$image_url = ! empty( $meta['bafg_after_image'] ) ? $meta['bafg_after_image'] : '';
				}
			} else {
				$image_url = ! empty( $meta['bafg_after_image'] ) ? $meta['bafg_after_image'] : '';
			}
	
			$image_id = attachment_url_to_postid( $image_url );
			$after_image = wp_get_attachment_image( $image_id, 'thumbnail' );
			echo wp_kses_post( $after_image );
		}
	
	
	
		//Middle Image column in posts
		if ( $column_name === 'second_image' ) {
	
			$bafg_before_after_method = ! empty( $meta['bafg_before_after_method'] ) ? $meta['bafg_before_after_method'] : 'method_1';
	
			if ( is_plugin_active( 'beaf-before-and-after-gallery-pro/before-and-after-gallery-pro.php' ) ) {
	
				if ( $bafg_before_after_method == 'method_3' ) {
	
					$image_url = ! empty( $meta['bafg_second_image'] ) ? $meta['bafg_second_image'] : '';
					$image_id = attachment_url_to_postid( $image_url );
					$second_image = wp_get_attachment_image( $image_id, 'thumbnail' );
				} else {
					return;
				}
				echo wp_kses_post( $second_image );
			}
	
		}
	
	
	}

	/**
	 * Manage beaf posts shortcode column
	 */
	public function bafg_custom_columns_shortcode( $column_name, $id ) {
		if ( $column_name === 'bafg_shortcode' ) {
			$post_id = $id;
			$shortcode = '[bafg id="' . $post_id . '"]';
			echo '<input type="text" name="bafg_display_shortcode" class="bafg_display_shortcode" value="' . esc_attr( $shortcode ) . '" readonly ">';
	
		}
	}

	/*
	* Gallery category column
	*/
	public function bafg_gallery_columns( $theme_columns ) {
		$theme_columns['bafg_gallery'] = 'Gallery Shortcode';
		return $theme_columns;
	}

	/*
	* Gallery category column content
	*/
	public function bafg_gallery_column_content( $content, $column_name, $term_id ) {
		switch ( $column_name ) {
			case 'bafg_gallery':
				$content = '<input class="bafg_display_shortcode" type="text" value="[bafg_gallery category=' . $term_id . ']" readonly >';
				break;
		}
		return $content;
	}

	/*
	* Admin notice for new features
	*/
	public function bafg_new_feature_notice() {
		$user_id = get_current_user_id();

		if ( class_exists( 'WooCommerce' ) && ! class_exists( 'Before_After_Gallery_WooCommerce' ) ) {

			if ( ! get_user_meta( $user_id, 'bafg_woo_new_feature_notice_dismissed', true ) ) {
				?>
				<div class="notice notice-success">
					<h2><?php echo esc_html__( 'It looks like you have WooCommerce plugin installed.', 'bafg' ); ?></h2>
					<p><?php echo esc_html__( 'If you want to use before after slider on the WooCommerce product page, you can try our free plugin', 'bafg' ); ?>
						<a href="<?php echo esc_url( admin_url( '/plugin-install.php?s=ebeaf&tab=search&type=term' ) ); ?>"> Before
							After
							for WooCommerce</a>
					</p>
					<p><a class="button"
							href="<?php echo esc_url( wp_nonce_url( admin_url( '?bafg-woo-dismissed' ), 'bafg-woo-dismissed-nonce' ) ); ?>">Close
							this Notice</a></p>
				</div>
				<?php
			}

		}

	}

	/*
	* Admin notice for new features dismissed
	*/
	public function bafg_new_feature_notice_dismissed() {
		if ( ! isset( $_GET['_wpnonce'] ) || ! wp_verify_nonce( esc_html( $_GET['_wpnonce'] ), 'bafg-woo-dismissed-nonce' ) ) {
			return;
		} else {

			$user_id = get_current_user_id();

			if ( isset( $_GET['bafg-woo-dismissed'] ) ) {
				add_user_meta( $user_id, 'bafg_woo_new_feature_notice_dismissed', 'true', true );
			}
		}

	}

}

new BAFG_Options();
