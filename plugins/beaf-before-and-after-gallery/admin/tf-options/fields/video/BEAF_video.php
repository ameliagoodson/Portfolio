<?php
// don't load directly
defined( 'ABSPATH' ) || exit;

/**
 * Field: text
 */
if ( ! class_exists( 'BEAF_video' ) ) {
	class BEAF_video extends BEAF_Fields {

		public function __construct( $field, $value = '', $settings_id = '', $parent_field = '' ) {
			parent::__construct( $field, $value, $settings_id, $parent_field );
		}

		public function render() {
			echo '<div class="tf-fieldset-media-preview tf-fieldset-media-preview ' . esc_attr( str_replace( array( "[", "]", "-" ), "_", esc_attr( $this->field_name() ) ) ) . '">';

			echo '</div>
			<div class="tf-fieldset-media">
			<input type="text" name="' . esc_attr( $this->field_name() ) . '" id="' . esc_attr( $this->field_name() ) . '" value="' . esc_attr( $this->value ) . '" /><a href="#" tf-field-name="' . esc_attr( $this->field_name() ) . '" class="tf-media-upload button button-primary button-large bafg-video-upload">' . esc_html( "Upload Video", "bafg" ) . '</a></div>
			<input type="hidden" name="' . esc_attr( $this->field_name() ) . '" id="' . esc_attr( $this->field_name() ) . '" value="' . esc_attr( $this->value ) . '"  />';
		}

		//sanitize
		public function sanitize() {
			return sanitize_url( $this->value );
		}

	}
}