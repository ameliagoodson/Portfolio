<?php

/**
 * Displays the post content in archives and search results.
 *

 */

$fallback_image = agtheme_get_fallback_image();
?>

<article <?php post_class('preview preview-' . get_post_type()); ?> id="post-<?php the_ID(); ?>">

	<?php if ((has_post_thumbnail() && !post_password_required()) || $fallback_image) : ?>
		<?php $has_post_thumbnail = has_post_thumbnail() && !post_password_required() || $fallback_image;  ?>
		<figure class="preview-media">
			<a href="<?php the_permalink(); ?>" class="preview-media-link">
				<?php
				if (has_post_thumbnail() && !post_password_required()) {
					the_post_thumbnail('large');
				} else {
					echo $fallback_image;
				}
				if (is_sticky()) {
					echo '<div class="sticky-note">' . esc_html__('Featured', 'agtheme') . '</div>';
				}
				?>
			</a><!-- .preview-media-link -->
		</figure><!-- .preview-media -->
	<?php endif; ?>

	<header class="preview-header">
		<h2 class="preview-title h5"><a href="<?php echo esc_url(get_permalink()); ?>"><?php the_title(); ?></a></h2>
	</header><!-- .preview-header -->

	<?php agtheme_the_post_meta('archive'); ?>

</article><!-- .preview -->