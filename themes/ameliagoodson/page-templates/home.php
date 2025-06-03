<?php

/**
 * Template Name: Home
 * *
 */

?>


<?php get_header();
$hero_layout = get_theme_mod('hero_layout');
global $icons;
?>

<?php if ($hero_layout == 'Full image' || $hero_layout == "No image") {

  get_template_part('parts/single/hero-full');
} else {
  get_template_part('parts/single/hero-half');
} ?>

<?php get_template_part('/parts/home/about') ?>
<?php get_template_part('/parts/home/bento') ?>
<?php get_template_part('/parts/home/contact')
?>


<!--  -->
<?php get_footer(); ?>