<?php

add_action('plugins_loaded', function () {
  error_log('Plugins loaded: ACF exists? ' . (function_exists('acf_register_block_type') ? 'yes' : 'no'));
});
/* ------------------------------------------------------------------------------ /*
/*  ENQUEUE STYLES
/* ------------------------------------------------------------------------------ */

function ag_register_styles()
{
  wp_enqueue_style('ag_styles', get_template_directory_uri() . '/assets/css/theme.css');

  wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap', false);

  wp_enqueue_style('material-icons', 'https://fonts.googleapis.com/icon?family=Material+Icons', false);

  // Customizer styles.
  wp_add_inline_style('ag_styles', AG_Customizer_CSS::get_customizer_css());
}
add_action('wp_enqueue_scripts', 'ag_register_styles');

/* ------------------------------------------------------------------------------ /*
/*  ENQUEUE SCRIPTS
/* ------------------------------------------------------------------------------ */

function agtheme_register_scripts()
{
  error_log('agtheme_register_scripts function called');

  // Register vendor scripts first
  wp_register_script('agtheme-css-vars-ponyfill', get_template_directory_uri() . '/assets/js/vendor/css-vars-ponyfill.min.js', array(), '3.6.0', true);
  wp_register_script('isotope', get_template_directory_uri() . '/assets/js/vendor/isotope.pkgd.min.js', array(), '3.0.6', true);
  wp_register_script('scroll-reveal', get_template_directory_uri() . '/assets/js/vendor/scrollreveal.min.js', array(), '4.0.5', true);
  wp_register_script('threejs', 'https://cdn.jsdelivr.net/npm/three@0.172.0/build/three.min.js', array(), '0.172.0', true);
  wp_register_script('agtheme-threejs-hero', get_template_directory_uri() . '/assets/js/threejs-hero.js', array('threejs'), filemtime(get_template_directory() . '/assets/js/threejs-hero.js'), true);

  // Enqueue main theme script with all dependencies
  $js_dependencies = array(
    'jquery',
    'imagesloaded',
    'agtheme-css-vars-ponyfill',
    'isotope',
    'scroll-reveal'
  );

  wp_enqueue_script(
    'agtheme-scripts',
    get_template_directory_uri() . '/assets/js/scripts-ag.js',
    $js_dependencies,
    filemtime(get_template_directory() . '/assets/js/scripts-ag.js'),
    true // Load in footer
  );

  wp_enqueue_script('agtheme-threejs-hero');

  // AJAX config
  $ajax_url = admin_url('admin-ajax.php');

  wp_localize_script('agtheme-scripts', 'agtheme_ajax_load_more', array(
    'ajaxurl' => esc_url($ajax_url),
  ));

  wp_localize_script('agtheme-scripts', 'agtheme_ajax_filters', array(
    'ajaxurl' => esc_url($ajax_url),
  ));
}
add_action('wp_enqueue_scripts', 'agtheme_register_scripts');


function check_enqueued_scripts()
{
  global $wp_scripts;
  foreach ($wp_scripts->queue as $handle) {
    error_log($handle);
  }
}

add_action('wp_print_scripts', 'check_enqueued_scripts');


/* ------------------------------------------------------------------------------ /*
/*  ADD FEATURES
/* ------------------------------------------------------------------------------ */
function ag_add_features()
{
  // Add featured image
  add_theme_support('post-thumbnails');

  add_theme_support('custom-logo', array(
    'height'      => 100,
    'width'       => 400,
    'flex-height' => true,
    'flex-width'  => true,
  ));

  // Add menus
  add_theme_support('menus');

  // Add support for custom background colors and background images in customizer
  add_theme_support('custom-background', array(
    'default-color'  => 'FFFFFF'
  ));

  // Add excerpts for pages
  add_post_type_support('page', 'excerpt');

  // Add align wide and align full for blocks
  add_theme_support('align-wide');
}
add_action('after_setup_theme', 'ag_add_features');


function ag_register_menus()
{
  register_nav_menus(array(
    'primary' => __('Main menu', 'agtheme'),
    'footer' => __('Footer menu', 'agtheme'),
  ));
};
add_action('after_setup_theme', 'ag_register_menus');


function ag_hero_styles()
{
  $hero_title_color = get_theme_mod('hero_title_color', '#ffffff');
  $hero_subtitle_color = get_theme_mod('hero_subtitle_color', '#ffffff');
  $hero_button_bg_color = get_theme_mod('hero_button_bg_color', '#d23c50');
  $hero_button_text_color = get_theme_mod('hero_button_text_color', '#ffffff');
  $hero_button_hover_bg_color = get_theme_mod('hero_button_hover_bg_color', '#ff7f62');
  $hero_bg_size = get_theme_mod('hero_bg_size', 'cover');

  $custom_css = "
        .hero-title { color: {$hero_title_color}; }
        .hero-subtitle { color: {$hero_subtitle_color}; }
        .hero .btn { background-color: {$hero_button_bg_color}; color: {$hero_button_text_color}; }
        .hero .btn:hover { background-color: {$hero_button_hover_bg_color}; }
        .hero[style*='background-image'] { background-size: {$hero_bg_size}; }
    ";

  wp_add_inline_style('ag_styles', $custom_css);
}
add_action('wp_enqueue_scripts', 'ag_hero_styles', 20);

/* ------------------------------------------------------------------------------ /*
/*  HIDE BLOCK EDITOR 
/* ------------------------------------------------------------------------------ */
function ag_hide_block_editor($use_block_editor, $post)
{
  if ($post->post_name == "home-page") {
    return false;
  }
  return $use_block_editor;
}
add_filter('use_block_editor_for_post', 'ag_hide_block_editor', 10, 2);

/* ------------------------------------------------------------------------------ /*
/*  ACF SYNC
/* ------------------------------------------------------------------------------ */

// Save ACF field groups to JSON in /acf-json
add_filter('acf/settings/save_json', function () {
  return get_stylesheet_directory() . '/acf-json';
});

// Load ACF field groups from /acf-json
add_filter('acf/settings/load_json', function ($paths) {
  $paths[] = get_stylesheet_directory() . '/acf-json';
  return $paths;
});


/* ------------------------------------------------------------------------------ /*
/*  REQUIRED FILES
/* ------------------------------------------------------------------------------ */


function ag_body_classes($classes)
{
  if (is_front_page() && get_theme_mod('hero_transparent_header')) {
    $classes[] = 'has-transparent-header';
  }
  return $classes;
}
add_filter('body_class', 'ag_body_classes');

// Helpers.
require get_template_directory() . '/inc/helpers.php';

// Template functions
require get_template_directory() . '/inc/template-functions.php';

// Template tags.
require get_template_directory() . '/inc/template-tags.php';

// SVG icons
require get_template_directory() . '/inc/classes/svg-icons.php';

// Customizer class
require get_template_directory() . '/inc/classes/class-ag-customizer.php';

// Custom CSS class.
require get_template_directory() . '/inc/classes/class-ag-css-customizer.php';
