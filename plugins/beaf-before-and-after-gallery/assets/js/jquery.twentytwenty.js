(function($){   

  $.fn.twentytwenty = function(options) {
    var options = $.extend({
      default_offset_pct: 0.5,
      orientation: 'horizontal',
      before_label: 'Before',
      after_label: 'After',
      no_overlay: false,
      move_slider_on_hover: false,
      move_with_handle_only: true,
      click_to_move: false
    }, options);

    return this.each(function() { 
      var sliderPct         = options.default_offset_pct;
      var container         = $(this);
      var sliderOrientation = options.orientation;
      var beforeDirection   = (sliderOrientation === 'vertical') ? 'down' : 'left';
      var afterDirection    = (sliderOrientation === 'vertical') ? 'up' : 'right';

      container.wrap("<div class='twentytwenty-wrapper bafg-twentytwenty-wrapper twentytwenty-" + sliderOrientation + "'></div>");
      if(!options.no_overlay) {
        container.append("<div class='twentytwenty-overlay'></div>");
        var overlay = container.find(".twentytwenty-overlay");

        /* Prepend Overlay Label outside of image */
        var labelOutside = $('.bafg-twentytwenty-container').data('label_outside');
        if(labelOutside == true && sliderOrientation == 'vertical' ){
          var bafgWrapper = $(".twentytwenty-wrapper");
          bafgWrapper.wrap("<div class='bafg-outside-label-wrapper twentytwenty-" + sliderOrientation + "'></div>");
          var outsideLabel = $(".bafg-outside-label-wrapper");
          outsideLabel.prepend("<div class='twentytwenty-after-label' data-content='"+options.after_label+"'></div>");
          outsideLabel.prepend("<div class='twentytwenty-before-label' data-content='"+options.before_label+"'></div>");
        }
        /* Prepend Overlay Label outside of image end */

        overlay.append("<div class='twentytwenty-before-label' data-content='"+options.before_label+"'></div>");
        overlay.append("<div class='twentytwenty-after-label' data-content='"+options.after_label+"'></div>");
      }
      var beforeImg = container.find("img:first");
      var afterImg  = container.find("img:last");
      
      //for video slider
      let sliderMethod  = container.data('slider-method');
      let bothVideoPlay = container.attr('bafg-both-video-play');
      let beforeVdo     = container.find("iframe:first");
      let afterVdo      = container.find("iframe:last");
      let beforeSelfVdo = container.find("video:first");
      let afterSelfVdo  = container.find("video:last");
      beforeVdo.addClass('twentytwenty-before');
      afterVdo.addClass('twentytwenty-after');
      beforeSelfVdo.addClass('twentytwenty-before')
      afterSelfVdo.addClass('twentytwenty-after')
      $('.bafg-twentytwenty-container').attr('bafg-both-video-play');
      
      container.append("<div class='twentytwenty-handle'></div>");
      var slider = container.find(".twentytwenty-handle");

	  if( container.hasClass('design-7') ) {
	  	  slider.wrap("<div class='bafg-handle-wrapper'></div>");
	  }

    if(container.hasClass('design-1')){
      slider.wrapInner( "<div class='handle-trnasf'></div>" );
    }
		
	  slider.append("<span class='twentytwenty-" + beforeDirection + "-arrow'></span>");
	  slider.append("<span class='twentytwenty-" + afterDirection + "-arrow'></span>");
      container.addClass("twentytwenty-container");
      beforeImg.addClass("twentytwenty-before");
      afterImg.addClass("twentytwenty-after");
      
      var videoType = container.data('video-type');
      var calcOffset = function(dimensionPct) {
        if(sliderMethod == 'method_4'){
          if( videoType != undefined && videoType == 'self' ){
            var w = beforeSelfVdo.width();
            var h = beforeSelfVdo.height();
          }else{
            var w = beforeVdo.width();
            var h = beforeVdo.height();
          }
          
          if(w == 0 && h == 0){
            if( videoType != undefined && videoType == 'self' ){
              var videoHeight = container.find('video:first').height();
              var videoWidth  = container.find('video:last').width();
            }else{
              var videoHeight = container.find('iframe:first').height();
              var videoWidth  = container.find('iframe:last').width();
            }
            
            w = videoWidth;
            h = videoHeight;
            container.css("height", dimensionPct*h+"px");
          }else{
            container.css("height", h+"px");
            container.find('iframe').css('max-width', w+'px');
            let dataWidth = container.find('iframe').attr('data-width');

            //add a responsive width when in mobile devices for the video
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
              container.find('iframe').css('height', w/1.77+'px');
            }
          }
        }else{
          var w = beforeImg.width();
          var h = beforeImg.height();
          
          if(w == 0 && h == 0){
            var imageHeight = container.find('img:first').prop('naturalHeight'); 
            var imageWidth = container.find('img:first').prop('naturalWidth'); 
            
            w = imageWidth;
            h = imageHeight;    
              container.css("height", dimensionPct*h+"px");
          }else{
            container.css("height", h+"px");
          }
        }
        container.css('max-width', w+'px');
        return {
          w: w+"px",
          h: h+"px",
          cw: (dimensionPct*w)+"px",
          ch: (dimensionPct*h)+"px"
        };
      };
      
      var adjustContainer = function(offset) {
      	if (sliderOrientation === 'vertical') {
          beforeImg.css("clip", "rect(0,"+offset.w+","+offset.ch+",0)");
          afterImg.css("clip", "rect("+offset.ch+","+offset.w+","+offset.h+",0)");
          if( videoType == 'self' ){
            beforeSelfVdo.css("clip", "rect(0, "+offset.w + ", " + offset.ch+", 0)");
            afterSelfVdo.css("clip", "rect("+offset.ch+", "+offset.w+", "+offset.h+", 0)");
          }else{
            beforeVdo.css("clip", "rect(0, "+offset.w + ", " + offset.ch+", 0)");
            afterVdo.css("clip", "rect("+offset.ch+" ,"+offset.w+", "+offset.h+", 0)");
          }
      	} else {
          beforeImg.css("clip", "rect(0,"+offset.cw+","+offset.h+",0)");
          afterImg.css("clip", "rect(0,"+offset.w+","+offset.h+","+offset.cw+")");
          if( videoType == 'self' ){
            beforeSelfVdo.css("clip", "rect(0, "+offset.cw+","+offset.h+",0)");
            afterSelfVdo.css("clip", "rect(0,"+offset.w+","+offset.h+","+offset.cw+")");
          }else{
            beforeVdo.css("clip", "rect(0, "+offset.cw+","+offset.h+",0)");
            afterVdo.css("clip", "rect(0,"+offset.w+","+offset.h+","+offset.cw+")");
          }
           
    	}
      container.css( "height", offset.h);

      /*
        * Auto video pause and sound control based on slider handle position
        * @author : Abu Hena
        * Modified By : Jewel Hossain
        **/ 
      if(sliderMethod == 'method_4'){

        if(bothVideoPlay != '1'){
            
          if(container.hasClass('active')){
            let sliderVideoType = container.data('video-type');
            let totalWidth      = offset.w;
            let totalHeight     = offset.h;
            let sliderCurrentPosition;

            if( sliderOrientation == 'vertical' ){
              totalHeight           = totalHeight.replace('px', '');
              sliderCurrentPosition = offset.ch;                  
              sliderCurrentPosition = sliderCurrentPosition.replace('px', '');
              sliderPositionPercent = sliderCurrentPosition/totalHeight * 100;
            }else{                  
              totalWidth            = totalWidth.replace('px', '');
              sliderCurrentPosition = offset.cw;
              sliderCurrentPosition = sliderCurrentPosition.replace('px', '');
              sliderPositionPercent = sliderCurrentPosition/totalWidth * 100;
            }
            sliderPositionPercent = Math.round(sliderPositionPercent);        

            let firstVideo  = container.children().eq(0).attr('id');
            let secondVideo = container.children().eq(1).attr('id');

            if(sliderVideoType == 'youtube'){

              if(sliderPositionPercent > 50){

                if(container.hasClass('muted') != true){
                  players[firstVideo].setVolume(sliderPositionPercent);
                  players[secondVideo].setVolume(100 - sliderPositionPercent);
                }
                players[secondVideo].pauseVideo();
                players[firstVideo].playVideo();

              }else if(sliderPositionPercent < 50){

                players[firstVideo].pauseVideo();
                players[secondVideo].playVideo();

                if(container.hasClass('muted') != true){
                  players[firstVideo].setVolume(sliderPositionPercent);
                  players[secondVideo].setVolume(100 - sliderPositionPercent);
                }

              }

            }else if(sliderVideoType == 'vimeo'){

              if(sliderPositionPercent > 50){
                vimeoPlayers[secondVideo].pause();
                vimeoPlayers[firstVideo].play();

                if(container.hasClass('muted') != true){
                  //vimeo volume scale must be between 0 and 1
                  vimeoPlayers[firstVideo].setVolume(sliderPositionPercent/100);
                  vimeoPlayers[secondVideo].setVolume(1 - sliderPositionPercent/100);
                }

              }else if(sliderPositionPercent < 50){
                vimeoPlayers[firstVideo].pause();
                vimeoPlayers[secondVideo].play();

                if(container.hasClass('muted') != true){
                  //vimeo volume scale must be between 0 and 1
                  vimeoPlayers[firstVideo].setVolume(sliderPositionPercent/100);
                  vimeoPlayers[secondVideo].setVolume(1 - sliderPositionPercent/100);
                }
              }

            }else if(sliderVideoType == 'self'){

              if(sliderPositionPercent > 50){
                beforeSelfVdo[0].play();
                afterSelfVdo[0].pause();
                
                if(container.hasClass('muted') != true){
                  beforeSelfVdo[0].volume = sliderPositionPercent/100;
                  afterSelfVdo[0].volume  = 1 - sliderPositionPercent/100;
                }
              }else if(sliderPositionPercent < 50){
                afterSelfVdo[0].play();
                beforeSelfVdo[0].pause();

                if(container.hasClass('muted') != true){
                  beforeSelfVdo[0].volume = sliderPositionPercent/100;
                  afterSelfVdo[0].volume  = 1 - sliderPositionPercent/100;
                }
              }

            }
          }
        }else{
          let sliderPositionPercent;
          let sliderVideoType = container.data('video-type');
          
          if( sliderOrientation == 'vertical' ){
            sliderPositionPercent = offset.ch / offset.h * 100;
          } else {
            sliderPositionPercent = offset.cw / offset.w * 100; 
          }

          sliderPositionPercent = Math.random(sliderPositionPercent);

          if(sliderVideoType == 'youtube'){
            let firstVideoId  = container.children().eq(0).attr('id');
            let secondVideoId = container.children().eq(1).attr('id');

            // Play both videos at the same time
            if (sliderPositionPercent > 0 && sliderPositionPercent <= 100) {
              players[firstVideoId].playVideo();
              players[secondVideoId].playVideo();
              
              let firstVolume = sliderPositionPercent / 100;
              let secondVolume = 1 - firstVolume;

              players[firstVideoId].setVolume(firstVolume * 100);
              players[secondVideoId].setVolume(secondVolume * 100);
            }
          } else if(sliderVideoType == 'vimeo'){
            let firstVideoId  = container.children().eq(0).attr('id');
            let secondVideoId = container.children().eq(1).attr('id');

            if (sliderPositionPercent > 0 && sliderPositionPercent <= 100) {
              vimeoPlayers[firstVideoId].play();
              vimeoPlayers[secondVideoId].play();

              vimeoPlayers[firstVideoId].setVolume(sliderPositionPercent / 100);
              vimeoPlayers[secondVideoId].setVolume(1 - sliderPositionPercent / 100);
            }
          } else if(sliderVideoType == 'self'){
            if (sliderPositionPercent > 0 && sliderPositionPercent <= 100) {
              beforeSelfVdo[0].play();
              afterSelfVdo[0].play();

              beforeSelfVdo[0].volume = sliderPositionPercent / 100;
              afterSelfVdo[0].volume = 1 - sliderPositionPercent / 100;
            }
          }

        }

      }
    };
      var adjustSlider = function(pct) {
        var offset = calcOffset(pct);
        slider.css((sliderOrientation==="vertical") ? "top" : "left", (sliderOrientation==="vertical") ? offset.ch : offset.cw);
        adjustContainer(offset);
      };

      // Return the number specified or the min/max number if it outside the range given.
      var minMaxNumber = function(num, min, max) {
        return Math.max(min, Math.min(max, num));
      };

      // Calculate the slider percentage based on the position.
      var getSliderPercentage = function(positionX, positionY) {
        if( sliderMethod === 'method_4' ){
          if( videoType == 'self' ){
            videoWidth = selfVideoWidth;
            videoHeight = selfVideoHeight;
          }
          var sliderPercentage = (sliderOrientation === 'vertical') ?
          (positionY-offsetY)/videoHeight :
          (positionX-offsetX)/videoWidth;

        }else{
          var sliderPercentage = (sliderOrientation === 'vertical') ?
          (positionY-offsetY)/imgHeight :
          (positionX-offsetX)/imgWidth;
        }

        return minMaxNumber(sliderPercentage, 0, 1);
      };

      $(window).on("resize.twentytwenty", function(e) {
        adjustSlider(sliderPct);
      });

      var offsetX = 0;
      var offsetY = 0;
      var imgWidth = 0;
      var imgHeight = 0;
      var videoHeight = 0;
      var videoWidth = 0;
      var selfVideoWidth = 0;
      var selfVideoHeight = 0;
      /**
       * Handles the start of a move event.
       *
       * @param {Object} e - The event object.
       */
      var onMoveStart = function(e) {
        if (((e.distX > e.distY && e.distX < -e.distY) || (e.distX < e.distY && e.distX > -e.distY)) && sliderOrientation !== 'vertical') {
          e.preventDefault();
        }
        else if (((e.distX < e.distY && e.distX < -e.distY) || (e.distX > e.distY && e.distX > -e.distY)) && sliderOrientation === 'vertical') {
          e.preventDefault();
        }
        container.addClass("active");
        offsetX = container.offset().left;
        offsetY = container.offset().top;
        imgWidth = beforeImg.width(); 
        imgHeight = beforeImg.height();
        videoHeight = beforeVdo.height();
        videoWidth = beforeVdo.width();
        selfVideoWidth = beforeSelfVdo.width();
        selfVideoHeight = beforeSelfVdo.height();

      };
      var onMove = function(e) {
        if (container.hasClass("active")) {
          sliderPct = getSliderPercentage(e.pageX, e.pageY);
          adjustSlider(sliderPct);
        }
      };
      var onMoveEnd = function() {
          container.removeClass("active");
      };

      var moveTarget = options.move_with_handle_only ? slider : container;
      moveTarget.on("movestart",onMoveStart);
      moveTarget.on("move",onMove);
      moveTarget.on("moveend",onMoveEnd);

      if (options.move_slider_on_hover) {
        container.on("mouseenter", onMoveStart);
        container.on("mousemove", onMove);
        container.on("mouseleave", onMoveEnd);
      }

      slider.on("touchmove", function(e) {
        e.preventDefault();
      });

      container.find("img").on("mousedown", function(event) {
        event.preventDefault();
      });

      container.find("iframe").on("mousedown", function(event) {
        event.preventDefault();
      });

      container.find("video").on("mousedown", function(event) {
        event.preventDefault();
      });

      if (options.click_to_move) {
        container.on('click', function(e) {
          offsetX   = container.offset().left;
          offsetY   = container.offset().top;
          imgWidth  = beforeImg.width();
          imgHeight = beforeImg.height();

          sliderPct = getSliderPercentage(e.pageX, e.pageY);
          adjustSlider(sliderPct);
        });
      }

      $(window).trigger("resize.twentytwenty");
      
      //on screen orientation change
      window.addEventListener("orientationchange", function() {
        let screenOrientation = screen.orientation.type;

        if( screenOrientation == 'portrait-primary' || screenOrientation == 'landscape-primary' ){
          $(window).trigger("resize.twentytwenty");
        }
      });
    });
  };
})(jQuery);
