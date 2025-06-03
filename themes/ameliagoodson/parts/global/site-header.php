<?php

/**
 * Displays the site header.
 *
 */ ?>

<?php
$header_color = get_theme_mod('header_color');
?>
<header id="site-header" <?php if ($header_color) : ?> style="background-color: <?php echo $header_color;
                                                                              endif; ?>">
  <div class="header-inner-wrapper d-desktop">
    <nav class="header-inner section-inner">
      <h1 class="site-logo">
        <?php
        if (function_exists('the_custom_logo') && has_custom_logo()) {
          the_custom_logo();
        } else {
          echo '<a href="' . esc_url(home_url()) . '">' . get_bloginfo('name') . '</a>';
        }
        ?>
        <span class="screen-reader-text">Amelia Goodson</span>
      </h1>
      <?php wp_nav_menu(array(
        'theme_location' => 'primary',
        'menu_class' => 'menu main-menu',
      ))
      ?>
    </nav>

  </div>
  <div class="mobile-header">
    <div class="mobile-header-inner flex-mobile">
      <h1 class="site-logo">
        <?php
        if (function_exists('the_custom_logo') && has_custom_logo()) {
          the_custom_logo();
        } else {
          echo '<a href="' . esc_url(home_url()) . '">' . get_bloginfo('name') . '</a>';
        }
        ?>
        <span class=" screen-reader-text">Amelia Goodson</span>

      </h1>
      <button class="hamburger-btn" aria-controls="mobile-menu" aria-expanded="false">
        <?php echo AG_SVG_Icons::get_svg('ui', 'menu') ?>
        <?php echo AG_SVG_Icons::get_svg('ui', 'close') ?>
      </button>
    </div>

    <?php wp_nav_menu(array(
      'theme_location' => 'primary',
      'menu_class' => 'menu mobile-menu',
      'container' => 'nav',
      'container_class' => 'mobile-menu-container',
    )) ?>

</header>