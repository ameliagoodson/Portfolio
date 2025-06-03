<?php

/**
 * Displays the single project content
 *
 */

?>
<!-- Single project - single-project.php -->
<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

  <!-- Try entry-header-project.php first. If that doesn’t exist, fall back to entry-header.php. -->
  <?php get_template_part(
    'parts/single/entry-header',
    'project'
  ); ?>

  <div class="post-inner">
    <div class="section-inner mw-medium reveal">

      <?php get_template_part('parts/single/entry-content'); ?>
      <!-- <?php get_template_part('parts/single/entry-footer'); ?> -->

    </div>
  </div>

  <!-- <?php get_template_part('parts/single/post-navigation'); ?> -->

  <?php comments_template(); ?>

</article>