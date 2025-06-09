<?php
// don't load directly
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'BEAF_notice' ) ) {
	class BEAF_notice extends BEAF_Fields {

		public function __construct( $field, $value = '', $settings_id = '', $parent_field = '' ) {
			parent::__construct( $field, $value, $settings_id, $parent_field );
		}

		public function render() {
			if ( empty( $this->field['content'] ) && empty( $this->field['title'] ) ) {
				return;
			}
			?>
			<div
				class="tf-field-notice-inner tf-notice-<?php echo ! empty( $this->field['notice'] ) ? esc_attr( $this->field['notice'] ) : 'info' ?>">
				<?php if ( ! empty( $this->field['icon'] ) ) : ?>
					<div class="tf-field-notice-icon">
						<i class="<?php echo esc_attr( $this->field['icon'] ); ?>"></i>
					</div>
				<?php endif; ?>

				<div class="tf-field-notice-content <?php echo ! empty( $this->field['content'] ) ? 'has-content' : '' ?>">
					<?php if ( ! empty( $this->field['title'] ) ) : ?>
						<h6><?php echo esc_html__( $this->field['title'], 'bafg' ); ?></h6>
					<?php endif; ?>
					<?php echo wp_kses_post( $this->field['content'] ); ?>
				</div>

			</div>
			<?php
		}
	}
}