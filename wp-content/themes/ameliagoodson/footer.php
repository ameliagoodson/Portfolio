<?php get_template_part('parts/global/site-footer') ?>

<?php wp_footer(); ?>

<?php global $icons; ?>
<!-- back to top button -->
<button class="btn btn-back-to-top" id="btn-back-to-top" onclick="backToTop()">
  <?php echo AG_SVG_Icons::get_svg('ionicons', 'arrow-up-outline') ?>
</button>
</div>
</body>

</html>