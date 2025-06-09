<div class="bafg-wrap">
<!--Gallery generator-->
	<div id="bafg_gallery_generator">
		<h2><?php echo esc_html__( 'BEAF Gallery', 'bafg' ); ?></h2>
		<p><?php echo esc_html__('With this option, you can easily generate 2 columns, 3 columns or even 4 columns Before - After Gallery. Just select the options below, generate shortcode and copy-paste the shortcode wherever you want to show the gallery on your website. That\'s it.'); ?> <a target="_blank" href="https://www.youtube.com/watch?v=Uq3qlVdD_dY"><?php echo esc_html__( 'Click here', 'bafg' ); ?></a> <?php echo esc_html__( 'to learn more.', 'bafg' ); ?></p>
		<label for="bafg_gallery_cata"><?php echo esc_html__( 'Category:', 'bafg' ); ?></label><br>
		<select id="bafg_gallery_cata">
			<option value=""><?php echo esc_html__( '-Select category-', 'bafg' ); ?></option>
			<option value="all"><?php echo esc_html__( 'All','bafg' ); ?></option>
			<?php
			$terms = get_terms( array(
				'taxonomy' => 'bafg_gallery',
				'hide_empty' => false,
			));
			foreach( $terms as $term ) :
			?>			
			<option value="<?php echo esc_attr($term->term_id); ?>"><?php echo esc_html__($term->name, 'bafg'); ?></option>
			<?php
			endforeach;
			?>
		</select>
		<label for="bafg_gallery_column"><?php echo esc_html__( 'Columns:', 'bafg' ); ?></label>
		<select id="bafg_gallery_column">
			<option value="<?php echo esc_attr('2'); ?>"><?php echo esc_html__( '2 Columns', 'bafg' ); ?></option>
			<option value="<?php echo esc_attr('3'); ?>"><?php echo esc_html__( '3 Columns', 'bafg' ); ?></option>
			<option value="<?php echo esc_attr('4'); ?>"><?php echo esc_html__( '4 Columns', 'bafg' ); ?></option>
		</select>
		<label for="bafg_gallery_item"><?php echo esc_html__( 'Max Items:', 'bafg' ); ?></label>
		<input id="bafg_gallery_item" type="text" value="" placeholder="Unlimited">
		
		<label for="bafg_gallery_info" class="bafg_gallery_info">
			<input id="bafg_gallery_info" type="checkbox" <?php echo esc_attr(apply_filters('bafg_gallery_info_attrs','disabled')); ?> >
			<?php echo esc_html__( 'Display Slider Title, Description and Read more link', 'bafg' ); ?>
			<?php if(! class_exists('BAFG_Before_After_Gallery_Pro') || BEAF_PRO_LICENSE_STATUS != 'activate') { ?>
				<div class="bafg-tooltip">
					<span>?</span>
					<div class="bafg-tooltip-info">Pro feature!</div>
				</div>
			<?php } ?>
		</label>
		
		<input id="bafg_gallery_shortcode_generator" class="button button-primary" type="submit" value="Generate Shortcode">

		<label for="bafg_gallery_shortcode"><?php echo esc_html__( 'Shortcode:', 'bafg' ); ?></label>
		<input id="bafg_gallery_shortcode" type="text" value="" readonly>
		<div id="bafg_gallery_shortcode_copy_alert"><?php echo esc_html__( 'Shortcode Copied!', 'bafg' ); ?></div>

	</div>

	<!--Filter gallery generator-->
	<div id="bafg_filter_gallery_generator">
		<h2><?php echo esc_html__( 'BEAF Filterable Gallery', 'bafg' ); ?></h2>
		<p><?php echo esc_html__('With this option, you can easily generate 2 columns, 3 columns or even 4 columns Before - After Filterable Gallery. Just select the options below, generate shortcode and copy-paste the shortcode wherever you want to show the gallery on your website. That\'s it'); ?> <a target="_blank" href="https://themefic.com/plugins/beaf/pro/#filtergallery"><?php echo esc_html__( 'Click here', 'bafg' ); ?></a> <?php echo esc_html__( 'to learn more.', 'bafg' ); ?></p>
		<label for="bafg_filter_gallery_cata"><?php echo esc_html__( 'Category:', 'bafg' ); ?></label><br>
		<select id="bafg_filter_gallery_cata" multiple>
			<option value="all"><?php echo esc_html__( 'All', 'bafg' ); ?></option>
			<?php
			$terms = get_terms( array(
				'taxonomy' => 'bafg_gallery',
				'hide_empty' => false,
			));
			foreach( $terms as $term ) :
			?>
			<option value="<?php echo esc_attr($term->term_id); ?>"><?php echo esc_html__($term->name, 'bafg' ); ?></option>
			<?php
			endforeach;
			?>
		</select>
		<label for="bafg_filter_gallery_column"><?php echo esc_html__( 'Columns:', 'bafg' ); ?></label>
		<select id="bafg_filter_gallery_column">
			<option value="<?php echo esc_attr('2'); ?>"><?php echo esc_html__( '2 Columns', 'bafg' ); ?></option>
			<option value="<?php echo esc_attr('3'); ?>"><?php echo esc_html__( '3 Columns', 'bafg' ); ?></option>
			<option value="<?php echo esc_attr('4'); ?>"><?php echo esc_html__( '4 Columns', 'bafg' ); ?></option>
		</select>

		<label for="bafg_filter_gallery_info" class="bafg_filter_gallery_info"><input id="bafg_filter_gallery_info" type="checkbox"> <?php echo esc_html__( 'Display Slider Title, Description and Read more link', 'bafg' ); ?></label>

		<input id="bafg_filter_gallery_shortcode_generator" class="button button-primary" type="submit" value="Generate Shortcode">

		<label for="bafg_filter_gallery_shortcode"><?php echo esc_html__( 'Shortcode:', 'bafg' ); ?></label>
		<input id="bafg_filter_gallery_shortcode" type="text" value="" readonly>
		<div id="bafg_filter_gallery_shortcode_copy_alert"><?php echo esc_html__( 'Shortcode Copied!', 'bafg' ); ?></div>
		<div class="bafg-upgrade-to-pro"><a target="_blank" href="https://themefic.com/plugins/beaf/pro">Upgrade to pro!</a></div>

	</div>

	<!--Styles form-->

	<div id="bafg_filter_gallery_style">

		<?php 
			do_action('bafg_save_filter_gallery_style', $_POST);
			$bafg_filter_gallery_alignment =  get_option( 'bafg_filter_gallery_style_alignment' );
		?>

		<form action="" method="post">
			<h2><?php echo esc_html__( 'BEAF Filter Buttons Style', 'bafg' ); ?></h2>
			<label for="bafg_filter_gallery_style_border"><?php echo esc_html__( 'Border Radius(px):', 'bafg' ); ?></label><br>
			<p><input id="bafg_filter_gallery_style_border" type="number" name="bafg_filter_gallery_style_border" min="1" max="100" value="<?php echo esc_attr(get_option( 'bafg_filter_gallery_style_border' )); ?>"></p>
			<br>
			<p><?php echo esc_html__( 'Colors(Normal):', 'bafg' ); ?></p>

			<label for="bafg_filter_gallery_style_text_color"><?php echo esc_html__( 'Text Color:', 'bafg' ); ?></label>
			<p><input id="bafg_filter_gallery_style_text_color" class="bafg-color-field" type="text" name="bafg_filter_gallery_style_text_color" value="<?php echo esc_attr(get_option( 'bafg_filter_gallery_style_text_color' )); ?>"></p>

			<label for="bafg_filter_gallery_style_bg_color"><?php echo esc_html__( 'Background Color:', 'bafg' ); ?></label>
			<p><input id="bafg_filter_gallery_style_bg_color" class="bafg-color-field" type="text" name="bafg_filter_gallery_style_bg_color" value="<?php echo esc_attr(get_option( 'bafg_filter_gallery_style_bg_color' )); ?>"></p>
			<br>
			<p><?php echo esc_html__( 'Colors(Hover and Active):', 'bafg' ); ?></p>

			<label for="bafg_filter_gallery_style_text_h_color"><?php echo esc_html__( 'Text Color:', 'bafg' ); ?></label>
			<p><input id="bafg_filter_gallery_style_text_h_color" class="bafg-color-field" type="text" name="bafg_filter_gallery_style_text_h_color" value="<?php echo esc_attr(get_option( 'bafg_filter_gallery_style_text_h_color' )); ?>"></p>

			<label for="bafg_filter_gallery_style_bg_h_color"><?php echo esc_html__( 'Background Color:', 'bafg' ); ?></label>
			<p><input id="bafg_filter_gallery_style_bg_h_color" class="bafg-color-field" type="text" name="bafg_filter_gallery_style_bg_h_color" value="<?php echo esc_attr(get_option( 'bafg_filter_gallery_style_bg_h_color' )); ?>"></p>
			<br>
			<label for="bafg_filter_gallery_style_padding_tb"><?php echo esc_html__( 'Padding(Top - Bottom):', 'bafg' ); ?></label>
			<p><input id="bafg_filter_gallery_style_padding_tb" class="" type="number" name="bafg_filter_gallery_style_padding_tb" value="<?php echo esc_attr(get_option( 'bafg_filter_gallery_style_padding_tb' )); ?>" min="1"></p>

			<label for="bafg_filter_gallery_style_padding_lr"><?php echo esc_html__( 'Padding(Left - Right):', 'bafg' ); ?></label>
			<p><input id="bafg_filter_gallery_style_padding_lr" class="" type="number" name="bafg_filter_gallery_style_padding_lr" value="<?php echo esc_attr(get_option( 'bafg_filter_gallery_style_padding_lr' )); ?>" min="1"></p>
			<label for="bafg_filter_gallery_style_alignment"><?php echo esc_html__( 'Alignment:', 'bafg' ); ?></label>
			<br>
			<select id="bafg_filter_gallery_style_alignment" name="bafg_filter_gallery_style_alignment">
				<option value="left" <?php echo selected( $bafg_filter_gallery_alignment,'left' ) ?>><?php echo esc_html__( 'Left', 'bafg' ); ?></option>
				<option value="center" <?php echo selected( $bafg_filter_gallery_alignment,'center' ) ?>><?php echo esc_html__( 'Center', 'bafg' ); ?></option>
				<option value="right" <?php echo selected( $bafg_filter_gallery_alignment, 'right' ) ?>><?php echo esc_html__( 'Right', 'bafg' ); ?></option>
			</select>
			<br>
			<input id="bafg_filter_gallery_shortcode_generator" class="button button-primary" type="submit" value="Save">

			<div class="bafg-upgrade-to-pro"><a target="_blank" href="https://themefic.com/plugins/beaf/pro">Upgrade to pro!</a></div>
			<?php
				// Noncename needed to verify where the data originated
				wp_nonce_field( 'bafg_filter_gallery_nonce', 'bafg_filter_gallery_noncename' );
			?>
		</form>

	</div>
</div>