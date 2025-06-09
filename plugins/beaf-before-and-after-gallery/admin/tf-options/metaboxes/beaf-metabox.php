<?php
// don't load directly

use Automattic\WooCommerce\Utilities\ArrayUtil;

defined( 'ABSPATH' ) || exit;
$post = get_the_ID();
BEAF_Metabox::metabox( 'beaf_meta', array(
	'title' => __( 'Before After Slider Options', 'bafg' ),
	'post_type' => 'bafg',
	'sections' => array(
		'content' => array(
			'title' => __( 'Content', 'bafg' ),
			'icon' => 'fa fa-cog',
			'fields' => array(
				apply_filters( 'beaf_before_after_method',
					array(
						'id' => 'bafg_before_after_method',
						'type' => 'radio',
						'label' => __( 'Before After Method', 'bafg' ),
						'title' => __( 'Before After Method', 'bafg' ),
						'subtitle' => __( 'Choose a method to make a before after slider using a single image, 2 images, 3 images, and Videos.', 'bafg' ),
						'options' => array(
							'method_1' => __( 'Method 1 (Using 2 images)', 'bafg' ),
							'method_2' => array(
								'label' => sprintf(
									/* translators: %1$s, %2$s is replaced with "tooltip " */
									esc_html__( 'Method 2 (Using 1 image ) %1$s', 'bafg' ),
									'<div class="bafg-tooltip method-3-tooltip"><span>?</span><div class="bafg-tooltip-info">Pro feature!</div></div>',
								),
								'is_pro' => true
							),
							'method_3' => array(
								'label' => sprintf(
									/* translators: %1$s, %2$s is replaced with "tooltip & link" */
									esc_html__( 'Method 3 (Using 3 images ) %1$s Pro feature! 3 image slider addon required to activate this. %2$s', 'bafg' ),
									'<div class="bafg-tooltip method-3-tooltip"><span>?</span><div class="bafg-tooltip-info">',
									'<a href="' . esc_url( 'https://themefic.com/wp-content/uploads/2023/07/3-image-slider-addon.png' ) . '" target="_blank"> More info</a></div></div>',
								),
								'is_pro' => true
							),
							'method_4' => array(
								'label' => sprintf(
									/* translators: %1$s, %2$s is replaced with "tooltip & link" */
									esc_html__( 'Method 4 (Using Video) %1$s Pro feature! Video slider addon required to activate this. %2$s', 'bafg' ),
									'<div class="bafg-tooltip method-3-tooltip"><span>?</span><div class="bafg-tooltip-info">',
									'<a href="' . esc_url( 'https://themefic.com/wp-content/uploads/2023/07/3-image-slider-addon.png' ) . '" target="_blank"> More info</a></div></div>',
								),
								'is_pro' => true
							),
						),

						'default' => 'method_1',
					), $post ),

				apply_filters( 'bafg_watermark_enable_field_meta', array(
					'id' => '',
					'type' => 'switch',
					'label' => __( 'Enable Watermark', 'bafg' ),
					'title' => __( 'Enable Watermark', 'bafg' ),
					'subtitle' => __( 'Enable or Disable watermark for this individual slider (Page will reload to save data)', 'bafg' ),
					'class' => 'watermark-in-free-version',
					'dependency' => array( 'bafg_before_after_method', '!=', 'method_4' ),
					'is_pro' => true,
					'default' => true
				), $post ),
				array(
					'id' => 'heading_before_after',
					'type' => 'heading',
					'label' => __( 'Before After Image', 'bafg' ),
					'dependency' => array( 'bafg_before_after_method', '==', 'method_2' ),
				),
				apply_filters( 'bafg_before_after_image', array(
					'id' => '',
					'type' => 'image',
					'label' => __( 'Before After Image', 'bafg' ),
					'subtitle' => __( 'Upload before and after image for the slider', 'bafg' ),
					'dependency' => array( 'bafg_before_after_method', '==', 'method_2' ),
					'is_pro' => true
				), $post ),
				array(
					'id' => 'heading_before_image',
					'type' => 'heading',
					'label' => __( 'Before Image', 'bafg' ),
					'dependency' => array( 'bafg_before_after_method', '==', 'method_1' ),
				),
				array(
					'id' => 'bafg_before_image',
					'type' => 'image',
					'label' => __( 'Before Image', 'bafg' ),
					'subtitle' => __( 'Upload before image for the slider', 'bafg' ),
					'dependency' => array( 'bafg_before_after_method', '==', 'method_1' ),
				),
				array(
					'id' => 'before_img_alt',
					'type' => 'text',
					'label' => __( 'Before Image Alter text', 'bafg' ),
					'dependency' => array( 'bafg_before_after_method', '==', 'method_1' ),
				),
				apply_filters( 'before_image_link',
					array(
						'id' => '',
						'type' => 'text',
						'label' => __( 'Before Image link', 'bafg' ),
						'dependency' => array( 'bafg_before_after_method', '==', 'method_1' ),
						'is_pro' => true
					), $post
				),
				array(
					'id' => 'heading_after_image',
					'type' => 'heading',
					'label' => __( 'After Image', 'bafg' ),
					'dependency' => array( 'bafg_before_after_method', '==', 'method_1' ),
				),
				array(
					'id' => 'bafg_after_image',
					'type' => 'image',
					'label' => __( 'After Image', 'bafg' ),
					'subtitle' => __( 'Upload after image for the slider', 'bafg' ),
					'dependency' => array( 'bafg_before_after_method', '==', 'method_1' ),
				),
				array(
					'id' => 'after_img_alt',
					'type' => 'text',
					'label' => __( 'After Image Alter text', 'bafg' ),
					'dependency' => array( 'bafg_before_after_method', '==', 'method_1' ),
				),
				apply_filters( 'after_image_link',
					array(
						'id' => '',
						'type' => 'text',
						'label' => __( 'After Image link', 'bafg' ),
						'dependency' => array( 'bafg_before_after_method', '==', 'method_1' ),
						'is_pro' => true
					), $post
				),
				array(
					'id' => 'heading_three_image',
					'type' => 'heading',
					'label' => __( 'Three Image', 'bafg' ),
					'dependency' => array( 'bafg_before_after_method', '==', 'method_3' ),
				),
				apply_filters( 'bafg_first_image', array(
					'id' => '',
					'type' => 'image',
					'label' => __( 'First Image', 'bafg' ),
					'dependency' => array( 'bafg_before_after_method', '==', 'method_3' ),
					'is_pro' => true
				), $post ),

				apply_filters( 'first_img_alt', array(
					'id' => '',
					'type' => 'text',
					'label' => __( 'First Image Alter text', 'bafg' ),
					'dependency' => array( 'bafg_before_after_method', '==', 'method_3' ),
					'is_pro' => true
				), $post ),

				apply_filters( 'bafg_second_image', array(
					'id' => '',
					'type' => 'image',
					'label' => __( 'Second Image', 'bafg' ),
					'dependency' => array( 'bafg_before_after_method', '==', 'method_3' ),
					'is_pro' => true
				), $post ),

				apply_filters( 'second_img_alt', array(
					'id' => '',
					'type' => 'text',
					'label' => __( 'Second Image Alter text', 'bafg' ),
					'dependency' => array( 'bafg_before_after_method', '==', 'method_3' ),
					'is_pro' => true
				), $post ),

				apply_filters( 'bafg_third_image', array(
					'id' => '',
					'type' => 'image',
					'label' => __( 'Third Image', 'bafg' ),
					'dependency' => array( 'bafg_before_after_method', '==', 'method_3' ),
					'is_pro' => true
				), $post ),

				apply_filters( 'third_img_alt', array(
					'id' => '',
					'type' => 'text',
					'label' => __( 'Third Image Alter text', 'bafg' ),
					'dependency' => array( 'bafg_before_after_method', '==', 'method_3' ),
					'is_pro' => true
				), $post ),
				array(
					'id' => 'heading_video',
					'type' => 'heading',
					'label' => __( 'Video Slider Option', 'bafg' ),
					'dependency' => array( 'bafg_before_after_method', '==', 'method_4' ),
				),
				apply_filters( 'bafg_slider_video_type', array(
					'id' => '',
					'type' => 'select',
					'label' => __( 'Slider Video Type', 'bafg' ),
					'options' => array(
						'youtube' => __( 'Youtube', 'bafg' ),
						'vimeo' => __( 'Vimeo', 'bafg' ),
						'self' => __( 'Self Hosted', 'bafg' ),
					),
					'is_pro' => true,
					'dependency' => array( 'bafg_before_after_method', '==', 'method_4' ),
				), $post ),

				apply_filters( 'bafg_video_width', array(
					'id' => '',
					'type' => 'text',
					'label' => __( 'Video Width', 'bafg' ),
					'is_pro' => true,
					'field_width' => 50,
					'dependency' => array( 'bafg_before_after_method', '==', 'method_4' ),
				), $post ),

				apply_filters( 'bafg_video_height', array(
					'id' => '',
					'type' => 'text',
					'label' => __( 'Video Height', 'bafg' ),
					'is_pro' => true,
					'field_width' => 50,
					'dependency' => array( 'bafg_before_after_method', '==', 'method_4' ),
				), $post ),

				apply_filters( 'bafg_before_video', array(
					'id' => '',
					'type' => 'text',
					'label' => __( 'Before Video', 'bafg' ),
					'placeholder' => __( 'Before Video URL', 'bafg' ),
					'subtitle' => '<small>' . esc_html( __( 'Use video url eg. ', 'bafg' ) ) . '<code>' . esc_url( 'https://www.youtube.com/watch?v=aR8vA8BY0oA' ) . '</code></small>',
					'dependency' => array(
						array( 'bafg_slider_video_type', '==', 'youtube' ),
						array( 'bafg_before_after_method', '==', 'method_4' ),
					),
					'is_pro' => true
				), $post ),

				apply_filters( 'bafg_after_video', array(
					'id' => '',
					'type' => 'text',
					'label' => __( 'After Video', 'bafg' ),
					'placeholder' => __( 'After Video URL', 'bafg' ),
					'subtitle' => '<small>' . esc_html( __( 'Use video url eg. ', 'bafg' ) ) . '<code>' . esc_url( 'https://www.youtube.com/watch?v=aR8vA8BY0oA' ) . '</code></small>',
					'dependency' => array(
						array( 'bafg_slider_video_type', '==', 'youtube' ),
						array( 'bafg_before_after_method', '==', 'method_4' ),
					),
					'is_pro' => true
				), $post ),

				apply_filters( 'bafg_before_vimeo_video', array(
					'id' => '',
					'type' => 'text',
					'label' => __( 'Before Vimeo Video', 'bafg' ),
					'placeholder' => __( 'Before Vimeo Video URL', 'bafg' ),
					'subtitle' => '<small>' . esc_html( __( 'Use video url eg. ', 'bafg' ) ) . '<code>' . esc_url( 'https://vimeo.com/186470604' ) . '</code></small>',
					'dependency' => array(
						array( 'bafg_slider_video_type', '==', 'vimeo' ),
						array( 'bafg_before_after_method', '==', 'method_4' ),
					),
					'is_pro' => true
				) ),

				apply_filters( 'bafg_after_vimeo_video', array(
					'id' => '',
					'type' => 'text',
					'label' => __( 'After Vimeo Video', 'bafg' ),
					'placeholder' => __( 'After Vimeo Video URL', 'bafg' ),
					'subtitle' => '<small>' . esc_html( __( 'Use video url eg. ', 'bafg' ) ) . '<code>' . esc_url( 'https://vimeo.com/294247197' ) . '</code></small>',
					'dependency' => array(
						array( 'bafg_slider_video_type', '==', 'vimeo' ),
						array( 'bafg_before_after_method', '==', 'method_4' ),
					),
					'is_pro' => true
				) ),

				apply_filters( 'bafg_before_self_video', array(
					'id' => '',
					'type' => 'video',
					'label' => __( 'Before Self Hosted Video', 'bafg' ),
					'placeholder' => __( 'Before Self Hosted Video URL', 'bafg' ),
					'subtitle' => '<small>' . esc_html( __( 'HTML5 video player supports only ', 'bafg' ) ) . '<code>' . esc_html( __( 'MP4, WebM, and Ogg', 'bafg' ) ) . '</code> ' . esc_html( __( 'formats.', 'bafg' ) ) . '</small>',
					// 'dependency' => array( 'bafg_slider_video_type', '==', 'self' ),
					'dependency' => array(
						array( 'bafg_before_after_method', '==', 'method_4' ),
						array( 'bafg_slider_video_type', '==', 'self' ),
					),
					'is_pro' => true
				) ),

				apply_filters( 'bafg_after_self_video', array(
					'id' => '',
					'type' => 'video',
					'label' => __( 'After Self Hosted Video', 'bafg' ),
					'placeholder' => __( 'After Self Hosted Video URL', 'bafg' ),
					'subtitle' => '<small>' . esc_html( __( 'HTML5 video player supports only ', 'bafg' ) ) . '<code>' . esc_html( __( 'MP4, WebM, and Ogg', 'bafg' ) ) . '</code> ' . esc_html( __( 'formats.', 'bafg' ) ) . '</small>',
					'dependency' => array(
						array( 'bafg_slider_video_type', '==', 'self' ),
						array( 'bafg_before_after_method', '==', 'method_4' ),
					),
					'is_pro' => true
				) ),
				array(
					'id' => 'heading_information',
					'type' => 'heading',
					'label' => __( 'Slider Information', 'bafg' ),
				),
				array(
					'id' => 'bafg_slider_title',
					'type' => 'text',
					'label' => __( 'Slider Title', 'bafg' ),
					'placeholder' => __( 'Optional', 'bafg' ),
				),
				array(
					'id' => 'bafg_slider_description',
					'type' => 'textarea',
					'label' => __( 'Slider Description', 'bafg' ),
					'placeholder' => __( 'Optional', 'bafg' ),
				),
				array(
					'id' => 'bafg_readmore_link',
					'type' => 'text',
					'label' => __( 'Read More Link', 'bafg' ),
					'placeholder' => __( 'https://example.com', 'bafg' ),
				),
				array(
					'id' => 'bafg_readmore_link_target',
					'type' => 'select',
					'label' => __( 'Read More Link Target', 'bafg' ),
					'options' => array(
						'' => __( 'Same Page', 'bafg' ),
						'new_tab' => __( 'New Tab', 'bafg' ),
					),
				),
				apply_filters( 'bafg_readmore_text',
					array(
						'id' => 'bafg_readmore_text',
						'type' => 'text',
						'label' => __( 'Read More Text', 'bafg' ),
						'placeholder' => __( 'Optional', 'bafg' ),
						'is_pro' => true
					), $post
				),

				apply_filters( 'bafg_filter_style', array(
					'id' => '',
					'type' => 'radio',
					'label' => __( 'Select Filter Effect', 'bafg' ),
					'subtitle' => __( 'Select a filtering effect to use on the before or after image.', 'bafg' ),
					'options' => array(
						'none' => __( 'None', 'bafg' ),
						'grayscale' => __( 'Grayscale', 'bafg' ),
						'blur' => __( 'Blur', 'bafg' ),
						'sepia' => __( 'Sepia', 'bafg' ),
						'saturate' => __( 'Saturate', 'bafg' ),
					),
					'dependency' => array( 'bafg_before_after_method', '==', 'method_2' ),
					'is_pro' => true
				), $post
				),

				apply_filters( 'bafg_filter_apply', array(
					'id' => '',
					'type' => 'radio',
					'label' => __( 'Apply Filter For', 'bafg' ),
					'subtitle' => __( 'Filtering will applicable on selected image.', 'bafg' ),
					'options' => array(
						'none' => __( 'None', 'bafg' ),
						'apply_before' => __( 'Before Image', 'bafg' ),
						'apply_after' => __( 'After Image', 'bafg' ),
					),
					'dependency' => array( 'bafg_before_after_method', '==', 'method_2' ),
					'is_pro' => true
				) ),

				array(
					'id' => 'bafg_image_styles',
					'type' => 'imageselect',
					'label' => __( 'Orientation Styles', 'bafg' ),
					'options' => array(
						'vertical' => array(
							'title' => __( 'Vertical', 'bafg' ),
							'url' => BEAF_ASSETS_URL . 'image/v.jpg',
						),
						'horizontal' => array(
							'title' => __( 'Horizontal', 'bafg' ),
							'url' => BEAF_ASSETS_URL . 'image/h.jpg',
						)
					),
					'default' => 'horizontal',
				),
				apply_filters( 'bafg_before_after_style',
					array(
						'id' => 'bafg_before_after_style',
						'type' => 'imageselect',
						'label' => __( 'BEAF template style', 'bafg' ),
						'subtitle' => __( 'Select a style for the before and after label.', 'bafg' ),
						'options' => array(
							'default' => array(
								'title' => __( 'Default', 'bafg' ),
								'url' => BEAF_ASSETS_URL . 'image/default.png',
							),
							'design-1' => array(
								'title' => __( 'Design 1', 'bafg' ),
								'url' => BEAF_ASSETS_URL . 'image/style1.png',
								'is_pro' => true
							),
							'design-2' => array(
								'title' => __( 'Design 2', 'bafg' ),
								'url' => BEAF_ASSETS_URL . 'image/style2.png',
								'is_pro' => true
							),
							'design-3' => array(
								'title' => __( 'Design 3', 'bafg' ),
								'url' => BEAF_ASSETS_URL . 'image/style3.png',
								'is_pro' => true
							),
							'design-4' => array(
								'title' => __( 'Design 4', 'bafg' ),
								'url' => BEAF_ASSETS_URL . 'image/style4.png',
								'is_pro' => true
							),
							'design-5' => array(
								'title' => __( 'Design 5', 'bafg' ),
								'url' => BEAF_ASSETS_URL . 'image/style5.png',
								'is_pro' => true
							),
							'design-6' => array(
								'title' => __( 'Design 6', 'bafg' ),
								'url' => BEAF_ASSETS_URL . 'image/style6.png',
								'is_pro' => true
							),
							'design-7' => array(
								'title' => __( 'Design 7', 'bafg' ),
								'url' => BEAF_ASSETS_URL . 'image/style7.png',
								'is_pro' => true
							),
							'design-8' => array(
								'title' => __( 'Design 8', 'bafg' ),
								'url' => BEAF_ASSETS_URL . 'image/style8.png',
								'is_pro' => true
							),
							'design-9' => array(
								'title' => __( 'Design 9', 'bafg' ),
								'url' => BEAF_ASSETS_URL . 'image/style9.png',
								'is_pro' => true
							)
						),
						'default' => 'default',
					), $post ),
			),

		),
		'options' => array(
			'title' => __( 'Options', 'bafg' ),
			'icon' => 'fa fa-cog',
			'fields' => array(
				array(
					'id' => 'bafg_default_offset',
					'type' => 'text',
					'label' => __( 'Default offset', 'bafg' ),
					'default' => '0.5',
					'subtitle' => __( 'How much of the before image is visible when the page loads. (e.g: 0.7)', 'bafg' ),
					'field_width' => 50,
				),
				array(
					'id' => 'bafg_before_label',
					'type' => 'text',
					'label' => __( 'Before Label', 'bafg' ),
					'default' => 'Before',
					'subtitle' => __( 'Set a custom label for the before image.', 'bafg' ),
					'field_width' => 50,
				),
				apply_filters( 'bafg_middle_label', array(
					'id' => '',
					'type' => 'text',
					'label' => __( 'Middle Label', 'bafg' ),
					'default' => 'Middle',
					'subtitle' => __( 'Set a custom label for the middle image.', 'bafg' ),
					'is_pro' => true,
					'field_width' => 50,
				), $post ),
				array(
					'id' => 'bafg_after_label',
					'type' => 'text',
					'label' => __( 'After Label', 'bafg' ),
					'default' => 'After',
					'subtitle' => __( 'Set a custom label for the after image.', 'bafg' ),
					'field_width' => 50,
				),
				// apply_filters( 'show_label_outside_image', array(
				// 	'id' => '',
				// 	'type' => 'switch',
				// 	'label' => __( 'Show Label Outside Of Image', 'bafg' ),
				// 	'default' => false,
				// 	'subtitle' => __( 'Show Label Outside of Image', 'bafg' ),
				// 	'is_pro' => true,
				// 	'field_width' => 50,
				// ), $post ),
				apply_filters( 'bafg_auto_slide', array(
					'id' => '',
					'type' => 'switch',
					'label' => __( 'Auto Slide', 'bafg' ),
					'default' => false,
					'subtitle' => __( 'The before and after image will slide automatically.', 'bafg' ),
					'is_pro' => true,
					'field_width' => 50,
				), $post ),
				array(
					'id' => 'bafg_both_video_play',
					'type' => 'switch',
					'label' => __( 'Play Both Videos On Slide', 'bafg' ),
					'default' => false,
					'subtitle' => __( 'Plays both before after videos on slide togather.', 'bafg' ),
					'class' => 'bafg-both-video-play',
					'field_width' => 50,
				),
				apply_filters( 'bafg_on_scroll_slide', array(
					'id' => '',
					'type' => 'switch',
					'label' => __( 'On Scroll Slide', 'bafg' ),
					'default' => false,
					'subtitle' => __( 'The before and after image slider will slide on scroll automatically.', 'bafg' ),
					'dependency' => array( 'bafg_auto_slide', '==', false ),
					'field_width' => 50,
				), $post ),

				array(
					'id' => 'bafg_slide_handle',
					'type' => 'switch',
					'label' => __( 'Disable Handle', 'bafg' ),
					'default' => false,
					'subtitle' => __( 'Disable the slider handle.', 'bafg' ),
					'dependency' => array( 'bafg_auto_slide', '==', true ),
					'field_width' => 50,
				),
				apply_filters( 'bafg_popup_preview', array(
					'id' => '',
					'type' => 'switch',
					'label' => __( 'Full Screen View', 'bafg' ),
					'default' => false,
					'subtitle' => __( 'Enable to display slider on full screen.', 'bafg' ),
					'is_pro' => true,
					'field_width' => 50,
				), $post ),

				array(
					'id' => 'bafg_move_slider_on_hover',
					'type' => 'switch',
					'label' => __( 'Move slider on mouse hover?', 'bafg' ),
					'default' => false,
					'field_width' => 50,
				),

				array(
					'id' => 'bafg_click_to_move',
					'type' => 'switch',
					'label' => __( 'Click To Move', 'bafg' ),
					'default' => false,
					'subtitle' => __( 'Allow a user to click (or tap) anywhere on the image to move the slider to that location.', 'bafg' ),
					'field_width' => 50,
					'dependency' => array( 'bafg_auto_slide', '==', '' )
				),

				array(
					'id' => 'bafg_click_to_move_text',
					'type' => 'heading',
					'label' => __( 'Click To Move', 'bafg' ),
					'default' => false,
					'subtitle' => __( 'The \'Click to Move\' feature is unavailable when \'Auto Slide\' is enabled. Please disable \'Auto Slide\' to use the \'Click to Move\' functionality.', 'bafg' ),
					'field_width' => 50,
					'dependency' => array( 'bafg_auto_slide', '!=', '' )
				),

				array(
					'id' => 'bafg_no_overlay',
					'type' => 'switch',
					'label' => __( 'Show Overlay', 'bafg' ),
					'default' => true,
					'subtitle' => __( 'Show overlay on the before and after image.', 'bafg' ),
					'field_width' => 50,
				),
				array(
					'id' => 'skip_lazy_load',
					'type' => 'switch',
					'label' => __( 'Skip Lazy Load', 'bafg' ),
					'default' => true,
					'subtitle' => __( 'Conflicting with lazy load? Try to skip lazy load.', 'bafg' ),
					'field_width' => 50,
				),
			)

		),
		'style' => array(
			'title' => __( 'Style', 'bafg' ),
			'icon' => 'fa fa-paint-brush',
			'fields' => array(
				array(
					'id' => 'bafg_before_label_background',
					'type' => 'color',
					'label' => __( 'Before Label Background', 'bafg' ),
					'field_width' => 33,
				),
				array(
					'id' => 'bafg_before_label_color',
					'type' => 'color',
					'label' => __( 'Before Label Color', 'bafg' ),
					'field_width' => 33,
				),
				array(
					'id' => 'bafg_after_label_background',
					'type' => 'color',
					'label' => __( 'After Label Background', 'bafg' ),
					'field_width' => 33,
				),
				array(
					'id' => 'bafg_after_label_color',
					'type' => 'color',
					'label' => __( 'After Label Color', 'bafg' ),
					'field_width' => 33,
				),

				apply_filters( 'bafg_handle_color', array(
					'id' => '',
					'type' => 'color',
					'label' => __( 'Slider Handle Color', 'bafg' ),
					'is_pro' => true,
					'field_width' => 33,
				), $post ),

				apply_filters( 'bafg_overlay_color', array(
					'id' => '',
					'type' => 'color',
					'label' => __( 'Slider Overlay Color', 'bafg' ),
					'is_pro' => true,
					'field_width' => 33,
				), $post ),
				apply_filters( 'bafg_overlay_color_opacity', array(
					'id' => '',
					'type' => 'text',
					'label' => __( 'Slider Overlay Opacity', 'bafg' ),
					'is_pro' => true,
					'placeholder' => __( 'Set a value between 0 to 100. (e.g: 50)', 'bafg' ),
					'field_width' => 50,
				), $post ),

				apply_filters( 'bafg_width', array(
					'id' => '',
					'type' => 'text',
					'label' => __( 'Slider Width', 'bafg' ),
					'is_pro' => true,
					'placeholder' => __( 'e.g:640px|%', 'bafg' ),
					'field_width' => 50,
				), $post ),

				apply_filters( 'bafg_height', array(
					'id' => '',
					'type' => 'text',
					'label' => __( 'Slider Height', 'bafg' ),
					'is_pro' => true,
					'placeholder' => __( 'e.g:340px|%', 'bafg' ),
					'field_width' => 50,
				), $post ),

				apply_filters( 'bafg_slider_alignment', array(
					'id' => '',
					'type' => 'select',
					'label' => __( 'Slider Alignment', 'bafg' ),
					'is_pro' => true,
					'field_width' => 50,
					'options' => array(
						'' => 'Default',
						'left' => 'Left',
						'center' => 'Center',
						'right' => 'Right'
					)
				), $post ),

				array(
					'id' => 'bafg_heading',
					'type' => 'heading',
					'title' => __( 'Heading Styles', 'bafg' ),
				),
				array(
					'id' => 'bafg_slider_info_heading_font_size',
					'type' => 'text',
					'label' => __( 'Font Size', 'bafg' ),
					'placeholder' => '16px',
					'field_width' => 33,
				),
				array(
					'id' => 'bafg_slider_info_heading_alignment',
					'type' => 'select',
					'label' => __( 'Alignment', 'bafg' ),
					'options' => array(
						'' => 'Default',
						'left' => 'Left',
						'center' => 'Center',
						'right' => 'Right'
					),
					'field_width' => 33,
				),
				array(
					'id' => 'bafg_slider_info_heading_font_color',
					'type' => 'color',
					'label' => __( 'Font Color', 'bafg' ),
					'field_width' => 33,
				),
				array(
					'id' => 'bafg_desc',
					'type' => 'heading',
					'title' => __( 'Description Styles', 'bafg' ),
				),
				array(
					'id' => 'bafg_slider_info_desc_font_size',
					'type' => 'text',
					'label' => __( 'Font Size', 'bafg' ),
					'placeholder' => '14px',
					'field_width' => 33,
				),
				array(
					'id' => 'bafg_slider_info_desc_alignment',
					'type' => 'select',
					'label' => __( 'Alignment', 'bafg' ),
					'options' => array(
						'' => 'Default',
						'left' => 'Left',
						'center' => 'Center',
						'right' => 'Right'
					),
					'field_width' => 33,
				),
				array(
					'id' => 'bafg_slider_info_desc_font_color',
					'type' => 'color',
					'label' => __( 'Font Color', 'bafg' ),
					'field_width' => 33,
				),
				array(
					'id' => 'bafg_readmore',
					'type' => 'heading',
					'title' => __( 'Read more Styles', 'bafg' ),
				),

				array(
					'id' => 'bafg_slider_info_readmore_font_color',
					'type' => 'color',
					'label' => __( 'Font Color', 'bafg' ),
					'field_width' => 25,
				),
				//hover color
				array(
					'id' => 'bafg_slider_info_readmore_hover_font_color',
					'type' => 'color',
					'label' => __( 'Hover Color', 'bafg' ),
					'field_width' => 25,
				),
				array(
					'id' => 'bafg_slider_info_readmore_bg_color',
					'type' => 'color',
					'label' => __( 'Background Color', 'bafg' ),
					'field_width' => 25,
				),

				array(
					'id' => 'bafg_slider_info_readmore_hover_bg_color',
					'type' => 'color',
					'label' => __( 'Hover Background Color', 'bafg' ),
					'field_width' => 25,
				),
				array(
					'id' => 'bafg_slider_info_readmore_font_size',
					'type' => 'text',
					'label' => __( 'Font Size', 'bafg' ),
					'placeholder' => 'eg.14px',
					'field_width' => 33,
				),
				array(
					'id' => 'bafg_slider_info_readmore_button_padding_top_bottom',
					'type' => 'text',
					'label' => __( 'Padding Top Bottom', 'bafg' ),
					'placeholder' => 'eg.14px',
					'field_width' => 33,
				),
				array(
					'id' => 'bafg_slider_info_readmore_button_padding_left_right',
					'type' => 'text',
					'label' => __( 'Padding Left Right', 'bafg' ),
					'placeholder' => 'eg.14px',
					'field_width' => 33,
				),
				//border radius
				array(
					'id' => 'bafg_slider_info_readmore_border_radius',
					'type' => 'text',
					'label' => __( 'Border Radius', 'bafg' ),
					'placeholder' => 'eg.14px',
					'field_width' => 33,
				),
				//button width
				array(
					'id' => 'bafg_slider_info_readmore_button_width',
					'type' => 'select',
					'label' => __( 'Button Width', 'bafg' ),
					'options' => array(
						'' => 'Default',
						'full-width' => 'Full width',
					),
					'field_width' => 33,
				),
				//alignment
				array(
					'id' => 'bafg_slider_info_readmore_alignment',
					'type' => 'select',
					'label' => __( 'Alignment', 'bafg' ),
					'options' => array(
						'' => 'Default',
						'left' => 'Left',
						'center' => 'Center',
						'right' => 'Right'
					),
					'field_width' => 33,
					'dependency' => array( 'bafg_slider_info_readmore_button_width', '==', '' ),
				),


			)
		)

	),
) );
