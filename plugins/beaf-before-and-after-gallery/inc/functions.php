<?php
//all functions goes here

// Beaf Plugins Print_r
if ( ! function_exists( 'beaf_print_r' ) ) {
	function beaf_print_r( ...$args ) {
		foreach($args as $value){
			echo '<pre>';
			print_r( $value );
			echo '</pre>';
		}

	}
}

/**
 * Black Friday Deals 2023
 */

//Require ultimate Promo Notice
if ( file_exists( __DIR__ . '/class-promo-notice.php' ) ) {

	require_once( 'class-promo-notice.php' );
}

// include plugin.php file

include_once( ABSPATH . 'wp-admin/includes/plugin.php' );

add_action( 'bafg_after_slider', 'bafg_slider_info', 10 );

function bafg_slider_info( $id ) {
	$meta = ! empty( get_post_meta( $id, 'beaf_meta', true ) ) ? get_post_meta( $id, 'beaf_meta', true ) : '';
	$bafg_width = ! empty( $meta['bafg_width'] ) ? $meta['bafg_width'] : '';
	$bafg_height = ! empty( $meta['bafg_height'] ) ? $meta['bafg_height'] : '';
	$bafg_slider_alignment = ! empty( $meta['bafg_slider_alignment'] ) ? $meta['bafg_slider_alignment'] : '';

	$bafg_pro_activated = get_option( 'bafg_pro_activated' );
	?>
	<div class="bafg-slider-info-wraper">
		<div style="<?php if ( $bafg_pro_activated == 'true' ) {
			if ( $bafg_width != '' ) {
				echo 'width: ' . esc_attr( $bafg_width ) . ';';
			} ?> <?php if ( $bafg_width != '' && $bafg_slider_alignment == 'right' ) {
				  echo ' float: right;';
			  } ?> <?php if ( $bafg_width == '' && $bafg_slider_alignment == 'right' ) {
					echo ' float: right; width: 100%;';
				} ?> <?php if ( $bafg_slider_alignment == 'center' ) {
					  echo ' margin: 0 auto;';
				  }
		} ?>" class="<?php echo esc_attr( 'slider-info-' . $id . '' ); ?> bafg-slider-info">
			<?php
			$bafg_slider_title = ! empty( $meta['bafg_slider_title'] ) ? $meta['bafg_slider_title'] : '';
			if ( trim( $bafg_slider_title ) != '' ) :
				?>
				<h2 class="bafg-slider-title"><?php echo esc_html__( $bafg_slider_title, 'bafg' ); ?></h2>
				<?php
			endif;

			$bafg_slider_description = ! empty( $meta['bafg_slider_description'] ) ? $meta['bafg_slider_description'] : '';

			if ( trim( $bafg_slider_description ) != '' ) :
				?>
				<div class="bafg-slider-description">
					<?php
					echo esc_html__( $bafg_slider_description, "bafg" );
					?>
				</div>
				<?php
			endif;

			$bafg_readmore_link = ! empty( $meta['bafg_readmore_link'] ) ? $meta['bafg_readmore_link'] : '';
			if ( trim( $bafg_readmore_link ) != '' ) :
				?>
				<div class="bafg_slider_readmore_button_wrap">
					<?php
					$bafg_readmore_link_target = ! empty( $meta['bafg_readmore_link_target'] ) ? $meta['bafg_readmore_link_target'] : '';
					$bafg_pro_activated = get_option( 'bafg_pro_activated' );

					$bafg_readmore_text = esc_html__( 'Read more', 'bafg' );
					if ( $bafg_pro_activated == 'true' ) {
						$bafg_readmore_text = ! empty( $meta['bafg_readmore_text'] ) ? $meta['bafg_readmore_text'] : esc_html__( 'Read more', 'bafg' );

					}
					?>
					<a href="<?php echo esc_url( $bafg_readmore_link ); ?>" class="bafg_slider_readmore_button" <?php if ( $bafg_readmore_link_target == 'new_tab' )
						   echo 'target="_blank"'; ?>><?php echo esc_html__( $bafg_readmore_text, 'bafg' ); ?></a>
				</div>

			<?php endif; ?>
		</div>
	</div>
	<?php
}


add_action( 'bafg_before_slider', 'bafg_slider_info_styles', 10 );

function bafg_slider_info_styles( $id ) {
	$meta = ! empty( get_post_meta( $id, 'beaf_meta', true ) ) ? get_post_meta( $id, 'beaf_meta', true ) : '';
	// beaf_print_r($meta);
	// exit;
	$bafg_slider_info_heading_font_size = ! empty( $meta['bafg_slider_info_heading_font_size'] ) ? $meta['bafg_slider_info_heading_font_size'] : '22px';

	$bafg_slider_info_heading_alignment = ! empty( $meta['bafg_slider_info_heading_alignment'] ) ? $meta['bafg_slider_info_heading_alignment'] : '';

	$bafg_slider_info_desc_alignment = ! empty( $meta['bafg_slider_info_desc_alignment'] ) ? $meta['bafg_slider_info_desc_alignment'] : '';

	$bafg_slider_info_readmore_alignment = ! empty( $meta['bafg_slider_info_readmore_alignment'] ) ? $meta['bafg_slider_info_readmore_alignment'] : '';

	$bafg_slider_info_readmore_button_padding_top_bottom = ! empty( $meta['bafg_slider_info_readmore_button_padding_top_bottom'] ) ? $meta['bafg_slider_info_readmore_button_padding_top_bottom'] : '';

	$bafg_slider_info_readmore_button_padding_left_right = ! empty( $meta['bafg_slider_info_readmore_button_padding_left_right'] ) ? $meta['bafg_slider_info_readmore_button_padding_left_right'] : '';

	$bafg_slider_info_readmore_button_width = ! empty( $meta['bafg_slider_info_readmore_button_width'] ) ? $meta['bafg_slider_info_readmore_button_width'] : '';

	$bafg_slider_info_heading_font_color = ! empty( $meta['bafg_slider_info_heading_font_color'] ) ? $meta['bafg_slider_info_heading_font_color'] : '';
	$bafg_slider_info_desc_font_size = ! empty( $meta['bafg_slider_info_desc_font_size'] ) ? $meta['bafg_slider_info_desc_font_size'] : '';
	$bafg_slider_info_desc_font_color = ! empty( $meta['bafg_slider_info_desc_font_color'] ) ? $meta['bafg_slider_info_desc_font_color'] : '';
	$bafg_slider_info_readmore_font_size = ! empty( $meta['bafg_slider_info_readmore_font_size'] ) ? $meta['bafg_slider_info_readmore_font_size'] : '';
	$bafg_slider_info_readmore_font_color = ! empty( $meta['bafg_slider_info_readmore_font_color'] ) ? $meta['bafg_slider_info_readmore_font_color'] : '';
	$bafg_slider_info_readmore_bg_color = ! empty( $meta['bafg_slider_info_readmore_bg_color'] ) ? $meta['bafg_slider_info_readmore_bg_color'] : '';
	$bafg_slider_info_readmore_hover_font_color = ! empty( $meta['bafg_slider_info_readmore_hover_font_color'] ) ? $meta['bafg_slider_info_readmore_hover_font_color'] : '';
	$bafg_slider_info_readmore_hover_bg_color = ! empty( $meta['bafg_slider_info_readmore_hover_bg_color'] ) ? $meta['bafg_slider_info_readmore_hover_bg_color'] : '';

	$bafg_slider_info_readmore_border_radius = ! empty( $meta['bafg_slider_info_readmore_border_radius'] ) ? $meta['bafg_slider_info_readmore_border_radius'] : '';

	?>

	<style type="text/css">
		.<?php echo esc_attr( 'slider-info-' . $id . '' ); ?>.bafg-slider-info .bafg-slider-title {
			<?php if ( $bafg_slider_info_heading_font_size != '' ) : ?>
				font-size:
					<?php echo esc_attr( $bafg_slider_info_heading_font_size ); ?>
				;
			<?php endif; ?>

			<?php if ( $bafg_slider_info_heading_font_color != '' ) : ?>
				color:
					<?php echo esc_attr( $bafg_slider_info_heading_font_color ); ?>
				;
			<?php endif; ?>

			<?php if ( $bafg_slider_info_heading_alignment != '' ) : ?>
				text-align:
					<?php echo esc_attr( $bafg_slider_info_heading_alignment ); ?>
				;
			<?php endif; ?>
		}

		.<?php echo esc_attr( 'slider-info-' . $id . '' ); ?>.bafg-slider-info .bafg-slider-description {
			<?php if ( $bafg_slider_info_desc_font_size != '' ) : ?>
				font-size:
					<?php echo esc_attr( $bafg_slider_info_desc_font_size ); ?>
				;
			<?php endif; ?>

			<?php if ( $bafg_slider_info_desc_font_color != '' ) : ?>
				color:
					<?php echo esc_attr( $bafg_slider_info_desc_font_color ); ?>
				;
			<?php endif; ?>

			<?php if ( $bafg_slider_info_desc_alignment != '' ) : ?>
				text-align:
					<?php echo esc_attr( $bafg_slider_info_desc_alignment ); ?>
				;
			<?php endif; ?>
		}
		<?php if ( $bafg_slider_info_readmore_alignment == 'right' ) : ?>
			.<?php echo esc_attr( 'slider-info-' . $id . '' ); ?>.bafg-slider-info .bafg_slider_readmore_button_wrap{
					display: flex;
					justify-content: end;
				}
		<?php endif; ?>

		<?php if ( $bafg_slider_info_readmore_alignment == 'center' ) : ?>
			.<?php echo esc_attr( 'slider-info-' . $id . '' ); ?>.bafg-slider-info .bafg_slider_readmore_button_wrap{
					display: flex;
					justify-content: center;

				}
		<?php endif; ?>

		.<?php echo esc_attr( 'slider-info-' . $id . '' ); ?>.bafg-slider-info .bafg_slider_readmore_button {
			<?php if ( $bafg_slider_info_readmore_font_size != '' ) : ?>
				font-size:
					<?php echo esc_attr( $bafg_slider_info_readmore_font_size ); ?>
				;
			<?php endif; ?>

			<?php if ( $bafg_slider_info_readmore_font_color != '' ) : ?>
				color:
					<?php echo esc_attr( $bafg_slider_info_readmore_font_color ); ?>
				;
			<?php endif; ?>

			<?php if ( $bafg_slider_info_readmore_bg_color != '' ) : ?>
				background-color:
					<?php echo esc_attr( $bafg_slider_info_readmore_bg_color ); ?>
				;
			<?php endif; ?>

			<?php if ( $bafg_slider_info_readmore_bg_color != '' ) : ?>
				border: 1px solid
					<?php echo esc_attr( $bafg_slider_info_readmore_bg_color ); ?>
				;
			<?php endif; ?>

			<?php if ( $bafg_slider_info_readmore_border_radius != '' ) : ?>
				border-radius:
					<?php echo esc_attr( $bafg_slider_info_readmore_border_radius ); ?>
				;
			<?php endif; ?>

			text-align: center;

			<?php if ( $bafg_slider_info_readmore_button_padding_top_bottom != '' ) : ?>
				padding-top:
					<?php echo esc_attr( $bafg_slider_info_readmore_button_padding_top_bottom ); ?>
				;
			<?php endif; ?>

			<?php if ( $bafg_slider_info_readmore_button_padding_top_bottom != '' ) : ?>
				padding-bottom:
					<?php echo esc_attr( $bafg_slider_info_readmore_button_padding_top_bottom ); ?>
				;
			<?php endif; ?>

			<?php if ( $bafg_slider_info_readmore_button_padding_left_right != '' ) : ?>
				padding-left:
					<?php echo esc_attr( $bafg_slider_info_readmore_button_padding_left_right ); ?>
				;
			<?php endif; ?>

			<?php if ( $bafg_slider_info_readmore_button_padding_left_right != '' ) : ?>
				padding-right:
					<?php echo esc_attr( $bafg_slider_info_readmore_button_padding_left_right ); ?>
				;
			<?php endif; ?>

			<?php if ( $bafg_slider_info_readmore_button_width == 'full-width' ) : ?>
				display: block;
				width: 100%;
			<?php endif; ?>
		}

		.<?php echo esc_attr( 'slider-info-' . $id . '' ); ?>.bafg-slider-info .bafg_slider_readmore_button:hover {

			<?php if ( $bafg_slider_info_readmore_hover_font_color != '' ) : ?>
				color:
					<?php echo esc_attr( $bafg_slider_info_readmore_hover_font_color ); ?>
				;
			<?php endif; ?>

			<?php if ( $bafg_slider_info_readmore_hover_bg_color != '' ) : ?>
				background-color:
					<?php echo esc_attr( $bafg_slider_info_readmore_hover_bg_color ); ?>
				;
			<?php endif; ?>

			<?php if ( $bafg_slider_info_readmore_hover_bg_color != '' ) : ?>
				border: 1px solid
					<?php echo esc_attr( $bafg_slider_info_readmore_hover_bg_color ); ?>
				;
			<?php endif; ?>
		}
	</style>
	<?php
}

//get the option value
if ( ! function_exists( 'bafg_option_value' ) ) {
	function bafg_option_value( $name ) {

		$option_value = get_option( 'bafg_watermark' );
		if ( isset( $option_value[ $name ] ) ) {
			return $option_value[ $name ];
		}

	}
}


// Themefic Plugin Set Admin Notice Status
if ( ! function_exists( 'bafg_review_activation_status' ) ) {

	function bafg_review_activation_status() {
		$bafg_installation_date = get_option( 'bafg_installation_date' );
		if ( ! isset( $_COOKIE['bafg_installation_date'] ) && empty( $bafg_installation_date ) && $bafg_installation_date == 0 ) {
			setcookie( 'bafg_installation_date', 1, time() + ( 86400 * 7 ), "/" );
		} else {
			update_option( 'bafg_installation_date', '1' );
		}
	}
	add_action( 'admin_init', 'bafg_review_activation_status' );
}

// Themefic Plugin Review Admin Notice
if ( ! function_exists( 'bafg_review_notice' ) ) {

	function bafg_review_notice() {
		$get_current_screen = get_current_screen();
		if ( $get_current_screen->base == 'dashboard' ) {
			?>
			<div class="notice notice-info themefic_review_notice">
				<p>
					<?php printf(
						/* translators: %s is replaced with "user id & Plugins Name" */
						esc_html__( 'Hey 👋, You have been using %1$s for quite a while. If you feel %1$s is helping your business to grow in any way, would you please help %1$s to grow by simply leaving a 5* review on the WordPress Forum?', 'bafg' ),
						'Ultimate Before After Image Slider & Gallery',
					);
					?>
				</p>
				<ul>
					<li><a target="_blank"
							href="<?php echo esc_url( 'https://wordpress.org/support/plugin/beaf-before-and-after-gallery/reviews/#new-post' ) ?>"
							class=""><span
								class="dashicons dashicons-external"></span><?php esc_attr_e( ' Ok, you deserve it!', 'bafg' ) ?></a>
					</li>
					<li><a href="#" class="already_done" data-status="already"><span class="dashicons dashicons-smiley"></span>
							<?php esc_attr_e( 'I already did', 'bafg' ) ?></a></li>
					<li><a href="#" class="later" data-status="later"><span class="dashicons dashicons-calendar-alt"></span>
							<?php esc_attr_e( 'Maybe Later', 'bafg' ) ?></a></li>
					<li><a target="_blank" href="<?php echo esc_url( 'https://themefic.com/docs/beaf/' ) ?>" class=""><span
								class="dashicons dashicons-sos"></span> <?php esc_attr_e( 'I need help', 'bafg' ) ?></a></li>
					<li><a href="#" class="never" data-status="never"><span
								class="dashicons dashicons-dismiss"></span><?php esc_attr_e( 'Never show again', 'bafg' ) ?> </a></li>
				</ul>
				<button type="button" data-status="never" class="notice-dismiss review_notice_dismiss"><span
						class="screen-reader-text">Dismiss this
						notice.</span></button>

			</div>

            <style>
                /* Review admin notice CSS */
                .themefic_review_notice ul li {
                    display: inline-block;
                }

                .themefic_review_notice ul {
                    margin: 0;
                    margin-bottom: 5px;
                }

                .themefic_review_notice ul li a {
                    text-decoration: none;
                    padding: 7px;
                    color: #00718a;
                    font-weight: 600;
                    transition: 0.4s;
                }

                .themefic_review_notice ul li:nth-child(1) a {
                    padding-left: 0 !important;
                }

                .themefic_review_notice ul li a span {
                    padding-right: 3px;
                    display: inline-block;
                }

                .themefic_review_notice ul li a:hover {
                    color: #218ea6;
                }
                .themefic_review_notice {
                    position: relative;
                }

                .themefic_review_notice .review_notice_dismiss {
                    padding: 2px;
                }
            </style>

			<!--   Themefic Plugin Review Admin Notice Script -->
			<script>
				jQuery(document).ready(function ($) {
					$(document).on('click', '.already_done, .later, .never, .notice-dismiss', function (event) {
						event.preventDefault();
						var $this = $(this);
						var status = $this.attr('data-status');
						$this.closest('.themefic_review_notice').css('display', 'none');
						data = {
							action: 'bafg_review_notice_callback',
							status: status,
							nonce: '<?php echo wp_create_nonce( 'bafg_review_notice_nonce' ); ?>'
						};

						$.ajax({
							url: ajaxurl,
							type: 'post',
							data: data,
							success: function (data) {
							},
							error: function (data) {
							}
						});
					});
					$(document).on('click', '.review_notice_dismiss', function (event) {
						event.preventDefault();
						var $this = $(this);
						$this.closest('.themefic_review_notice').css('display', 'none');
					});
				});
			</script>
			<?php
		}
	}
	$bafg_review_notice_status = get_option( 'bafg_review_notice_status' );
	$bafg_installation_date = get_option( 'bafg_installation_date' );
	if ( isset( $bafg_review_notice_status ) && $bafg_review_notice_status <= 0 && $bafg_installation_date == 1 && ! isset( $_COOKIE['bafg_review_notice_status'] ) && ! isset( $_COOKIE['bafg_installation_date'] ) ) {
		add_action( 'admin_notices', 'bafg_review_notice' );
	}

}


add_action( 'wp_ajax_bafg_review_notice_callback', 'bafg_review_notice_callback' );
// Themefic Plugin Review Admin Notice Ajax Callback 
if ( ! function_exists( 'bafg_review_notice_callback' ) ) {
	function bafg_review_notice_callback() {
		// nonce validation
		if ( ! isset( $_POST['nonce'] ) || ! wp_verify_nonce( $_POST['nonce'], 'bafg_review_notice_nonce' ) ) {
			wp_die();
		}
		
		$status = esc_html( $_POST['status'] );
		if ( $status == 'already' ) {
			update_option( 'bafg_review_notice_status', '1' );
		} else if ( $status == 'never' ) {
			update_option( 'bafg_review_notice_status', '2' );
		} else if ( $status == 'later' ) {
			$cookie_name = "bafg_review_notice_status";
			$cookie_value = "1";
			setcookie( $cookie_name, $cookie_value, time() + ( 86400 * 7 ), "/" );
			update_option( 'bafg_review_notice_status', '0' );
		}
		wp_die();
	}
}


/**
 * Initialize the plugin tracker
 *
 * @return void
 */
if ( ! function_exists( 'appsero_init_tracker_beaf_before_and_after_gallery' ) ) {
	/* 
	 * Initialize the appsero
	 */

	function appsero_init_tracker_beaf_before_and_after_gallery() {

		if ( ! class_exists( 'Appsero\Client' ) ) {
			require_once( plugin_dir_path( __DIR__ ) . '/inc/app/src/Client.php' );
		}

		$client = new Appsero\Client( 'daee3b5d-d8a3-46f0-ae49-7b6f869f4b42', 'Ultimate Before After Image Slider & Gallery – BEAF', __FILE__ );

		// Change Admin notice text

		$notice = sprintf( $client->__trans( 'Want to help make <strong>%1$s</strong> even more awesome? Allow %1$s to collect non-sensitive diagnostic data and usage information. I agree to get Important Product Updates & Discount related information on my email from  %1$s (I can unsubscribe anytime).' ), $client->name );
		$client->insights()->notice( $notice );


		// Active insights
		$client->insights()->init();

	}
	appsero_init_tracker_beaf_before_and_after_gallery();
}



/**
 * Admin notice if using older version BEAF PRO
 * @since 4.3.24
 * @author Abu Hena
 */
if ( ! function_exists( 'bafg_pro_version_notice' ) ) {

	function bafg_pro_version_notice() {
		if ( ! function_exists( 'get_plugin_data' ) ) {
			require_once( ABSPATH . 'wp-admin/includes/plugin.php' );
		}
		if ( is_plugin_active( 'beaf-before-and-after-gallery-pro/before-and-after-gallery-pro.php' ) ) {
			//get this pro plugin version
			$plugin_data = get_plugin_data( WP_PLUGIN_DIR . '/beaf-before-and-after-gallery-pro/before-and-after-gallery-pro.php', false, false );
			$bafg_pro_version = $plugin_data['Version'];

			if ( ! empty( $bafg_pro_version ) && version_compare( $bafg_pro_version, '4.2.15', '<' ) ) {
				//get wp version
				global $wp_version;
				$get_current_screen = get_current_screen();
				if ( $get_current_screen->base == 'dashboard' || $get_current_screen->base = 'plugins' ) {
					if ( isset( $_COOKIE['bafg_update_pro'] ) && $_COOKIE['bafg_update_pro'] == '1' ) {
						return;
					} else {
						?>
						<div class="notice notice-warning is-dismissible bafg-update-pro">
							<p style="font-size:16px">
								<?php
								printf(

									/* translators: %1$: $bafg_pro_version,  %2$: $wp_version,  %3$: link, */
									esc_html__( '<b>Warning:</b> The installed version of BEAF Pro (%1$) has not been tested on your version of WordPress (%2$). It has been tested up to version 5.9. <a href="%3$" target="_blank">You should update BEAF Pro to latest version to make sure that you have a version that has been tested for compatibility.</a>', 'bafg' ),
									esc_html( $bafg_pro_version ),
									esc_html( $wp_version ),
									"https://themefic.com/docs/beaf/seeing-warning-versions-wordpress-beaf-tested/"
								);
								?>
							</p>
						</div>
						<?php
					}
				}
			}
		}
	}
	add_action( 'admin_notices', 'bafg_pro_version_notice' );
}


/**
 * Add a checkbox to disable public queryable
 * @param $bafg_publicly_queriable_html
 * @param $bafg_publicly_queriable
 * @return string
 * @since 1.0.0
 * @package BAFG
 * 
 */
$beaf_pro_license_status = get_option( 'beaf_pro_license_status' );

if ( ! function_exists( 'bafg_before_after_method' ) ) {
	add_filter( 'beaf_before_after_method', 'bafg_before_after_method', 30, 2 );
	/**
	 * Generates the function comment for the given function body.
	 *
	 * @param array $options an array of options
	 * @param mixed $post the post data
	 * @return array the modified $options array
	 */
	function bafg_before_after_method( $options, $post ) {
		$pro_options = array(
			'id' => 'bafg_before_after_method',
			'options' => array(
				'method_1' => __( 'Method 1 (Using 2 images)', 'bafg' ),
				'method_2' => __( 'Method 2 (Using 1 image)', 'bafg' ),
				'method_3' => apply_filters( 'bafg_three_image_slider_method', array(
					'label' => __( 'Method 3 (Using 3 images )<div class="bafg-tooltip method-3-tooltip"><span>?</span><div class="bafg-tooltip-info">Pro feature! 3 image slider addon required to activate this. <a href="https://themefic.com/wp-content/uploads/2023/07/3-image-slider-addon.png" target="_blank"> More info</a></div></div>', 'bafg' ),
					'is_pro' => true
				), $post ),
				'method_4' => apply_filters(
					'bafg_video_slider_method',
					array(
						'label' => __( 'Method 4 (Using Video) <div class="bafg-tooltip method-3-tooltip"><span>?</span><div class="bafg-tooltip-info">Pro feature! Video slider addon required to activate this. <a href="https://themefic.com/wp-content/uploads/2023/07/video-slider-addon.png" target="_blank"> More info</a></div></div>', 'bafg' ),
						'is_pro' => true
					),
					$post
				),


			),
			'default' => 'method_1',
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}
		return $options;
	}
}

if ( ! function_exists( 'bafg_publicly_queriable_cb' ) ) {
	function bafg_publicly_queriable_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_publicly_queriable',
			'is_pro' => false,
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;

	}
	add_filter( 'bafg_publicly_queriable', 'bafg_publicly_queriable_cb', 30 );
}

if ( ! function_exists( 'bafg_before_image_link_cb' ) ) {
	add_filter( 'before_image_link', 'bafg_before_image_link_cb', 30 );
	function bafg_before_image_link_cb( $options ) {
		$pro_options = array(
			'id' => 'before_image_link',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

//after_image_link
if ( ! function_exists( 'bafg_after_image_link_cb' ) ) {
	add_filter( 'after_image_link', 'bafg_after_image_link_cb', 30 );
	function bafg_after_image_link_cb( $options ) {
		$pro_options = array(
			'id' => 'after_image_link',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

//bafg_readmore_text
if ( ! function_exists( 'bafg_readmore_text_cb' ) ) {
	add_filter( 'bafg_readmore_text', 'bafg_readmore_text_cb', 30 );
	function bafg_readmore_text_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_readmore_text',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

//bafg_before_after_style
if ( ! function_exists( 'bafg_before_after_style_cb' ) ) {
	add_filter( 'bafg_before_after_style', 'bafg_before_after_style_cb', 30 );
	function bafg_before_after_style_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_before_after_style',
			'options' => array(
				'default' => array(
					'title' => __( 'Default', 'bafg' ),
					'url' => BEAF_ASSETS_URL . 'image/default.png',
				),
				'design-1' => array(
					'title' => __( 'Design 1', 'bafg' ),
					'url' => BEAF_ASSETS_URL . 'image/style1.png',
				),
				'design-2' => array(
					'title' => __( 'Design 2', 'bafg' ),
					'url' => BEAF_ASSETS_URL . 'image/style2.png',
				),
				'design-3' => array(
					'title' => __( 'Design 3', 'bafg' ),
					'url' => BEAF_ASSETS_URL . 'image/style3.png',
				),
				'design-4' => array(
						'title' => __( 'Design 4', 'bafg' ),
						'url' => BEAF_ASSETS_URL . 'image/style4.png',
					),
				'design-5' => array(
						'title' => __( 'Design 5', 'bafg' ),
						'url' => BEAF_ASSETS_URL . 'image/style5.png',
					),
				'design-6' => array(
						'title' => __( 'Design 6', 'bafg' ),
						'url' => BEAF_ASSETS_URL . 'image/style6.png',
					),
				'design-7' => array(
						'title' => __( 'Design 7', 'bafg' ),
						'url' => BEAF_ASSETS_URL . 'image/style7.png',
					),
				'design-8' => array(
						'title' => __( 'Design 8', 'bafg' ),
						'url' => BEAF_ASSETS_URL . 'image/style8.png',
					),
				'design-9' => array(
						'title' => __( 'Design 9', 'bafg' ),
						'url' => BEAF_ASSETS_URL . 'image/style9.png',
					)
			)
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

//bafg_label_outside
if ( ! function_exists( 'bafg_label_outside_cb' ) ) {
	add_filter( 'show_label_outside_image', 'bafg_label_outside_cb', 30 );
	function bafg_label_outside_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_label_outside',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

//bafg_auto_slide
if ( ! function_exists( 'bafg_auto_slide_cb' ) ) {
	add_filter( 'bafg_auto_slide', 'bafg_auto_slide_cb', 30 );
	function bafg_auto_slide_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_auto_slide',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}
if ( ! function_exists( 'bafg_before_after_image_cb' ) ) {
	add_filter( 'bafg_before_after_image', 'bafg_before_after_image_cb', 30 );
	function bafg_before_after_image_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_before_after_image',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}
if ( ! function_exists( 'bafg_first_image_cb' ) ) {
	add_filter( 'bafg_first_image', 'bafg_first_image_cb', 30 );
	function bafg_first_image_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_first_image',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_second_image_cb' ) ) {
	add_filter( 'bafg_second_image', 'bafg_second_image_cb', 30 );
	function bafg_second_image_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_second_image',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_third_image_cb' ) ) {
	add_filter( 'bafg_third_image', 'bafg_third_image_cb', 30 );
	function bafg_third_image_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_third_image',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_slider_video_type_cb' ) ) {
	add_filter( 'bafg_slider_video_type', 'bafg_slider_video_type_cb', 30 );
	function bafg_slider_video_type_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_slider_video_type',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_before_video_cb' ) ) {
	add_filter( 'bafg_before_video', 'bafg_before_video_cb', 30 );
	function bafg_before_video_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_before_video',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_after_video_cb' ) ) {
	add_filter( 'bafg_after_video', 'bafg_after_video_cb', 30 );
	function bafg_after_video_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_after_video',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_before_vimeo_video_cb' ) ) {
	add_filter( 'bafg_before_vimeo_video', 'bafg_before_vimeo_video_cb', 30 );
	function bafg_before_vimeo_video_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_before_vimeo_video',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_after_vimeo_video_cb' ) ) {
	add_filter( 'bafg_after_vimeo_video', 'bafg_after_vimeo_video_cb', 30 );
	function bafg_after_vimeo_video_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_after_vimeo_video',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_before_self_video_cb' ) ) {
	add_filter( 'bafg_before_self_video', 'bafg_before_self_video_cb', 30 );
	function bafg_before_self_video_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_before_self_video',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_after_self_video_cb' ) ) {
	add_filter( 'bafg_after_self_video', 'bafg_after_self_video_cb', 30 );
	function bafg_after_self_video_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_after_self_video',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_filter_style_cb' ) ) {
	add_filter( 'bafg_filter_style', 'bafg_filter_style_cb', 30 );
	function bafg_filter_style_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_filter_style',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_on_scroll_slider_cb' ) ) {
	add_filter( 'bafg_on_scroll_slide', 'bafg_on_scroll_slider_cb', 30 );
	function bafg_on_scroll_slider_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_on_scroll_slide',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_popup_preview_cb' ) ) {
	add_filter( 'bafg_popup_preview', 'bafg_popup_preview_cb', 30 );
	function bafg_popup_preview_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_popup_preview',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_handle_color_cb' ) ) {
	add_filter( 'bafg_handle_color', 'bafg_handle_color_cb', 30 );
	function bafg_handle_color_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_handle_color',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_overlay_color_cb' ) ) {
	add_filter( 'bafg_overlay_color', 'bafg_overlay_color_cb', 30 );
	function bafg_overlay_color_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_overlay_color',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;

	}
}
if ( ! function_exists( 'bafg_width_cb' ) ) {
	add_filter( 'bafg_width', 'bafg_width_cb', 30 );
	function bafg_width_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_width',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_height_cb' ) ) {
	add_filter( 'bafg_height', 'bafg_height_cb', 30 );
	function bafg_height_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_height',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_video_width_cb' ) ) {
	add_filter( 'bafg_video_width', 'bafg_video_width_cb', 30 );
	function bafg_video_width_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_video_width',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_video_height_cb' ) ) {
	add_filter( 'bafg_video_height', 'bafg_video_height_cb', 30 );
	function bafg_video_height_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_video_height',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_slider_alignment_cb' ) ) {
	add_filter( 'bafg_slider_alignment', 'bafg_slider_alignment_cb', 30 );
	function bafg_slider_alignment_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_slider_alignment',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_filter_apply_cb' ) ) {
	add_filter( 'bafg_filter_apply', 'bafg_filter_apply_cb', 30 );
	function bafg_filter_apply_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_filter_apply',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_before_after_image_link_cb' ) ) {
	add_filter( 'bafg_before_after_image_link', 'bafg_before_after_image_link_cb', 30 );
	function bafg_before_after_image_link_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_before_after_image_link',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_open_url_new_tab_cb' ) ) {
	add_filter( 'bafg_open_url_new_tab', 'bafg_open_url_new_tab_cb', 30 );
	function bafg_open_url_new_tab_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_open_url_new_tab',
			'is_pro' => false
		);

		if ( is_array( $options ) ) {
			$options = array_merge( $options, $pro_options );
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_enable_watermark_cb' ) ) {
	function bafg_enable_watermark_cb( $options ) {
		$pro_options = array(
			'id' => 'enable_watermark',
			'is_pro' => false
		);

		if ( ! is_plugin_active( 'watermark-addon-for-beaf/watermark-addon-for-beaf.php' ) ) {
			$options = $options;
		} else {
			if ( is_array( $options ) ) {
				$options = array_merge( $options, $pro_options );
			}
		}

		return $options;
	}
	add_filter( 'bafg_enable_watermark', 'bafg_enable_watermark_cb', 30 );
}

if ( ! function_exists( 'bafg_enable_opacity_cb' ) ) {
	add_filter( 'bafg_enable_opacity', 'bafg_enable_opacity_cb', 30 );
	function bafg_enable_opacity_cb( $options ) {
		$pro_options = array(
			'id' => 'wm_opacity_enable',
			'is_pro' => false
		);

		if ( ! is_plugin_active( 'watermark-addon-for-beaf/watermark-addon-for-beaf.php' ) ) {
			$options = $options;
		} else {
			if ( is_array( $options ) ) {
				$options = array_merge( $options, $pro_options );
			}
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_watermark_opacity_cb' ) ) {
	add_filter( 'bafg_watermark_opacity', 'bafg_watermark_opacity_cb', 30 );
	function bafg_watermark_opacity_cb( $options ) {
		$pro_options = array(
			'id' => 'wm_opacity',
			'is_pro' => false
		);

		if ( ! is_plugin_active( 'watermark-addon-for-beaf/watermark-addon-for-beaf.php' ) ) {
			$options = $options;
		} else {
			if ( is_array( $options ) ) {
				$options = array_merge( $options, $pro_options );
			}
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_watermark_position_cb' ) ) {
	add_filter( 'bafg_watermark_position', 'bafg_watermark_position_cb', 30 );
	function bafg_watermark_position_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_wm_position',
			'is_pro' => false
		);

		if ( ! is_plugin_active( 'watermark-addon-for-beaf/watermark-addon-for-beaf.php' ) ) {
			$options = $options;
		} else {
			if ( is_array( $options ) ) {
				$options = array_merge( $options, $pro_options );
			}
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_bafg_preview_shortcode_cb' ) ) {
	add_filter( 'bafg_bafg_preview_shortcode', 'bafg_bafg_preview_shortcode_cb', 40 );
	function bafg_bafg_preview_shortcode_cb( $options ) {
		$pro_options = array(
			'id' => 'bafg_before_after_shortcode',
			'is_pro' => false
		);

		if ( ! is_plugin_active( 'beaf-before-and-after-gallery-pro/before-and-after-gallery-pro.php' ) ) {
			$options = $options;
		} else {
			if ( is_array( $options ) ) {
				$options = array_merge( $options, $pro_options );
			}
		}

		return $options;
	}
}

//3 images slider option
if ( ! function_exists( 'bafg_three_image_slider_method_cb' ) ) {
	add_filter( 'bafg_three_image_slider_method', 'bafg_three_image_slider_method_cb', 30, 2 );
	function bafg_three_image_slider_method_cb( $options, $post ) {
		$pro_options = array(
			'label' => __( 'Method 3 ( Using 3 images )', 'bafg' ),
			'is_pro' => false
		);

		if ( ! is_plugin_active( 'beaf-pro-three-images-slider-addon/beaf-pro-three-images-slider-addon.php' ) ) {
			$options = $options;
		} else {
			if ( is_array( $options ) ) {
				$options = array_merge( $options, $pro_options );
			}
		}

		return $options;
	}
}

//Video slider option
if ( ! function_exists( 'bafg_video_slider_method_cb' ) ) {
	add_filter( 'bafg_video_slider_method', 'bafg_video_slider_method_cb', 30, 2 );
	function bafg_video_slider_method_cb( $options, $post ) {
		$pro_options = array(
			'label' => __( 'Method 4 ( Using Videos )', 'bafg' ),
			'is_pro' => false
		);

		if ( ! is_plugin_active( 'beaf-pro-video-slider-addon/beaf-pro-video-slider-addon.php' ) ) {
			$options = $options;
		} else {
			if ( is_array( $options ) ) {
				$options = array_merge( $options, $pro_options );
			}
		}

		return $options;
	}
}

if ( ! function_exists( 'bafg_watermark_enable_field_meta_cb' ) ) {
	add_filter( 'bafg_watermark_enable_field_meta', 'bafg_watermark_enable_field_meta_cb', 30, 2 );
	function bafg_watermark_enable_field_meta_cb( $options, $post ) {
		$settings = get_option( 'beaf_settings' );
		$watermark_enable = isset( $settings['enable_watermark'] ) ? $settings['enable_watermark'] : '';
		if ( $watermark_enable == '1' ) {
			$className = 'bafg-watermark-enabled';
		} else {
			$className = 'watermark-in-free-version';
		}

		$pro_options = array(
			'id' => 'watermark_en_dis',
			'is_pro' => false,
			'class' => $className
		);

		if ( ! is_plugin_active( 'watermark-addon-for-beaf/watermark-addon-for-beaf.php' ) ) {
			$options = $options;
		} else {
			if ( is_array( $options ) ) {
				$options = array_merge( $options, $pro_options );
			}
		}

		return $options;
	}
}
