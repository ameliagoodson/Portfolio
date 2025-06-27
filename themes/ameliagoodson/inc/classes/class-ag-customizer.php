<?php

class AG_Customizer
{
	// Method
	public function agtheme_register($wp_customize)
	{
		// ------------------------------------------------------------------------------ //
		//  HERO SETTINGS
		// ------------------------------------------------------------------------------ //
		// Add the panel for Hero settings
		$wp_customize->add_panel('hero_settings', array(
			'title' => __('Hero Settings', 'agtheme'),
			'priority' => 10,
		));

		// Add a section for Hero layout
		$wp_customize->add_section('hero_layout_section', array(
			'title' => __('Hero Layout', 'agtheme'),
			'panel' => 'hero_settings',
			'priority' => 10,
		));

		// Hero layout setting
		$wp_customize->add_setting('hero_layout', array(
			'default' => 'Half image',
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control('hero_layout', array(
			'label' => __('Hero Layout', 'agtheme'),
			'section' => 'hero_layout_section',
			'type' => 'select',
			'choices' => array(
				'Three JS' => __('Three JS', 'agtheme'),
				'Half image' => __('Half Image', 'agtheme'),
				'Full image' => __('Full Image', 'agtheme'),
				'No image' => __('No Image', 'agtheme'),
			),
		));

		// Add a section for Hero background image
		$wp_customize->add_section('hero_bg_image_section', array(
			'title' => __('Hero Background Image', 'agtheme'),
			'panel' => 'hero_settings',
			'priority' => 20,
		));

		// Hero background image setting
		$wp_customize->add_setting('hero_bg_image_setting', array(
			'default' => '',
			'sanitize_callback' => 'esc_url_raw',
		));

		$wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'hero_bg_image_setting', array(
			'label' => __('Hero Background Image', 'agtheme'),
			'section' => 'hero_bg_image_section',
			'settings' => 'hero_bg_image_setting',
		)));

		// Hero background image position setting
		$wp_customize->add_setting('hero_bg_image_position', array(
			'default' => 'center center',
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control('hero_bg_image_position', array(
			'label' => __('Hero Background Image Position', 'agtheme'),
			'section' => 'hero_bg_image_section',
			'type' => 'select',
			'default' => 'center center',
			'choices' => array(
				'left top' => __('Top Left', 'agtheme'),
				'center top' => __('Top Center', 'agtheme'),
				'right top' => __('Top Right', 'agtheme'),
				'left center' => __('Center Left', 'agtheme'),
				'center center' => __('Center Center', 'agtheme'),
				'right center' => __('Center Right', 'agtheme'),
				'left bottom' => __('Bottom Left', 'agtheme'),
				'center bottom' => __('Bottom Center', 'agtheme'),
				'right bottom' => __('Bottom Right', 'agtheme'),
			),
		));

		// Hero background image setting
		$wp_customize->add_setting('hero_transparent_header', array(
			'default' => '',
			'sanitize_callback' => 'esc_url_raw',
		));

		$wp_customize->add_control('hero_transparent_header', array(
			'label' => __('Transparent header', 'agtheme'),
			'type' => 'checkbox',
			'section' => 'hero_bg_image_section',
			'settings' => 'hero_transparent_header',
		));

		// Add background size option to Hero background image section
		$wp_customize->add_setting('hero_bg_size', array(
			'default' => 'cover',
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control('hero_bg_size', array(
			'label' => __('Background Size', 'agtheme'),
			'section' => 'hero_bg_image_section',
			'type' => 'select',
			'choices' => array(
				'cover' => __('Cover (fills the container)', 'agtheme'),
				'contain' => __('Contain (shows entire image)', 'agtheme'),
				'auto' => __('Auto (original size)', 'agtheme'),
			),
		));

		// Add a section for Hero image
		$wp_customize->add_section('hero_image_section', array(
			'title' => __('Hero Image', 'agtheme'),
			'panel' => 'hero_settings',
			'priority' => 30,
		));

		$wp_customize->add_setting('hero_image', array(
			'default' => '',
			'sanitize_callback' => 'esc_url_raw',
		));

		$wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'hero_image', array(
			'label' => __('Hero Image', 'agtheme'),
			'section' => 'hero_image_section',
			'settings' => 'hero_image',
		)));

		// Add a section for Hero content 
		$wp_customize->add_section('hero_content_section', array(
			'title' => __('Hero Content', 'agtheme'),
			'panel' => 'hero_settings',
			'priority' => 40,
		));

		// Hero Title
		$wp_customize->add_setting('hero_title', array(
			'default' => '',
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control('hero_title', array(
			'label' => __('Hero Title', 'agtheme'),
			'section' => 'hero_content_section',
			'type' => 'text',
			'priority' => 1, // Ensure it shows at the top
		));

		// Hero Subtitle
		$wp_customize->add_setting('hero_subtitle', array(
			'default' => '',
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control('hero_subtitle', array(
			'label' => __('Hero Subtitle', 'agtheme'),
			'section' => 'hero_content_section',
			'type' => 'text',
			'priority' => 2,
		));

		// Text alignment setting 
		$wp_customize->add_setting('text_alignment', array(
			'default' => 'left',
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control('text_alignment', array(
			'label' => __('Text Alignment', 'agtheme'),
			'section' => 'hero_content_section',
			'type' => 'select',
			'choices' => array(
				'left' => __('Left', 'agtheme'),
				'center' => __('Center', 'agtheme'),
				'right' => __('Right', 'agtheme'),
			),
		));

		// Hero title color setting
		$wp_customize->add_setting('hero_title_color', array(
			'default' => '#ffffff',
			'sanitize_callback' => 'sanitize_hex_color',
		));

		$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'hero_title_color', array(
			'label' => __('Title Color', 'agtheme'),
			'section' => 'hero_content_section',
			'settings' => 'hero_title_color',
		)));

		// Hero subtitle color setting
		$wp_customize->add_setting('hero_subtitle_color', array(
			'default' => '#ffffff',
			'sanitize_callback' => 'sanitize_hex_color',
		));

		$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'hero_subtitle_color', array(
			'label' => __('Subtitle Color', 'agtheme'),
			'section' => 'hero_content_section',
			'settings' => 'hero_subtitle_color',
		)));

		// Hero button settings
		$wp_customize->add_setting('hero_button_bg_color', array(
			'default' => '#d23c50', // Using your accent color as default
			'sanitize_callback' => 'sanitize_hex_color',
		));

		$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'hero_button_bg_color', array(
			'label' => __('Button Background Color', 'agtheme'),
			'section' => 'hero_content_section',
			'settings' => 'hero_button_bg_color',
		)));

		// Add this setting
		$wp_customize->add_setting('hero_button_hover_bg_color', array(
			'default' => '#ff7f62',
			'sanitize_callback' => 'sanitize_hex_color',
		));

		// Add this control
		$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'hero_button_hover_bg_color', array(
			'label' => __('Button Hover Background Color', 'agtheme'),
			'section' => 'hero_content_section',
			'settings' => 'hero_button_hover_bg_color',
		)));

		$wp_customize->add_setting('hero_button_text_color', array(
			'default' => '#ffffff',
			'sanitize_callback' => 'sanitize_hex_color',
		));

		$wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'hero_button_text_color', array(
			'label' => __('Button Text Color', 'agtheme'),
			'section' => 'hero_content_section',
			'settings' => 'hero_button_text_color',
		)));

		// Button text setting
		$wp_customize->add_setting('hero_button_text', array(
			'default' => 'See work',
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control('hero_button_text', array(
			'label' => __('Button Text', 'agtheme'),
			'section' => 'hero_content_section',
			'type' => 'text',
		));

		// Button URL setting
		$wp_customize->add_setting('hero_button_url', array(
			'default' => '/work',
			'sanitize_callback' => 'sanitize_text_field',
		));

		$wp_customize->add_control('hero_button_url', array(
			'label' => __('Button URL', 'agtheme'),
			'section' => 'hero_content_section',
			'type' => 'text',
			'description' => __('Enter URL relative to site root (e.g., /work) or full URL', 'agtheme'),
		));

		/* ------------------------------------------------------------------------------ /*
    /*  GENERAL OPTIONS
    /* ------------------------------------------------------------------------------ */

		$wp_customize->add_section('agtheme_general_options', array(
			'title'      => esc_html__('General Options', 'agtheme'),
			'priority'   => 10,
			'capability' => 'edit_theme_options',
			'panel'      => 'agtheme_theme_options',
		));

		/* Disable Animations ------------ */

		$wp_customize->add_setting('agtheme_disable_animations', array(
			'capability'        => 'edit_theme_options',
			'default'           => false,
			'sanitize_callback' => 'agtheme_sanitize_checkbox'
		));

		$wp_customize->add_control('agtheme_disable_animations', array(
			'type'        => 'checkbox',
			'section'     => 'agtheme_general_options',
			'label'       => esc_html__('Disable Animations', 'agtheme'),
			'description' => esc_html__('Check to disable animations and transitions in the theme.', 'agtheme'),
		));

		// ------------------------------------------------------------------------------ //
		//  SITE HEADER
		// ------------------------------------------------------------------------------ //
		$wp_customize->add_section('site_header', array(
			'title' => __('Header', 'agtheme'),
		));

		$wp_customize->add_setting('header_color', array(
			'default' => 'transparent',
		));

		$wp_customize->add_control('header_color', array(
			'label' => __('Header color', 'agtheme'),
			'section' => 'site_header',
			'type' => 'color',
		));

		/* ------------------------------------------------------------------------------ /*
    /*  BLOG OPTIONS
    /* ------------------------------------------------------------------------------ */

		$wp_customize->add_panel('agtheme_theme_options', array(
			'priority'       => 30,
			'capability'     => 'edit_theme_options',
			'theme_supports' => '',
			'title'          => esc_html__('Blog options', 'agtheme'),
		));
		/* ------------------------------------------------------------------------------ /*
    /*  ARCHIVES
    /* ------------------------------------------------------------------------------ */

		$wp_customize->add_section('agtheme_archive_pages_options', array(
			'title'      => esc_html__('Archive Pages', 'agtheme'),
			'priority'   => 30,
			'capability' => 'edit_theme_options',
			'panel'      => 'agtheme_theme_options',
		));

		/* Home Text --------------- */

		$wp_customize->add_setting('agtheme_home_text', array(
			'capability'        => 'edit_theme_options',
			'default'           => '',
			'sanitize_callback' => 'sanitize_textarea_field',
		));

		$wp_customize->add_control('agtheme_home_text', array(
			'type'        => 'textarea',
			'section'     => 'agtheme_archive_pages_options',
			'label'       => esc_html__('Intro Text', 'agtheme'),
			'description' => esc_html__('Shown below the site title on the front page, when the front page is set to display latest posts.', 'agtheme'),
		));

		/* Show Archive Filters --------- */

		$wp_customize->add_setting('agtheme_show_archive_filters', array(
			'capability'        => 'edit_theme_options',
			'default'           => true,
			'sanitize_callback' => 'agtheme_sanitize_checkbox',
		));

		$wp_customize->add_control('agtheme_show_archive_filters', array(
			'type'        => 'checkbox',
			'section'     => 'agtheme_archive_pages_options',
			'label'       => esc_html__('Show Filter', 'agtheme'),
			'description' => esc_html__('Whether to display the category filter on the post archive.', 'agtheme'),
		));

		/* Show Category Post Count ------ */

		$wp_customize->add_setting('agtheme_show_filter_category_post_count', array(
			'capability'        => 'edit_theme_options',
			'default'           => false,
			'sanitize_callback' => 'agtheme_sanitize_checkbox',
		));

		$wp_customize->add_control('agtheme_show_filter_category_post_count', array(
			'type'        => 'checkbox',
			'section'     => 'agtheme_archive_pages_options',
			'label'       => esc_html__('Show Filter Category Post Count', 'agtheme'),
			'description' => esc_html__('Whether to display the number of posts in each category in the filter.', 'agtheme'),
		));

		/* Separator --------------------- */

		$wp_customize->add_setting('agtheme_archive_pages_options_sep_1', array(
			'sanitize_callback' => 'wp_filter_nohtml_kses',
		));

		$wp_customize->add_control(new AG_Theme_Separator_Control($wp_customize, 'agtheme_archive_pages_options_sep_1', array(
			'section' => 'agtheme_archive_pages_options',
		)));

		/* Pagination Type --------------- */

		$wp_customize->add_setting('agtheme_pagination_type', array(
			'capability'        => 'edit_theme_options',
			'default'           => 'button',
			'sanitize_callback' => 'agtheme_sanitize_select',
		));

		$wp_customize->add_control('agtheme_pagination_type', array(
			'type'        => 'select',
			'section'     => 'agtheme_archive_pages_options',
			'label'       => esc_html__('Pagination Type', 'agtheme'),
			'description' => esc_html__('Determines how the pagination on archive pages should be displayed.', 'agtheme'),
			'choices'     => array(
				'button' => esc_html__('Load more button', 'agtheme'),
				'scroll' => esc_html__('Load more on scroll', 'agtheme'),
				'links'  => esc_html__('Links', 'agtheme'),
			),
		));

		/* Separator --------------------- */

		$wp_customize->add_setting('agtheme_archive_pages_options_sep_2', array(
			'sanitize_callback' => 'wp_filter_nohtml_kses',
		));

		$wp_customize->add_control(new AG_Theme_Separator_Control($wp_customize, 'agtheme_archive_pages_options_sep_2', array(
			'section' => 'agtheme_archive_pages_options',
		)));

		/* Number of Post Columns -------- */

		// Store the different screen size options in an array for brevity.
		$post_column_option_sizes = AG_Customizer::get_archive_columns_options();

		// Loop over each screen size option and register it
		foreach ($post_column_option_sizes as $setting_name => $data) {
			$wp_customize->add_setting($setting_name, array(
				'capability'        => 'edit_theme_options',
				'default'           => $data['default'],
				'sanitize_callback' => 'agtheme_sanitize_select',
			));

			$wp_customize->add_control($setting_name, array(
				'type'        => 'select',
				'section'     => 'agtheme_archive_pages_options',
				'label'       => $data['label'],
				'description' => $data['description'],
				'choices'     => array(
					'1' => esc_html__('One', 'agtheme'),
					'2' => esc_html__(
						'Two',
						'agtheme'
					),
					'3' => esc_html__('Three', 'agtheme'),
					'4' => esc_html__('Four', 'agtheme'),
				),
			));
		}

		/* Separator --------------------- */

		$wp_customize->add_setting('agtheme_archive_pages_options_sep_3', array(
			'sanitize_callback' => 'wp_filter_nohtml_kses',
		));

		$wp_customize->add_control(new AG_Theme_Separator_Control($wp_customize, 'agtheme_archive_pages_options_sep_3', array(
			'section' => 'agtheme_archive_pages_options',
		)));

		/* Post Meta --------------------- */

		// Get an array with the post types that support the post meta Customizer setting.
		$post_types_with_post_meta = self::get_post_types_with_post_meta();

		foreach ($post_types_with_post_meta as $post_type => $post_type_settings) {

			// Only output for registered post types.
			if (!post_type_exists($post_type)) {
				continue;
			}

			// Get the post type name for inclusion in the label and description.
			$post_type_obj  = get_post_type_object($post_type);
			$post_type_name = isset($post_type_obj->labels->name) ? $post_type_obj->labels->name : $post_type;

			// Parse the arguments of the post type.
			$post_type_settings = wp_parse_args($post_type_settings, array(
				'default' => array(
					'archive' => array(),
					'single'  => array(),
				),
			));

			$wp_customize->add_setting('agtheme_post_meta_' . $post_type, array(
				'capability'        => 'edit_theme_options',
				'default'           => $post_type_settings['default']['archive'],
				'sanitize_callback' => 'agtheme_sanitize_multiple_checkboxes',
			));

			$wp_customize->add_control(new AG_Theme_Customize_Control_Checkbox_Multiple($wp_customize, 'agtheme_post_meta_' . $post_type, array(
				'section'     => 'agtheme_archive_pages_options',
				'label'       => sprintf(esc_html_x('Post Meta for %s', 'Customizer setting name. %s = Post type plural name', 'agtheme'), $post_type_name),
				'description' => sprintf(esc_html_x('Select which post meta to display for %s on archive pages.', 'Customizer setting description. %s = Post type plural name', 'agtheme'), strtolower($post_type_name)),
				'choices'     => self::get_post_meta_options($post_type),
			)));
		}


		/* ------------------------------------------------------------------------------ /*
    /*  SINGLE POSTS
    /* ------------------------------------------------------------------------------ */

		$wp_customize->add_section('agtheme_single_options', array(
			'title'      => esc_html__('Single Posts', 'agtheme'),
			'priority'   => 30,
			'capability' => 'edit_theme_options',
			'panel'      => 'agtheme_theme_options',
		));

		/* Post Meta --------------------- */

		// Loop over the post types that support the post meta Customizer setting.
		foreach ($post_types_with_post_meta as $post_type => $post_type_settings) {

			// Only output for registered post types.
			if (!post_type_exists($post_type)) {
				continue;
			}

			// Get the post type name for inclusion in the label and description.
			$post_type_obj  = get_post_type_object($post_type);
			$post_type_name = isset($post_type_obj->labels->name) ? $post_type_obj->labels->name : $post_type;

			// Parse the arguments of the post type.
			$post_type_settings = wp_parse_args($post_type_settings, array(
				'default' => array(
					'archive' => array(),
					'single'  => array(),
				),
			));

			$wp_customize->add_setting('agtheme_post_meta_' . $post_type . '_single', array(
				'capability'        => 'edit_theme_options',
				'default'           => $post_type_settings['default']['single'],
				'sanitize_callback' => 'agtheme_sanitize_multiple_checkboxes',
			));

			$wp_customize->add_control(new AG_Theme_Customize_Control_Checkbox_Multiple($wp_customize, 'agtheme_post_meta_' . $post_type . '_single', array(
				'section'     => 'agtheme_single_options',
				'label'       => sprintf(esc_html_x('Post Meta for %s', 'Customizer setting name. %s = Post type plural name', 'agtheme'), $post_type_name),
				'description' => sprintf(esc_html_x('Select which post meta to display on single %s.', 'Customizer setting description. %s = Post type plural name', 'agtheme'), strtolower($post_type_name)),
				'choices'     => self::get_post_meta_options($post_type),
			)));
		}



		/* ------------------------------------------------------------------------------ /*
    /*  SANITATION FUNCTIONS
    /* ------------------------------------------------------------------------------ */

		/* Sanitize Checkbox ------------- */

		function agtheme_sanitize_checkbox($checked)
		{
			return ((isset($checked) && true == $checked) ? true : false);
		}

		/* Sanitize Multiple Checkboxes -- */

		function agtheme_sanitize_multiple_checkboxes($values)
		{
			$multi_values = !is_array($values) ? explode(',', $values) : $values;
			return !empty($multi_values) ? array_map('sanitize_text_field', $multi_values) : array();
		}

		/* Sanitize Select --------------- */

		function agtheme_sanitize_select($input, $setting)
		{
			$input = sanitize_key($input);
			$choices = $setting->manager->get_control($setting->id)->choices;
			return (array_key_exists($input, $choices) ? $input : $setting->default);
		}
	}

	/**
	 * Returns the global color options.
	 */
	public static function get_color_options()
	{

		return array(
			'regular'   => array(
				// Note: The body background color uses the built-in WordPress theme mod, which is why it isn't included in this array.
				'agtheme_light_background_color' => array(
					'default' => '#f3efe9',
					'label'   => esc_html__('Light Background Color', 'agtheme'),
					'slug'    => 'light-background',
					'palette' => true,
				),
				'agtheme_primary_color' => array(
					'default' => '#1e2d32',
					'label'   => esc_html__('Primary Text Color', 'agtheme'),
					'slug'    => 'primary',
					'palette' => true,
				),
				'agtheme_secondary_color' => array(
					'default' => '#707376',
					'label'   => esc_html__('Secondary Text Color', 'agtheme'),
					'slug'    => 'secondary',
					'palette' => true,
				),
				'agtheme_border_color' => array(
					'default' => '#d6d5d4',
					'label'   => esc_html__('Border Color', 'agtheme'),
					'slug'    => 'border',
					'palette' => true,
				),
				'agtheme_accent_color' => array(
					'default' => '#d23c50',
					'label'   => esc_html__('Accent Color', 'agtheme'),
					'slug'    => 'accent',
					'palette' => true,
				),
				'agtheme_menu_modal_text_color' => array(
					'default' => '#ffffff',
					'label'   => esc_html__('Menu Modal Text Color', 'agtheme'),
					'slug'    => 'menu-modal-text',
					'palette' => false,
				),
				'agtheme_menu_modal_background_color' => array(
					'default' => '#1e2d32',
					'label'   => esc_html__('Menu Modal Background Color', 'agtheme'),
					'slug'    => 'menu-modal-background',
					'palette' => false,
				),
			),
			'dark_mode'   => array(
				'agtheme_dark_mode_background_color' => array(
					'default' => '#1E2D32',
					'label'   => esc_html__('Background Color', 'agtheme'),
					'slug'    => 'background',
					'palette' => false,
				),
				'agtheme_dark_mode_light_background_color' => array(
					'default' => '#29373C',
					'label'   => esc_html__('Light Background Color', 'agtheme'),
					'slug'    => 'light-background',
					'palette' => false,
				),
				'agtheme_dark_mode_primary_color' => array(
					'default' => '#ffffff',
					'label'   => esc_html__('Primary Text Color', 'agtheme'),
					'slug'    => 'primary',
					'palette' => false,
				),
				'agtheme_dark_mode_secondary_color' => array(
					'default' => '#939699',
					'label'   => esc_html__('Secondary Text Color', 'agtheme'),
					'slug'    => 'secondary',
					'palette' => false,
				),
				'agtheme_dark_mode_border_color' => array(
					'default' => '#404C51',
					'label'   => esc_html__('Border Color', 'agtheme'),
					'slug'    => 'border',
					'palette' => false,
				),
				'agtheme_dark_mode_accent_color' => array(
					'default' => '#d23c50',
					'label'   => esc_html__('Accent Color', 'agtheme'),
					'slug'    => 'accent',
					'palette' => false,
				),
				'agtheme_dark_mode_menu_modal_text_color' => array(
					'default' => '#ffffff',
					'label'   => esc_html__('Menu Modal Text Color', 'agtheme'),
					'slug'    => 'menu-modal-text',
					'palette' => false,
				),
				'agtheme_dark_mode_menu_modal_background_color' => array(
					'default' => '#344247',
					'label'   => esc_html__('Menu Modal Background Color', 'agtheme'),
					'slug'    => 'menu-modal-background',
					'palette' => false,
				),
			),
		);
	}
	/**
	 * Returns the post archive column options.
	 */
	public static function get_archive_columns_options()
	{

		return array(
			'agtheme_post_grid_columns_mobile' => array(
				'label'       => esc_html__('Columns on Mobile', 'agtheme'),
				'default'     => '1',
				'description' => esc_html__('Screen width: 0px - 700px', 'agtheme'),
			),
			'agtheme_post_grid_columns_tablet' => array(
				'label'       => esc_html__('Columns on Tablet', 'agtheme'),
				'default'     => '2',
				'description' => esc_html__('Screen width: 700px - 1000px', 'agtheme'),
			),
			'agtheme_post_grid_columns_laptop' => array(
				'label'       => esc_html__('Columns on Laptop', 'agtheme'),
				'default'     => '2',
				'description' => esc_html__('Screen width: 1000px - 1200px', 'agtheme'),
			),
			'agtheme_post_grid_columns_desktop' => array(
				'label'       => esc_html__('Columns on Desktop', 'agtheme'),
				'default'     => '3',
				'description' => esc_html__('Screen width: 1200px - 1600px', 'agtheme'),
			),
			'agtheme_post_grid_columns_desktop_xl' => array(
				'label'       => esc_html__('Columns on Desktop XL', 'agtheme'),
				'default'     => '4',
				'description' => esc_html__('Screen width: > 1600px', 'agtheme'),
			),
		);
	}

	/**
	 * Returns the available post meta options.
	 */
	public static function get_post_meta_options($post_type)
	{

		$post_meta_options = array(
			'post' => array(
				'author'     => esc_html__('Author', 'agtheme'),
				'categories' => esc_html__('Categories', 'agtheme'),
				'tags'       => esc_html__('Tags', 'agtheme'),
				'comments'   => esc_html__('Comments', 'agtheme'),
				'date'       => esc_html__('Date', 'agtheme'),
				'edit-link'  => esc_html__('Edit link (for logged in users)', 'agtheme'),
			),
		);

		return isset($post_meta_options[$post_type]) ? $post_meta_options[$post_type] : array();
	}


	/**
	 * Returns an array of post types with post meta options and their default values.
	 */
	public static function get_post_types_with_post_meta()
	{

		return array(
			'post' => array(
				'default' => array(
					'archive' => array('categories', 'date'),
					'single'  => array('categories', 'date', 'tags', 'edit-link'),
				),
			),
		);
	}

	/**
	 * Enqueue the Customizer JavaScript.
	 */
	public static function enqueue_customizer_javascript()
	{
		wp_enqueue_script('agtheme-customizer-javascript', get_template_directory_uri() . '/assets/js/customizer.js', array('jquery', 'customize-controls'), '', true);
	}
}

// Create new instance of the AG_Customizer class. 
$ag_customizer = new AG_Customizer();

// Tells WordPress to call the agtheme_register method of the $ag_customizer instance when it's time to register customizer settings.
add_action('customize_register', array($ag_customizer, 'agtheme_register'));
add_action('customize_controls_enqueue_scripts', array('AG_Customizer', 'enqueue_customizer_javascript'));

/* ------------------------------------------------------------------------------ /*
/*  CUSTOM CUSTOMIZER CONTROLS
/* ------------------------------------------------------------------------------ */

if (class_exists('WP_Customize_Control')) {
	/**
	 * Separator Control
	 */
	class AG_Theme_Separator_Control extends WP_Customize_Control
	{
		public $type = 'agtheme_separator_control';
		public function render_content()
		{
			echo '<hr/>';
		}
	}

	/**
	 * Multiple Checkboxes control.
	 * Based on a solution by Justin Tadlock: http://justintadlock.com/archives/2015/05/26/multiple-checkbox-customizer-control
	 */
	class AG_Theme_Customize_Control_Checkbox_Multiple extends WP_Customize_Control
	{

		public $type = 'checkbox-multiple';

		public function render_content()
		{

			if (empty($this->choices)) {
				return;
			}

			if (!empty($this->label)) {
				echo '<span class="customize-control-title">' . esc_html($this->label) . '</span>';
			}

			if (!empty($this->description)) {
				echo '<span class="description customize-control-description">' . esc_html($this->description) . '</span>';
			}

			$multi_values = !is_array($this->value()) ? explode(',', $this->value()) : $this->value();
?>

			<ul>
				<?php foreach ($this->choices as $value => $label) : ?>
					<li>
						<label>
							<input type="checkbox" value="<?php echo esc_attr($value); ?>" <?php checked(in_array($value, $multi_values)); ?> />
							<?php echo esc_html($label); ?>
						</label>
					</li>
				<?php endforeach; ?>
			</ul>

			<input type="hidden" <?php $this->link(); ?> value="<?php echo esc_attr(implode(',', $multi_values)); ?>" />

<?php
		}
	}
}
