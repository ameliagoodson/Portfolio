<?php $svg_file_path = get_template_directory() . '/assets/svg/womansitting.svg'; ?>
<div class="hero-image col-d-6">
  <figure class="i-a a-fade-up a-del-200">
    <?php if (file_exists($svg_file_path)) : ?>
      <div class="draw-svg">
        <?php
        // Read SVG content and add class="path" to all <path> elements
        $svg_content = file_get_contents($svg_file_path);
        $svg_content_with_class = preg_replace('/<path/', '<path class="path"', $svg_content);
        echo $svg_content_with_class;
        ?>
      </div>
    <?php endif; ?>
  </figure>
  <div class="media-wrapper">
  </div><!-- .media-wrapper -->
</div>