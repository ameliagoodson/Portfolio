<?php

/**
 * Displays the archive header.
 *
 */


$archive_prefix       = agtheme_get_the_archive_title_prefix();
$archive_title        = get_the_archive_title();
$archive_description  = get_the_archive_description('<div>', '</div>');

// Return if we have nothing to output.
if (!$archive_title && !$archive_description && !agtheme_show_archive_filters()) {
  return;
}
?>

<header class="archive-header">
  <div class="section-inner">

    <?php if ($archive_prefix) : ?>
      <p class="archive-prefix has-accent-color"><?php echo $archive_prefix; ?></p>
    <?php endif; ?>

    <?php if ($archive_title) : ?>
      <?php if (is_home() && !is_paged()) : ?>
        <div class="archive-title reveal"><?php echo $archive_title; ?></div>
      <?php else : ?>
        <h1 class="archive-title reveal"><?php echo $archive_title; ?></h1>
      <?php endif; ?>
    <?php endif; ?>

    <?php if ($archive_description) : ?>
      <div class="archive-description mw-small contain-margins reveal"><?php echo wpautop($archive_description); ?></div>
    <?php endif; ?>

    <?php agtheme_the_archive_filters(); ?>

  </div><!-- .section-inner -->
</header><!-- .archive-header -->