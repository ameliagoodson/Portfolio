<?php 
// Exit if accessed directly
if (!defined('ABSPATH')) {
	exit();
}

class BAFG_Shortcode {

    public function __construct()
    {
        /*
		* Adding shortcode for bafg
		*/
		add_shortcode( 'bafg', array( $this, 'bafg_post_shortcode' ) );

		/*
		* Gallery shortcode
		*/
		add_shortcode( 'bafg_gallery', array( $this, 'bafg_gallery_shortcode' ) );
		/**
		 * All Slide Gallery Preview
		 */
		add_shortcode( 'bafg_preview', array( $this, 'bafg_frontend_preview_shortcode_pro_cb') );
    }

	public function beaf_enqueue_scripts( $style_handlers = array(), $script_handlers = array() ) {

		$default_styles = array(
			'bafg_twentytwenty',
			'bafg-style',
		);
	
		$default_scripts = array(
			'eventMove',
			'bafg_twentytwenty',
			'bafg_custom_js',
		);
	
		$merged_styles = array_merge( $default_styles, (array) $style_handlers );
		
		$merged_scripts = array_merge( $default_scripts, (array) $script_handlers );
	
		// Enqueue styles
		foreach ( $merged_styles as $style_handle ) {
			wp_enqueue_style( $style_handle );
		}
	
		// Enqueue scripts
		foreach ( $merged_scripts as $script_handle ) {
			wp_enqueue_script( $script_handle );
		}
	}

	/**
     * Initializes a singleton instance
     *
     * @return \BAFG_Shortcode
     */
    public static function init() {
        static $instance = false;

        if ( ! $instance ) {
            $instance = new self();
        }

        return $instance;
    }

	/**
     * BAFG shortcode callback
     *
     * @param  array $atts
     * @param  string $content
     *
     * @return string
     */
	public function bafg_post_shortcode( $atts, $content = null ) {

		extract( shortcode_atts( array(
			'id' => ''
		), $atts ) );

		$this->beaf_enqueue_scripts();

		ob_start();

		$meta = ! empty( get_post_meta( $id, 'beaf_meta', true ) ) ? get_post_meta( $id, 'beaf_meta', true ) : '';

		$b_image = ! empty( $meta['bafg_before_image'] ) ? $meta['bafg_before_image'] : '';
		$a_image = ! empty( $meta['bafg_after_image'] ) ? $meta['bafg_after_image'] : '';
		$orientation = ! empty( $meta['bafg_image_styles'] ) ? $meta['bafg_image_styles'] : 'horizontal';
		$offset = ! empty( $meta['bafg_default_offset'] ) ? $meta['bafg_default_offset'] : '0.5';
		$before_label = ! empty( $meta['bafg_before_label'] ) ? $meta['bafg_before_label'] : esc_html( __( 'Before', 'bafg' ) );
		$after_label = ! empty( $meta['bafg_after_label'] ) ? $meta['bafg_after_label'] : esc_html( __( 'After', 'bafg' ) );
		$overlay = ! empty( $meta['bafg_no_overlay'] ) ? $meta['bafg_no_overlay'] : '';
		$move_slider_on_hover = ! empty( $meta['bafg_move_slider_on_hover'] ) ? $meta['bafg_move_slider_on_hover'] : '';
		$click_to_move = ! empty( $meta['bafg_click_to_move'] ) ? $meta['bafg_click_to_move'] : '';
		$skip_lazy_load = ! empty( $meta['skip_lazy_load'] ) ? $meta['skip_lazy_load'] : '';
		$before_img_alt = ! empty( $meta['before_img_alt'] ) ? $meta['before_img_alt'] : '';
		$after_img_alt = ! empty( $meta['after_img_alt'] ) ? $meta['after_img_alt'] : '';
		if ( $skip_lazy_load == '1' ) {
			$skip_lazy = 'skip-lazy';
			$data_skip_lazy = 'data-skip-lazy';
		} else {
			$skip_lazy = '';
			$data_skip_lazy = '';
		}
		$beaf_opt = ! empty( get_option( 'beaf_settings' ) ) ? get_option( 'beaf_settings' ) : '';
		$enable_preloader = ! empty( $beaf_opt['enable_preloader'] ) ? $beaf_opt['enable_preloader'] : '';

		if ( ! empty( $meta['bafg_custom_color'] ) && $meta['bafg_custom_color'] == '1' ) {
			$bafg_custom_color = 'bafg-custom-color';
		} else {
			$bafg_custom_color = '';
		}

		if ( get_post_status( $id ) == 'publish' ) :
			?>

			<?php do_action( 'bafg_before_slider', $id ); ?>

			<div class="bafg-twentytwenty-container <?php echo esc_attr( 'slider-' . $id . '' ); ?> <?php echo esc_attr( $bafg_custom_color ) ?> "
				bafg-orientation="<?php echo esc_attr( $orientation ); ?>" bafg-default-offset="<?php echo esc_attr( $offset ); ?>"
				bafg-before-label="<?php echo esc_html( $before_label ); ?>"
				bafg-after-label="<?php echo esc_attr( $after_label ); ?>" bafg-overlay="<?php echo esc_attr( $overlay ); ?>"
				bafg-move-slider-on-hover="<?php echo esc_attr( $move_slider_on_hover ); ?>"
				bafg-click-to-move="<?php echo esc_attr( $click_to_move ); ?>">

				<?php
				if ( is_plugin_active( 'beaf-before-and-after-gallery-pro/before-and-after-gallery-pro.php' ) ) {
					if ( ! empty( $enable_preloader ) && ! is_admin() ) {
						?>
						<!-- the preloader -->
						<div class="bafg-preloader">
							<div class="bafg-preloader-img"></div>
						</div>
						<?php
					}
				}
				?>
				<img class="<?php echo esc_attr( $skip_lazy ); ?>" <?php echo esc_attr( $data_skip_lazy ); ?>
					src="<?php echo esc_url( $b_image ); ?>" alt="<?php echo esc_attr( $before_img_alt ); ?>">
				<img class="<?php echo esc_attr( $skip_lazy ); ?>" <?php echo esc_attr( $data_skip_lazy ); ?>
					src="<?php echo esc_url( $a_image ); ?>" alt="<?php echo esc_attr( $after_img_alt ); ?>">

			</div>

			<?php do_action( 'bafg_after_slider', $id ); ?>

			<style type="text/css">
				<?php
				$bafg_before_label_background = ! empty( $meta['bafg_before_label_background'] ) ? $meta['bafg_before_label_background'] : '';
				$bafg_before_label_color = ! empty( $meta['bafg_before_label_color'] ) ? $meta['bafg_before_label_color'] : '';
				$bafg_after_label_background = ! empty( $meta['bafg_after_label_background'] ) ? $meta['bafg_after_label_background'] : '';
				$bafg_after_label_color = ! empty( $meta['bafg_after_label_color'] ) ? $meta['bafg_after_label_color'] : '';

				if ( ! empty( $bafg_before_label_background ) || ! empty( $bafg_before_label_color ) ) {
					?>
					<?php echo esc_attr( '.slider-' . $id . ' ' ); ?>
					.twentytwenty-before-label::before {
						background:
							<?php echo esc_attr( $bafg_before_label_background );
							?>
						;
						color:
							<?php echo esc_attr( $bafg_before_label_color );
							?>
						;
					}

					<?php
				}

				?>
				<?php if ( ! empty( $bafg_after_label_background ) || ! empty( $bafg_after_label_color ) ) {
					?>
					<?php echo esc_attr( '.slider-' . $id . ' ' ); ?>
					.twentytwenty-after-label::before {
						background:
							<?php echo esc_attr( $bafg_after_label_background );
							?>
						;
						color:
							<?php echo esc_attr( $bafg_after_label_color );
							?>
						;
					}

					<?php
				}

				?>
			</style>
			<?php
		endif;

		return ob_get_clean();
	}


    /**
	 * BAFG Gallery shortcode callback
	 * 
	 * @param  array $atts
     * @param  string $content
     *
     * @return string
	 */
	public function bafg_gallery_shortcode( $atts, $content = null ) {

		$this->beaf_enqueue_scripts();
		
		ob_start();

		extract( shortcode_atts( array(
			'category' => '',
			'column' => '',
			'items' => -1,
			'info' => ''
		), $atts ) );


		if ( $category != '' ) {

			if ( $category == 'all' ) {
				$gallery_query = new WP_Query( array(
					'post_type' => 'bafg',
					'posts_per_page' => $items,
				) );
			} else {
				$gallery_query = new WP_Query( array(
					'post_type' => 'bafg',
					'posts_per_page' => $items,
					'tax_query' => array(
						array(
							'taxonomy' => 'bafg_gallery',
							'field' => 'id',
							'terms' => $category,
						)
					),
				) );
			}

			$column = ! empty( $column ) ? $column : '2';

			switch ( $column ) {
				case "2":
					$col = '6';
					break;
				case "3":
					$col = '4';
					break;
				case "4":
					$col = '3';
					break;
				default:
					$col = '6';
			}

			?>
			<?php $gallery_id = wp_rand( 10, 200 ); ?>
			<?php if ( $info != 'true' ) : ?>
				<style>
					.bafg-gallery-row.gallery-id-

					<?php echo esc_attr( $gallery_id );

					?>
					.bafg-slider-info {
						display: none !important
					}
				</style>
			<?php endif; ?>

			<div class="bafg-row bafg-gallery-row gallery-id-<?php echo esc_attr( $gallery_id ); ?>">
				<?php
				while ( $gallery_query->have_posts() ) :
					$gallery_query->the_post();

					echo '<div class="bafg-col-' . esc_attr( $col ) . '">';
					echo do_shortcode( '[bafg id="' . get_the_id() . '"]' );
					echo '</div>';

				endwhile;
				?>
			</div>
			<?php
			wp_reset_postdata();
		}

		return ob_get_clean();
	}

	/**
	 * Register shortcode for bafg_preview.
	 *
	 * @param array $atts The shortcode attributes.
	 * @return string The shortcode output.
	 * 
	 * @author Abu Hena
	 */
	public function bafg_frontend_preview_shortcode_pro_cb( $atts ) {

		extract(
			shortcode_atts(
				array(
					'id' => '',
				),
				$atts
			)
		);

		$this->beaf_enqueue_scripts();
		
		//define the before and after images url
		$before_image =  BEAF_ASSETS_URL . '/image/before.jpg';
		$after_image =  BEAF_ASSETS_URL . '/image/after.jpg';

		ob_start();
		if ( is_plugin_active( 'beaf-before-and-after-gallery-pro/before-and-after-gallery-pro.php' ) ) {
			wp_enqueue_script('bafg_custom_pro');
			wp_enqueue_style('bafg_pro_style');
			wp_enqueue_style('bafg-responsive-pro');
		?>
		<div class="bafg-twentytwenty-container bafg-frontend-preview" bafg-overlay="yes" bafg-move-slider-on-hover="no">
			<img class="bafg-before-prev-image" before-image-url="<?php echo esc_url( $before_image ) ?>"
				src="<?php echo esc_url( $before_image ) ?>">
			<img class="bafg-after-prev-image" after-image-url="<?php echo esc_url( $after_image ) ?>"
				src="<?php echo esc_url( $after_image ) ?>">
		</div>
		<div class="bafg-frontend-upload-buttons">
			<div class="bafg-bimage-up">
				<label><?php echo esc_html( __( "Upload Before Image", "bafg" ) ); ?></label>
				<input type="file" name="" id="bafg-before-image" class="upload-before-image" accept="image/*">
			</div>
			<div class="bafg-aimage-up">
				<label><?php echo esc_html( __( "Upload After Image", "bafg" ) ); ?></label>
				<input type="file" name="" id="bafg-after-image" class="upload-after-image" accept="image/*">
			</div>
			<div class="bafg-reset-preview">
				<button class="bafg-reset-preview-btn"><?php echo esc_html( __( "Reset", "bafg" ) ); ?></button>
			</div>
		</div>
		<?php
		} else {
			echo 'To display this shortcode please activate Beaf Pro';
		}

		return ob_get_clean();
	}

}
