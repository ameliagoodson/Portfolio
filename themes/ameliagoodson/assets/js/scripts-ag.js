import * as THREE from "three";
import ScrollReveal from "scrollreveal";
import "./threejs-hero";

console.log("Three.js version:", THREE.REVISION);
console.log("Scripts loaded");

/* ------------------------------------------------------------------------------ /*
/*  NAMESPACE
/* ------------------------------------------------------------------------------ */
let agtheme;
if (typeof agtheme === "undefined") {
  agtheme = {};
}
const $ = jQuery;

/* ------------------------------------------------------------------------------ /*
/*  GLOBALS
/* ------------------------------------------------------------------------------ */

const $agthemeDoc = $(document);
const $agthemeWin = $(window);
const agthemeIsIE11 = !!window.MSInputMethodContext && !!document.documentMode;

/* ------------------------------------------------------------------------------ /*
/*  GRID
/* ------------------------------------------------------------------------------ */

// Posts grid now uses simple CSS Grid - no JavaScript needed
agtheme.grid = {
  init: function () {
    // Grid is handled by CSS Grid, no JavaScript initialization needed
  },
};

/* ------------------------------------------------------------------------------ /*
/*  SCROLL REVEAL JS
/* ------------------------------------------------------------------------------ */

document.addEventListener("DOMContentLoaded", function () {
  var sr = ScrollReveal({
    distance: "50px",
    duration: 1000,
    easing: "ease-in-out",
    origin: "bottom",
    reset: false,
  });

  // For posts grid, use ScrollReveal on the container instead of individual items
  if (document.querySelector(".posts-grid")) {
    sr.reveal(".posts-grid", {
      distance: "30px",
      duration: 800,
      viewFactor: 0, // Show even if not fully in viewport
      beforeReveal: function (el) {
        // Make all items visible before the animation starts
        document
          .querySelectorAll(".posts-grid .js-grid-item")
          .forEach(function (item) {
            item.style.opacity = "1";
            item.style.transform = "none";
          });
      },
      afterReveal: function (el) {
        // Grid is handled by CSS Grid, no layout refresh needed
      },
    });
  }

  // For bento cards, use ScrollReveal on individual items
  sr.reveal(".bento-card.reveal", {
    interval: 200,
  });

  // Regular reveals for other elements
  sr.reveal(".reveal:not(.bento-card)", {
    interval: 200,
  });

  sr.reveal(".reveal-100", { delay: 100 });
  sr.reveal(".reveal-200", { delay: 200 });
  sr.reveal(".reveal-300", { delay: 300 });
  sr.reveal(".reveal-400", { delay: 400 });
});

/* ------------------------------------------------------------------------------ /*
/*  INIT
/* ------------------------------------------------------------------------------ */

$agthemeDoc.ready(function () {
  agtheme.grid.init();
});
/* ------------------------------------------------------------------------------ /*
/*  BACK TO TOP BUTTON
/* ------------------------------------------------------------------------------ */

// window.addEventListener("scroll", displayButton);

// function displayButton() {
//   let btn = document.getElementById("btn-back-to-top");

//   if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
//     btn.classList.add("show");
//   } else {
//     btn.classList.remove("show");
//   }
// }

function backToTop() {
  document.body.scrollTop = 0; // for Safari
  document.documentElement.scrollTop = 0; // for other browsers
}

// ------------------------------------------------------------------------------ //
//  MOBILE HAMBURGER MENU
// ------------------------------------------------------------------------------ //

document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".hamburger-btn");

  button.addEventListener("click", function () {
    const mobileMenu = document.querySelector(".mobile-menu-container");

    if (mobileMenu) {
      const isActive = mobileMenu.classList.toggle("active");
      button.classList.toggle("active");
      document.body.classList.toggle("menu-open"); // prevent scrolling on mobile menu
      button.setAttribute("aria-expanded", isActive);
    }
  });
});
