<?php
/**
 * Template admin/views/common/banner/content.php
 *
 * @package Forminator
 */

if ( FORMINATOR_PRO ) {
	if ( ! class_exists( 'WPMUDEV_Dashboard' ) && file_exists( WP_PLUGIN_DIR . '/wpmudev-updates/update-notifications.php' ) ) {
		echo forminator_template( 'common/banner/wpmudev-not-active' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	} elseif ( ! class_exists( 'WPMUDEV_Dashboard' ) ) {
		echo forminator_template( 'common/banner/wpmudev-install' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	} elseif ( ! WPMUDEV_Dashboard::$api->get_key() ) {
		echo forminator_template( 'common/banner/wpmudev-login' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	} elseif ( 'expired' === forminator_get_wpmudev_membership() ) {
		echo forminator_template( 'common/banner/wpmudev-expired' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
	}
}
