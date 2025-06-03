<?php
/**
 * The template for displaying comments.
 *
 * This is the template that displays the area of the page that contains both the current comments
 * and the comment form.
 *
 */

// Return if comments are closed (and there aren't any to show), if the post is password-protected or if we're doing a blank canvas template.
if ( ( ! comments_open() && ! get_comments_number() ) || post_password_required() || ag_is_blank_canvas() ) {
  return;
}
?>

<div class="comments-wrapper section-inner mw-thin">

	<?php if ( $comments ) : ?>
		<div class="comments section-inner mw-thin max-percentage no-margin" id="comments">

			<?php
			$comments_number = absint( get_comments_number() );
			
			if ( get_post_type() == 'product' ) {
				// Translators: %s = the number of reviews.
				$comments_title = sprintf( _nx( '%s Review', '%s Reviews', $comments_number, 'Translators: %s = the number of reviews', 'ag' ), $comments_number );
			} else {
				// Translators: %s = the number of comments.
				$comments_title = sprintf( _nx( '%s Comment', '%s Comments', $comments_number, 'Translators: %s = the number of comments', 'ag' ), $comments_number );
			}
			?>

			<div class="comments-header">
				<hr class="has-accent-color" aria-hidden="true" />
				<h2 class="comment-reply-title"><?php echo esc_html( $comments_title ); ?></h2>
			</div><!-- .comments-header -->

			<?php
			wp_list_comments( array(
				'avatar_size' => 120,
				'style'       => 'div',
			) );

			$comment_pagination = paginate_comments_links( array(
				'echo'      => false,
				'end_size'  => 0,
				'mid_size'  => 0,
				'next_text' => '<span class="text"><span class="long">' . esc_html__( 'Newer Comments', 'ag' ) . '</span><span class="short">' . esc_html__( 'Newer', 'ag' ) . '</span></span><span class="arrow">&rarr;</span>',
				'prev_text' => '<span class="arrow">&larr;</span><span class="text"><span class="long">' . esc_html__( 'Older Comments', 'ag' ) . '</span><span class="short">' . esc_html__( 'Older', 'ag' ) . '</span></span>',
			) );
			?>

			<?php if ( $comment_pagination ) : ?>
				<nav class="comments-pagination pagination<?php echo esc_attr(( strpos( $comment_pagination, 'prev page-numbers' ) === false ) ? ' only-next' : '' ); ?>">
					<hr class="wp-block-separator is-style-wide" aria-hidden="true" />
					<div class="comments-pagination-inner">
						<?php echo wp_kses_post( $comment_pagination ); ?>
					</div><!-- .comments-pagination-inner -->
				</nav>
			<?php endif; ?>

		</div><!-- comments -->
	<?php endif; ?>

	<?php if ( comments_open() || pings_open() ) : ?>
		<?php
		comment_form( array(
			'cancel_reply_before'	 => '</span><small>',
			'comment_notes_before' => '',
			'comment_notes_after'	 => '',
			'title_reply_before'	 => '<hr class="has-accent-color" aria-hidden="true" /><h2 id="reply-title" class="comment-reply-title h3"><span class="title">',
			'title_reply_after'		 => '</h2>'
		) );
		?>
	<?php endif; ?>

</div><!-- .comments-wrapper -->