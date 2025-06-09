<?php
// don't load directly
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'BEAF_imageselect' ) ) {
	class BEAF_imageselect extends BEAF_Fields {

		public function __construct( $field, $value = '', $settings_id = '', $parent_field = '' ) {
			parent::__construct( $field, $value, $settings_id, $parent_field );
		}

		public function render() {
			if ( isset( $this->field['options'] ) ) {
				$inline = ( isset( $this->field['inline'] ) && $this->field['inline'] ) ? 'tf-inline' : '';
				echo '<ul class="tf-image-radio-group ' . esc_attr( $inline ) . '">';
				foreach ( $this->field['options'] as $key => $value ) {

					if ( isset( $value['is_pro'] ) && $value['is_pro'] == true ) {
						$disabled = 'disabled';
					} else {
						$disabled = '';
					}
					?>
					<li>
						<label class="tf-image-checkbox">
							<?php if ( isset( $value['is_pro'] ) && $value['is_pro'] == true ) { ?>
								<div class="bafg-imageselect-tooltip">
									<div style="display:none" class="bafg-tooltip-info">Pro feature! <a href="https://themefic.com/beaf/pro"
											target="_blank"> More info</a></div>
								</div>
							<?php } ?>
							<?php echo '<input ' . esc_attr( checked( $key, $this->value, false ) ) . ' ' . esc_attr( $disabled ) . ' type="radio" id="' . esc_attr( $this->field_name() ) . '[' . esc_attr( $key ) . ']" name="' . esc_attr( $this->field_name() ) . '" data-depend-id="' . esc_attr( $this->field['id'] ) . '' . esc_attr( $this->parent_field ) . '" value="' . esc_attr( $key ) . '" ' . esc_attr( $this->field_attributes() ) . '/>';
							?>
							<img src="<?php echo esc_url( $value['url'] ); ?>" alt="<?php echo esc_attr( $value['title'] ); ?>">
						</label>
					</li>

					<?php
				}
				echo '</ul>';
			}
		}
	}
}