<?php

/**
 * Displays the single post content.
 *
 */

?>
<!-- Single post - content.php -->
<article <?php post_class(); ?> id="post-<?php the_ID(); ?>">

  <?php get_template_part('parts/single/entry-header'); ?>

  <div class="post-inner">
    <div class="section-inner mw-medium reveal">

      <?php get_template_part('parts/single/entry-content'); ?>
      <!-- <?php get_template_part('parts/single/entry-footer'); ?> -->

    </div>
  </div>

  <!-- <?php get_template_part('parts/single/post-navigation'); ?> -->

  <?php comments_template(); ?>

</article>