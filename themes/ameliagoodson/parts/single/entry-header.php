<?php

/**
 * Displays the entry header on single posts
 *
 */

?>
<!-- Entry header -->
<div class="entry-header">
  <div class="section-inner mw-medium">

    <?php
    // Home = blog homepage
    // Hide the page title on the actual front page
    if (is_home()) : ?>
      <div class="entry-title h1"><?php the_title(); ?></div>

    <?php elseif (!is_front_page()) : ?>
      <h1 class="entry-title h1"><?php the_title(); ?></h1>
    <?php endif; ?>
    <?php if (has_excerpt()) : ?>
      <div class="intro-text contain-margins">
        <?php the_excerpt(); ?>
      </div>
    <?php endif; ?>
  </div>

  <?php if (has_post_thumbnail() && !post_password_required()) : ?>
    <figure class="featured-media section-inner mw-small reveal">
      <div class="media-wrapper">
        <?php the_post_thumbnail(); ?>
      </div>
    </figure>
  <?php endif; ?>
</div>
<!-- End entry header -->