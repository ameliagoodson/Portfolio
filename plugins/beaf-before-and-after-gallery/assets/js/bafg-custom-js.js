; (function ($) { 
    'use strict';

    $(window).on('load', function () { 
        $(".bafg-twentytwenty-container").each(function () {
            if ($(this).attr('bafg-move-slider-on-hover') == '') {
                var moveSliderHover = false;
            } else {
                var moveSliderHover = true;
            }

            if ($(this).attr('bafg-overlay') == '1') {
                var overlay = false;
            } else {
                var overlay = true;
            }

            if ($(this).attr('bafg-click-to-move') == '') {
                var clickToMove = false;
            } else {
                var clickToMove = true;
            }

            $(this).twentytwenty({
                orientation: $(this).attr('bafg-orientation'),
                default_offset_pct: $(this).attr('bafg-default-offset'),
                before_label: $(this).attr('bafg-before-label'),
                after_label: $(this).attr('bafg-after-label'),
                no_overlay: overlay,
                move_slider_on_hover: moveSliderHover,
                click_to_move: clickToMove
            });
 
            
            //Label OutSide
            var bafgLabelOutside = $(this).data('label_outside');
            var orientation = $(this).attr('bafg-orientation');
            if (bafgLabelOutside == true && orientation == 'vertical') {
                $('.bafg-outside-label-wrapper.twentytwenty-vertical .bafg-twentytwenty-container').css('margin', 50 + 'px' + ' auto');

                $('.bafg-outside-label-wrapper.twentytwenty-vertical .twentytwenty-overlay>.twentytwenty-before-label').css('display', 'none');
                $('.bafg-outside-label-wrapper.twentytwenty-vertical .twentytwenty-overlay .twentytwenty-after-label').css('display', 'none');
            }
             
            $(window).trigger("resize.twentytwenty");
        });
        
    });
    
    $(window).on('scroll', function () {
        $(window).trigger("resize.twentytwenty");
    });
    $(document).on('load', function () {
        $(document).trigger("resize.twentytwenty");
    });
 
})(jQuery);