<?php get_header(); ?>
<div class="bafg-container">
	<div class="bafg-single-page">
		<?php if( get_post_meta(get_the_id(),'bafg_show_title',true) != 'on' ) : ?>
		<h1><?php the_title(); ?></h1>
		<?php endif; ?>
		<?php echo do_shortcode('[bafg id="'.get_the_id().'"]'); ?>
	</div>
</div>
<?php
get_footer();