<?php
// Exit if accessed directly
if (!defined('ABSPATH')) {
	exit();
}
    
class PostType {

    /**
     * Register Slider post type
     */
	public function bafg_image_before_after_foucs_posttype() {
		$beaf_opt = ! empty( get_option( 'beaf_settings' ) ) ? get_option( 'beaf_settings' ) : '';
		$bafg_publicly_queriable = ! empty( $beaf_opt['publicly_queriable'] ) ? $beaf_opt['publicly_queriable'] : '';
		if ( $bafg_publicly_queriable == '1' ) {
			$bafg_publicly_queriable = false;
		} else {
			$bafg_publicly_queriable = true;
		}
		register_post_type( 'bafg',
			array(
				'labels' => array(
					'name' => _x( 'Before and After Slider', 'bafg' ),
					'singular_name' => _x( 'Before and After Slider', 'bafg' ),
					'add_new' => __( 'Add New', 'bafg' ),
					'add_new_item' => __( 'Add New Slider', 'bafg' ),
					'new_item' => __( 'New Slider', 'bafg' ),
					'edit_item' => __( 'Edit Slider', 'bafg' ),
					'view_item' => __( 'View Slider', 'bafg' ),
					'all_items' => __( 'All Sliders', 'bafg' ),
					'search_items' => __( 'Search Sliders', 'bafg' ),
					'not_found' => __( 'No slider found.', 'bafg' ),
					'not_found_in_trash' => __( 'No slider found in Trash.', 'bafg' ),
				),
				'public' => false,
				'publicly_queryable' => apply_filters( 'beaf_publicly_queryable', $bafg_publicly_queriable ),
				'show_ui' => true,
				'exclude_from_search' => true,
				'show_in_nav_menus' => false,
				'has_archive' => false,
				'rewrite' => false,
				'supports' => apply_filters( 'bafg_post_type_supports', array( 'title' ) ),
				'menu_icon' => 'dashicons-format-gallery'
			)
		);

		// Register Custom Taxonomy
		$labels = array(
			'name' => _x( 'Categories', 'Taxonomy General Name', 'bafg' ),
			'singular_name' => _x( 'Category', 'Taxonomy Singular Name', 'bafg' ),
			'menu_name' => __( 'Category', 'bafg' ),
			'all_items' => __( 'All Items', 'bafg' ),
			'parent_item' => __( 'Parent Item', 'bafg' ),
			'parent_item_colon' => __( 'Parent Item:', 'bafg' ),
			'new_item_name' => __( 'New Item Name', 'bafg' ),
			'add_new_item' => __( 'Add New Item', 'bafg' ),
			'edit_item' => __( 'Edit Item', 'bafg' ),
			'update_item' => __( 'Update Item', 'bafg' ),
			'view_item' => __( 'View Item', 'bafg' ),
			'separate_items_with_commas' => __( 'Separate items with commas', 'bafg' ),
			'add_or_remove_items' => __( 'Add or remove items', 'bafg' ),
			'choose_from_most_used' => __( 'Choose from the most used', 'bafg' ),
			'popular_items' => __( 'Popular Items', 'bafg' ),
			'search_items' => __( 'Search Items', 'bafg' ),
			'not_found' => __( 'Not Found', 'bafg' ),
			'no_terms' => __( 'No items', 'bafg' ),
			'items_list' => __( 'Items list', 'bafg' ),
			'items_list_navigation' => __( 'Items list navigation', 'bafg' ),
		);

		$args = array(
			'labels' => $labels,
			'hierarchical' => true,
			'public' => true,
			'show_ui' => true,
			'show_admin_column' => true,
			'show_in_nav_menus' => true,
			'show_tagcloud' => true,
		);

		register_taxonomy( 'bafg_gallery', array( 'bafg' ), $args );

	}

	public function bafg_add_slider_metabox(){
		add_meta_box('bafg_shortcode_metabox','Shortcode', array($this, 'bafg_shortcode_callback'),'bafg','side','high'); 
	}

	//Metabox shortcode
	public function bafg_shortcode_callback(){
		$bafg_scode = isset($_GET['post']) ? '[bafg id="'.$_GET['post'].'"]' : '';
		?>
		<input type="text" name="bafg_display_shortcode" class="bafg_display_shortcode" value="<?php echo esc_attr($bafg_scode); ?>" readonly >
		<?php
	}

}