<?php

/**
 * Displays the archive posts.
 *
 */

// Use the custom query if it exists...
if (isset($args['custom_query'])) {
  $query = $args['custom_query'];
}

// or the default $wp_query if it doesn't.
else {
  global $wp_query;

  $query = $wp_query;
  $args  = array();
}

$archive_layout             = 'grid'; // grid | masonry | list
$archive_columns_classes     = agtheme_get_archive_columns_classes();
$archive_columns_class_attr = 'list' !== $archive_layout && $archive_columns_classes ? ' ' . implode(' ', $archive_columns_classes) : '';
?>

<!-- Archive posts -->
<div class="posts">
  <div class="section-inner">

    <div class="posts-grid grid load-more-target<?php echo esc_attr($archive_columns_class_attr); ?>" data-layout="<?php echo esc_attr($archive_layout); ?>">
      <?php
      while ($query->have_posts()) : $query->the_post(); ?>
        <div class="article-wrapper col js-grid-item reveal">
          <?php get_template_part('parts/archive/preview'); ?>
        </div>

      <?php endwhile; ?>

      <?php wp_reset_postdata(); ?>

    </div><!-- .posts-grid -->
  </div><!-- .section-inner -->
</div><!-- .posts -->