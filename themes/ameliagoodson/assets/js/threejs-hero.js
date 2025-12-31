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
    console.log('📐 BEFORE setSize:', {
      'window.innerWidth': window.innerWidth,
      'window.innerHeight': window.innerHeight,
      'canvas.width': canvas.width,
      'canvas.height': canvas.height,
      'canvas.style.width': canvas.style.width,
      'canvas.style.height': canvas.style.height
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    console.log('📐 AFTER setSize:', {
      'canvas.width': canvas.width,
      'canvas.height': canvas.height,
      'canvas.style.width': canvas.style.width,
      'canvas.style.height': canvas.style.height,
      'EXPECTED canvas.width': window.innerWidth * pixelRatio,
      'EXPECTED canvas.height': window.innerHeight * pixelRatio
    });
  };

  // Set initial size
  resizeCanvas();

  // Initialize the chrome text scene
  // Scene handles its own animation loop internally
  new ChromeTextScene(renderer, canvas);

  console.log("✅ Chrome Text Scene initialized");

  // Additional mobile debugging
  console.log('🔍 Mobile debug:', {
    userAgent: navigator.userAgent,
    devicePixelRatio: window.devicePixelRatio,
    usedPixelRatio: pixelRatio,
    canvasElement: canvas,
    canvasParent: canvas.parentElement,
    canvasComputedStyle: window.getComputedStyle(canvas)
  });

  // Handle window resize
  window.addEventListener("resize", resizeCanvas);
});
