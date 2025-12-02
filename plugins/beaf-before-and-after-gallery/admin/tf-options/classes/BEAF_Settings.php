<?php
// don't load directly
defined( 'ABSPATH' ) || exit;

if ( ! class_exists( 'BEAF_Settings' ) ) {
	class BEAF_Settings {

		public $option_id = null;
		public $option_title = null;
		public $option_icon = null;
		public $option_position = null;
		public $option_sections = array();

		public $pre_tabs;
		public $pre_fields;
		public $pre_sections;

		public function __construct( $key, $params = array() ) {
			$this->option_id = $key;
			$this->option_title = ! empty( $params['title'] ) ? apply_filters( $key . '_title', $params['title'] ) : '';
			$this->option_icon = ! empty( $params['icon'] ) ? apply_filters( $key . '_icon', $params['icon'] ) : '';
			$this->option_position = ! empty( $params['position'] ) ? apply_filters( $key . '_position', $params['position'] ) : 5;
			$this->option_sections = ! empty( $params['sections'] ) ? apply_filters( $key . '_sections', $params['sections'] ) : array();

			// run only is admin panel options, avoid performance loss
			$this->pre_tabs = $this->pre_tabs( $this->option_sections );
			$this->pre_fields = $this->pre_fields( $this->option_sections );
			$this->pre_sections = $this->pre_sections( $this->option_sections );

			//options
			add_action( 'admin_menu', array( $this, 'beaf_options' ) );

			//save options
			add_action( 'admin_init', array( $this, 'beaf_save_options' ) );

			//ajax save options
			add_action( 'wp_ajax_beaf_options_save', array( $this, 'beaf_ajax_save_options' ) );

			add_action('wp_ajax_beaf_themefic_manage_plugin', array( $this, 'beaf_themefic_manage_plugin' ) );
		}

		public static function option( $key, $params = array() ) {
			return new self( $key, $params );
		}

		public function pre_tabs( $sections ) {

			$result = array();
			$parents = array();

			foreach ( $sections as $key => $section ) {
				if ( ! empty( $section['parent'] ) ) {
					$parents[ $section['parent'] ][ $key ] = $section;
					unset( $sections[ $key ] );
				}
			}

			foreach ( $sections as $key => $section ) {
				if ( ! empty( $key ) && ! empty( $parents[ $key ] ) ) {
					$section['sub_section'] = $parents[ $key ];
				}
				$result[ $key ] = $section;
			}

			return $result;
		}

		public function pre_fields( $sections ) {

			$result = array();

			foreach ( $sections as $key => $section ) {
				if ( ! empty( $section['fields'] ) ) {
					foreach ( $section['fields'] as $field ) {
						$result[] = $field;
					}
				}
			}

			return $result;
		}

		public function pre_sections( $sections ) {

			$result = array();

			foreach ( $this->pre_tabs as $tab ) {
				if ( ! empty( $tab['subs'] ) ) {
					foreach ( $tab['subs'] as $sub ) {
						$sub['ptitle'] = $tab['title'];
						$result[] = $sub;
					}
				}
				if ( empty( $tab['subs'] ) ) {
					$result[] = $tab;
				}
			}

			return $result;
		}

		/**
		 * Options Page menu
		 * @author Foysal
		 */
		public function beaf_options() {
			//Setting submenu
			add_submenu_page(
				'edit.php?post_type=bafg',
				__( 'Beaf Settings', 'bafg' ),
				__( 'Settings', 'bafg' ),
				'manage_options',
				'beaf_settings',
				array( $this, 'beaf_options_page' ),
			);
		}


		/**
		 * Options Page
		 * @author Foysal
		 */
		public function beaf_options_page() {

			// Retrieve an existing value from the database.
			$tf_option_value = get_option( $this->option_id );
			$current_page_url = $this->get_current_page_url();
			$query_string = $this->get_query_string( $current_page_url );

			// Set default values.
			if ( empty( $tf_option_value ) ) {
				$tf_option_value = array();
			}


			$ajax_save_class = 'beaf-ajax-save';

			if ( ! empty( $this->option_sections ) ) :
				?>
				<div class="tf-setting-dashboard">
					<!-- dashboard-header-include -->
					<?php echo esc_attr( beaf_dashboard_header() ); ?>
					<div class="beaf-settings-page">

						<div class="tf-option-wrapper tf-setting-wrapper">
							<form method="post" action="" class="tf-option-form <?php echo esc_attr( $ajax_save_class ) ?>"
								enctype="multipart/form-data">
								<!-- Body -->
								<div class="tf-option">
									<div class="tf-admin-tab tf-option-nav">
										<?php
										$section_count = 0;
										foreach ( $this->pre_tabs as $key => $section ) :
											$parent_tab_key = ! empty( $section['fields'] ) ? $key : array_key_first( $section['sub_section'] );
											?>
											<div
												class="tf-admin-tab-item<?php echo ! empty( $section['sub_section'] ) ? ' tf-has-submenu' : '' ?>">

												<a href="#<?php echo esc_attr( $parent_tab_key ); ?>"
													class="tf-tablinks <?php echo $section_count == 0 ? 'active' : ''; ?>"
													data-tab="<?php echo esc_attr( $parent_tab_key ) ?>">
													<?php echo ! empty( $section['icon'] ) ? '<span class="tf-sec-icon"><i class="' . esc_attr( $section['icon'] ) . '"></i></span>' : ''; ?>
													<?php echo esc_attr( $section['title'] ); ?>
												</a>

												<?php if ( ! empty( $section['sub_section'] ) ) : ?>
													<ul class="tf-submenu">
														<?php foreach ( $section['sub_section'] as $sub_key => $sub ) : ?>
															<li>
																<a href="#<?php echo esc_attr( $sub_key ); ?>"
																	class="tf-tablinks <?php echo $section_count == 0 ? 'active' : ''; ?>"
																	data-tab="<?php echo esc_attr( $sub_key ) ?>">
																	<span class="tf-tablinks-inner">
																		<?php echo ! empty( $sub['icon'] ) ? '<span class="tf-sec-icon"><i class="' . esc_attr( $sub['icon'] ) . '"></i></span>' : ''; ?>
																		<?php echo esc_attr( $sub['title'] ); ?>
																	</span>
																</a>
															</li>
														<?php endforeach; ?>
													</ul>
												<?php endif; ?>
											</div>
											<?php $section_count++; endforeach; ?>
									</div>

									<div class="tf-tab-wrapper">
										<div class="tf-mobile-setting">
											<a href="#" class="tf-mobile-tabs"><i class="fa-solid fa-bars"></i></a>
										</div>
										<?php
										$content_count = 0;
										foreach ( $this->option_sections as $key => $section ) : ?>
											<div id="<?php echo esc_attr( $key ) ?>"
												class="tf-tab-content <?php echo $content_count == 0 ? 'active' : ''; ?>">

												<?php
												if ( ! empty( $section['fields'] ) ) :
													foreach ( $section['fields'] as $field ) :

														$default = isset( $field['default'] ) ? $field['default'] : '';
														$value = isset( $tf_option_value[ $field['id'] ] ) ? $tf_option_value[ $field['id'] ] : $default;

														$tf_option = new BEAF_Options();
														$tf_option->field( $field, $value, $this->option_id );

													endforeach;
												endif; ?>

											</div>
											<?php $content_count++; endforeach; ?>

										<!-- Footer -->
										<div class="tf-option-footer">
											<button type="submit" class="tf-admin-btn tf-btn-secondary beaf-submit-btn">
												<?php esc_attr_e( 'Save', 'bafg' ); ?>
											</button>
										</div>
									</div>
								</div>
								<?php wp_nonce_field( 'beaf_option_nonce_action', 'beaf_option_nonce' ); ?>
							</form>
						</div>

						<div class="beaf-settings-sidebar">
							<?php echo $this->tf_sidebar(); ?>
						</div>
					</div>
				</div>
			<?php
			endif;
		}

		public function tf_sidebar() {
			?>
			<div class="beaf-sidebar">
				<div class="beaf-sidebar-wrap">
					<!-- promo banner  -->
					 <?php echo apply_filters('beaf_dashboard_helper_banner', ''); ?>

					<div class="beaf-sidebar-content">

						<?php echo $this->tf_get_sidebar_plugin_list(); ?>

						<div class="customization-quote">
							<div class="quote-header">
								<i class="fa-solid fa-code"></i>
								<a href="<?php echo esc_url( 'https://portal.themefic.com/hire-us/' ); ?>" target="_blank"><?php echo __('Get Free Quote', 'bafg');  ?></a>
							</div>
							<div class="quote-content">
								<h3><?php echo __('Need Help Customizing Your WordPress Site?', 'bafg');  ?></h3>
								<p><?php echo __('Want to tweak a theme, adjust a plugin like Ultimate Before After Image Slider, or add custom functionality to your site? Our expert WordPress developers can tailor it just the way you need. We only charge $29/hour', 'bafg');  ?></p>								
							</div>
						</div>

						<div class="quick-access">
							<h3><?php echo __('Helpful Resources', 'bafg');  ?></h3>
							<div class="quick-access-wrapper">
								<div class="access-item">
									<a href="https://themefic.com/docs/beaf/" target="_blank">
										<span class="icon"><i class="fa-solid fa-folder-open"></i></span>
										<?php echo _e( 'Documentation', 'bafg' ); ?>
									</a>
								</div>
								<div class="access-item">
									<a href="https://portal.themefic.com/support/" target="_blank">
										<span class="icon"><i class="fa-solid fa-headset"></i></span>
										<?php echo _e( 'Get Support', 'bafg' ); ?>
									</a>
								</div>
								<div class="access-item">
									<a href="https://facebook.com/groups/beaf.wp" target="_blank">
										<span class="icon"><i class="fa-solid fa-users"></i></span>
										<?php echo _e( 'Join our Community', 'bafg' ); ?>
									</a>
								</div>
								<div class="access-item">
									<a href="https://portal.themefic.com/support/" target="_blank">
										<span class="icon"><i class="fa-solid fa-lightbulb"></i></span>
										<?php echo _e( 'Request a Feature', 'bafg' ); ?>
									</a>
								</div>
							</div>
						</div>

					</div>
				</div>
			</div>
			<?php
		}


		public function tf_get_sidebar_plugin_list(){

			$plugins = [
				[
					'name'       => 'Hydra',
					'slug'       => 'hydra-booking',
					'file_name'  => 'hydra-booking',
					'subtitle'   => 'All in One Appointment Booking System',
					'image'      => 'https://ps.w.org/hydra-booking/assets/icon-128x128.jpg',
					// 'pro'        => [
					// 	'slug'      => 'hydra-booking-pro',
					// 	'file_name' => 'hydra-booking-pro',
					// 	'url'       => 'https://hydrabooking.com/',
					// ],
				],
				[
					'name'       => 'UACF7',
					'slug'       => 'ultimate-addons-for-contact-form-7',
					'file_name'  => 'ultimate-addons-for-contact-form-7',
					'subtitle'   => '40+ Essential Addons for Contact Form 7',
					'image'      => 'https://ps.w.org/ultimate-addons-for-contact-form-7/assets/icon-128x128.png',
					// 'pro'        => [
					// 	'slug'      => 'ultimate-addons-for-contact-form-7-pro',
					// 	'file_name' => 'ultimate-addons-for-contact-form-7-pro',
					// 	'url'       => 'https://cf7addons.com/pricing/',
					// ],
				],
				// [
				// 	'name'       => 'BEAF',
				// 	'slug'       => 'beaf-before-and-after-gallery',
				// 	'file_name'  => 'before-and-after-gallery',
				// 	'subtitle'   => 'Ultimate Before After Image Slider & Gallery',
				// 	'image'      => 'https://ps.w.org/beaf-before-and-after-gallery/assets/icon-128x128.png',
				// 	// 'pro'        => [
				// 	// 	'slug'      => 'beaf-before-and-after-gallery-pro',
				// 	// 	'file_name' => 'before-and-after-gallery-pro',
				// 	// 	'url'       => 'https://themefic.com/plugins/beaf/pro/',
				// 	// ],
				// ],
				[
					'name'       => 'Tourfic',
					'slug'       => 'tourfic',
					'file_name'  => 'tourfic',
					'subtitle'   => 'Travel, Hotel Booking & Car Rental WP Plugin',
					'image'      => 'https://ps.w.org/tourfic/assets/icon-128x128.gif',
					// 'pro'        => [
					// 	'slug'      => 'tourfic-pro',
					// 	'file_name' => 'tourfic-pro',
					// 	'url'       => 'https://themefic.com/tourfic/',
					// ],
				],
				[
					'name'       => 'Instantio',
					'slug'       => 'instantio',
					'file_name'  => 'instantio',
					'subtitle'   => 'WooCommerce Quick & Direct Checkout',
					'image'      => 'https://ps.w.org/instantio/assets/icon-128x128.png',
					// 'pro'        => [
					// 	'slug'      => 'wooinstant',
					// 	'file_name' => 'wooinstant',
					// 	'url'       => 'https://themefic.com/instantio/',
					// ],
				],
				// [
				// 	'name'       => 'Before After Slider for WooCommerce – eBEAF',
				// 	'slug'       => 'before-after-for-woocommerce',
				// 	'file_name'  => 'before-after-for-woocommerce',
				// 	'image'      => 'https://ps.w.org/before-after-for-woocommerce/assets/icon-128x128.gif',
				// 	'pro_url'    => '',
				// 	'pro'        => [
				// 		'slug'      => 'before-after-for-woocommerce-pro',
				// 		'file_name' => 'before-after-for-woocommerce-pro',
				// 		'url'       => 'https://themefic.com/plugins/ebeaf/pro/',
				// 	],
				// ],
			];

			?>

			<ul>
				<?php foreach ($plugins as $plugin): 
					$plugin_path = $plugin['slug'] . '/' . $plugin['file_name'] . '.php';
					$installed = file_exists(WP_PLUGIN_DIR . '/' . $plugin_path);
					$activated = $installed && is_plugin_active($plugin_path);

					$pro_installed = false;
					$pro_activated = false;
					
					if (!empty($plugin['pro'])) {
						$pro_path = $plugin['pro']['slug'] . '/' . $plugin['pro']['file_name'] . '.php';
						$pro_installed = file_exists(WP_PLUGIN_DIR . '/' . $pro_path);
						$pro_activated = $pro_installed && is_plugin_active($pro_path);
					}

					?>

					<li class="plugin-item <?php echo esc_attr($plugin['slug'] == 'hydra-booking' ? 'featured' : ''); ?>" data-plugin-slug="<?php echo esc_attr($plugin['slug']); ?>">
						<div class="plugin-info-wrapper">
							<div class="plugin-info">
								<img src="<?php echo esc_url($plugin['image']); ?>" alt="<?php echo esc_attr($plugin['name']); ?>" class="<?php echo esc_attr($plugin['name'] == 'BEAF' ? 'beaf-logo' : ''); ?>" width="40" height="40">
								<div class="plugin-btn">
									<span class="badge free">Free</span>
									<?php if (!$installed): ?>
										<button class="plugin-button install" data-action="install" data-plugin="<?php echo esc_attr($plugin['slug']); ?>" data-plugin_filename="<?php echo esc_attr($plugin['file_name']); ?>">
											Install
										</button>
									<?php elseif (!$activated): ?>
										<button class="plugin-button activate" data-action="activate" data-plugin="<?php echo esc_attr($plugin['slug']); ?>" data-plugin_filename="<?php echo esc_attr($plugin['file_name']); ?>" >
											Activate
										</button>
									<?php else: ?>
										<span class="plugin-button plugin-status active">Activated</span>
									<?php endif; ?>

									<?php if (!empty($plugin['pro'])): ?>
										<?php if (!$pro_installed): ?>
											<a href="<?php echo esc_url($plugin['pro']['url']); ?>" class="plugin-button pro" target="_blank">Get Pro</a>
										<?php elseif (!$pro_activated): ?>
											<button class="plugin-button activate-pro" data-action="activate" data-plugin="<?php echo esc_attr($plugin['pro']['slug']); ?>" data-plugin_filename="<?php echo esc_attr($plugin['pro']['file_name']); ?>">
												Activate Pro <span class="loader"></span>
											</button>
										<?php else: ?>
											<span class="plugin-button plugin-status active-pro">Pro Activated</span>
										<?php endif; ?>
									<?php endif; ?>
								</div>
							</div>
							<div class="uacf7-plugin-content">
								<h4><?php echo esc_html($plugin['name']); ?></h4>
								<p><?php echo esc_html($plugin['subtitle']); ?></p>
								<strong></strong>
							</div>
						</div>
					</li>

				<?php endforeach; ?>

			</ul>

			<?php 
		}

		public function beaf_themefic_manage_plugin() {
			check_ajax_referer('themefic_plugin_nonce', 'security');

			if (!current_user_can('install_plugins')) {
				wp_send_json_error('You do not have permission to perform this action.');
			}

			$plugin_slug = isset($_POST['plugin_slug']) ? sanitize_text_field($_POST['plugin_slug']) : '';
			$plugin_filename = isset($_POST['plugin_filename']) ? sanitize_text_field($_POST['plugin_filename']) : '';
			$plugin_action = isset($_POST['plugin_action']) ? sanitize_text_field($_POST['plugin_action']) : '';

			if (!$plugin_slug || !$plugin_action) {
				wp_send_json_error('Invalid request.');
			}

			include_once ABSPATH . 'wp-admin/includes/plugin-install.php';
			include_once ABSPATH . 'wp-admin/includes/class-wp-upgrader.php';
			include_once ABSPATH . 'wp-admin/includes/plugin.php';

			if ($plugin_action === 'install') {
				$api = plugins_api('plugin_information', ['slug' => $plugin_slug]);

				if (is_wp_error($api)) {
					wp_send_json_error($api->get_error_message());
				}

				$upgrader = new Plugin_Upgrader(new WP_Ajax_Upgrader_Skin());
				$install_result = $upgrader->install($api->download_link);

				if (is_wp_error($install_result)) {
					wp_send_json_error($install_result->get_error_message());
				}

				wp_send_json_success(['message' => 'Installed successfully.']);
			}

			if ($plugin_action === 'activate') {
				$plugin_path = WP_PLUGIN_DIR . '/' . $plugin_slug . '/' . $plugin_filename . '.php';

				if (!file_exists($plugin_path)) {
					wp_send_json_error('Plugin file not found.');
				}

				$activate_result = activate_plugin($plugin_path);

				if (is_wp_error($activate_result)) {
					wp_send_json_error($activate_result->get_error_message());
				}

				wp_send_json_success(['message' => 'Activated successfully.']);
			}

			wp_send_json_error('Invalid action.');
		}


		/**
		 * Save Options
		 * @author Foysal
		 */
		public function beaf_save_options() {
 
			// Check if a nonce is valid.
			if ( ! isset( $_POST['beaf_option_nonce'] ) || ! isset( $_POST[ $this->option_id ] ) ) {
				return;
			}

			if ( ! current_user_can( 'manage_options' ) ) {
				wp_die( __( 'You are not allowed to perform this action.', 'bafg' ) );
			}

			// Check nonce
			if ( ! wp_verify_nonce( $_POST['beaf_option_nonce'], 'beaf_option_nonce_action' ) ) {
				return;
			}

			$tf_option_value = array();
			$option_request = ( ! empty( $_POST[ $this->option_id ] ) ) ? $_POST[ $this->option_id ] : array();
			if ( ! empty( $option_request ) && ! empty( $this->option_sections ) ) {
				foreach ( $this->option_sections as $section ) {
					if ( ! empty( $section['fields'] ) ) {

						foreach ( $section['fields'] as $field ) {

							if ( ! empty( $field['id'] ) ) {

								$fieldClass = 'BEAF_' . $field['type'];

								if ( $fieldClass == 'BEAF_tab' ) {
									$data = isset( $option_request[ $field['id'] ] ) ? $option_request[ $field['id'] ] : '';
									foreach ( $field['tabs'] as $tab ) {
										foreach ( $tab['fields'] as $tab_fields ) {
											if ( $tab_fields['type'] == 'repeater' ) {
												foreach ( $tab_fields['fields'] as $key => $tab_field ) {
													if ( isset( $tab_field['validate'] ) && $tab_field['validate'] == 'no_space_no_special' ) {
														$sanitize_data_array = [];
														if ( ! empty( $data[ $tab_fields['id'] ] ) ) {
															foreach ( $data[ $tab_fields['id'] ] as $_key => $datum ) {
																//unique id 3 digit
																$unique_id = substr( uniqid(), -3 );
																$sanitize_data = sanitize_title( str_replace( ' ', '_', strtolower( $datum[ $tab_field['id'] ] ) ) );
																if ( in_array( $sanitize_data, $sanitize_data_array ) ) {
																	$sanitize_data = $sanitize_data . '_' . $unique_id;
																} else {
																	$sanitize_data_array[] = $sanitize_data;
																}

																$data[ $tab_fields['id'] ][ $_key ][ $tab_field['id'] ] = $sanitize_data;
															}
														}
													}
												}
											}
										}
									}
								} else {
									$data = isset( $option_request[ $field['id'] ] ) ? $option_request[ $field['id'] ] : '';
								}

								if ( $fieldClass != 'BEAF_file' ) {
									$data = $fieldClass == 'BEAF_repeater' || $fieldClass == 'BEAF_map' ? serialize( $data ) : $data;
								}


								if ( isset( $_FILES ) && ! empty( $_FILES['file'] ) ) {
									uacf7_print_r( $_FILES );
								
									$tf_upload_dir = wp_upload_dir();
								
									if ( ! empty( $tf_upload_dir['basedir'] ) ) {
										$tf_itinerary_fonts = $tf_upload_dir['basedir'] . '/itinerary-fonts';
								
										if ( ! file_exists( $tf_itinerary_fonts ) ) {
											wp_mkdir_p( $tf_itinerary_fonts );
										}
								
										// Allowed extensions and MIME types
										$allowed_extensions = array( 'ttf', 'otf', 'woff', 'woff2' );
										$allowed_mime_types = array(
											'ttf'   => 'font/ttf',
											'otf'   => 'font/otf',
											'woff'  => 'font/woff',
											'woff2' => 'font/woff2'
										);
								
										for ( $i = 0; $i < count( $_FILES['file']['name'] ); $i++ ) {
											$original_name = $_FILES['file']['name'][ $i ];
											$tmp_name      = $_FILES['file']['tmp_name'][ $i ];
											$type          = $_FILES['file']['type'][ $i ];
								
											$sanitized_name = sanitize_file_name( $original_name );
											$extension      = strtolower( pathinfo( $sanitized_name, PATHINFO_EXTENSION ) );
								
											// Check if file type and extension are allowed
											if ( in_array( $extension, $allowed_extensions, true ) && $type === $allowed_mime_types[ $extension ] ) {
												move_uploaded_file( $tmp_name, $tf_itinerary_fonts . '/' . $sanitized_name );
											}
										}
									}
								}
								

								if ( class_exists( $fieldClass ) ) {
									$_field = new $fieldClass( $field, $data, $this->option_id );
									$tf_option_value[ $field['id'] ] = $_field->sanitize();
								}

							}
						}
					}
				}
			}

			if ( ! empty( $tf_option_value ) ) {
				//                tf_var_dump($tf_option_value);
//                die();
				update_option( $this->option_id, $tf_option_value );
			} else {
				delete_option( $this->option_id );
			}
		}

		/*
		 * Ajax Save Options
		 * @author Foysal
		 */
		public function beaf_ajax_save_options() {
			// Check if the request is valid.
			if ( ! check_ajax_referer( 'beaf_option_nonce_action', 'beaf_option_nonce' ) ) {
				wp_send_json_error( __( 'Invalid request!', 'bafg' ) );
			}
			
			$response = [ 
				'status' => 'error',
				'message' => __( 'Something went wrong!', 'bafg' ),
			];

			if ( ! empty( $_POST['beaf_option_nonce'] ) && wp_verify_nonce( $_POST['beaf_option_nonce'], 'beaf_option_nonce_action' ) ) {
				$this->beaf_save_options();
				$response = [ 
					'status' => 'success',
					'message' => __( 'Options saved successfully!', 'bafg' ),
				];
			}

			echo json_encode( $response );
			wp_die();
		}

		/*
		 * Get current page url
		 * @return string
		 * @author Foysal
		 */
		public function get_current_page_url() {
			$page_url = ( isset( $_SERVER['HTTPS'] ) && $_SERVER['HTTPS'] === 'on' ? "https" : "http" ) . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";

			return $page_url;
		}

		/*
		 * Get query string from url
		 * @return array
		 * @author Foysal
		 */
		public function get_query_string( $url ) {
			$url_parts = parse_url( $url );
			parse_str( $url_parts['query'], $query_string );

			return $query_string;
		}
	}
}
