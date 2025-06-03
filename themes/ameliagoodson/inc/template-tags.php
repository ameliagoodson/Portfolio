<?php

// ------------------------------------------------------------------------------ //
//  Template tags are collections of functions designed to output something e.g. logo
// ------------------------------------------------------------------------------ //

/**
 * Outputs the fallback image.
 */
function agtheme_the_fallback_image()
{
  echo agtheme_get_fallback_image();
}


/**
 * Returns the fallback image.
 */
function agtheme_get_fallback_image()
{

  // If a valid fallback image is set in the Customizer, return the markup for it.
  $fallback_image_id = get_theme_mod('agtheme_fallback_image');

  if ($fallback_image_id) {
    $fallback_image = wp_get_attachment_image($fallback_image_id, 'full');

    if ($fallback_image) {
      return $fallback_image;
    }
  }

  // If not, return the default fallback image.
  $fallback_image_url = get_template_directory_uri() . '/assets/img/default-fallback-image.png';
  $fallback_image = '<img src="' . esc_attr($fallback_image_url) . '" class="fallback-featured-image fallback-image-regular" />';

  return $fallback_image;
}

/**
 * Returns the post archive column classes.
 */
function agtheme_get_archive_columns_classes()
{

  $classes = array();

  // Get the array holding all of the columns options.
  $archive_columns_options = AG_Customizer::get_archive_columns_options();

  // Loop over the array, and class value of each one to the array.
  foreach ($archive_columns_options as $setting_name => $setting_data) {

    // Get the value of the setting, or the default if none is set.
    $value = get_theme_mod($setting_name, $setting_data['default']);

    // Convert the number in the setting (1/2/3/4) to the class names used in our twelve column grid.
    switch ($setting_name) {
      case 'agtheme_post_grid_columns_mobile':
        $classes['mobile'] = 'cols-' . (12 / $value);
        break;

      case 'agtheme_post_grid_columns_tablet':
        $classes['tablet'] = 'cols-t-' . (12 / $value);
        break;

      case 'agtheme_post_grid_columns_laptop':
        $classes['laptop'] = 'cols-l-' . (12 / $value);
        break;

      case 'agtheme_post_grid_columns_desktop':
        $classes['desktop'] = 'cols-d-' . (12 / $value);
        break;

      case 'agtheme_post_grid_columns_desktop_xl':
        $classes['desktop_xl'] = 'cols-dxl-' . (12 / $value);
        break;
    }
  }

  return $classes;
}


/**
 * Outputs the post archive filters, if enabled.
 */
function agtheme_the_archive_filters()
{

  // Check if we're showing the filter
  if (!agtheme_show_archive_filters()) {
    return;
  }

  $filter_taxonomy = 'category';

  // Get the terms.
  $terms = get_terms(array(
    'depth'     => 1,
    'taxonomy' => $filter_taxonomy,
  ));

  if (is_wp_error($terms) || !$terms) {
    return;
  }

  $home_url   = '';
  $post_type   = '';

  // Whether to show the number of posts in each category.
  $show_category_post_count = get_theme_mod('agtheme_show_filter_category_post_count', false);

  // Determine the correct home URL to link to.
  if (is_home()) {
    $post_type = 'post';
    $home_url  = home_url();
  } elseif (is_post_type_archive()) {
    $post_type = get_post_type();
    $home_url  = get_post_type_archive_link($post_type);
  } else if (is_page_template('page-templates/template-custom-archive.php')) {
    $post_type = get_post_meta(get_the_ID(), 'custom_archive_post_type', true) ?: 'post';
    $home_url  = get_permalink();
  }
?>

  <div class="filter-wrapper i-a a-fade-up a-del-200">
    <ul class="filter-list reset-list-style">

      <?php if ($home_url) : ?>
        <li class="filter-show-all"><a class="filter-link active" data-filter-post-type="<?php echo esc_attr($post_type); ?>" href="<?php echo esc_url($home_url); ?>"><span class="term-name"><?php esc_html_e('Show All', 'agtheme'); ?></span></a></li>
      <?php endif; ?>

      <?php foreach ($terms as $term) : ?>
        <li class="filter-term-<?php echo esc_attr($term->slug); ?>">
          <a class="filter-link" data-filter-term-id="<?php echo esc_attr($term->term_id); ?>" data-filter-taxonomy="<?php echo esc_attr($term->taxonomy); ?>" data-filter-post-type="<?php echo esc_attr($post_type); ?>" href="<?php echo esc_url(get_term_link($term)); ?>">
            <span class="term-name"><?php echo $term->name; ?></span>
            <?php if ($show_category_post_count) : ?>
              <span class="term-count"><?php echo $term->count; ?></span>
            <?php endif; ?>
          </a>
        </li>
      <?php endforeach; ?>

    </ul><!-- .filter-list -->
  </div><!-- .filter-wrapper -->

<?php

}


/**
 * Outputs the post meta for a given context and post ID.
 */
function agtheme_the_post_meta($context = 'archive', $post_id = '')
{

  if (!$post_id) {
    global $post;
    $post_id = $post->ID;
  }

  // Escaped in ag_get_post_meta().
  echo agtheme_get_post_meta($context, $post_id);
}

/**
 * Returns the post meta for a given post and context.
 */
function agtheme_get_post_meta($context = 'archive', $post_id = '')
{

  if (!$post_id) {
    global $post;
    $post_id = $post->ID;
  }

  // Get our post type.
  $post_type = get_post_type($post_id);

  // Get the list of the post types that support post meta, and only proceed if the current post type is supported.
  $post_type_has_post_meta    = false;
  $post_types_with_post_meta = AG_Customizer::get_post_types_with_post_meta();

  foreach ($post_types_with_post_meta as $post_type_with_post_meta => $data) {
    if ($post_type == $post_type_with_post_meta) {
      $post_type_has_post_meta = true;
      break;
    }
  }

  if (!$post_type_has_post_meta) {
    return;
  }

  // Get the default post meta for this post type.
  $post_meta_default = isset($post_types_with_post_meta[$post_type]['default'][$context]) ? $post_types_with_post_meta[$post_type]['default'][$context] : array();

  // Determine the Customizer setting name based on post type and context.
  $theme_mod_name = 'ag_post_meta_' . $post_type;

  if ($context !== 'archive') {
    $theme_mod_name .= '_' . $context;
  }

  // Get the post meta for this post type from the Customizer setting.
  $post_meta = get_theme_mod($theme_mod_name, $post_meta_default);

  // If we have post meta, sort it.
  if ($post_meta && !in_array('empty', $post_meta)) {

    // Set the output order of the post meta.
    $post_meta_order = array('date', 'author', 'categories', 'tags', 'comments', 'edit-link');

    // Store any custom post meta items in a separate array, so we can append them after sorting.
    $post_meta_custom = array_diff($post_meta, $post_meta_order);

    // Loop over the intended order, and sort $post_meta_reordered accordingly.
    $post_meta_reordered = array();
    foreach ($post_meta_order as $i => $post_meta_name) {
      $original_i = array_search($post_meta_name, $post_meta);

      if ($original_i === false) {
        continue;
      }

      $post_meta_reordered[$i] = $post_meta[$original_i];
    }

    // Reassign the reordered post meta with custom post meta items appended, and update the indexes.
    $post_meta = array_values(array_merge($post_meta_reordered, $post_meta_custom));
  }

  // If the post meta setting has the value 'empty' at this point, it's explicitly empty and the default post meta shouldn't be output.
  if (!$post_meta || ($post_meta && in_array('empty', $post_meta))) {
    return;
  }

  // Enable the $ag_has_meta variable to be modified in actions.
  global $ag_has_meta;

  // Default it to false, to make sure we don't output an empty container.
  $ag_has_meta = false;

  global $post;
  $post = get_post($post_id);
  setup_postdata($post);

  // Record out output.
  ob_start();
?>

  <div class="post-meta-wrapper">
    <ul class="post-meta">

      <?php
      foreach ($post_meta as $post_meta_item) {
        switch ($post_meta_item) {

            // DATE
          case 'date':
            $ag_has_meta = true;
            $entry_time         = get_the_time(get_option('date_format'));
            $date_link           = get_month_link(get_the_time('Y'), get_the_time('m'));
            $entry_time_str     = '<time><a href="' . esc_url($date_link) . '">' . $entry_time . '</a></time>';
      ?>
            <li class="date">
              <?php
              if ($context == 'single') {
                printf(esc_html_x('Published %s', '%s = The date of the post', 'ag'), $entry_time_str);
              } else {
                echo $entry_time_str;
              }
              ?>
            </li>
          <?php
            break;

            // AUTHOR
          case 'author':
            $ag_has_meta = true;
          ?>
            <li class="author">
              <?php
              // Translators: %s = the author name
              printf(esc_html_x('By %s', '%s = author name', 'ag'), '<a href="' . esc_url(get_author_posts_url(get_the_author_meta('ID'))) . '">' . esc_html(get_the_author_meta('display_name')) . '</a>'); ?>
            </li>
          <?php
            break;

            // CATEGORIES
          case 'categories':

            // Determine which taxonomy to use for "categories".
            $category_taxonomy = 'category';

            if (!has_term('', $category_taxonomy, $post_id)) {
              break;
            }

            $ag_has_meta = true;
            $prefix = ($context == 'single') ? esc_html__('Posted in', 'ag') : esc_html__('In', 'ag');
          ?>
            <li class="categories">
              <?php the_terms($post_id, $category_taxonomy, $prefix . ' ', ', '); ?>
            </li>
          <?php
            break;

            // TAGS
          case 'tags':

            // Determine which taxonomy to use for tags.
            $tag_taxonomy = 'post_tag';

            if (!has_term('', $tag_taxonomy, $post_id)) {
              break;
            }

            $ag_has_meta = true;
          ?>
            <li class="tags">
              <?php the_terms($post_id, $tag_taxonomy, esc_html__('Tagged', 'ag') . ' ', ', '); ?>
            </li>
          <?php
            break;

            // COMMENTS
          case 'comments':
            if (post_password_required() || !comments_open() || !get_comments_number()) {
              break;
            }
            $ag_has_meta = true;
          ?>
            <li class="comments">
              <?php comments_popup_link(); ?>
            </li>
          <?php
            break;

            // EDIT LINK
          case 'edit-link':
            if (!current_user_can('edit_post', $post_id)) {
              break;
            }
            $ag_has_meta = true;
          ?>
            <li class="edit">
              <a href="<?php echo esc_url(get_edit_post_link()); ?>">
                <?php esc_html_e('Edit', 'ag'); ?>
              </a>
            </li>
      <?php
            break;
        }
      }
      ?>

    </ul>
  </div>

<?php
  wp_reset_postdata();

  // Get the recorded output.
  $meta_output = ob_get_clean();

  // If there is post meta, return it.
  return ($ag_has_meta && $meta_output) ? $meta_output : '';
}

/**
 * Outputs the SVG code for a given icon.
 */
function agtheme_the_icon_svg($group, $icon, $width = 24, $height = 24, $stroke = 0)
{
  echo agtheme_get_icon_svg($group, $icon, $width, $height, $stroke);
}


/**
 * Returns the SVG code for a given icon.
 */
function agtheme_get_icon_svg($group, $icon, $width = 24, $height = 24, $stroke = 0)
{
  return AG_SVG_Icons::get_svg($group, $icon, $width, $height, $stroke);
}
