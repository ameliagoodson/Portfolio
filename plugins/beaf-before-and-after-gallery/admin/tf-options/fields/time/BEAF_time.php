<?php
// don't load directly
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'BEAF_time' ) ) {
	class BEAF_time extends BEAF_Fields {

		public function __construct( $field, $value = '', $settings_id = '', $parent_field = '' ) {
			parent::__construct( $field, $value, $settings_id, $parent_field );
		}

		public function render() {

			$args = wp_parse_args( $this->field, array(
				'format' => 'h:i K',
				'placeholder' => esc_html__( 'Select Time', 'bafg' ),
			) );

			$format = ( ! empty( $args['format'] ) ) ? $args['format'] : 'Y-m-d';
			$placeholder = ( ! empty( $args['placeholder'] ) ) ? $args['placeholder'] : esc_html__( 'Select Date', 'bafg' );
			?>
			<input type="text" name="<?php echo esc_attr( $this->field_name() ); ?>"
				placeholder="<?php echo esc_attr( $placeholder ) ?>" value="<?php echo esc_attr( $this->value ); ?>"
				class="flatpickr " data-format="<?php echo esc_attr( $format ); ?>" <?php echo esc_attr( $this->field_attributes() ) ?> />
			<i class="fa-regular fa-clock"></i>
			<?php
		}


	}
}