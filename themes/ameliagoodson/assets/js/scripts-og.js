/**
 * File scripts.js
 */

/* ------------------------------------------------------------------------------ /*
/*  NAMESPACE
/* ------------------------------------------------------------------------------ */

var agtheme = agtheme || {},
  $ = jQuery;

/* ------------------------------------------------------------------------------ /*
/*  GLOBALS
/* ------------------------------------------------------------------------------ */

var $agthemeDoc = $(document),
  $agthemeWin = $(window),
  agthemeIsIE11 = !!window.MSInputMethodContext && !!document.documentMode;

/* ------------------------------------------------------------------------------ /*
/*  HELPERS
/* ------------------------------------------------------------------------------ */

/* Output AJAX errors ------------------------ */

function agthemeAjaxErrors(jqXHR, exception) {
  var message = "";
  if (jqXHR.status === 0) {
    message = "Not connect.n Verify Network.";
  } else if (jqXHR.status == 404) {
    message = "Requested page not found. [404]";
  } else if (jqXHR.status == 500) {
    message = "Internal Server Error [500].";
  } else if (exception === "parsererror") {
    message = "Requested JSON parse failed.";
  } else if (exception === "timeout") {
    message = "Time out error.";
  } else if (exception === "abort") {
    message = "Ajax request aborted.";
  } else {
    message = "Uncaught Error.n" + jqXHR.responseText;
  }
  console.log("AJAX ERROR:" + message);
}

/* Toggle an attribute ----------------------- */

function agthemeToggleAttribute($element, attribute, trueVal, falseVal) {
  if (typeof trueVal === "undefined") {
    trueVal = true;
  }
  if (typeof falseVal === "undefined") {
    falseVal = false;
  }

  if ($element.attr(attribute) !== trueVal) {
    $element.attr(attribute, trueVal);
  } else {
    $element.attr(attribute, falseVal);
  }
}

/* Extend jQuery easing ----------------------- */

$.extend($.easing, {
  easeInOutQuint: function (x) {
    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
  },
});

/* ------------------------------------------------------------------------------ /*
/*  INTERVAL SCROLL
/* ------------------------------------------------------------------------------ */

agtheme.intervalScroll = {
  init: function () {
    didScroll = false;

    // Check for the scroll event.
    $agthemeWin.on("scroll load", function () {
      didScroll = true;
    });

    // Once every 250ms, check if we have scrolled, and if we have, do the intensive stuff.
    setInterval(function () {
      if (didScroll) {
        didScroll = false;

        // When this triggers, we know that we have scrolled.
        $agthemeWin.trigger("did-interval-scroll");
      }
    }, 250);
  },
};

/* ------------------------------------------------------------------------------ /*
/*  TOGGLES
/* ------------------------------------------------------------------------------ */

agtheme.toggles = {
  init: function () {
    // Do the toggle.
    agtheme.toggles.toggle();

    // Check for toggle/untoggle on resize.
    agtheme.toggles.resizeCheck();

    // Check for untoggle on escape key press.
    agtheme.toggles.untoggleOnEscapeKeyPress();
  },

  // Do the toggle.
  toggle: function () {
    $("*[data-toggle-target]").on("click", function (e) {
      // Get our targets
      var $toggle = $(this),
        targetString = $(this).data("toggle-target"),
        $target = $(targetString);

      // Trigger events on the toggle targets before they are toggled.
      if ($target.is(".active")) {
        $target.trigger("toggle-target-before-active");
      } else {
        $target.trigger("toggle-target-before-inactive");
      }

      // For cover modals, set a short timeout duration so the class animations have time to play out.
      var timeOutTime = $target.hasClass("cover-modal") ? 5 : 0;

      setTimeout(function () {
        // Toggle the target of the clicked toggle.
        if ($toggle.data("toggle-type") == "slidetoggle") {
          var duration = $toggle.data("toggle-duration") ? $toggle.data("toggle-duration") : 250;
          if ($("body").hasClass("has-anim")) {
            $target.slideToggle(duration);
          } else {
            $target.toggle();
          }
        } else {
          $target.toggleClass("active");
        }

        // Toggle all toggles with this toggle target.
        $('*[data-toggle-target="' + targetString + '"]').toggleClass("active");

        // Toggle aria-expanded on the target.
        agthemeToggleAttribute($target, "aria-expanded", "true", "false");

        // Toggle aria-pressed on the toggle.
        agthemeToggleAttribute($toggle, "aria-pressed", "true", "false");

        // Toggle body class.
        if ($toggle.data("toggle-body-class")) {
          $("body").toggleClass($toggle.data("toggle-body-class"));
        }

        // Check whether to lock the screen.
        if ($toggle.data("lock-screen")) {
          agtheme.scrollLock.setTo(true);
        } else if ($toggle.data("unlock-screen")) {
          agtheme.scrollLock.setTo(false);
        } else if ($toggle.data("toggle-screen-lock")) {
          agtheme.scrollLock.setTo();
        }

        // Check whether to set focus.
        if ($toggle.data("set-focus")) {
          var $focusElement = $($toggle.data("set-focus"));
          if ($focusElement.length) {
            if ($toggle.is(".active")) {
              $focusElement.trigger("focus");
            } else {
              $focusElement.trigger("blur");
            }
          }
        }

        // Trigger the toggled event on the toggle target.
        $target.trigger("toggled");

        // Trigger events on the toggle targets after they are toggled.
        if ($target.is(".active")) {
          $target.trigger("toggle-target-after-active");
        } else {
          $target.trigger("toggle-target-after-inactive");
        }
      }, timeOutTime);

      return false;
    });
  },

  // Check for toggle/untoggle on screen resize.
  resizeCheck: function () {
    if (
      $("*[data-untoggle-above], *[data-untoggle-below], *[data-toggle-above], *[data-toggle-below]").length
    ) {
      $agthemeWin.on("resize", function () {
        var winWidth = $agthemeWin.width(),
          $toggles = $(".toggle");

        $toggles.each(function () {
          $toggle = $(this);

          var unToggleAbove = $toggle.data("untoggle-above"),
            unToggleBelow = $toggle.data("untoggle-below"),
            toggleAbove = $toggle.data("toggle-above"),
            toggleBelow = $toggle.data("toggle-below");

          // If no width comparison is set, continue
          if (!unToggleAbove && !unToggleBelow && !toggleAbove && !toggleBelow) {
            return;
          }

          // If the toggle width comparison is true, toggle the toggle
          if (
            (((unToggleAbove && winWidth > unToggleAbove) || (unToggleBelow && winWidth < unToggleBelow)) &&
              $toggle.hasClass("active")) ||
            (((toggleAbove && winWidth > toggleAbove) || (toggleBelow && winWidth < toggleBelow)) &&
              !$toggle.hasClass("active"))
          ) {
            $toggle.trigger("click");
          }
        });
      });
    }
  },

  // Close toggle on escape key press.
  untoggleOnEscapeKeyPress: function () {
    $agthemeDoc.on("keyup", function (e) {
      if (e.key === "Escape") {
        $("*[data-untoggle-on-escape].active").each(function () {
          if ($(this).hasClass("active")) {
            $(this).trigger("click");
          }
        });
      }
    });
  },
};

document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger-btn");
  const mobile_menu = document.querySelector(".mobile-header");
  const mobile_container = document.querySelector(".mobile-menu-container");

  if (hamburger && mobile_menu) {
    hamburger.addEventListener("click", function () {
      if (mobile_menu.classList.contains("active") && mobile_container.classList.contains("active")) {
        mobile_menu.classList.remove("active");
        mobile_container.classList.remove("active");
      } else {
        mobile_menu.classList.add("active");
        mobile_container.classList.add("active");
      }
    });
  }
});

/* ------------------------------------------------------------------------------ /*
/*  COVER MODALS
/* ------------------------------------------------------------------------------ */

agtheme.coverModals = {
  init: function () {
    if ($(".cover-modal").length) {
      // Handle cover modals when they're toggled.
      agtheme.coverModals.onToggle();

      // When toggled, untoggle if visitor clicks on the wrapping element of the modal.
      agtheme.coverModals.outsideUntoggle();

      // Close on escape key press.
      agtheme.coverModals.closeOnEscape();

      // Hide and show modals before and after their animations have played out.
      agtheme.coverModals.hideAndShowModals();
    }
  },

  // Handle cover modals when they're toggled.
  onToggle: function () {
    $(".cover-modal").on("toggled", function () {
      var $modal = $(this),
        $body = $("body");

      if ($modal.hasClass("active")) {
        $body.addClass("showing-modal");
      } else {
        $body.removeClass("showing-modal").addClass("hiding-modal");

        // Remove the hiding class after a delay, when animations have been run
        setTimeout(function () {
          $body.removeClass("hiding-modal");
        }, 500);
      }
    });
  },

  // Close modal on outside click.
  outsideUntoggle: function () {
    $agthemeDoc.on("click", function (e) {
      var $target = $(e.target),
        modal = ".cover-modal.active";

      if ($target.is(modal)) {
        agtheme.coverModals.untoggleModal($target);
      }
    });
  },

  // Close modal on escape key press.
  closeOnEscape: function () {
    $agthemeDoc.on("keyup", function (e) {
      if (e.key === "Escape") {
        $(".cover-modal.active").each(function () {
          agtheme.coverModals.untoggleModal($(this));
        });
      }
    });
  },

  // Hide and show modals before and after their animations have played out.
  hideAndShowModals: function () {
    var $modals = $(".cover-modal");

    // Show the modal.
    $modals.on("toggle-target-before-inactive", function (e) {
      if (e.target != this) {
        return;
      }
      $(this).addClass("show-modal");
    });

    // Hide the modal after a delay, so animations have time to play out.
    $modals.on("toggle-target-after-inactive", function (e) {
      if (e.target != this) {
        return;
      }

      var $modal = $(this);
      setTimeout(function () {
        $modal.removeClass("show-modal");
      }, 250);
    });
  },

  // Untoggle a modal.
  untoggleModal: function ($modal) {
    $modalToggle = false;

    // If the modal has specified the string (ID or class) used by toggles to target it, untoggle the toggles with that target string.
    // The modal-target-string must match the string toggles use to target the modal.
    if ($modal.data("modal-target-string")) {
      var modalTargetClass = $modal.data("modal-target-string"),
        $modalToggle = $('*[data-toggle-target="' + modalTargetClass + '"]').first();
    }

    // If a modal toggle exists, trigger it so all of the toggle options are included.
    if ($modalToggle && $modalToggle.length) {
      $modalToggle.trigger("click");

      // If one doesn't exist, just hide the modal.
    } else {
      $modal.removeClass("active");
    }
  },
};

/* ------------------------------------------------------------------------------ /*
/*  STICKY HEADER
/* ------------------------------------------------------------------------------ */

agtheme.stickyHeader = {
  init: function () {
    var $stickyElement = $("#site-header.stick-me");

    if ($stickyElement.length) {
      // Add our stand-in element for the sticky header.
      if (!$(".header-sticky-adjuster").length) {
        $stickyElement.before('<div class="header-sticky-adjuster"></div>');
      }

      // Stick the header.
      $stickyElement.addClass("is-sticky");

      // Update the dimensions of our stand-in element on load and screen size change.
      agtheme.stickyHeader.updateStandIn($stickyElement);

      $agthemeWin.on("resize orientationchange", function () {
        agtheme.stickyHeader.updateStandIn($stickyElement);
      });

      // Update the scroll status of our sticky header.
      agtheme.stickyHeader.updateScrollStatus($stickyElement);

      $agthemeWin.on("scroll resize orientationchange", function () {
        agtheme.stickyHeader.updateScrollStatus($stickyElement);
      });
    }
  },

  updateStandIn: function ($stickyElement) {
    $(".header-sticky-adjuster")
      .height($stickyElement.outerHeight())
      .css("margin-bottom", parseInt($stickyElement.css("marginBottom")));
  },

  updateScrollStatus: function ($stickyElement) {
    if ($stickyElement.offset().top > 10) {
      $stickyElement.addClass("scrolled");
    } else {
      $stickyElement.removeClass("scrolled");
    }
  },
};

/* ------------------------------------------------------------------------------ /*
/*  RESPONSIVE EMBEDS
/* ------------------------------------------------------------------------------ */

agtheme.responsiveEmbeds = {
  init: function () {
    agtheme.responsiveEmbeds.makeFit();

    $agthemeWin.on("resize fit-videos", function () {
      agtheme.responsiveEmbeds.makeFit();
    });
  },

  makeFit: function () {
    var vidSelector = "iframe, object, video";

    $(vidSelector).each(function () {
      var $video = $(this),
        $container = $video.parent(),
        iTargetWidth = $container.width();

      // Skip videos we want to ignore.
      if ($video.hasClass("intrinsic-ignore") || $video.parent().hasClass("intrinsic-ignore")) {
        return true;
      }

      if (!$video.attr("data-origwidth")) {
        // Get the video element proportions.
        $video.attr("data-origwidth", $video.attr("width"));
        $video.attr("data-origheight", $video.attr("height"));
      }

      // Get ratio from proportions.
      var ratio = iTargetWidth / $video.attr("data-origwidth");

      // Scale based on ratio, thus retaining proportions.
      $video.css("width", iTargetWidth + "px");
      $video.css("height", $video.attr("data-origheight") * ratio + "px");
    });
  },
};

/* ------------------------------------------------------------------------------ /*
/*  SCROLL LOCK
/* ------------------------------------------------------------------------------ */

agtheme.scrollLock = {
  init: function () {
    // Initialize variables.
    (window.scrollLocked = false),
      (window.prevScroll = {
        scrollLeft: $agthemeWin.scrollLeft(),
        scrollTop: $agthemeWin.scrollTop(),
      }),
      (window.prevLockStyles = {}),
      (window.lockStyles = {
        "overflow-y": "scroll",
        position: "fixed",
        width: "100%",
      });

    // Instantiate cache in case someone tries to unlock before locking.
    agtheme.scrollLock.saveStyles();
  },

  // Save context's inline styles in cache.
  saveStyles: function () {
    var styleAttr = $("html").attr("style"),
      styleStrs = [],
      styleHash = {};

    if (!styleAttr) {
      return;
    }

    styleStrs = styleAttr.split(/;\s/);

    $.each(styleStrs, function serializeStyleProp(styleString) {
      if (!styleString) {
        return;
      }

      var keyValue = styleString.split(/\s:\s/);

      if (keyValue.length < 2) {
        return;
      }

      styleHash[keyValue[0]] = keyValue[1];
    });

    $.extend(prevLockStyles, styleHash);
  },

  // Lock the scroll
  lock: function () {
    var appliedLock = {};

    if (scrollLocked) {
      return;
    }

    // Save scroll state and styles
    prevScroll = {
      scrollLeft: $agthemeWin.scrollLeft(),
      scrollTop: $agthemeWin.scrollTop(),
    };

    agtheme.scrollLock.saveStyles();

    // Compose our applied CSS, with scroll state as styles.
    $.extend(appliedLock, lockStyles, {
      left: -prevScroll.scrollLeft + "px",
      top: -prevScroll.scrollTop + "px",
    });

    // Then lock styles and state.
    $("html").css(appliedLock);
    $("html").addClass("scroll-locked");
    $("html").attr("scroll-lock-top", prevScroll.scrollTop);
    $agthemeWin.scrollLeft(0).scrollTop(0);

    window.scrollLocked = true;
  },

  // Unlock the scroll.
  unlock: function () {
    if (!window.scrollLocked) {
      return;
    }

    // Revert styles and state.
    $("html").attr("style", $("<x>").css(prevLockStyles).attr("style") || "");
    $("html").removeClass("scroll-locked");
    $("html").attr("scroll-lock-top", "");
    $agthemeWin.scrollLeft(prevScroll.scrollLeft).scrollTop(prevScroll.scrollTop);

    window.scrollLocked = false;
  },

  // Call this to lock or unlock the scroll.
  setTo: function (on) {
    // If an argument is passed, lock or unlock accordingly.
    if (arguments.length) {
      if (on) {
        agtheme.scrollLock.lock();
      } else {
        agtheme.scrollLock.unlock();
      }
      // If not, toggle to the inverse state.
    } else {
      if (window.scrollLocked) {
        agtheme.scrollLock.unlock();
      } else {
        agtheme.scrollLock.lock();
      }
    }
  },
};

/* ------------------------------------------------------------------------------ /*
/*  FOCUS MANAGEMENT
/* ------------------------------------------------------------------------------ */

agtheme.focusManagement = {
  init: function () {
    // Focus loops.
    agtheme.focusManagement.focusLoops();
  },

  focusLoops: function () {
    // Add focus loops for the menu modal (which includes the #site-aside navigation toggle on desktop) and search modal.
    $agthemeDoc.on("keydown", function (e) {
      var $focusElement = $(":focus");

      if (e.keyCode == 9) {
        var $destination = false;

        // Get the first and last visible focusable elements in the menu modal, for comparison against the focused element.
        var $menuModalFocusable = $(".menu-modal")
            .find('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
            .filter(":visible"),
          $menuModalFirst = $menuModalFocusable.first(),
          $menuModalLast = $menuModalFocusable.last();

        // Tabbing backwards.
        if (e.shiftKey) {
          if ($focusElement.is("#site-aside .nav-toggle.active")) {
            $destination = $(".menu-modal a:visible:last");
          } else if ($focusElement.is($menuModalFirst)) {
            $destination = $("#site-aside .nav-toggle").is(":visible")
              ? $("#site-aside .nav-toggle")
              : $menuModalLast;
          } else if ($focusElement.is(".search-modal .search-field")) {
            $destination = $(".search-untoggle");
          }
        }

        // Tabbing forwards.
        else {
          if ($focusElement.is($menuModalLast)) {
            $destination = $("#site-aside .nav-toggle").is(":visible")
              ? $("#site-aside .nav-toggle")
              : $menuModalFirst;
          } else if ($focusElement.is("#site-aside .nav-toggle.active")) {
            $destination = $menuModalFirst;
          } else if ($focusElement.is(".search-untoggle")) {
            $destination = $(".search-modal .search-field");
          }
        }

        // If a destination is set, change focus.
        if ($destination) {
          $destination.focus();
          return false;
        }
      }
    });
  },
};

/* ------------------------------------------------------------------------------ /*
/*  NAV MENUS
/* ------------------------------------------------------------------------------ */

agtheme.navMenus = {
  init: function () {
    // If the current menu item is in a sub level, expand all the levels higher up on load.
    agtheme.navMenus.expandLevel();

    // Handle the menu modal when anchor links are clicked.
    agtheme.navMenus.anchorLinks();
  },

  // If the current menu item is in a sub level, expand all the levels higher up on load.
  expandLevel: function () {
    var $activeMenuItem = $(".main-menu .current-menu-item");

    if ($activeMenuItem.length !== false) {
      $activeMenuItem.parents("li").each(function () {
        $subMenuToggle = $(this).find(".sub-menu-toggle").first();

        if ($subMenuToggle.length) {
          $subMenuToggle.trigger("click");
        }
      });
    }
  },

  anchorLinks: function () {
    // Close any parent modal before scrolling
    $('.menu-modal a[href*="#"]:not([href="#"])').on("click", function () {
      agtheme.coverModals.untoggleModal($(".menu-modal"));

      var $target = $(this.hash).length ? $(this.hash) : $("[name=" + this.hash.slice(1) + "]");

      if ($target.length) {
        setTimeout(function () {
          var elementOffset = $target.offset().top,
            $stickyHeader = $(".header-sticky-adjuster");

          if ($stickyHeader.length) {
            elementOffset -= $stickyHeader.outerHeight();
          }

          $agthemeWin.scrollTop(elementOffset);
        }, 10);
      }
    });
  },
};

/* ------------------------------------------------------------------------------ /*
/*  LOAD MORE
/* ------------------------------------------------------------------------------ */

agtheme.loadMore = {
  init: function () {
    var $pagination = $("#pagination");

    // First, check that there's a pagination.
    if ($pagination.length) {
      // Default values for variables.
      window.agthemeIsLoading = false;
      window.agthemeIsLastPage = $(".pagination-wrapper").hasClass("last-page");

      agtheme.loadMore.prepare($pagination);
    }

    // When the pagination query args are updated, reset the posts to reflect the new pagination
    $agthemeWin.on("reset-posts", function () {
      // Fade out the pagination and existing posts.
      $pagination
        .add($($pagination.data("load-more-target")).find(".article-wrapper"))
        .animate({ opacity: 0 }, 300, "linear");

      // Reset posts.
      agtheme.loadMore.prepare($pagination, (resetPosts = true));
    });
  },

  prepare: function ($pagination, resetPosts) {
    // Default resetPosts to false.
    if (typeof resetPosts === "undefined" || !resetPosts) {
      resetPosts = false;
    }

    // Get the query arguments from the pagination element.
    var queryArgs = JSON.parse($pagination.attr("data-query-args"));

    // If we're resetting posts, reset them.
    if (resetPosts) {
      agtheme.loadMore.loadPosts($pagination, resetPosts);
    }

    // If not, check the paged value against the max_num_pages.
    else {
      if (queryArgs.paged == queryArgs.max_num_pages) {
        $(".pagination-wrapper").addClass("last-page");
      }

      // Get the load more type (button or scroll).
      var loadMoreType = $pagination.data("pagination-type") ? $pagination.data("pagination-type") : "button";

      // Do the appropriate load more detection, depending on the type.
      if (loadMoreType == "scroll") {
        agtheme.loadMore.detectScroll($pagination);
      } else if (loadMoreType == "button") {
        agtheme.loadMore.detectButtonClick($pagination);
      }
    }
  },

  // Load more on scroll
  detectScroll: function ($pagination, query_args) {
    $agthemeWin.on("did-interval-scroll", function () {
      // If it's the last page, or we're already loading, we're done here.
      if (agthemeIsLastPage || agthemeIsLoading) {
        return;
      }

      var paginationOffset = $pagination.offset().top,
        winOffset = $agthemeWin.scrollTop() + $agthemeWin.outerHeight();

      // If the bottom of the window is below the top of the pagination, start loading.
      if (winOffset > paginationOffset) {
        agtheme.loadMore.loadPosts($pagination, query_args);
      }
    });
  },

  // Load more on click.
  detectButtonClick: function ($pagination, query_args) {
    // Load on click.
    $("#load-more").on("click", function () {
      // Make sure we aren't already loading.
      if (agthemeIsLoading) {
        return;
      }

      agtheme.loadMore.loadPosts($pagination, query_args);
      return false;
    });
  },

  // Load the posts
  loadPosts: function ($pagination, resetPosts) {
    // Default resetPosts to false.
    if (typeof resetPosts === "undefined" || !resetPosts) {
      resetPosts = false;
    }

    // Get the query arguments.
    var queryArgs = $pagination.attr("data-query-args"),
      queryArgsParsed = JSON.parse(queryArgs),
      $paginationWrapper = $(".pagination-wrapper"),
      $articleWrapper = $($pagination.data("load-more-target"));

    // We're now loading.
    agthemeIsLoading = true;
    if (!resetPosts) {
      $paginationWrapper.addClass("loading");
    }

    // If we're not resetting posts, increment paged (reset = initial paged is correct).
    if (!resetPosts) {
      queryArgsParsed.paged++;
    } else {
      queryArgsParsed.paged = 1;
    }

    // Prepare the query args for submission.
    var jsonQueryArgs = JSON.stringify(queryArgsParsed);

    $.ajax({
      url: agtheme_ajax_load_more.ajaxurl,
      type: "post",
      data: {
        action: "agtheme_ajax_load_more",
        json_data: jsonQueryArgs,
      },
      success: function (result) {
        // Get the results.
        var $result = $(result);

        // If we're resetting posts, remove the existing posts.
        if (resetPosts) {
          $articleWrapper.find("*:not(.grid-sizer)").remove();
        }

        // If there are no results, we're at the last page.
        if (!$result.length) {
          agthemeIsLoading = false;
          $articleWrapper.addClass("no-results");
          $paginationWrapper.addClass("last-page").removeClass("loading");
        }

        if ($result.length) {
          $articleWrapper.removeClass("no-results");

          // Add the paged attribute to the articles, used by updateHistoryOnScroll().
          $result.find("article").each(function () {
            $(this).attr("data-post-paged", queryArgsParsed.paged);
          });

          // Wait for the images to load.
          $result.imagesLoaded(function () {
            // Append the results.
            $articleWrapper.append($result).isotope("appended", $result).isotope();

            $agthemeWin.trigger("ajax-content-loaded");
            $agthemeWin.trigger("did-interval-scroll");

            // We're now finished with the loading.
            agthemeIsLoading = false;
            $paginationWrapper.removeClass("loading");

            // Update the pagination query args.
            $pagination.attr("data-query-args", jsonQueryArgs);

            // Reset the resetting of posts.
            if (resetPosts) {
              setTimeout(function () {
                $pagination.animate({ opacity: 1 }, 600, "linear");
              }, 400);
              $("body").removeClass("filtering-posts");
            }

            // If that was the last page, make sure we don't check for more.
            if (queryArgsParsed.paged == queryArgsParsed.max_num_pages) {
              $paginationWrapper.addClass("last-page");
              agthemeIsLastPage = true;
              return;

              // If not, make sure the pagination is visible again.
            } else {
              $paginationWrapper.removeClass("last-page");
              agthemeIsLastPage = false;
            }
          });
        }
      },

      error: function (jqXHR, exception) {
        agthemeAjaxErrors(jqXHR, exception);
      },
    });
  },
};

/* ------------------------------------------------------------------------------ /*
/*  FILTERS
/* ------------------------------------------------------------------------------ */

agtheme.filters = {
  init: function () {
    console.log("init called"); // Add this line

    $agthemeDoc.on("click", ".filter-link", function () {
      event.stopPropagation(); // Add this line

      if ($(this).hasClass("active")) {
        return false;
      }

      $("body").addClass("filtering-posts");

      var $link = $(this),
        termId = $link.data("filter-term-id") ? $link.data("filter-term-id") : null,
        taxonomy = $link.data("filter-taxonomy") ? $link.data("filter-taxonomy") : null,
        postType = $link.data("filter-post-type") ? $link.data("filter-post-type") : "";

      $link.addClass("pre-active");

      $.ajax({
        url: agtheme_ajax_filters.ajaxurl,
        type: "post",
        data: {
          action: "agtheme_ajax_filters",
          post_type: postType,
          term_id: termId,
          taxonomy: taxonomy,
        },
        success: function (result) {
          console.log("Request data:", {
            action: "agtheme_ajax_filters",
            post_type: postType,
            term_id: termId,
            taxonomy: taxonomy,
          });

          // Check pagination and other data
          console.log("Pagination:", result.pagination);

          // Add them to the pagination.
          $("#pagination").attr("data-query-args", result);

          // Reset the posts.
          $agthemeWin.trigger("reset-posts");

          // Update active class.
          $(".filter-link").removeClass("pre-active active");
          $link.addClass("active");
        },

        error: function (jqXHR, exception) {
          agthemeAjaxErrors(jqXHR, exception);
        },
      });

      return false;
    });
  },
};

/* ------------------------------------------------------------------------------ /*
/*  ELEMENT IN VIEW
/* ------------------------------------------------------------------------------ */

agtheme.elementInView = {
  init: function () {
    $targets = $("body.has-anim .do-spot");
    agtheme.elementInView.run($targets);

    // Rerun on AJAX content loaded.
    $agthemeWin.on("ajax-content-loaded", function () {
      $targets = $("body.has-anim .do-spot");
      agtheme.elementInView.run($targets);
    });
  },

  run: function ($targets) {
    if ($targets.length) {
      // Add class indicating the elements will be spotted.
      $targets.each(function () {
        $(this).addClass("will-be-spotted");
      });

      agtheme.elementInView.handleFocus($targets);

      $agthemeWin.on("load resize orientationchange did-interval-scroll", function () {
        agtheme.elementInView.handleFocus($targets);
      });
    }
  },

  handleFocus: function ($targets) {
    // Check for our targets.
    $targets.each(function () {
      var $this = $(this);

      if (agtheme.elementInView.isVisible($this, (checkAbove = true))) {
        $this.addClass("spotted").trigger("spotted");
      }
    });
  },

  // Determine whether the element is in view.
  isVisible: function ($elem, checkAbove) {
    if (typeof checkAbove === "undefined") {
      checkAbove = false;
    }

    var winHeight = $agthemeWin.height(),
      docViewTop = $agthemeWin.scrollTop(),
      docViewBottom = docViewTop + winHeight,
      docViewLimit = docViewBottom,
      elemTop = $elem.offset().top;

    // For elements with a transform: translateY value, subtract the translateY value for the elemTop comparison point.
    // IE11 doesn't support WebKitCSSMatrix, so don't do it in IE11.
    var elemTransform = window.getComputedStyle($elem[0]).getPropertyValue("transform");
    if (elemTransform && !agthemeIsIE11) {
      var elemTransformMatrix = new WebKitCSSMatrix(elemTransform);

      if (elemTransformMatrix) {
        elemTranslateY = elemTransformMatrix.m42;

        if (elemTranslateY) {
          elemTop = elemTop - elemTranslateY;
        }
      }
    }

    // If checkAbove is set to true, which is default, return true if the browser has already scrolled past the element.
    if (checkAbove && elemTop <= docViewBottom) {
      return true;
    }

    // If not, check whether the scroll limit exceeds the element top.
    return docViewLimit >= elemTop;
  },
};

/* ------------------------------------------------------------------------------ /*
/*  GRID
/* ------------------------------------------------------------------------------ */

agtheme.grid = {
  init: function () {
    var $wrapper = $(".posts-grid");

    if ($wrapper.length) {
      $wrapper.imagesLoaded(function () {
        $grid = $wrapper.isotope({
          columnWidth: ".grid-sizer",
          itemSelector: ".js-grid-item",
          percentPosition: true,
          stagger: 0,
          transitionDuration: "0.25s",
          hiddenStyle: { opacity: 0 },
          visibleStyle: { opacity: 1 },
          layoutMode: $wrapper.data("layout") == "masonry" ? "masonry" : "fitRows",
        });

        // Trigger will-be-spotted elements.
        $grid.on("layoutComplete", function () {
          $agthemeWin.trigger("scroll");
        });

        // Check for Masonry layout changes on an interval. Accounts for DOM changes caused by lazyloading plugins.
        // The interval is cleared when all previews have been spotted.
        agtheme.grid.intervalUpdate($grid);

        // Reinstate the interval when new content is loaded.
        $agthemeWin.on("ajax-content-loaded", function () {
          agtheme.grid.intervalUpdate($grid);
        });
      });
    }
  },

  intervalUpdate: function ($grid) {
    var gridLayoutInterval = setInterval(function () {
      $grid.isotope();

      // Clear the interval when all previews have been spotted.
      if (!$(".preview.do-spot:not(.spotted)").length) {
        clearInterval(gridLayoutInterval);
      }
    }, 1000);
  },
};

/* ------------------------------------------------------------------------------ /*
/*  DYNAMIC HEIGHTS
/* ------------------------------------------------------------------------------ */

agtheme.dynamicHeights = {
  init: function () {
    agtheme.dynamicHeights.resize();

    $agthemeWin.on("resize orientationchange", function () {
      agtheme.dynamicHeights.resize();
    });
  },

  resize: function () {
    var $header = $("#site-header"),
      $footer = $("#site-footer"),
      $content = $("#site-content"),
      $adminBar = $("#wpadminbar"),
      headerHeight = $header.outerHeight(),
      barHeight = $adminBar.length ? $adminBar.innerHeight() : 0,
      contentHeight =
        $agthemeWin.outerHeight() -
        headerHeight -
        barHeight -
        parseInt($header.css("marginBottom")) -
        $footer.outerHeight() -
        parseInt($footer.css("marginTop"));

    // Set a min-height for the content.
    $content.css("min-height", contentHeight);

    // Set the desktop navigation toggle and search modal field to match the header height, including line-height of pseudo (thanks, Firefox).
    $("#site-aside .nav-toggle-inner").css("height", headerHeight);
    $(".search-modal .search-field").css("height", headerHeight);
    $(
      "<style>.modal-search-form .search-field::-moz-placeholder { line-height: " +
        headerHeight +
        "px }</style>"
    ).appendTo("head");
  },
};

/* ------------------------------------------------------------------------------ /*
/*  FADE ON SCROLL
/* ------------------------------------------------------------------------------ */

agtheme.fadeOnScroll = {
  init: function () {
    var scroll =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      // IE Fallback, you can even fallback to onscroll
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };

    function loop() {
      var windowOffset = window.pageYOffset;

      if (windowOffset < $agthemeWin.outerHeight()) {
        $(".fade-on-scroll").css({
          opacity: 1 - windowOffset * 0.00175,
        });
      }

      scroll(loop);
    }
    loop();
  },
};

/* ------------------------------------------------------------------------------ /*
/*  SMOOTH SCROLL
/* ------------------------------------------------------------------------------ */

agtheme.smoothScroll = {
  init: function () {
    if (window.location.hash) {
      var $target = $(window.location.hash);
      if ($target.length) {
        agtheme.smoothScroll.scrollToPosition($target.offset().top - 80, 1000);
      }
    }

    // Scroll to on-page elements by hash
    $('body.has-anim:not(.disable-smooth-scroll) a[href*="#"]')
      .not('[href="#"]')
      .not('[href="#0"]')
      .not(".disable-smooth-scroll")
      .on("click", function (e) {
        if (
          location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
          location.hostname == this.hostname
        ) {
          var $target = $(this.hash).length ? $(this.hash) : $("[name=" + this.hash.slice(1) + "]");
          agtheme.smoothScroll.scrollToTarget($target, $(this));
          e.preventDefault();
        }
      });

    // Scroll to elements specified with a data attribute
    $("body.has-anim *[data-scroll-to]").on("click", function (e) {
      var $target = $($(this).data("scroll-to"));
      agtheme.smoothScroll.scrollToTarget($target, $(this));
      e.preventDefault();
    });
  },

  // Scroll to target
  scrollToTarget: function ($target, $clickElem) {
    if ($target.length) {
      $("body").addClass("scrolling");

      var additionalOffset = -50,
        scrollSpeed = 1400;

      // Get options
      if ($clickElem && $clickElem.length) {
        (additionalOffset = $clickElem.data("scroll-offset")
          ? $clickElem.data("scroll-offset")
          : additionalOffset),
          (scrollSpeed = $clickElem.data("scroll-speed") ? $clickElem.data("scroll-speed") : scrollSpeed);
      }

      // Determine offset
      var originalOffset = $target.offset().top;

      // Special handling of scroll offset when scroll locked
      if ($("html").attr("scroll-lock-top")) {
        var originalOffset = parseInt($("html").attr("scroll-lock-top")) + $target.offset().top;
      }

      // If the header is sticky, subtract its height from the offset
      if ($("#site-header.stick-me").length) {
        var originalOffset = originalOffset - $("#site-header").outerHeight();
      }

      // If the header is sticky, subtract its height from the offset
      if ($(".header-inner.stick-me").length) {
        var originalOffset = originalOffset - $(".header-inner.stick-me").outerHeight();
      }

      // Close any parent modal before scrolling
      if ($clickElem.closest(".cover-modal").length) {
        agtheme.coverModals.untoggleModal($clickElem.closest(".cover-modal"));
      }

      // Add the additional offset
      var scrollOffset = originalOffset + additionalOffset;

      agtheme.smoothScroll.scrollToPosition(scrollOffset, scrollSpeed);
    }
  },

  // Scroll to position
  scrollToPosition: function (position, speed) {
    $("html, body").animate(
      {
        scrollTop: position,
      },
      speed,
      "easeInOutQuint",
      function () {
        $("body").removeClass("scrolling");
        $agthemeWin.trigger("did-interval-scroll");
      }
    );
  },

  updateHash: function (hash) {
    window.location.hash = hash;
  },
};

/* ------------------------------------------------------------------------------ /*
/*  INIT
/* ------------------------------------------------------------------------------ */

$agthemeDoc.ready(function () {
  agtheme.intervalScroll.init();
  agtheme.toggles.init();
  agtheme.coverModals.init();
  agtheme.elementInView.init();
  agtheme.responsiveEmbeds.init();
  agtheme.stickyHeader.init();
  agtheme.scrollLock.init();
  agtheme.navMenus.init();
  agtheme.focusManagement.init();
  agtheme.loadMore.init();
  agtheme.filters.init();
  agtheme.grid.init();
  agtheme.dynamicHeights.init();
  agtheme.fadeOnScroll.init();
  agtheme.smoothScroll.init();

  cssVars(); // css-vars-ponyfill
});
