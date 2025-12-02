<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class bafg_SIDEBAR_BANNER {

    // private $api_url = 'http://bafg-api.test/';
    private $api_url = 'https://api.themefic.com/';
    private $args = array();
    private $responsed = false; 
    private $bafg_sidebar_banner_option = false; 
    private $error_message = ''; 

    private $months = [
        'January',  
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
    ];
    private $plugins_existes = ['uacf7', 'tf', 'ins', 'ebef', 'uawpf', 'hydra'];

    public function __construct() {

        $bafg_pro_activated = get_option( 'bafg_pro_activated');
      
        if(in_array(gmdate('F'), $this->months) &&  $bafg_pro_activated != 'true' ){   

            $bafg_promo__schudle_start_from = !empty(get_option( 'bafg_promo__schudle_start_from' )) ? get_option( 'bafg_promo__schudle_start_from' ) : 0;

            if($bafg_promo__schudle_start_from == 0){
                // delete option
                delete_option('bafg_sidebar_banner__schedule_option');

            }elseif($bafg_promo__schudle_start_from  != 0 && $bafg_promo__schudle_start_from > time()){
                return;
            }
            
            add_filter('cron_schedules', array($this, 'bafg_custom_cron_interval'));
            
            if (!wp_next_scheduled('bafg_sidebar_banner__schedule')) {
                wp_schedule_event(time(), 'bafg_every_day', 'bafg_sidebar_banner__schedule');
            }
            
            add_action('bafg_sidebar_banner__schedule', array($this, 'bafg_sidebar_banner__schedule_callback'));
          

            if(get_option( 'bafg_sidebar_banner__schedule_option' )){
                $this->bafg_sidebar_banner_option = get_option( 'bafg_sidebar_banner__schedule_option' );
            } 
             

            $dashboard_banner = isset($this->bafg_sidebar_banner_option['dashboard_banner']) ? $this->bafg_sidebar_banner_option['dashboard_banner'] : '';

            // Admin Notice 
            $tf_existes = get_option( 'tf_promo_notice_exists' );
            if( ! in_array($tf_existes, $this->plugins_existes) && is_array($dashboard_banner) && strtotime($dashboard_banner['end_date']) > time() && strtotime($dashboard_banner['start_date']) < time() && $dashboard_banner['enable_status'] == true){
                add_action( 'admin_notices', array( $this, 'bafg_black_friday_2023_admin_notice' ) );
                add_action( 'wp_ajax_bafg_black_friday_notice_dismiss_callback', array($this, 'bafg_black_friday_notice_dismiss_callback') );
            }

            // side Notice Woo Product Meta Box Notice 
            $bafg_woo_existes = get_option( 'bafg_promo_notice_woo_exists' );
            $service_banner = isset($this->bafg_sidebar_banner_option['service_banner']) ? $this->bafg_sidebar_banner_option['service_banner'] : array();
            $sidebar_banner = isset($this->bafg_sidebar_banner_option['promo_banner']) ? $this->bafg_sidebar_banner_option['promo_banner'] : array();
            $current_day = date('l');
            if(isset($service_banner['enable_status']) && $service_banner['enable_status'] == true && in_array($current_day, $service_banner['display_days'])){ 
             
                $start_date = isset($service_banner['start_date']) ? $service_banner['start_date'] : '';
                $end_date = isset($service_banner['end_date']) ? $service_banner['end_date'] : '';
                $enable_side = isset($service_banner['enable_status']) ? $service_banner['enable_status'] : false;
            }else{  
                $start_date = isset($sidebar_banner['start_date']) ? $sidebar_banner['start_date'] : '';
                $end_date = isset($sidebar_banner['end_date']) ? $sidebar_banner['end_date'] : '';
                $enable_side = isset($sidebar_banner['enable_status']) ? $sidebar_banner['enable_status'] : false;
            }

            if( is_array($this->bafg_sidebar_banner_option) && strtotime($end_date) > time() && strtotime($start_date) < time() && $enable_side == true){   
               
                add_action( 'add_meta_boxes', array($this, 'bafg_black_friday_2023_woo_product') );
              
	            add_filter( 'get_user_option_meta-box-order_bafg', array($this, 'metabox_order') );
                add_action( 'wp_ajax_bafg_black_friday_notice_bafg_dismiss_callback', array($this, 'bafg_black_friday_notice_bafg_dismiss_callback') ); 
               
            }

            $tf_widget_exists = get_option('tf_promo_widget_exists');
            $dashboard_widget = isset($this->bafg_sidebar_banner_option['dashboard_widget']) ? $this->bafg_sidebar_banner_option['dashboard_widget'] : [];
            if (
                !in_array($tf_widget_exists, $this->plugins_existes) && 
                isset($dashboard_widget['enable_status']) && 
                $dashboard_widget['enable_status'] == true
            ) {
                // Mark that one Themefic widget already exists
                update_option('tf_promo_widget_exists', 'beaf');

                add_action('wp_dashboard_setup', [$this, 'register_dashboard_notice_widget']);
                add_action('wp_ajax_bafg_dashboard_widget_dismiss', [$this, 'bafg_dashboard_widget_dismiss']);
            }
			
            register_deactivation_hook( BAFG_PLUGIN_PATH . 'before-and-after-gallery.php', array($this, 'bafg_promo_notice_deactivation_hook') );
             
            
        }

        
       
    }


    public function register_dashboard_notice_widget() {

        $dashboard_banner = isset($this->bafg_sidebar_banner_option['dashboard_widget'])
        ? $this->bafg_sidebar_banner_option['dashboard_widget']
        : [];

        // Use API title if available, otherwise fallback
        $widget_title = !empty($dashboard_banner['title'])
        ? esc_html($dashboard_banner['title'])
        : __('Themefic Deals & Services', 'bafg');


		wp_add_dashboard_widget(
			'bafg_promo_dashboard_widget',
			$widget_title,
			[$this, 'render_dashboard_notice_widget'],
            null, null, 'side', 'high'
		);
	}

    public function render_dashboard_notice_widget() {
        $dashboard_widget = isset($this->bafg_sidebar_banner_option['dashboard_widget']) ? $this->bafg_sidebar_banner_option['dashboard_widget'] : [];

        if (empty($dashboard_widget) || empty($dashboard_widget['enable_status'])) {
            echo '<p>' . esc_html__('No active widget promotion.', 'bafg') . '</p>';
            return;
        }

        $highlight = isset($dashboard_widget['highlight']) ? $dashboard_widget['highlight'] : [];
        $links     = isset($dashboard_widget['links']) ? $dashboard_widget['links'] : [];
        $footer    = isset($dashboard_widget['footer']) ? $dashboard_widget['footer'] : [];

        ?>
        <div class="bafg-dashboard-widget" style="position:relative;">
            <?php if (!empty($dashboard_widget['dismiss_status'])) : ?>
                <button type="button" class="notice-dismiss bafg-dashboard-dismiss" style="position:absolute; top:10px; right:10px;"></button>
            <?php endif; ?>

            <?php if (!empty($highlight)) : ?>
                <div class="highlight">
                    <?php if (!empty($highlight['before_image'])) : ?>
                        <img class="before-img" src="<?php echo esc_url($highlight['before_image']); ?>" style="max-width:100%; height:auto;" alt="">
                    <?php endif; ?>
                    <div class="content">
                        <?php if (!empty($highlight['title'])) : ?>
                        <p style="font-weight:600; margin:5px 0;"><?php echo esc_html($highlight['title']); ?></p>
                        <?php endif; ?>
                        <?php if (!empty($highlight['button_text']) && !empty($highlight['button_url'])) : ?>
                            <a href="<?php echo esc_url($highlight['button_url']); ?>" target="_blank" class="button button-primary"><?php echo esc_html($highlight['button_text']); ?></a>
                        <?php endif; ?>
                    </div>
                     <?php if (!empty($highlight['after_image'])) : ?>
                        <img class="after-img" src="<?php echo esc_url($highlight['after_image']); ?>" style="max-width:100%; height:auto;" alt="">
                    <?php endif; ?>
                </div>
            <?php endif; ?>

            <?php if (!empty($links)) : ?>
                <ul>
                    <?php foreach ($links as $link) : ?>
                        <li>
                            <a href="<?php echo esc_url($link['url']); ?>" target="_blank">
                                <?php if (!empty($link['tag'])) echo ' <span class="new-tag">' . esc_html($link['tag']) . '</span>'; ?>
                                <?php echo esc_html($link['text']); ?>
                            </a>
                        </li>
                    <?php endforeach; ?>
                </ul>
            <?php endif; ?>

            <?php if (!empty($footer)) : ?>
                <div class="footer" style="display:flex; justify-content:space-between; margin-top:15px; font-size:13px;">
                    <?php if (!empty($footer['left'])) : ?>
                        <a href="<?php echo esc_url($footer['left']['url']); ?>" target="_blank"><?php echo esc_html($footer['left']['text']); ?>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 0H6.66667V1.25H10.3667L5.39167 6.225L6.275 7.10833L11.25 2.13333V5.83333H12.5V0ZM1.66667 0.833333C1.22464 0.833333 0.800716 1.00893 0.488155 1.32149C0.175595 1.63405 0 2.05797 0 2.5V10.8333C0 11.2754 0.175595 11.6993 0.488155 12.0118C0.800716 12.3244 1.22464 12.5 1.66667 12.5H10C10.442 12.5 10.8659 12.3244 11.1785 12.0118C11.4911 11.6993 11.6667 11.2754 11.6667 10.8333V8.33333H10.4167V10.8333C10.4167 10.9438 10.3728 11.0498 10.2946 11.128C10.2165 11.2061 10.1105 11.25 10 11.25H1.66667C1.55616 11.25 1.45018 11.2061 1.37204 11.128C1.2939 11.0498 1.25 10.9438 1.25 10.8333V2.5C1.25 2.38949 1.2939 2.28351 1.37204 2.20537C1.45018 2.12723 1.55616 2.08333 1.66667 2.08333H4.16667V0.833333H1.66667Z" fill="#2271B1"/>
                        </svg>
                        </a>
                    <?php endif; ?>
                    <?php if (!empty($footer['right'])) : ?>
                        <a href="<?php echo esc_url($footer['right']['url']); ?>" target="_blank"><?php echo esc_html($footer['right']['text']); ?>
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12.5 0H6.66667V1.25H10.3667L5.39167 6.225L6.275 7.10833L11.25 2.13333V5.83333H12.5V0ZM1.66667 0.833333C1.22464 0.833333 0.800716 1.00893 0.488155 1.32149C0.175595 1.63405 0 2.05797 0 2.5V10.8333C0 11.2754 0.175595 11.6993 0.488155 12.0118C0.800716 12.3244 1.22464 12.5 1.66667 12.5H10C10.442 12.5 10.8659 12.3244 11.1785 12.0118C11.4911 11.6993 11.6667 11.2754 11.6667 10.8333V8.33333H10.4167V10.8333C10.4167 10.9438 10.3728 11.0498 10.2946 11.128C10.2165 11.2061 10.1105 11.25 10 11.25H1.66667C1.55616 11.25 1.45018 11.2061 1.37204 11.128C1.2939 11.0498 1.25 10.9438 1.25 10.8333V2.5C1.25 2.38949 1.2939 2.28351 1.37204 2.20537C1.45018 2.12723 1.55616 2.08333 1.66667 2.08333H4.16667V0.833333H1.66667Z" fill="#2271B1"/>
                        </svg>
                        </a>
                    <?php endif; ?>
                </div>
            <?php endif; ?>
        </div>

        <style>
            .bafg-dashboard-widget {
                background: #fff;
                border-radius: 4px;
                padding: 0;
                font-family: Arial, sans-serif;
                font-size: 13px;
                color: #23282d;
            }

            .bafg-dashboard-widget .header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background: #f8f9fa;
                padding: 14px;
                border-bottom: 1px solid #ddd;
            }

            .bafg-dashboard-widget .highlight {
                display: flex;
                align-items: center;
                justify-content: space-between;
                background-color: #fff;
                border-bottom:1px solid #ccd0d4; 
                padding:12px 0px; 
                margin-bottom:8px; 
                text-align:left;
                gap: 10px;
                padding-top: 0px;
            }

            .bafg-dashboard-widget .highlight .before-img {
                width: 58px;
                height: 58px;
                flex: 0 0 58px;
            }
            .bafg-dashboard-widget .highlight .after-img {
                width: 100px;
                height: 60px;
            }
            .bafg-dashboard-widget .highlight .content {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                flex-direction: column;
                flex: 1;
                width: 100%;
            }
            .bafg-dashboard-widget .highlight .content p{
                color: #1D2327;
                font-family: "Roboto", sans-serif;
                font-size: 13px;
                font-weight: 500;
                line-height: 19.6px;
            }
            .bafg-dashboard-widget .highlight .content .button{
                height: 30px;
                color: #FFF;
                font-family: "Roboto", sans-serif;
                font-size: 13px;
                font-weight: 500;
                border-radius: 3px;
                background: #2271B1;
            }

            .bafg-dashboard-widget ul li a {
                color: #2271B1;
                font-family: "Roboto", sans-serif;
                font-size: 13px;
                font-weight: 400;
                line-height: 120%;
            }

            .bafg-dashboard-widget .new-tag {
                padding: 3px 6px;
                border-radius: 3px;
                background-color: #0A875A;
                font-family: "Roboto", sans-serif;
                font-size: 10.5px;
                font-weight: 500;
                line-height: 12.6px;
                line-height: 12.6px;
                color: #fff;
                text-transform: uppercase;
            }

            .bafg-dashboard-widget .footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                border-top: 1px solid #ddd;
                padding: 10px 0px;
                background: #fff;
            }

            .bafg-dashboard-widget .footer a {
                text-decoration: none;
                font-weight: 500;
                color: #2271B1;
                font-family: "Roboto", sans-serif;
                font-size: 13px;
                font-weight: 400;
                line-height: 15.6px;
            }

            .bafg-dashboard-widget .footer a svg {
                padding-left: 4px;
            }

        </style>

        <script>
        jQuery(document).ready(function($){
            $(document).on('click', '.bafg-dashboard-dismiss', function(){
                $(this).closest('.bafg-dashboard-widget').fadeOut(300);
                $.post(ajaxurl, { action: 'bafg_dashboard_widget_dismissed' });
            });
        });
        </script>
        <?php
    }

    public function bafg_dashboard_widget_dismiss() {
        // Dismiss control - 7 days
		update_option('bafg_dashboard_widget_dismissed', time() + (86400 * 7));
		wp_die();
	}


    public function bafg_get_api_response(){
        $query_params = array(
            'plugin' => 'bafg', 
        );
        $response = wp_remote_post($this->api_url, array(
            'body'    => json_encode($query_params),
            'headers' => array('Content-Type' => 'application/json'),
        )); 
        if (is_wp_error($response)) {
            // Handle API request error
            $this->responsed = false;
            $this->error_message = esc_html__($response->get_error_message(), 'bafg');
 
        } else {
            // API request successful, handle the response content
            $data = wp_remote_retrieve_body($response);
           
            $this->responsed = json_decode($data, true);

            $bafg_sidebar_banner__schedule_option = get_option( 'bafg_sidebar_banner__schedule_option' ); 
            if(!empty($bafg_sidebar_banner__schedule_option) && $bafg_sidebar_banner__schedule_option['notice_name'] != $this->responsed['notice_name']){ 
                // Unset the cookie variable in the current script
                update_option( 'bafg_dismiss_admin_notice', 1);
                update_option( 'bafg_dismiss_post_notice', 1); 
                update_option( 'bafg_promo__schudle_start_from', time() + 43200);
            }elseif(empty($bafg_sidebar_banner__schedule_option)){
                update_option( 'bafg_promo__schudle_start_from', time() + 43200);
            }
            update_option( 'bafg_sidebar_banner__schedule_option', $this->responsed);
            
        } 
    }

    // Define the custom interval
    public function bafg_custom_cron_interval($schedules) {
        $schedules['bafg_every_day'] = array(
            'interval' => 86400, // Every 24 hours
            // 'interval' => 5, // Every 24 hours
            'display' => __('Every 24 hours')
        );
        return $schedules;
    }

    public function bafg_sidebar_banner__schedule_callback() {  

        $this->bafg_get_api_response();

    }
 

    /**
     * Black Friday Deals 2023
     */
    
    public function bafg_black_friday_2023_admin_notice(){ 
        
        $dashboard_banner = isset($this->bafg_sidebar_banner_option['dashboard_banner']) ? $this->bafg_sidebar_banner_option['dashboard_banner'] : '';
        $image_url = isset($dashboard_banner['banner_url']) ? esc_url($dashboard_banner['banner_url']) : '';
        $deal_link = isset($dashboard_banner['redirect_url']) ? esc_url($dashboard_banner['redirect_url']) : ''; 

        $bafg_dismiss_admin_notice = get_option( 'bafg_dismiss_admin_notice' );
        $get_current_screen = get_current_screen();  
        if(($bafg_dismiss_admin_notice == 1  || time() >  $bafg_dismiss_admin_notice ) && $get_current_screen->base == 'dashboard'   ){ 
            // if very fist time then set the dismiss for our other plugbafg
            update_option( 'bafg_sidebar_banner_notice_exists', 'bafg' );
            ?>
            <style> 
                .bafg_black_friday_20222_admin_notice a:focus {
                    box-shadow: none;
                } 
                .bafg_black_friday_20222_admin_notice {
                    padding: 7px;
                    position: relative;
                    z-index: 10;
                    max-width: 825px;
                } 
                .bafg_black_friday_20222_admin_notice button:before {
                    color: #fff !important;
                }
                .bafg_black_friday_20222_admin_notice button:hover::before {
                    color: #d63638 !important;
                }
                
            </style>
            <div class="notice notice-success bafg_black_friday_20222_admin_notice"> 
                <a href="<?php echo esc_attr( $deal_link ); ?>" style="display: block; line-height: 0;" target="_blank" >
                    <img  style="width: 100%;" src="<?php echo esc_attr($image_url) ?>" alt="">
                </a> 
                <?php if( isset($this->bafg_sidebar_banner_option['dasboard_dismiss']) && $this->bafg_sidebar_banner_option['dasboard_dismiss'] == true): ?>
                <button type="button" class="notice-dismiss bafg_black_friday_notice_dismiss"><span class="screen-reader-text"><?php echo esc_html(__('Dismiss this notice.', 'bafg' )) ?></span></button>
                <?php  endif; ?>
            </div>
            <script>
                jQuery(document).ready(function($) {
                    $(document).on('click', '.bafg_black_friday_notice_dismiss', function( event ) {
                        jQuery('.bafg_black_friday_20222_admin_notice').css('display', 'none')
                        data = {
                            action : 'bafg_black_friday_notice_dismiss_callback',
                        };

                        $.ajax({
                            url: ajaxurl,
                            type: 'post',
                            data: data,
                            success: function (data) { ;
                            },
                            error: function (data) { 
                            }
                        });
                    });
                });
            </script>
        
        <?php 
        }
        
    } 


    public function bafg_black_friday_notice_dismiss_callback() {  

        $bafg_sidebar_banner_option = get_option( 'bafg_sidebar_banner__schedule_option' );
        $restart = isset($bafg_sidebar_banner_option['dasboard_restart']) && $bafg_sidebar_banner_option['dasboard_restart'] != false ? $bafg_sidebar_banner_option['dasboard_restart'] : false; 
        if($restart == false){
            update_option( 'bafg_dismiss_admin_notice', strtotime($bafg_sidebar_banner_option['end_date']) ); 
        }else{
            update_option( 'bafg_dismiss_admin_notice', time() + (86400 * $restart) );  
        } 
		wp_die();
	}


    /**
     * Black Friday Deals 2023 woo product
     */ 

    public function bafg_black_friday_2023_woo_product() { 
        $bafg_dismiss_post_notice = get_option( 'bafg_dismiss_post_notice' ); 
        if($bafg_dismiss_post_notice == 1  || time() >  $bafg_dismiss_post_notice ): 
            add_meta_box( 'bafg_black_friday_annous', ' ', array($this, 'bafg_black_friday_2023_callback_woo_product'), 'bafg', 'side', 'high' );
        endif;
   
    }
    public function bafg_black_friday_2023_callback_woo_product() {
        $service_banner = isset($this->bafg_sidebar_banner_option['service_banner']) ? $this->bafg_sidebar_banner_option['service_banner'] : array();
        $sidebar_banner = isset($this->bafg_sidebar_banner_option['promo_banner']) ? $this->bafg_sidebar_banner_option['promo_banner'] : array();

        $current_day = date('l'); 
        if($service_banner['enable_status'] == true && in_array($current_day, $service_banner['display_days'])){ 
           
            $image_url = esc_url($service_banner['banner_url']);
            $deal_link = esc_url($service_banner['redirect_url']);  
            $dismiss_status = $service_banner['dismiss_status'];
        }else{
            $image_url = esc_url($sidebar_banner['banner_url']);
            $deal_link = esc_url($sidebar_banner['redirect_url']); 
            $dismiss_status = $sidebar_banner['dismiss_status'];
        }
      ?>
        <style>
            #bafg_black_friday_annous{
                border: 0px solid;
                box-shadow: none;
                background: transparent;
            }
            .back_friday_2023_preview a:focus {
                box-shadow: none;
            }

            .back_friday_2023_preview a {
                display: inline-block;
            }

            #bafg_black_friday_annous .bafgide {
                padding: 0;
                margin-top: 0;
            }

            #bafg_black_friday_annous .postbox-header {
                display: none;
                visibility: hidden;
            }
            #bafg_black_friday_annous .inside{
                padding: 0px !important;
            }
        </style> 
     
        <div class="back_friday_2023_preview bafg-bf-preview" style="text-align: center; overflow: hidden;">
            <a href="<?php echo esc_attr($deal_link); ?>" target="_blank" >
                <img  style="width: 100%;" src="<?php echo esc_attr($image_url); ?>" alt="">
            </a>  
            <?php if( isset($dismiss_status) && $dismiss_status == true): ?>
                    <button type="button" class="notice-dismiss bafg_friday_notice_dismiss"><span class="screen-reader-text">Dismiss this notice.</span></button>
            <?php  endif; ?>
          
        </div>
        <script> 
            jQuery(document).ready(function($) {
                $(document).on('click', '.bafg_friday_notice_dismiss', function( event ) { 
                    jQuery('.bafg-bf-preview').css('display', 'none');
                    data = {
                        action : 'bafg_black_friday_notice_bafg_dismiss_callback', 
                    };

                    $.ajax({
                        url: ajaxurl,
                        type: 'post',
                        data: data,
                        success: function (data) { ;
                        },
                        error: function (data) { 
                        }
                    });
                });
            });
        </script>
        <?php 
    }

    public function metabox_order( $order ) {
		return array(
			'side' => join( 
				",", 
				array(       // vvv  Arrange here as you desire
					'submitdiv',
					'bafg_black_friday_annous',
				)
			),
		);
	}

    public  function bafg_black_friday_notice_bafg_dismiss_callback() {   
        $bafg_sidebar_banner_option = get_option( 'bafg_sidebar_banner__schedule_option' );
        $start_date = isset($bafg_sidebar_banner_option['start_date']) ? strtotime($bafg_sidebar_banner_option['start_date']) : time();
        $restart = isset($bafg_sidebar_banner_option['side_restart']) && $bafg_sidebar_banner_option['side_restart'] != false ? $bafg_sidebar_banner_option['side_restart'] : 5;
        update_option( 'bafg_dismiss_post_notice', time() + (86400 * $restart) );  
        wp_die();
    }

    // Deactivation Hook
    public function bafg_promo_notice_deactivation_hook() {
        wp_clear_scheduled_hook('bafg_sidebar_banner__schedule'); 

        delete_option('bafg_sidebar_banner__schedule_option');
        delete_option('bafg_dismiss_admin_notice');
        delete_option('bafg_dismiss_post_notice');
        delete_option('bafg_sidebar_banner_notice_exists');
        delete_option('tf_promo_widget_exists');
    }
 
}

new bafg_SIDEBAR_BANNER();
