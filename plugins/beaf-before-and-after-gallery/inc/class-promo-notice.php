<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class bafg_PROMO_NOTICE {

    // private $api_url = 'http://bafg-api.test/';
    private $api_url = 'https://api.themefic.com/';
    private $args = array();
    private $responsed = false; 
    private $bafg_promo_option = false; 
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
    private $plugins_existes = ['uacf7', 'tf', 'ins', 'ebef'];

    public function __construct() {

        $bafg_pro_activated = get_option( 'bafg_pro_activated');
      
        if(in_array(gmdate('F'), $this->months) &&  $bafg_pro_activated != 'true' ){   

            $bafg_promo__schudle_start_from = !empty(get_option( 'bafg_promo__schudle_start_from' )) ? get_option( 'bafg_promo__schudle_start_from' ) : 0;

            if($bafg_promo__schudle_start_from == 0){
                // delete option
                delete_option('bafg_promo__schudle_option');

            }elseif($bafg_promo__schudle_start_from  != 0 && $bafg_promo__schudle_start_from > time()){
                return;
            }  
            
            add_filter('cron_schedules', array($this, 'bafg_custom_cron_interval'));
             
            if (!wp_next_scheduled('bafg_promo__schudle')) {
                wp_schedule_event(time(), 'bafg_every_day', 'bafg_promo__schudle');
            }
            
            add_action('bafg_promo__schudle', array($this, 'bafg_promo__schudle_callback'));
          

            if(get_option( 'bafg_promo__schudle_option' )){
                $this->bafg_promo_option = get_option( 'bafg_promo__schudle_option' );
            }

            $dashboard_banner = isset($this->bafg_promo_option['dashboard_banner']) ? $this->bafg_promo_option['dashboard_banner'] : '';

            // Admin Notice 
            $tf_existes = get_option( 'tf_promo_notice_exists' );
            if( ! in_array($tf_existes, $this->plugins_existes) && is_array($dashboard_banner) && strtotime($dashboard_banner['end_date']) > time() && strtotime($dashboard_banner['start_date']) < time() && $dashboard_banner['enable_status'] == true){
                add_action( 'admin_notices', array( $this, 'bafg_black_friday_2023_admin_notice' ) );
                add_action( 'wp_ajax_bafg_black_friday_notice_dismiss_callback', array($this, 'bafg_black_friday_notice_dismiss_callback') );
            }

            // side Notice Woo Product Meta Box Notice 
            $bafg_woo_existes = get_option( 'bafg_promo_notice_woo_exists' );
            $service_banner = isset($this->bafg_promo_option['service_banner']) ? $this->bafg_promo_option['service_banner'] : array();
            $promo_banner = isset($this->bafg_promo_option['promo_banner']) ? $this->bafg_promo_option['promo_banner'] : array();

            $current_day = date('l'); 
            if(isset($service_banner['enable_status']) && $service_banner['enable_status'] == true && in_array($current_day, $service_banner['display_days'])){ 
             
                $start_date = isset($service_banner['start_date']) ? $service_banner['start_date'] : '';
                $end_date = isset($service_banner['end_date']) ? $service_banner['end_date'] : '';
                $enable_side = isset($service_banner['enable_status']) ? $service_banner['enable_status'] : false;
            }else{  
                $start_date = isset($promo_banner['start_date']) ? $promo_banner['start_date'] : '';
                $end_date = isset($promo_banner['end_date']) ? $promo_banner['end_date'] : '';
                $enable_side = isset($promo_banner['enable_status']) ? $promo_banner['enable_status'] : false;
            } 
             if( is_array($this->bafg_promo_option) && strtotime($end_date) > time() && strtotime($start_date) < time() && $enable_side == true){   
               
                add_action( 'add_meta_boxes', array($this, 'bafg_black_friday_2023_woo_product') );
              
	            add_filter( 'get_user_option_meta-box-order_bafg', array($this, 'metabox_order') );
                add_action( 'wp_ajax_bafg_black_friday_notice_bafg_dismiss_callback', array($this, 'bafg_black_friday_notice_bafg_dismiss_callback') ); 
               
            } 
            
			
            register_deactivation_hook( BAFG_PLUGIN_PATH . 'before-and-after-gallery.php', array($this, 'bafg_promo_notice_deactivation_hook') );
             
            
        }

        
       
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

            $bafg_promo__schudle_option = get_option( 'bafg_promo__schudle_option' ); 
            if(!empty($bafg_promo__schudle_option) && $bafg_promo__schudle_option['notice_name'] != $this->responsed['notice_name']){ 
                // Unset the cookie variable in the current script
                update_option( 'bafg_dismiss_admin_notice', 1);
                update_option( 'bafg_dismiss_post_notice', 1); 
                update_option( 'bafg_promo__schudle_start_from', time() + 43200);
            }elseif(empty($bafg_promo__schudle_option)){
                update_option( 'bafg_promo__schudle_start_from', time() + 43200);
            }
            update_option( 'bafg_promo__schudle_option', $this->responsed);
            
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

    public function bafg_promo__schudle_callback() {  

        $this->bafg_get_api_response();

    }
 

    /**
     * Black Friday Deals 2023
     */
    
    public function bafg_black_friday_2023_admin_notice(){ 
        
        $dashboard_banner = isset($this->bafg_promo_option['dashboard_banner']) ? $this->bafg_promo_option['dashboard_banner'] : '';
        $image_url = isset($dashboard_banner['banner_url']) ? esc_url($dashboard_banner['banner_url']) : '';
        $deal_link = isset($dashboard_banner['redirect_url']) ? esc_url($dashboard_banner['redirect_url']) : ''; 

        $bafg_dismiss_admin_notice = get_option( 'bafg_dismiss_admin_notice' );
        $get_current_screen = get_current_screen();  
        if(($bafg_dismiss_admin_notice == 1  || time() >  $bafg_dismiss_admin_notice ) && $get_current_screen->base == 'dashboard'   ){ 
            // if very fist time then set the dismiss for our other plugbafg
            update_option( 'bafg_promo_notice_exists', 'bafg' );
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
                <?php if( isset($dashboard_banner['dismiss_status']) && $dashboard_banner['dismiss_status'] == true): ?>
                <button type="button" class="notice-dismiss bafg_black_friday_notice_dismiss"><span class="screen-reader-text"><?php echo esc_html(__('Dismiss this notice.', 'bafg' )) ?></span></button>
                <?php  endif; ?>
            </div>
            <script>
                jQuery(document).ready(function($) {
                    $(document).on('click', '.bafg_black_friday_notice_dismiss', function( event ) {
                        jQuery('.bafg_black_friday_20222_admin_notice').css('display', 'none')
                        data = {
                            action : 'bafg_black_friday_notice_dismiss_callback',
                            nonce : '<?php echo wp_create_nonce('bafg_black_friday_notice_dismiss_callback'); ?>'
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
        if ( ! check_ajax_referer( 'bafg_black_friday_notice_dismiss_callback', 'nonce', false ) ) {
            wp_die();
        }

        $bafg_promo_option = get_option( 'bafg_promo__schudle_option' );
        $restart = isset($bafg_promo_option['dashboard_banner']['restart']) && $bafg_promo_option['dashboard_banner']['restart'] != false ? $bafg_promo_option['dashboard_banner']['restart'] : false;  
        if($restart == false){
            update_option( 'bafg_dismiss_admin_notice', strtotime($bafg_promo_option['end_date']) ); 
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
        $service_banner = isset($this->bafg_promo_option['service_banner']) ? $this->bafg_promo_option['service_banner'] : array();
        $promo_banner = isset($this->bafg_promo_option['promo_banner']) ? $this->bafg_promo_option['promo_banner'] : array();

        $current_day = date('l'); 
        if($service_banner['enable_status'] == true && in_array($current_day, $service_banner['display_days'])){ 
           
            $image_url = esc_url($service_banner['banner_url']);
            $deal_link = esc_url($service_banner['redirect_url']);  
            $dismiss_status = $service_banner['dismiss_status'];
        }else{
            $image_url = esc_url($promo_banner['banner_url']);
            $deal_link = esc_url($promo_banner['redirect_url']); 
            $dismiss_status = $promo_banner['dismiss_status'];  
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
                        nonce : '<?php echo wp_create_nonce('bafg_black_friday_notice_bafg_dismiss_callback'); ?>' 
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
        $bafg_promo_option = get_option( 'bafg_promo__schudle_option' );
        $start_date = isset($bafg_promo_option['start_date']) ? strtotime($bafg_promo_option['start_date']) : time();
        $restart = isset($bafg_promo_option['side_restart']) && $bafg_promo_option['side_restart'] != false ? $bafg_promo_option['side_restart'] : 5;
        update_option( 'bafg_dismiss_post_notice', time() + (86400 * $restart) );  
        wp_die();
    }

    // Deactivation Hook
    public function bafg_promo_notice_deactivation_hook() {
        wp_clear_scheduled_hook('bafg_promo__schudle'); 

        delete_option('bafg_promo__schudle_option');
        delete_option('bafg_dismiss_admin_notice');
        delete_option('bafg_dismiss_post_notice');
        delete_option('bafg_promo_notice_exists');
    }
 
}

new bafg_PROMO_NOTICE();
