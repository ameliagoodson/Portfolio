<?php
// don't load directly
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'BEAF_Options' ) ) {
	class BEAF_Options {

		private static $instance = null;

		/**
		 * Singleton instance
		 * @since 1.0.0
		 */
		public static function instance() {
			if ( self::$instance == null ) {
				self::$instance = new self;
				self::$instance->init();
			}

			return self::$instance;
		}

		public function __construct() {
			
		}

		public function init() {
			//load files
			$this->load_files();

			//load metaboxes
			$this->load_metaboxes();

			//load options
			$this->load_options();

			//load taxonomy
			$this->load_taxonomy();

			//enqueue scripts
			add_action( 'admin_enqueue_scripts', array( $this, 'tf_options_admin_enqueue_scripts' ), 9 );
			// add_action( 'wp_enqueue_scripts', array( $this, 'tf_options_wp_enqueue_scripts' ) );
		}

		public function beaf_options_version() {
			return '1.1.2';
		}

		public function tf_options_file_path( $file_path = '' ) {
			return plugin_dir_path( __FILE__ ) . $file_path;
		}

		public function tf_options_file_url( $file_url = '' ) {
			return plugin_dir_url( __FILE__ ) . $file_url;
		}

		/**
		 * Load files
		 * @author Foysal
		 */
		public function load_files() {
			// Metaboxes Class
			require_once $this->tf_options_file_path( 'classes/BEAF_Metabox.php' );
			// Settings Class
			require_once $this->tf_options_file_path( 'classes/BEAF_Settings.php' );
			//Shortcodes Class
			// require_once $this->tf_options_file_path( 'classes/TF_Shortcodes.php' );
			//Taxonomy Class
			require_once $this->tf_options_file_path( 'classes/BEAF_Taxonomy_Metabox.php' );

		}

		/**
		 * Load metaboxes
		 * @author Foysal
		 */
		public function load_metaboxes() {
			if ( $this->is_tf_pro_active() ) {
				$metaboxes = glob( BEAF_ADMIN_PATH . 'tf-options/metaboxes/*.php' );
			} else {
				$metaboxes = glob( $this->tf_options_file_path( 'metaboxes/*.php' ) );
			}

			// if( !empty( $pro_metaboxes ) ) {
			// 		$metaboxes = array_merge( $metaboxes, $pro_metaboxes );
			// }

			if ( ! empty( $metaboxes ) ) {
				foreach ( $metaboxes as $metabox ) {
					if ( file_exists( $metabox ) ) {
						require_once $metabox;
					}
				}
			}
		}

		/**
		 * Load Options
		 * @author Foysal
		 */
		public function load_options() {
			if ( $this->is_tf_pro_active() ) {
				$options = glob( BEAF_ADMIN_PATH . 'tf-options/options/*.php' );
			} else {
				$options = glob( $this->tf_options_file_path( 'options/*.php' ) );
			}

			if ( ! empty( $options ) ) {
				foreach ( $options as $option ) {
					if ( file_exists( $option ) ) {
						require_once $option;
					}
				}
			}
		}

		/**
		 * Load Taxonomy
		 * @author Foysal
		 */
		public function load_taxonomy() {
			if ( $this->is_tf_pro_active() ) {
				$taxonomies = glob( BEAF_ADMIN_PATH . 'tf-options/taxonomies/*.php' );
			} else {
				$taxonomies = glob( $this->tf_options_file_path( 'taxonomies/*.php' ) );
			}

			if ( ! empty( $taxonomies ) ) {
				foreach ( $taxonomies as $taxonomy ) {
					if ( file_exists( $taxonomy ) ) {
						require_once $taxonomy;
					}
				}
			}
		}

		/**
		 * Admin Enqueue scripts (Customize)
		 * @author M Hemel Hasan
		 */
		public function tf_options_admin_enqueue_scripts( $screen ) {
			global $post_type;
			$tf_options_screens = array(
				'bafg_page_beaf_settings',
			);
			$tf_options_post_type = array( 'bafg' );
			$admin_date_format_for_users = ! empty( Hook::beaf_opt( "tf-date-format-for-users" ) ) ? Hook::beaf_opt( "tf-date-format-for-users" ) : "Y/m/d";
			$bafg_load_from_cdn = ! empty( Hook::beaf_opt( "bafg_assets_from_cdn" ) ) ? Hook::beaf_opt( "bafg_assets_from_cdn" ) : 0;


			// var_dump( $tf_options_screens );

			//Css
			if ( in_array( $screen, $tf_options_screens ) || in_array( $post_type, $tf_options_post_type ) ) {

				wp_enqueue_style( 'wp-color-picker' );

				if ( $bafg_load_from_cdn == 1 ) {
					// wp_enqueue_style('tf-fontawesome-4', '//cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css', array(), $this->beaf_options_version());
					// wp_enqueue_style('tf-fontawesome-5', '//cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/all.min.css', array(), $this->beaf_options_version());
					wp_enqueue_style( 'tf-fontawesome-6', '//cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css', array(), $this->beaf_options_version() );
					// wp_enqueue_style('tf-remixicon', '//cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css', array(), $this->beaf_options_version());
					wp_enqueue_style( 'tf-select2', '//cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css', array(), $this->beaf_options_version() );
					wp_enqueue_style( 'tf-flatpickr', '//cdnjs.cloudflare.com/ajax/libs/flatpickr/4.6.13/flatpickr.min.css', array(), $this->beaf_options_version() );
				} else {
					// wp_enqueue_style('tf-fontawesome-4', BEAF_ASSETS_URL . 'libs/font-awesome/fontawesome4/css/font-awesome.min.css', array(), $this->beaf_options_version());
					// wp_enqueue_style('tf-fontawesome-5', BEAF_ASSETS_URL . 'libs/font-awesome/fontawesome5/css/all.min.css', array(), $this->beaf_options_version());
					wp_enqueue_style( 'tf-fontawesome-6', BEAF_ASSETS_URL . 'libs/font-awesome/fontawesome6/css/all.min.css', array(), $this->beaf_options_version() );
					// wp_enqueue_style('tf-remixicon', BEAF_ASSETS_URL . 'libs/remixicon/remixicon.css', array(), $this->beaf_options_version());
					wp_enqueue_style( 'tf-select2', BEAF_ASSETS_URL . 'libs/select2/select2.min.css', array(), $this->beaf_options_version() );
					wp_enqueue_style( 'tf-flatpickr', BEAF_ASSETS_URL . 'libs/flatpickr/flatpickr.min.css', array(), $this->beaf_options_version() );
				}
			}

			//Js
			if ( in_array( $screen, $tf_options_screens ) || in_array( $post_type, $tf_options_post_type ) ) {
				$bafg_load_from_cdn = ! empty( Hook::beaf_opt( "bafg_assets_from_cdn" ) ) ? Hook::beaf_opt( "bafg_assets_from_cdn" ) : 0;

				wp_enqueue_script( 'wp-color-picker' );

				if ( $bafg_load_from_cdn == 1 ) {
					// wp_enqueue_script( 'Chart-js', '//cdnjs.cloudflare.com/ajax/libs/Chart.js/2.6.0/Chart.js', array( 'jquery' ), '2.6.0', true );
					wp_enqueue_script( 'tf-flatpickr', '//cdnjs.cloudflare.com/ajax/libs/flatpickr/4.6.13/flatpickr.min.js', array( 'jquery' ), $this->beaf_options_version(), true );
					wp_enqueue_script( 'tf-select2', '//cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/js/select2.min.js', array( 'jquery' ), $this->beaf_options_version(), true );
				} else {
					wp_enqueue_script( 'tf-flatpickr', BEAF_ASSETS_URL . 'libs/flatpickr/flatpickr.min.js', array( 'jquery' ), $this->beaf_options_version(), true );
					wp_enqueue_script( 'select2', BEAF_ASSETS_URL . 'libs/select2/select2.min.js', array( 'jquery' ), $this->beaf_options_version(), true );
				}



				$tf_google_map = function_exists( 'is_tf_pro' ) && is_tf_pro() && ! empty( Hook::beaf_opt( 'google-page-option' ) ) ? Hook::beaf_opt( 'google-page-option' ) : "false";

				if ( $tf_google_map != true ) {
					if ( $bafg_load_from_cdn == 1 ) {
						wp_enqueue_script( 'tf-leaflet', esc_url( '//cdn.jsdelivr.net/npm/leaflet@' . '1.9' . '/dist/leaflet.js' ), array( 'jquery' ), '1.9', true );
						wp_enqueue_style( 'tf-leaflet', esc_url( '//cdn.jsdelivr.net/npm/leaflet@' . '1.9' . '/dist/leaflet.css' ), array(), '1.9' );
					} else {
						wp_enqueue_script( 'tf-leaflet', BEAF_ASSETS_URL . 'libs/leaflet/leaflet.js', array( 'jquery' ), '1.9', true );
						wp_enqueue_script( 'tf-leaflet', BEAF_ASSETS_URL . 'libs/leaflet/leaflet.css', array( 'jquery' ), '1.9', true );
					}
				}
				wp_enqueue_script( 'jquery-ui-autocomplete' );

				if ( ! wp_script_is( 'jquery-ui-sortable' ) ) {
					wp_enqueue_script( 'jquery-ui-sortable' );
				}
				wp_enqueue_media();
				wp_enqueue_editor();
			}

			$tf_google_map = function_exists( 'is_tf_pro' ) && is_tf_pro() && ! empty( Hook::beaf_opt( 'google-page-option' ) ) ? Hook::beaf_opt( 'google-page-option' ) : "false";

		}

		/**
		 * Dequeue scripts
		 */
		public function tf_options_admin_dequeue_scripts( $screen ) {
			global $post_type;
			$tf_options_post_type = array( 'bafg' );

			if ( $screen == 'toplevel_page_tf_settings' || in_array( $post_type, $tf_options_post_type ) ) {
				wp_dequeue_script( 'theplus-admin-js-pro' );
			}
		}

		/**
		 * Enqueue scripts (Updated off now)
		 * @author M Hemel Hasan
		 */
		public function tf_options_wp_enqueue_scripts() {
			$bafg_load_from_cdn = ! empty( Hook::beaf_opt( "bafg_assets_from_cdn" ) ) ? Hook::beaf_opt( "bafg_assets_from_cdn" ) : 0;
			if ( $bafg_load_from_cdn == 1 ) {
				wp_enqueue_style( 'tf-fontawesome-4', '//cdn.jsdelivr.net/npm/font-awesome@4.7.0/css/font-awesome.min.css', array(), $this->beaf_options_version() );
				wp_enqueue_style( 'tf-fontawesome-5', '//cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.15.4/css/all.min.css', array(), $this->beaf_options_version() );
				wp_enqueue_style( 'tf-fontawesome-6', '//cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css', array(), $this->beaf_options_version() );
				wp_enqueue_style( 'tf-remixicon', '//cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css', array(), $this->beaf_options_version() );
			} else {
				wp_enqueue_style( 'tf-fontawesome-4', BEAF_ASSETS_URL . 'libs/font-awesome/fontawesome4/css/font-awesome.min.css', array(), $this->beaf_options_version() );
				wp_enqueue_style( 'tf-fontawesome-5', BEAF_ASSETS_URL . 'libs/font-awesome/fontawesome5/css/all.min.css', array(), $this->beaf_options_version() );
				wp_enqueue_style( 'tf-fontawesome-6', BEAF_ASSETS_URL . 'libs/font-awesome/fontawesome6/css/all.min.css', array(), $this->beaf_options_version() );
				wp_enqueue_style( 'tf-remixicon', BEAF_ASSETS_URL . 'libs/remixicon/remixicon.css', array(), $this->beaf_options_version() );

			}
		}

		/*
		 * Field Base
		 * @author Foysal
		 */
		public function field( $field, $value, $settings_id = '', $parent = '' ) {
			if ( $field['type'] == 'repeater' ) {
				$id = ( ! empty( $settings_id ) ) ? $settings_id . '[' . $field['id'] . '][0]' . '[' . $field['id'] . ']' : $field['id'] . '[0]' . '[' . $field['id'] . ']';
			} else {
				$id = $settings_id . '[' . $field['id'] . ']';
			}

			$class = isset( $field['class'] ) ? $field['class'] : '';

			$is_pro = isset( $field['is_pro'] ) ? $field['is_pro'] : '';
			$badge_up = isset( $field['badge_up'] ) ? $field['badge_up'] : '';

			if ( function_exists( 'is_tf_pro' ) && is_tf_pro() ) {
				$is_pro = false;
			}
			if ( $is_pro == true ) {
				$class .= ' tf-field-disable tf-field-pro';
			}
			if ( $badge_up == true ) {
				$class .= ' tf-field-disable tf-field-upcoming';
			}
			$tf_meta_box_dep_value = get_post_meta( get_the_ID(), $settings_id, true );


			$depend = '';
			if ( ! empty( $field['dependency'] ) ) {

				$dependency = $field['dependency'];
				$depend_visible = '';
				$data_controller = '';
				$data_condition = '';
				$data_value = '';
				$data_global = '';

				if ( is_array( $dependency[0] ) ) {
					$data_controller = implode( '|', array_column( $dependency, 0 ) );
					$data_condition = implode( '|', array_column( $dependency, 1 ) );
					$data_value = implode( '|', array_column( $dependency, 2 ) );
					$data_global = implode( '|', array_column( $dependency, 3 ) );
					$depend_visible = implode( '|', array_column( $dependency, 4 ) );
				} else {
					$data_controller = ( ! empty( $dependency[0] ) ) ? $dependency[0] : '';
					$data_condition = ( ! empty( $dependency[1] ) ) ? $dependency[1] : '';
					$data_value = ( ! empty( $dependency[2] ) ) ? $dependency[2] : '';
					$data_global = ( ! empty( $dependency[3] ) ) ? $dependency[3] : '';
					$depend_visible = ( ! empty( $dependency[4] ) ) ? $dependency[4] : '';
				}

				$depend .= ' data-controller="' . esc_attr( $data_controller ) . '' . $parent . '"';
				$depend .= ' data-condition="' . esc_attr( $data_condition ) . '"';
				$depend .= ' data-value="' . esc_attr( $data_value ) . '"';
				$depend .= ( ! empty( $data_global ) ) ? ' data-depend-global="true"' : '';

				$visible = ( ! empty( $depend_visible ) ) ? ' tf-depend-visible' : ' tf-depend-hidden';
			}

			//field width
			$field_width = isset( $field['field_width'] ) && ! empty( $field['field_width'] ) ? esc_attr( $field['field_width'] ) : '100';
			if ( $field_width == '100' ) {
				$field_style = 'width:100%;';
			} else {
				$field_style = 'width:calc(' . $field_width . '% - 10px);';
			}
			?>

			<div class="tf-field tf-field-<?php echo esc_attr( $field['type'] ); ?> <?php echo esc_attr( $class ); ?> <?php echo ! empty( $visible ) ? wp_kses_post( $visible ) : ''; ?>"
				<?php echo ! empty( $depend ) ? wp_kses_post( $depend ) : ''; ?> style="<?php echo esc_attr( $field_style ); ?>">

				<?php if ( ! empty( $field['label'] ) ) : ?>
					<label for="<?php echo esc_attr( $id ) ?>" class="tf-field-label">
						<?php echo esc_html__( $field['label'], "bafg" ) ?>
						<?php if ( $is_pro ) : ?>
							<div class="tf-csf-badge"><span class="tf-pro">
									<?php esc_html_e( "Pro", "bafg" ); ?>
								</span></div>
						<?php endif; ?>
						<?php if ( $badge_up ) : ?>
							<div class="tf-csf-badge"><span class="tf-upcoming">
									<?php esc_html_e( "Upcoming", "bafg" ); ?>
								</span></div>
						<?php endif; ?>
					</label>
				<?php endif; ?>

				<?php if ( ! empty( $field['subtitle'] ) ) : ?>
					<span class="tf-field-sub-title">
						<?php echo wp_kses_post( $field['subtitle'] ) ?>
					</span>
				<?php endif; ?>

				<div class="tf-fieldset">
					<?php
					$fieldClass = 'BEAF_' . $field['type'];
					if ( class_exists( $fieldClass ) ) {
						$_field = new $fieldClass( $field, $value, $settings_id, $parent );
						$_field->render();
					} else {
						echo '<p>' . esc_html__( 'Field not found!', 'bafg' ) . '</p>';
					}
					?>
				</div>
				<?php if ( ! empty( $field['description'] ) ) : ?>
					<p class="description">
						<?php echo wp_kses_post( $field['description'] ) ?>
					</p>
				<?php endif; ?>
			</div>
			<?php
		}

		public function is_tf_pro_active() {
			if ( is_plugin_active( 'bafg-pro/bafg-pro.php' ) && defined( 'BEAF_PRO' ) ) {
				return true;
			}

			return false;
		}

	}
}
