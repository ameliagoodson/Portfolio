<?php
/**
 * Template admin/views/common/banner/wpmudev-not-active.php
 *
 * @package Forminator
 */

$current_page = filter_input( INPUT_GET, 'page' );
?>
<div class="sui-box forminator-banner">
	<div class="sui-box forminator-banner-content">
		<div>
			<img src="<?php echo esc_url( forminator_plugin_url() . 'assets/images/wpmudev-logo.png' ); ?>"
				srcset="<?php echo esc_url( forminator_plugin_url() . 'assets/images/wpmudev-logo.png' ); ?> 1x, <?php echo esc_url( forminator_plugin_url() . 'assets/images/wpmudev-logo@2x.png' ); ?> 2x"
				alt="<?php esc_attr_e( 'WPMU DEV Logo', 'forminator' ); ?>"
				class="sui-image sui-image-center fui-image">
		</div>
		<div>
			<h2><?php esc_html_e( 'Activate WPMU DEV Dashboard Plugin', 'forminator' ); ?></h2>
			<p>
				<?php
				if ( 'forminator-addons' === $current_page ) {
					esc_html_e( 'You currently have the WPMU DEV Dashboard plugin deactivated. To access all our Add-ons please activate the plugin and log in to the dashboard.', 'forminator' );
				} else {
					esc_html_e( 'You currently have the WPMU DEV Dashboard plugin deactivated. To access our complete list of preset templates, please activate the plugin and log in to the dashboard.', 'forminator' );
				}
				?>
			</p>
			<p>
				<a href="<?php echo esc_url( network_admin_url( 'plugins.php' ) ); ?>" target="_blank" class="sui-button sui-button-icon-left sui-button-blue">
					<span class="sui-icon-wpmudev-logo" aria-hidden="true"></span>
					<?php esc_html_e( 'Activate WPMU DEV Plugins', 'forminator' ); ?>
				</a>
			</p>
		</div>
	</div>
</div>
