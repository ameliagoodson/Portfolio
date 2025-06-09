/*
 * Metabox tab script
 */
function bafg_option_tab(evt, cityName) {
    var i, bafg_tabcontent, bafg_tablinks;
    bafg_tabcontent = document.getElementsByClassName("bafg-tabcontent");
    for (i = 0; i < bafg_tabcontent.length; i++) {
        bafg_tabcontent[i].style.display = "none";
    }
    bafg_tablinks = document.getElementsByClassName("bafg-tablinks");
    for (i = 0; i < bafg_tablinks.length; i++) {
        bafg_tablinks[i].className = bafg_tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

jQuery(document).ready(function ($) {
    $('.bafg_display_shortcode').on('click', function () {

        var copyText = this;

        if (copyText.value != '') {
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand("copy");

            var elem = document.getElementById("bafg_copy");
            elem.style.right = '0px';

            var time = 0;
            var id = setInterval(copyAlert, 10);

            function copyAlert() {
                if (time == 200) {
                    clearInterval(id);
                    elem.style.display = 'none';
                } else {
                    time++;
                    elem.style.display = 'block';
                }
            }
        }

    });

    /**
     * Sets the conditional fields for the video type.
     *
     * @since 1.0.0
     * @return void
     */
    function bafg_video_type_conditional_fields() {
        let videoType = $('.bafg-row-slider-video-type').find(':selected').val();
        let sliderMethod = $('input:radio[name=bafg_before_after_method]:checked').val();
        if (sliderMethod == 'method_4' && videoType == 'youtube') {
            $('.bafg-row-before-after-yt-video').show();
            $('.bafg-row-before-after-vimeo-video').hide();
            $('.bafg-row-bef-aft-self-video').hide();
        } else if (sliderMethod == 'method_4' && videoType == 'vimeo') {
            $('.bafg-row-before-after-yt-video').hide();
            $('.bafg-row-bef-aft-self-video').hide();
            $('.bafg-row-before-after-vimeo-video').show();
        } else if (sliderMethod == 'method_4' && videoType == 'self') {
            $('.bafg-row-before-after-yt-video').hide();
            $('.bafg-row-before-after-vimeo-video').hide();
            $('.bafg-row-bef-aft-self-video').show();
        }
    }
    /*
    Conditional fields
    */
    function bafg_before_after_method_conditional_field() {
        var bafg_before_after_method = jQuery('input:radio[name=bafg_before_after_method]:checked').val();
        if (bafg_before_after_method == 'method_2') {
            jQuery('.bafg-fade,.bafg-slider-alignment,.bafg-row-no-overlay,.bafg-row-click-to-move,.bafg_move_slider_on_hover,.bafg_on_scroll_slide,.bafg_auto_slide,.bafg_option_label,.bafg-row-offset,.bafg-row-beaf-style,.bafg_filter_apply,.bafg_filter_style,.bafg-row-orientation, .bafg-row-template-style, .bafg-row-before-after-image, .bafg_filter_style, .bafg_filter_apply, .bafg-row-before-image, .bafg-row-after-image').show();
            jQuery('.bafg-mid-label-color,.bafg-mid-label-bg,.bafg-row-mid-label,.bafg-row-before-image, .bafg-row-after-image, .bafg-row-first-image,.bafg-row-second-image, .bafg-row-third-image, .bafg-row-before-after-yt-video, .bafg-video-width, .bafg-video-height, .bafg-row-slider-video-type,.bafg-row-before-after-vimeo-video, .bafg-row-bef-aft-self-video').hide();
        } else if (bafg_before_after_method == 'method_1') {
            jQuery('.bafg-slider-alignment,.bafg-overlay-color, .bafg-row-click-to-move,.bafg_move_slider_on_hover,.bafg_on_scroll_slide,.bafg_auto_slide,.bafg_option_label,.bafg-row-offset,.bafg-row-beaf-style,.bafg_filter_apply,.bafg_filter_style,.bafg-row-orientation, .bafg-row-template-style, .bafg-row-before-after-image, .bafg_filter_style, .bafg_filter_apply, .bafg-row-before-image, .bafg-row-after-image').show();
            jQuery('.bafg-mid-label-color,.bafg-mid-label-bg,.bafg-row-mid-label,.bafg-row-before-after-image, .bafg_filter_style, .bafg_filter_apply, .bafg-row-first-image,.bafg-row-second-image, .bafg-row-third-image, .bafg-row-before-after-yt-video, .bafg-video-width, .bafg-video-height, .bafg-row-slider-video-type, .bafg-row-before-after-vimeo-video,.bafg-row-bef-aft-self-video').hide();
        } else if (bafg_before_after_method == 'method_3') {
            jQuery('.bafg-row-mid-label,.bafg-row-first-image, .bafg-row-second-image, .bafg-row-third-image,.bafg-mid-label-color,.bafg-mid-label-bg').show();
            jQuery('.bafg-fade,.bafg-slider-alignment,.bafg-row-click-to-move,.bafg_move_slider_on_hover,.bafg_on_scroll_slide,.bafg_option_label,.bafg-row-offset,.bafg-row-beaf-style,.bafg_filter_apply,.bafg_filter_style,.bafg-row-orientation, .bafg-row-before-after-image, .bafg_filter_style, .bafg_filter_apply, .bafg-row-before-image, .bafg-row-after-image, .bafg-row-before-after-yt-video, .bafg-video-width, .bafg-video-height,.bafg-row-slider-video-type,.bafg-row-before-after-vimeo-video,.bafg-row-bef-aft-self-video').hide();

            //hide for now 3 image
            jQuery('.bafg_slide_handle').hide();
        } else if (bafg_before_after_method == 'method_4') {
            jQuery('.bafg-row-before-image, .bafg-row-after-image, .bafg-row-first-image, .bafg-row-second-image, .bafg-row-third-image,.bafg-fade, .bafg_popup_preview,.bafg-skip-lazy-load, .bafg-row-before-after-image, .bafg_filter_style, .bafg_filter_apply').hide();
            jQuery('.bafg-row-before-after-yt-video, .bafg-row-before-after-vimeo-video, .bafg-video-width, .bafg-video-height, .bafg-row-slider-video-type,.bafg-row-bef-aft-self-video').show();
            bafg_video_type_conditional_fields();

        }
    }

    function bafg_auto_slide_conditional_field() {
        var bafg_auto_slide = jQuery('input:radio[name=bafg_auto_slide]:checked').val();
        if (bafg_auto_slide == 'true') {
            jQuery('.bafg_move_slider_on_hover').hide();
            //hide for now
            jQuery('.bafg_slide_handle').show();
            jQuery('.bafg_on_scroll_slide').hide();
        } else {
            jQuery('.bafg_move_slider_on_hover').show();
            jQuery('.bafg_slide_handle').hide();
            jQuery('.bafg_on_scroll_slide').show();
        }

    }

    function bafg_on_scroll_slide_conditional_field() {
        var bafg_on_scroll_slide = jQuery('input:radio[name=bafg_on_scroll_slide]:checked').val();
        var bafg_auto_slide = jQuery('input:radio[name=bafg_auto_slide]:checked').val();

        if (bafg_on_scroll_slide == 'true' || bafg_auto_slide == 'true') {
            jQuery('.bafg_default_offset_row').hide();
        } else {
            jQuery('.bafg_default_offset_row').show();
        }

    }

    function bafg_readmore_alignment_field() {
        var bafg_width = jQuery('#bafg_slider_info_readmore_button_width option:selected').val();
        if (bafg_width == 'full-width') {
            jQuery('.bafg_slider_info_readmore_alignment').hide();
        } else {
            jQuery('.bafg_slider_info_readmore_alignment').show();
        }
    }

    //label outside image condtional display
    function bafg_label_outside_conditional_display() {
        var bafg_label_outside_option = jQuery('input:radio[name=bafg_image_styles]:checked').val();
        if (bafg_label_outside_option == 'vertical') {
            jQuery('.bafg_label_outside').show();
        } else {
            jQuery('.bafg_label_outside').hide();
        }
    }

    jQuery('input:radio[name=bafg_image_styles]').on('change', function () {
        bafg_label_outside_conditional_display();
    });

    jQuery('input:radio[name=bafg_on_scroll_slide]').on('change', function () {
        bafg_on_scroll_slide_conditional_field();
    });

    jQuery('input:radio[name=bafg_auto_slide]').on('change', function () {
        bafg_auto_slide_conditional_field();
        bafg_on_scroll_slide_conditional_field();
        var bafg_before_after_method = jQuery('input:radio[name=bafg_before_after_method]:checked').val();
        if (bafg_before_after_method == 'method_3') {
            //hide for now - 3 image
            jQuery('.bafg_slide_handle').hide();
            jQuery('.bafg_on_scroll_slide').hide();
            jQuery('.bafg_move_slider_on_hover').hide();
        }
    });

    jQuery('input:radio[name=bafg_before_after_method]').on('change', function () {
        bafg_before_after_method_conditional_field();
    });

    jQuery(document).ready(function () {
        bafg_on_scroll_slide_conditional_field();
        bafg_auto_slide_conditional_field();
        bafg_readmore_alignment_field();
        bafg_label_outside_conditional_display();
        bafg_before_after_method_conditional_field();
    });

    jQuery('#bafg_slider_info_readmore_button_width').on('change', function () {
        bafg_readmore_alignment_field();
    });

    // Uploading files
    var bafg_before_file_frame;
    jQuery('#bafg_before_image_upload').on('click', function (e) {
        e.preventDefault();

        // If the media frame already exists, reopen it.
        if (bafg_before_file_frame) {
            bafg_before_file_frame.open();
            return;
        }

        // Create the media frame.
        bafg_before_file_frame = wp.media.frames.bafg_before_file_frame = wp.media({
            title: jQuery(this).data('uploader_title'),
            button: {
                text: jQuery(this).data('uploader_button_text'),
            },
            multiple: false // Set to true to allow multiple files to be selected
        });

        // When a file is selected, run a callback.
        bafg_before_file_frame.on('select', function () {
            // We set multiple to false so only get one image from the uploader
            attachment = bafg_before_file_frame.state().get('selection').first().toJSON();

            var url = attachment.url;

            //var field = document.getElementById("podcast_file");
            var field = document.getElementById('bafg_before_image');
            var thumbnail = document.getElementById('bafg_before_image_thumbnail');
            //get and place the alter title of uploaded image
            var alt = document.getElementById('before_img_alt');
            alt.value = attachment.alt;
            field.value = url;
            thumbnail.setAttribute('src', url);
        });

        // Finally, open the modal
        bafg_before_file_frame.open();
    });


    var bafg_after_file_frame;
    jQuery('#bafg_after_image_upload').on('click', function (e) {
        e.preventDefault();

        // If the media frame already exists, reopen it.
        if (bafg_after_file_frame) {
            bafg_after_file_frame.open();
            return;
        }

        // Create the media frame.
        bafg_after_file_frame = wp.media.frames.bafg_after_file_frame = wp.media({
            title: jQuery(this).data('uploader_title'),
            button: {
                text: jQuery(this).data('uploader_button_text'),
            },
            multiple: false // Set to true to allow multiple files to be selected
        });

        // When a file is selected, run a callback.
        bafg_after_file_frame.on('select', function () {
            // We set multiple to false so only get one image from the uploader
            attachment = bafg_after_file_frame.state().get('selection').first().toJSON();

            var url = attachment.url;

            var field = document.getElementById('bafg_after_image');
            var thumbnail = document.getElementById('bafg_after_image_thumbnail');

            //get and place the alter title of uploaded image
            var alt = document.getElementById('after_img_alt');
            alt.value = attachment.alt;
            field.value = url;
            thumbnail.setAttribute('src', url);
        });

        // Finally, open the modal
        bafg_after_file_frame.open();
    });

    /**
     * Uploading video files
     * 
     * @since 4.4.1
     * @author Abu Hena
     * @returns url
     */
    const video_fields = ['bafg_before_self_video_upload', 'bafg_after_self_video_upload'];
    video_fields.forEach(function (field) {
        jQuery('#' + field).on('click', function (e) {
            e.preventDefault();
            var bafg_video_file_frame;

            // If the media frame already exists, reopen it.
            if (bafg_video_file_frame) {
                bafg_video_file_frame.open();
                return;
            }

            // Create the media frame.
            bafg_video_file_frame = wp.media.frames.bafg_video_file_frame = wp.media({
                title: jQuery(this).data('uploader_title'),
                button: {
                    text: jQuery(this).data('uploader_button_text'),
                },
                multiple: false, // Set to true to allow multiple files to be selected
                library: {
                    type: 'video'
                }

            });

            //when a file is selected, run a callback
            bafg_video_file_frame.on('select', function () {
                // We set multiple to false so only get one video from the uploader
                attachment = bafg_video_file_frame.state().get('selection').first().toJSON();
                let url = attachment.url;
                let title = attachment.title;
                let inputField = document.getElementById(field.replace('_upload', ''));
                inputField.value = url;
            })

            //finally, open the modal
            bafg_video_file_frame.open();

        })
    })

    /*
    Color picker
    */
    jQuery('.bafg-color-field').each(function () {
        jQuery(this).wpColorPicker();
    });

    /*
    * Shortcode generator
    */
    jQuery('#bafg_gallery_generator #bafg_gallery_shortcode_generator').on('click', function () {
        var cata_field = jQuery('#bafg_gallery_generator #bafg_gallery_cata');
        var cata_id = cata_field.val();
        var items_field = jQuery('#bafg_gallery_generator #bafg_gallery_item');
        var info_val = jQuery('#bafg_gallery_generator #bafg_gallery_info');
        var items = items_field.val();

        if (cata_id == '') {
            cata_field.css('border-color', 'red');
            return;
        } else {
            cata_field.css('border-color', '#ccc');
        }

        if (items != '' && isNaN(items)) {
            items_field.css('border-color', 'red');
            return;
        } else {
            items_field.css('border-color', '#ccc');
        }

        var column = jQuery('#bafg_gallery_generator #bafg_gallery_column').val();

        var max_items = '';
        if (items != '') {
            var max_items = ' items=' + items + '';
        }

        var slider_info = '';
        if (info_val.is(":checked")) {
            var slider_info = ' info=true';
        }

        var bafg_shortcode = '[bafg_gallery category=' + cata_id + ' column=' + column + '' + max_items + '' + slider_info + ']';
        jQuery('#bafg_gallery_generator #bafg_gallery_shortcode').val(bafg_shortcode).focus();

    });

    /*
    * Copy gallery shortcode
    */
    jQuery('#bafg_gallery_generator #bafg_gallery_shortcode').on('click', function () {

        var copyText = document.getElementById("bafg_gallery_shortcode");

        if (copyText.value != '') {
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand("copy");

            var elem = document.getElementById("bafg_gallery_shortcode_copy_alert");
            elem.style.right = '0px';

            var time = 0;
            var id = setInterval(copyAlert, 10);

            function copyAlert() {
                if (time == 50) {
                    clearInterval(id);
                    elem.style.display = 'none';
                } else {
                    time++;
                    elem.style.display = 'flex';
                }
            }
        }

    });

    /*
    BAFG style 7
    */
    function bagf_style_7() {
        if (jQuery('#bafg_before_after_style').val() == 'design-7') {
            jQuery('#bafg_image_styles1').removeAttr('checked').parent().disabled;
            jQuery('#bafg_image_styles1').attr('disabled', true);
            jQuery('#bafg_image_styles2').attr('checked', 'checked');
            jQuery('label[for="bafg_image_styles2"]').trigger('click');
        } else {
            jQuery('#bafg_image_styles1').attr('disabled', false);
        }
    }
    bagf_style_7();

    jQuery('#bafg_before_after_style').on('change', function () {
        bagf_style_7();
    });

    /*
    BAFG style 9
    */
    function bafg_style_9_conditional_fields() {
        let $ = jQuery;
        $('.bafg-row-orientation').hide();
        $('.bafg-row-offset').hide();
        $('.bafg_label_outside').hide();
        $('.bafg_auto_slide').hide();
        $('.bafg_on_scroll_slide').hide();
        $('.bafg_move_slider_on_hover').hide();
        $('.bafg-row-click-to-move').hide();
        $('.bafg-handle-color').hide();
        $('.bafg-overlay-color').hide();
    };

    jQuery('#bafg_before_after_style_9').on('change', function () {
        bafg_style_9_conditional_fields();
    });

    jQuery(document).ready(function () {

        if (jQuery('input:radio[name=bafg_before_after_style]:checked').val() == 'design-9') {

            bafg_style_9_conditional_fields();
        }
    });

    //opacity range slider
    var slider = document.querySelector("#bafg-wm-opacity");
    var output = document.querySelector(".bafg-wm-range-val");
    if (slider) {
        output.innerHTML = slider.value;

        slider.oninput = function () {
            output.innerHTML = this.value;
            slider.setAttribute('value', this.value);
        }
    }


    $('.bafg-update-pro').on('click', function (e) {
        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'bafg_update_pro',
            },
            success: function (response) {
            },
        });

    });

    //conditional field when select video type
    $('.bafg-row-slider-video-type').on('change', function () {
        bafg_video_type_conditional_fields();
    });

    $(document).ready(function () {
        bafg_video_type_conditional_fields();
    })

});

jQuery(document).ready(function($) {
    $('.plugin-button').not('.pro').on('click', function(e) {
        e.preventDefault();

        let button = $(this);
        let action = button.data('action');
        let pluginSlug = button.data('plugin');
        let pluginFileName = button.data('plugin_filename');

        if (!action || !pluginSlug) return;

        let loader = button.find('.loader');
        let originalText = button.clone().children().remove().end().text().trim();

        if (action === 'install') {
            button.contents().first().replaceWith('Installing..');
        } else if (action === 'activate') {
            button.contents().first().replaceWith('Activating..');
        }

        button.addClass('loading').prop('disabled', true);
        loader.show();

        $.ajax({
            url: ajaxurl,
            type: 'POST',
            data: {
                action: 'beaf_themefic_manage_plugin',
                security: beaf_admin_data.themefic_nonce,
                plugin_slug: pluginSlug,
                plugin_filename: pluginFileName,
                plugin_action: action
            },
            success: function(response) {
                button.removeClass('loading').prop('disabled', false);
                loader.hide();

                if (response.success) {
                    if (action === 'install') {
                        button.contents().first().replaceWith('Activate');
                        button.data('action', 'activate').removeClass('install').addClass('activate');
                    } else if (action === 'activate') {
                        button.replaceWith('<span class="plugin-button plugin-status active">Activated</span>');
                    }
                } else {
                    button.contents().first().replaceWith(originalText);
                    alert('Error: ' + response.data);
                }
            },
            error: function() {
                button.contents().first().replaceWith(originalText).removeClass('loading').prop('disabled', false);
                loader.hide();
                alert('An error occurred. Please try again.');
            }
        });
    });
});