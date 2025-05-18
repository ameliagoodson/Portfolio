<!-- Hero half -->
<?php
$hero_image = get_theme_mod('hero_image');
$background_image = get_theme_mod('hero_bg_image_setting');
$text_alignment = get_theme_mod('text_alignment');
$hero_width = get_theme_mod('hero_width');
$hero_title = get_theme_mod('hero_title');
$hero_subtitle = get_theme_mod('hero_subtitle');
$hero_layout = get_theme_mod('hero_layout');
$hero_button_text = get_theme_mod('hero_button_text', 'See work');
$hero_button_url = get_theme_mod('hero_button_url', '/work');
?>
<main class="hero">
  <div class="section-inner mw-<?php echo $hero_width ?>">
    <div class="hero-content hero-half">
      <div class="hero-copy col-6 <?php echo "align-" . strtolower($text_alignment) ?>">
        <?php if ($hero_title) : ?>
          <div class="h1 hero-title reveal"><?php echo $hero_title; ?></div>
        <?php endif; ?>
        <?php if ($hero_subtitle) : ?>
          <div class="hero-subtitle contain-margins reveal">
            <?php echo $hero_subtitle ?>
          </div>
        <?php endif; ?>
        <a class="btn reveal" href="<?php echo esc_url(home_url($hero_button_url)); ?>"><?php echo esc_html($hero_button_text); ?></a>
      </div>
      <div class="hero-image col-6 reveal">
        <img src="<?php echo $hero_image ? esc_url($hero_image) : 'https://placehold.co/500' ?>">
      </div>
    </div>
  </div>
</main>
</div>