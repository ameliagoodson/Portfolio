<?php

/**
 * Template functions.
 *
 */


/**
 * Adds custom classes to the <body> element.
 */
function agtheme_body_classes($classes)
{

  global $post;
  $post_type = isset($post) ? $post->post_type : false;

  // Determine pagination type.
  $pagination_type = get_theme_mod('agtheme_pagination_type', 'button');
  $classes[] = 'pagination-type-' . $pagination_type;

  // Check whether the current page only has content.
  // if (agtheme_is_blank_canvas()) {
  //   $classes[] = 'is-blank-canvas';
  // }

  // Check for disabled search.
  if (!get_theme_mod('agtheme_enable_search', true)) {
    $classes[] = 'disable-search-modal';
  }

  // Check for footer menu.
  if (has_nav_menu('footer')) {
    $classes[] = 'has-footer-menu';
  }

  // Check for social menu.
  if (has_nav_menu('social')) {
    $classes[] = 'has-social-menu';
  }

  // Check for dark mode.
  if (get_theme_mod('agtheme_enable_dark_mode_palette', false)) {
    $classes[] = 'has-dark-mode-palette';
  }

  // Check for disabled animations.
  $classes[] = get_theme_mod('agtheme_disable_animations', false) ? 'no-anim' : 'has-anim';

  // Check for post thumbnail.
  if (is_singular() && has_post_thumbnail()) {
    $classes[] = 'has-post-thumbnail';
  } elseif (is_singular()) {
    $classes[] = 'missing-post-thumbnail';
  }

  // Check whether we're in the customizer preview.
  if (is_customize_preview()) {
    $classes[] = 'customizer-preview';
  }

  // Check if we're showing comments.
  if (is_singular() && ((comments_open() || get_comments_number()) && !post_password_required())) {
    $classes[] = 'showing-comments';
  } else if (is_singular()) {
    $classes[] = 'not-showing-comments';
  }

  // Shared archive page class.
  if (is_archive() || is_search() || is_home()) {
    $classes[] = 'archive-page';
  }

  // Slim page template class names (class = name - file suffix).
  if (is_page_template()) {
    $classes[] = basename(get_page_template_slug(), '.php');
  }

  return $classes;
}
add_action('body_class', 'agtheme_body_classes');


/**
 * Remove the 'no-js' class from body if JS is supported.
 */
function agtheme_no_js_class()
{
?>
  <script>
    document.documentElement.className = document.documentElement.className.replace('no-js', 'js');
  </script>
<?php
}
add_action('wp_head', 'agtheme_no_js_class', 0);


/**
 * Unset JS-triggered CSS animations to prevent FOUC with .no-js class.
 */
function agtheme_noscript_styles()
{
?>
  <noscript>
    <style>
      .spot-fade-in-scale,
      .no-js .spot-fade-up {
        opacity: 1.0 !important;
        transform: none !important;
      }
    </style>
  </noscript>
  <?php
}
add_action('wp_head', 'agtheme_noscript_styles', 0);


/**
 * Filter the login logo URL to the homepage.
 */
function agtheme_login_headerurl($url)
{
  return get_bloginfo('url');
}
add_filter('login_headerurl', 'agtheme_login_headerurl');


/**
 * Filter the login logo text.
 */
function agtheme_login_headertext($text)
{
  return get_bloginfo('name');
}
add_filter('login_headertext', 'agtheme_login_headertext');


/**
 * Remove the language selector on the login page.
 */
add_filter('login_display_language_dropdown', '__return_false');


/**
 * Disables the default archive title prefix.
 */
add_filter('get_the_archive_title_prefix', '__return_false');


/**
 * Returns the custom archive title prefix.
 */
function agtheme_get_the_archive_title_prefix()
{

  $prefix = '';

  if (is_search()) {
    $prefix = esc_html_x('Search Results', 'search archive title prefix', 'agtheme');
  } elseif (is_category()) {
    $prefix = esc_html_x('Category', 'category archive title prefix', 'agtheme');
  } elseif (is_tag()) {
    $prefix = esc_html_x('Tag', 'tag archive title prefix', 'agtheme');
  } elseif (is_author()) {
    $prefix = esc_html_x('Author', 'author archive title prefix', 'agtheme');
  } elseif (is_year()) {
    $prefix = esc_html_x('Year', 'date archive title prefix', 'agtheme');
  } elseif (is_month()) {
    $prefix = esc_html_x('Month', 'date archive title prefix', 'agtheme');
  } elseif (is_day()) {
    $prefix = esc_html_x('Day', 'date archive title prefix', 'agtheme');
  } elseif (is_post_type_archive()) {
    // No prefix for post type archives.
    $prefix = '';
  } elseif (is_tax('post_format')) {
    // No prefix for post format archives.
    $prefix = '';
  } elseif (is_tax()) {
    $queried_object = get_queried_object();
    if ($queried_object) {
      $tax    = get_taxonomy($queried_object->taxonomy);
      $prefix = sprintf(
        /* translators: %s: Taxonomy singular name. */
        esc_html_x('%s:', 'taxonomy term archive title prefix', 'agtheme'),
        $tax->labels->singular_name
      );
    }
  } elseif (is_home() && is_paged()) {
    $prefix = esc_html_x('Archives', 'general archive title prefix', 'agtheme');
  }

  return $prefix;
}


/**
 * Filters the archive title.
 */
function agtheme_filter_archive_title($title)
{

  // Home: Get the Customizer option for post archive text.
  if (is_home() && !is_paged()) {
    $title = get_theme_mod('agtheme_home_text', '');
  }

  // Home and paged: Output page number.
  elseif (is_home() && is_paged()) {
    global $wp_query;
    $paged   = get_query_var('paged') ? get_query_var('paged') : 1;
    $max     = isset($wp_query->max_num_pages) ? $wp_query->max_num_pages : 1;
    $title   = sprintf(esc_html_x('Page %1$s of %2$s', '%1$s = Current page number, %2$s = Number of pages', 'agtheme'), $paged, $max);
  }

  // Custom archives: Output the title.
  elseif (is_page_template('page-templates/template-custom-archive.php')) {
    $title = get_the_title();
  }

  // On search, show the search query.
  elseif (is_search()) {
    $title = '&ldquo;' . get_search_query() . '&rdquo;';
  }

  return $title;
}
add_filter('get_the_archive_title', 'agtheme_filter_archive_title');


/**
 * Returns the custom archive description.
 */
function agtheme_filter_archive_description($description)
{

  // Home: Empty description.
  if (is_home()) {
    $description = '';
  }

  // On search, show a string describing the results of the search.
  elseif (is_search()) {
    global $wp_query;
    if ($wp_query->found_posts) {
      /* Translators: %s = Number of results */
      $description = esc_html(sprintf(_nx('We found %s result for your search.', 'We found %s results for your search.',  $wp_query->found_posts, '%s = Number of results', 'agtheme'), $wp_query->found_posts));
    } else {
      $description = esc_html__('We could not find any results for your search. You can give it another try through the search form below.', 'agtheme');
    }
  }

  return $description;
}
add_filter('get_the_archive_description', 'agtheme_filter_archive_description');


/**
 * Hide password-protected posts from the loop.
 */
function agtheme_hide_protected_posts($query)
{
  if (!$query->is_singular() && !is_admin()) {
    $query->set('has_password', false);
  }
}
add_action('pre_get_posts', 'agtheme_hide_protected_posts');


/**
 * Removes the "Protected" prefix from password-protected posts.
 */
function agtheme_remove_protected_posts_prefix()
{
  return '%s';
}
add_filter('protected_title_format', 'agtheme_remove_protected_posts_prefix');


/**
 * Removes the "Private" prefix from private posts.
 */
function agtheme_remove_private_posts_prefix()
{
  return '%s';
}
// add_filter( 'private_title_format', 'agtheme_remove_private_posts_prefix' );


/**
 * Replaces the default excerpt suffix [...] with a &hellip; (three dots)
 */
function agtheme_excerpt_more()
{
  return '&hellip;';
}
add_filter('excerpt_more', 'agtheme_excerpt_more');


/**
 * Sets the length of generated post excerpts.
 */
function agtheme_excerpt_length($length)
{
  return 28;
}
add_filter('excerpt_length', 'agtheme_excerpt_length', 999);


/**
 * Remove shortcodes from excerpts.
 */
function agtheme_remove_shortcodes_from_excerpts($content)
{
  return strip_shortcodes($content);
}
add_filter('the_excerpt', 'agtheme_remove_shortcodes_from_excerpts');


/**
 * Return the social menu arguments for wp_nav_menu().
 */
function agtheme_get_social_menu_args($args = array())
{

  return wp_parse_args($args, array(
    'container'        => '',
    'container_class'  => '',
    'depth'            => 1,
    'fallback_cb'      => '',
    'link_before'      => '<span class="screen-reader-text">',
    'link_after'      => '</span>',
    'menu_class'      => 'social-menu reset-list-style social-icons',
    'theme_location'  => 'social',
  ));
}


/**
 * Filters menu item classes for wp_list_pages() to match menu styles.
 */
function agtheme_filter_wp_list_pages_item_classes($css_class, $item, $depth, $args, $current_page)
{

  // Only apply to wp_list_pages() calls with match_menu_classes set to true.
  $match_menu_classes = isset($args['match_menu_classes']);

  if (!$match_menu_classes) {
    return $css_class;
  }

  // Add current menu item class.
  if (in_array('current_page_item', $css_class)) {
    $css_class[] = 'current-menu-item';
  }

  // Add menu item has children class.
  if (in_array('page_item_has_children', $css_class)) {
    $css_class[] = 'menu-item-has-children';
  }

  return $css_class;
}
add_filter('page_css_class', 'agtheme_filter_wp_list_pages_item_classes', 10, 5);


/**
 * Filters nav menu arguments to add a submenu toggle.
 */
function agtheme_filter_nav_menu_item_args($args, $item, $depth)
{

  // Add sub menu toggles to the main menu with toggles.
  if ($args->theme_location == 'main' && isset($args->show_toggles)) {

    // Wrap the menu item link contents in a div, used for positioning.
    $args->before = '<div class="ancestor-wrapper">';
    $args->after  = '';

    // Add a toggle to items with children.
    if (in_array('menu-item-has-children', $item->classes)) {

      $toggle_target_string = '.menu-modal .menu-item-' . $item->ID . ' &gt; .sub-menu';

      // Add the sub menu toggle.
      $args->after .= '<div class="sub-menu-toggle-wrapper"><a href="#" class="toggle sub-menu-toggle stroke-cc" data-toggle-target="' . $toggle_target_string . '" data-toggle-type="slidetoggle" data-toggle-duration="250"><span class="screen-reader-text">' . esc_html__('Show sub menu', 'agtheme') . '</span>' . agtheme_get_icon_svg('ui', 'chevron-down', 18, 10) . '</a></div>';
    }

    // Close the wrapper.
    $args->after .= '</div><!-- .ancestor-wrapper -->';
  }

  return $args;
}
add_filter('nav_menu_item_args', 'agtheme_filter_nav_menu_item_args', 10, 3);


/**
 * Adds a badge to comments made by the post's author.
 */
function agtheme_filter_comment_text($comment_text, $comment, $args)
{

  if (is_object($comment) && $comment->user_id > 0) {
    $user = get_userdata($comment->user_id);
    $post = get_post($comment->comment_post_ID);

    if (!empty($user) && !empty($post)) {
      if ($comment->user_id === $post->post_author) {
        $comment_text .= '<p class="by-post-author">' . esc_html__('By Post Author', 'agtheme') . '</p>';
      }
    }
  }

  return $comment_text;
}
add_filter('comment_text', 'agtheme_filter_comment_text', 10, 3);


/**
 * AJAX Load More.
 */
function agtheme_ajax_load_more()
{

  $query_args = json_decode(wp_unslash($_POST['json_data']), true);

  $ajax_query = new WP_Query($query_args);

  // Determine which preview to use based on the post_type.
  $post_type = $ajax_query->get('post_type');

  // Default to the "post" post type for mixed content.
  if (!$post_type || is_array($post_type)) {
    $post_type = 'post';
  }

  if ($ajax_query->have_posts()) :
    while ($ajax_query->have_posts()) :
      $ajax_query->the_post();

      global $post;
  ?>

      <div class="article-wrapper col js-grid-item">
        <?php get_template_part('parts/archive/preview', $post_type); ?>
      </div>

<?php
    endwhile;
  endif;

  wp_die();
}
add_action('wp_ajax_nopriv_agtheme_ajax_load_more', 'agtheme_ajax_load_more');
add_action('wp_ajax_agtheme_ajax_load_more', 'agtheme_ajax_load_more');


/**
 * AJAX Filters.
 */
function agtheme_ajax_filters()
{

  // Get the filters from AJAX.
  $term_id          = isset($_POST['term_id']) ? $_POST['term_id'] : null;
  $taxonomy        = isset($_POST['taxonomy']) ? $_POST['taxonomy'] : '';
  $post_type       = isset($_POST['post_type']) ? $_POST['post_type'] : '';
  $posts_per_page = isset($_POST['posts_per_page']) ? $_POST['posts_per_page'] : '';

  $args = array(
    'post_status'          => 'publish',
    'post_type'            => $post_type,
    'ignore_sticky_posts'  => false,
    'posts_per_page'       => $posts_per_page ?: get_option('posts_per_page'),
  );

  // Add the tax query, if set.
  if ($term_id && $taxonomy) {
    $args['tax_query'] = array(array(
      'taxonomy' => $taxonomy,
      'terms'     => $term_id,
    ));

    // If a taxonomy isn't set, and we're loading posts, make sure we include the sticky post in the results.
  } elseif ($post_type == 'post') {
    $args['agtheme_prepend_sticky_post'] = true;
  }

  $filtered_query = new WP_Query($args);

  // Combine the query with the query_vars into a single array.
  $query_args = array_merge($filtered_query->query, $filtered_query->query_vars);

  // If `max_num_pages` is not already set, add it.
  if (!array_key_exists('max_num_pages', $query_args)) {
    $query_args['max_num_pages'] = $filtered_query->max_num_pages;
  }

  // Format and return the query arguments.
  echo json_encode($query_args);

  wp_die();
}
add_action('wp_ajax_nopriv_agtheme_ajax_filters', 'agtheme_ajax_filters');
add_action('wp_ajax_agtheme_ajax_filters', 'agtheme_ajax_filters');


/**
 * Include sticky posts when the "Show All" taxonomy filter is active.
 */
function agtheme_filter_posts_results($posts, $query)
{

  if (isset($query->query['agtheme_prepend_sticky_post']) && !empty($query->query_vars['paged']) && $query->query_vars['paged'] == 1) {
    $sticky = get_option('sticky_posts');

    if ($sticky) {
      $sticky_post = get_post($sticky[0]);

      if ($sticky_post) {
        array_unshift($posts, $sticky_post);
      }
    }
  }

  return $posts;
}
add_filter('posts_results', 'agtheme_filter_posts_results', 10, 2);


/**
 * Conditionally include page templates.
 */
function agtheme_conditional_page_templates($page_templates)
{

  // Do stuff...
  return $page_templates;
}
add_filter('theme_page_templates', 'agtheme_conditional_page_templates');


/**
 * filter which template file is used for the current page.
 */
function agtheme_conditional_template_include($template)
{

  // Do stuff...
  return $template;
}
add_filter('template_include', 'agtheme_conditional_template_include');


/**
 * Outputs a meta tag for theme color (used on Android devices and Apple Safari 15)
 */
function agtheme_meta_theme_color()
{

  $dark_mode     = get_theme_mod('agtheme_enable_dark_mode_palette', false);
  $light_color   = get_theme_mod('agtheme_menu_modal_background_color', '#1e2d32');
  $dark_color   = $dark_mode ? get_theme_mod('agtheme_dark_mode_menu_modal_background_color') : '';

  if (!($light_color || $dark_color)) {
    return;
  }

  if ($light_color) {
    $media_attr = $dark_color ? ' media="(prefers-color-scheme: light)"' : '';
    echo '<meta name="theme-color" content="' . esc_attr($light_color) . '"' . $media_attr . '>';
  }

  if ($dark_color) {
    echo '<meta name="theme-color" content="' . esc_attr($dark_color) . '" media="(prefers-color-scheme: dark)">';
  }
}
add_action('wp_head', 'agtheme_meta_theme_color');


/**
 * This workaround for adding inline styles to the editor styles.
 */
function agtheme_pre_http_request_block_editor_customizer_styles($response, $parsed_args, $url)
{

  if ($url === 'https://agtheme-inline-editor-styles') {
    $response = array(
      'body'     => AG_Customizer_CSS::get_customizer_css('editor'),
      'headers'   => new Requests_Utility_CaseInsensitiveDictionary(),
      'response' => array(
        'code'    => 200,
        'message'  => 'OK',
      ),
      'cookies'   => array(),
      'filename' => null,
    );
  }

  return $response;
}
add_filter('pre_http_request', 'agtheme_pre_http_request_block_editor_customizer_styles', 10, 3);


/**
 * Filters the default block settings.
 */
function agtheme_block_editor_settings($settings)
{

  // Do stuff...
  // $settings['defaultBlockTemplate'] = file_get_contents( get_theme_file_path( 'inc/block-template-default.html' ) );
  return $settings;
}
add_filter('block_editor_settings_all', 'agtheme_block_editor_settings');



/**
 * Returns the custom fonts url.
 */
function agtheme_custom_fonts_url()
{

  $custom_fonts_url = 'https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap';

  return esc_url($custom_fonts_url);
}


/**
 * Returns an array of custom editor font sizes.
 */
function agtheme_editor_font_sizes()
{

  return array(
    array(
      'name'      => esc_html_x('Small', 'Name of the small font size in Gutenberg', 'agtheme'),
      'shortName' => esc_html_x('S', 'Short name of the small font size in the Gutenberg editor.', 'agtheme'),
      'size'      => 16,
      'slug'      => 'small',
    ),
    array(
      'name'      => esc_html_x('Regular', 'Name of the regular font size in Gutenberg', 'agtheme'),
      'shortName' => esc_html_x('M', 'Short name of the regular font size in the Gutenberg editor.', 'agtheme'),
      'size'      => 18,
      'slug'      => 'normal',
    ),
    array(
      'name'      => esc_html_x('Large', 'Name of the large font size in Gutenberg', 'agtheme'),
      'shortName' => esc_html_x('L', 'Short name of the large font size in the Gutenberg editor.', 'agtheme'),
      'size'      => 24,
      'slug'      => 'large',
    ),
    array(
      'name'      => esc_html_x('Larger', 'Name of the larger font size in Gutenberg', 'agtheme'),
      'shortName' => esc_html_x('XL', 'Short name of the larger font size in the Gutenberg editor.', 'agtheme'),
      'size'      => 32,
      'slug'      => 'larger',
    )
  );
}


/**
 * Returns the custom editor color palette.
 */
function agtheme_editor_color_palette()
{

  /* Block Editor Color Palette -------- */

  $editor_color_palette = array();
  $color_options         = array();

  // Get the color options. By default, this array contains two groups of colors: primary and dark-mode.
  $color_options_groups = AG_Customizer::get_color_options();

  if ($color_options_groups) {

    // Merge the two groups into one array with all colors.
    foreach ($color_options_groups as $group) {
      $color_options = array_merge($color_options, $group);
    }

    // Add the background option.
    $background_color = '#' . get_theme_mod('background_color', 'ffffff');
    $editor_color_palette[] = array(
      'name'  => esc_html__('Background Color', 'agtheme'),
      'slug'  => 'body-background',
      'color' => $background_color,
    );

    // Loop over them and construct an array for the editor-color-palette.
    if ($color_options) {
      foreach ($color_options as $color_option_name => $color_option) {

        // Only add the colors set to be included in the color palette
        if (!isset($color_option['palette']) || !$color_option['palette']) {
          continue;
        }

        $editor_color_palette[] = array(
          'name'  => $color_option['label'],
          'slug'  => $color_option['slug'],
          'color' => get_theme_mod($color_option_name, $color_option['default']),
        );
      }
    }
  }

  return $editor_color_palette;
}


/**
 * Returns an array containing the block editor styles to enqueue.
 */
function agtheme_block_editor_styles()
{

  $editor_styles = array();

  // Custom fonts URL.
  $custom_fonts_url = agtheme_custom_fonts_url();

  if ($custom_fonts_url) {
    $editor_styles[] = $custom_fonts_url;
  }

  // Editor styles.
  $editor_styles[] = './assets/css/editor.css';

  // This URL is filtered by agtheme_pre_http_request_block_editor_customizer_styles to load dynamic CSS as inline styles.
  $editor_styles[] = 'https://agtheme-inline-editor-styles';

  return $editor_styles;
}



function agtheme_classic_editor_post_types($current_status, $post_type)
{

  // Use the classic editor for the following post types.
  $classic_editor_post_types = array(
    'team_member',
  );

  if (in_array($post_type, $classic_editor_post_types)) {
    return false;
  }

  return $current_status;
}
add_filter('use_block_editor_for_post_type', 'agtheme_classic_editor_post_types', 10, 2);


/**
 * Returns the single content type.
 */
function ag_get_content_type()
{

  // Default: Post type.
  $content_type = get_post_type();

  if (is_page_template()) {
    $content_type = str_replace('template-', '', basename(get_page_template_slug(), '.php'));
  }

  return $content_type;
}
