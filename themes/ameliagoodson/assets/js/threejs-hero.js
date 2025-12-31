import * as THREE from "three";
import ChromeTextScene from "./chrome-text.js";

// Initialize the Three.js chrome text effect in the hero section
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("three-hero");

  if (!canvas) {
    console.warn("Canvas element #three-hero not found");
    return;
  }

  console.log("Initializing Chrome Text Scene...");

  // Get the hero container to properly size the canvas
  const heroSection = canvas.closest('.hero');

  // Create WebGL renderer with alpha for transparency
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });

  // Set pixel ratio - cap at 2x for all devices (Shopify's approach)
  // Using 3x on mobile spreads particles too thin, causing grey outlines
  const pixelRatio = Math.min(window.devicePixelRatio, 2);
  renderer.setPixelRatio(pixelRatio);

  console.log('🖥️ Renderer pixel ratio:', {
    native: window.devicePixelRatio,
    used: pixelRatio,
    capped: pixelRatio < window.devicePixelRatio
  });

  // Function to resize canvas to full window (like working version)
  const resizeCanvas = () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  // Set initial size
  resizeCanvas();

  // Initialize the chrome text scene
  // Scene handles its own animation loop internally
  new ChromeTextScene(renderer, canvas);

  console.log("✅ Chrome Text Scene initialized");

  // Handle window resize
  window.addEventListener("resize", resizeCanvas);
});
