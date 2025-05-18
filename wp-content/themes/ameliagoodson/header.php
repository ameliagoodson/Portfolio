<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title><?php bloginfo('name'); ?></title>
  <?php wp_head(); ?>
</head>

<body <?php body_class() ?>>
  <?php wp_body_open(); ?>

  <?php
  $background_image = get_theme_mod('hero_bg_image_setting');
  $hero_layout = get_theme_mod('hero_layout');
  $transparent_header = get_theme_mod('hero_transparent_header');
  $is_transparent = is_front_page() && $transparent_header;
  ?>

  <?php if ($background_image && $is_transparent && $hero_layout != "No image") : ?>
    <div class="background-image" style="background-image: url(<?php echo esc_url($background_image); ?>);">
    <?php endif; ?>

    <?php get_template_part('parts/global/site-header'); ?>