<?php
namespace ElementorBafg\Widgets;

use Elementor\Widget_Base;
use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

/**
 * Elementor BEAF Slider
 *
 * Elementor widget for BEAF Slider.
 *
 */
class BAFG_Slider extends Widget_Base {

	/**
	 * Retrieve the widget name.
	 *
	 * @access public
	 *
	 * @return string Widget name.
	 */
	public function get_name() {
		return 'beaf-slider';
	}

	/**
	 * Retrieve the widget title.
	 *
	 * @access public
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return __( 'BEAF Slider', 'bafg' );
	}

	/**
	 * Retrieve the widget icon.
	 *
	 * @access public
	 *
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return 'eicon-image-before-after';
	}

	/**
	 * Retrieve the list of categories the widget belongs to.
	 *
	 * Used to determine where to display the widget in the editor.
	 *
	 * Note that currently Elementor supports only one category.
	 * When multiple categories passed, Elementor uses the first one.
	 *
	 * @access public
	 *
	 * @return array Widget categories.
	 */
	public function get_categories() {
		return [ 'general' ];
	}

	/**
	 * Retrieve the list of scripts the widget depended on.
	 *
	 * Used to set scripts dependencies required to run the widget.
	 *
	 * @access public
	 *
	 * @return array Widget scripts dependencies.
	 */
	public function get_script_depends() {
		return [ 'bafg' ];
	}

	/**
	 * Register the widget controls.
	 *
	 * Adds different input fields to allow the user to change and customize the widget settings.
	 *
	 * @access protected
	 */
	protected function _register_controls() {
        
		$this->start_controls_section(
			'section_content',
			[
				'label' => __( 'Content', 'bafg' ),
			]
		);
        
        $this->add_control(
			'bafg_slide',
			[
				'label' => __( 'Select slider', 'bafg' ),
				'type' => \Elementor\Controls_Manager::SELECT,
				'options' => $this->get_bafg_list(),
			]
		);

		$this->end_controls_section();

	}

	/**
	 * Render the widget output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @access protected
	 */
	protected function render() {
		$settings = $this->get_settings_for_display();
        
        if( !empty($settings['bafg_slide']) ){
            echo do_shortcode('[bafg id="'.$settings['bafg_slide'].'"]');
        }

        if (is_admin()){
        ?>
        <script>
            jQuery(".bafg-twentytwenty-container").each(function () {if (jQuery(this).attr('bafg-move-slider-on-hover') == 'no') {var moveSliderHover = false;} else {var moveSliderHover = true;}if (jQuery(this).attr('bafg-overlay') == 'yes') {var overlay = false;} else {var overlay = true;}if (jQuery(this).attr('bafg-click-to-move') == 'no') {var clickToMove = false;} else {var clickToMove = true;}jQuery(this).twentytwenty({orientation: jQuery(this).attr('bafg-orientation'),default_offset_pct: jQuery(this).attr('bafg-default-offset'),before_label: jQuery(this).attr('bafg-before-label'),after_label: jQuery(this).attr('bafg-after-label'),no_overlay: overlay,move_slider_on_hover: moveSliderHover,click_to_move: clickToMove});});jQuery(".twentytwenty-wrapper .design-1 .twentytwenty-handle").wrapInner("<div class='handle-trnasf' />");jQuery(window).on('load', function () {jQuery(document).resize();});
        </script>
        <?php
        }
	}

	public function get_bafg_list(){
		$options = array();

		$bafg_list = get_posts(array(
			'post_type' => 'bafg',
			'showposts' => 999,
		));
		$options[0] = esc_html__('Select a Slider', 'bafg');
		if (!empty($bafg_list) && !is_wp_error($bafg_list)) {
			foreach ($bafg_list as $post) {
				$options[$post->ID] = $post->post_title;
			}
		} else {
			$options[0] = esc_html__('Create a Slide First', 'bafg');
		}
		return $options;
	}

}
