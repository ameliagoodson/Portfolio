import * as THREE from "three";
import ChromeTextScene from "./chrome-text.js";

// Initialize the Three.js chrome text effect in the hero section
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("three-hero");

  if (!canvas) {
    console.warn("Canvas element #three-hero not found");
    return;
  }

  // console.log("Initializing Chrome Text Scene...");

  // Get the hero container to properly size the canvas
  const heroSection = canvas.closest(".hero");

  // Create WebGL renderer with alpha for transparency
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
  });

  // Set pixel ratio - cap at 2x for all devices (Shopify's approach)
  // Using 3x on mobile spreads particles too thin, causing grey outlines
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(pixelRatio);

  // console.log("🖥️ Renderer pixel ratio:", {
  //   native: window.devicePixelRatio,
  //   used: pixelRatio,
  //   capped: pixelRatio < window.devicePixelRatio,
  // });

  // Function to resize canvas - force landscape aspect on portrait mobile
  const resizeCanvas = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Check if portrait orientation
    const isPortrait = viewportHeight > viewportWidth;

    if (isPortrait) {
      // On portrait mobile, render to a wider buffer for crisp text
      // Use setSize with updateStyle=false so CSS doesn't change
      const minAspectRatio = 1.4; // Landscape-ish aspect
      const renderWidth = Math.floor(viewportHeight * minAspectRatio);
      const renderHeight = viewportHeight;

      // Set renderer size without updating CSS (third parameter = false)
      renderer.setSize(renderWidth, renderHeight, false);

      // Manually set canvas CSS to viewport size
      canvas.style.width = viewportWidth + "px";
      canvas.style.height = viewportHeight + "px";

      // console.log("📱 Portrait mode:", {
      //   viewport: `${viewportWidth}x${viewportHeight}`,
      //   renderBuffer: `${renderWidth}x${renderHeight}`,
      //   pixelBuffer: `${renderWidth * pixelRatio}x${renderHeight * pixelRatio}`,
      // });
    } else {
      // Desktop/landscape - use actual viewport
      renderer.setSize(viewportWidth, viewportHeight);
    }
  };

  // Set initial size
  resizeCanvas();

  // Pass render dimensions to scene for proper scaling
  const getRenderDimensions = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const isPortrait = viewportHeight > viewportWidth;

    if (isPortrait) {
      const minAspectRatio = 1.4;
      return {
        width: Math.floor(viewportHeight * minAspectRatio),
        height: viewportHeight,
      };
    }
    return {
      width: viewportWidth,
      height: viewportHeight,
    };
  };

  // Initialize the chrome text scene
  // Scene handles its own animation loop internally
  const scene = new ChromeTextScene(renderer, canvas, getRenderDimensions);

  // console.log("✅ Chrome Text Scene initialized");

  // Handle window resize
  window.addEventListener("resize", resizeCanvas);

  // Use IntersectionObserver to manage visibility for smoother scroll transitions
  // Observe the hero--threejs section specifically
  const heroThreejs = document.querySelector(".hero--threejs");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (scene.setVisible) {
          scene.setVisible(entry.isIntersecting);
        }
      });
    },
    {
      // No margin - pause immediately when hero leaves viewport
      rootMargin: "0px",
      threshold: 0,
    }
  );

  // Observe the hero--threejs section
  if (heroThreejs) {
    observer.observe(heroThreejs);
  }
});
