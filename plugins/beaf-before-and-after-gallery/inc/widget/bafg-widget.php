<?php
 
class bafg_widget extends WP_Widget {
 
    function __construct() {
 
        parent::__construct(
            'bafg_widget',  // Base ID
            'BEAF Slider'   // Name
        );
 
        add_action( 'widgets_init', function() {
            register_widget( 'bafg_widget' );
        });
 
    }
 
    public $args = array(
        'before_title'  => '<h4 class="widgettitle">',
        'after_title'   => '</h4>',
        'before_widget' => '<div class="widget-wrap">',
        'after_widget'  => '</div>'
    );
 
    public function widget( $args, $instance ) {
 
        echo wp_kses_post($args['before_widget']);
 
        if ( ! empty( $instance['title'] ) ) {
            echo wp_kses_post($args['before_title']) . esc_html(apply_filters( 'widget_title', $instance['title'] )) . wp_kses_post($args['after_title']);
        }
 
        echo '<div class="textwidget">';
 		
		if( !empty($instance['bafg_shortcode']) ) {
			 $shortcode = trim( $instance['bafg_shortcode'] );

            // Allow only shortcodes, no HTML
            if ( preg_match( '/^\[\s*(\w+)([^\]]*)\]$/', $shortcode ) ) {
                echo do_shortcode( $shortcode );
            } else {
                echo esc_html( $shortcode );
            }
			
		}else {
			
			echo do_shortcode('[bafg id="'.$instance['bafg_post_id'].'"]');
		}
 
        echo '</div>';
        echo wp_kses_post($args['after_widget']);
 
    }
 
    public function form( $instance ) {
 
        $title          = ! empty( $instance['title'] ) ? $instance['title'] : '';
        $bafg_post_id   = ! empty( $instance['bafg_post_id'] ) ? $instance['bafg_post_id'] : '';
        $bafg_shortcode = ! empty( $instance['bafg_shortcode'] ) ? $instance['bafg_shortcode'] : '';
        ?>
        <p>
        <label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php echo esc_html__( 'Title:', 'bafg' ); ?></label>
            <input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text" value="<?php echo esc_attr( $title ); ?>">
        </p>
        <p>
            <label for="<?php echo esc_attr( $this->get_field_id( 'bafg_post_id' ) ); ?>"><?php echo esc_html__( 'Select Slider:', 'bafg' ); ?></label>
            
            <?php
            $bafg_list = get_posts(array(
                'post_type' => 'bafg',
                'showposts' => 999,
            ));
            ?>
            
            <select class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'bafg_post_id' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'bafg_post_id' ) ); ?>">
                <option><?php echo esc_html__('Select a Slider', 'bafg'); ?></option>
                <?php
				
				if (!empty($bafg_list) && !is_wp_error($bafg_list)) {
					foreach ($bafg_list as $post) {
						?>
						<option value="<?php echo esc_attr($post->ID); ?>" <?php selected($post->ID, $bafg_post_id); ?>><?php echo esc_html__($post->post_title, 'bafg' ); ?></option>
						<?php
					}
				}
				?>
            </select>
        </p>
        <p><label><?php echo esc_html__( 'Or:', 'bafg' ); ?></label></p>
        <p>
        	<label for="<?php echo esc_attr( $this->get_field_id( 'bafg_shortcode' ) ); ?>"><?php echo esc_html__( 'Enter Shortcode:', 'bafg' ); ?></label>

            <input class="widefat" type="text" id="<?php echo esc_attr( $this->get_field_id( 'bafg_shortcode' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'bafg_shortcode' ) ); ?>" value="<?php echo esc_attr($bafg_shortcode); ?>">
        </p>
        <?php
 
    }
 
    public function update( $new_instance, $old_instance ) {
 
        $instance = array();
 
        $instance['title']          = ( !empty( $new_instance['title'] ) ) ? wp_strip_all_tags( $new_instance['title'] ) : '';
        $instance['bafg_post_id']   = ( !empty( $new_instance['bafg_post_id'] ) ) ? $new_instance['bafg_post_id'] : '';
        $instance['bafg_shortcode'] = ( !empty( $new_instance['bafg_shortcode'] ) ) ? $new_instance['bafg_shortcode'] : '';
 
        return $instance;
    }
 
}
$my_widget = new bafg_widget();