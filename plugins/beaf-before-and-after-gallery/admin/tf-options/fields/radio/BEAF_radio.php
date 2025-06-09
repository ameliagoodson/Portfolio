<?php
// don't load directly
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'BEAF_radio' ) ) {
	class BEAF_radio extends BEAF_Fields {

		public function __construct( $field, $value = '', $settings_id = '', $parent_field = '' ) {
			parent::__construct( $field, $value, $settings_id, $parent_field );
		}

		public function render() {
			if ( isset( $this->field['options'] ) ) {
				$inline = ( isset( $this->field['inline'] ) && $this->field['inline'] ) ? 'tf-inline' : '';
				echo '<ul class="tf-radio-group ' . esc_attr( $inline ) . '">';
				foreach ( $this->field['options'] as $key => $value ) {
					//var_dump( $this->value );
					// if( empty($this->value) ){
					// 	$this->value = $this->field['default'];
					// }
					$checked = $key == $this->value ? ' checked' : '';
					//check if field is pro
					if ( is_array( $value ) ) {
						if ( isset( $value['is_pro'] ) && $value['is_pro'] == true ) {
							$disabled = 'disabled';
						} else {
							$disabled = '';
						}
						if ( isset( $value['label'] ) ) {
							echo '<li><input ' . esc_attr( $disabled ) . ' type="radio" id="' . esc_attr( $this->field_name() ) . '[' . esc_attr( $key ) . ']" name="' . esc_attr( $this->field_name() ) . '" data-depend-id="' . esc_attr( $this->field['id'] ) . '' . esc_attr( $this->parent_field ) . '" value="' . esc_attr( $key ) . '" ' . esc_attr( $checked ) . ' ' . esc_attr( $this->field_attributes() ) . '/><label for="' . esc_attr( $this->field_name() ) . '[' . esc_attr( $key ) . ']">' . wp_kses_post( $value['label'] ) . '</label></li>';
						}
					} else {
						echo '<li><input type="radio" id="' . esc_attr( $this->field_name() ) . '[' . esc_attr( $key ) . ']" name="' . esc_attr( $this->field_name() ) . '" data-depend-id="' . esc_attr( $this->field['id'] ) . '' . esc_attr( $this->parent_field ) . '" value="' . esc_attr( $key ) . '" ' . esc_attr( $checked ) . ' ' . esc_attr( $this->field_attributes() ) . '/><label for="' . esc_attr( $this->field_name() ) . '[' . esc_attr( $key ) . ']">' . esc_attr( $value ) . '</label></li>';
					}

				}
				echo '</ul>';
			} else {
				echo '<input type="radio" id="' . esc_attr( $this->field_name() ) . '" name="' . esc_attr( $this->field_name() ) . '" data-depend-id="' . esc_attr( $this->field['id'] ) . '' . esc_attr( $this->parent_field ) . '" value="1" ' . checked( $this->value, 1, false ) . ' ' . esc_attr( $this->field_attributes() ) . '/><label for="' . esc_attr( $this->field_name() ) . '">' . esc_attr( $this->field['title'] ) . '</label>';
			}
		}
	}
}