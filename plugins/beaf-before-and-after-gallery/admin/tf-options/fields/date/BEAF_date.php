<?php
// don't load directly
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'BEAF_date' ) ) {
	class BEAF_date extends BEAF_Fields {

		public function __construct( $field, $value = '', $settings_id = '', $parent_field = '' ) {
			parent::__construct( $field, $value, $settings_id, $parent_field );
		}

		public function render() {

			$args = wp_parse_args( $this->field, array(
				// 'format'      => 'Y-m-d',
				'range' => false,
				'multiple' => false,
				'minDate' => '',
				'label_from' => esc_html__( 'From', 'bafg' ),
				'label_to' => esc_html__( 'To', 'bafg' ),
				'placeholder' => esc_html__( 'Select Date', 'bafg' ),
			) );

			$value = wp_parse_args( $this->value, array(
				'from' => '',
				'to' => '',
			) );

			$format = ( ! empty( $args['format'] ) ) ? $args['format'] : 'Y-m-d';
			$range = ( ! empty( $args['range'] ) ) ? $args['range'] : false;
			$multiple = ( ! empty( $args['multiple'] ) ) ? $args['multiple'] : false;
			$placeholder = ( ! empty( $args['placeholder'] ) ) ? $args['placeholder'] : esc_html__( 'Select Date', 'bafg' );
			$minDate = ( ! empty( $args['minDate'] ) ) ? $args['minDate'] : '';

			if ( $range ) : ?>
				<div class="tf-date-range">
					<div class="tf-date-from">
						<label for="" class="tf-field-label"><?php echo esc_html__( $args['label_from'], 'bafg' ) ?></label>
						<div class="" style="position:relative;">
							<input type="text" name="<?php echo esc_attr( $this->field_name() ); ?>[from]"
								placeholder="<?php echo esc_attr( $placeholder ) ?>" value="<?php echo esc_attr( $value['from'] ); ?>"
								class="flatpickr " data-format="<?php echo esc_attr( $format ); ?>" <?php echo esc_attr( $this->field_attributes() ) ?> data-min-date="<?php echo esc_attr( $minDate ); ?>" />
							<i class="fa-solid fa-calendar-days"></i>
						</div>
					</div>
					<div class="tf-date-to">
						<label for="" class="tf-field-label"><?php echo esc_html__( $args['label_to'], 'bafg' ) ?></label>
						<div class="" style="position:relative;">
							<input type="text" name="<?php echo esc_attr( $this->field_name() ); ?>[to]"
								placeholder="<?php echo esc_attr( $placeholder ) ?>" value="<?php echo esc_attr( $value['to'] ); ?>"
								class="flatpickr " data-format="<?php echo esc_attr( $format ); ?>" <?php echo esc_attr( $this->field_attributes() ) ?> data-min-date="<?php echo esc_attr( $minDate ); ?>" />
							<i class="fa-solid fa-calendar-days"></i>
						</div>
					</div>
				</div>
			<?php else : ?>
				<input type="text" name="<?php echo esc_attr( $this->field_name() ); ?>"
					placeholder="<?php echo esc_attr( $placeholder ) ?>" value="<?php echo esc_attr( $this->value ); ?>"
					class="flatpickr " data-format="<?php echo esc_attr( $format ); ?>"
					data-multiple="<?php echo esc_attr( $multiple ); ?>" <?php echo esc_attr( $this->field_attributes() ) ?>
					data-min-date="<?php echo esc_attr( $minDate ); ?>" />
				<i class="fa-solid fa-calendar-days"></i>
				<?php
			endif;
		}
	}
}