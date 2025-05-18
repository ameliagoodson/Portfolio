<?php

/**
 * Displays the post archive pagination.
 *
 */

// Use the custom query if it exists...
if (isset($args['custom_query'])) {
	$pagination_query = $args['custom_query'];
}

// or the default $wp_query if it doesn't.
else {
	global $wp_query;
	$pagination_query = $wp_query;
}

$pagination_type = get_theme_mod('agtheme_pagination_type', 'button');
$wrapper_class 	 = 'pagination-type-' . $pagination_type;
$query_args 		 = array_merge($pagination_query->query, $pagination_query->query_vars);

// If `max_num_pages` is not already set, add it.
if (!array_key_exists('max_num_pages', $query_args)) {
	$query_args['max_num_pages'] = $pagination_query->max_num_pages;
}

// If `post_status` is not already set, add it.
if (!array_key_exists('post_status', $query_args)) {
	$query_args['post_status'] = 'publish';
}

// Make sure the `paged` value exists and is at least 1.
if (!array_key_exists('paged', $query_args) || 0 == $query_args['paged']) {
	$query_args['paged'] = get_query_var('paged') ? get_query_var('paged') : (get_query_var('page') ? get_query_var('page') : 1);
}

// Encode our modified query.
$json_query_args = wp_json_encode($query_args);

// Indicate when we're loading into the last page, so the pagination can be hidden for the button and scroll types.
if (!($query_args['max_num_pages'] > $query_args['paged'])) {
	$wrapper_class .= ' last-page';
} else {
	$wrapper_class .= '';
}

// The pagination links also work as a no-js fallback, so they always need to be output.
$prev_link 				= get_previous_posts_link('<span class="arrow stroke-cc">' . agtheme_get_icon_svg('ui', 'arrow-left', 96, 49) . '</span><span class="screen-reader-text">' . esc_html__('Previous Page', 'agtheme') . '</span></span>', $query_args['max_num_pages']);
$next_link 				= get_next_posts_link('<span class="screen-reader-text">' . esc_html__('Next Page', 'agtheme') . '</span></span><span class="arrow stroke-cc">' . agtheme_get_icon_svg('ui', 'arrow-right', 96, 49) . '</span>', $query_args['max_num_pages']);
$pagination_class = !$prev_link ? ' only-next' : (!$next_link ? ' only-previous' : '');
?>

<div class="pagination-wrapper <?php echo esc_attr($wrapper_class); ?>">
	<div id="pagination" class="section-inner" data-query-args="<?php echo esc_attr($json_query_args); ?>" data-pagination-type="<?php echo esc_attr($pagination_type); ?>" data-load-more-target=".load-more-target">

		<?php if (($query_args['max_num_pages'] > $query_args['paged'])) : ?>

			<?php if ($pagination_type == 'scroll') : ?>
				<div class="scroll-loading">
					<div class="loading-icon">
						<span class="dot-pulse"></span>
					</div>
				</div>
			<?php endif; ?>

			<?php if ($pagination_type == 'button') : ?>
				<button id="load-more" class="d-no-js-none">
					<span class="load-text"><?php esc_html_e('Load More', 'agtheme'); ?></span>
					<span class="loading-icon"><span class="dot-pulse"></span></span>
				</button>
			<?php endif; ?>

		<?php endif; ?>

		<?php if ($prev_link || $next_link) : ?>
			<nav class="link-pagination<?php echo esc_attr($pagination_class); ?>">

				<?php if ($prev_link) : ?>
					<div class="previous-wrapper">
						<?php echo $prev_link; ?>
					</div><!-- .previous-wrapper -->
				<?php endif; ?>

				<?php if ($next_link) : ?>
					<div class="next-wrapper">
						<?php echo $next_link; ?>
					</div><!-- .next-wrapper -->
				<?php endif; ?>

			</nav><!-- .posts-pagination -->
		<?php endif; ?>

	</div><!-- #pagination -->
</div><!-- .pagination-wrapper -->