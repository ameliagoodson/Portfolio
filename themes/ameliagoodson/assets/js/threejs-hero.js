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

  // Create WebGL renderer with alpha for transparency
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true
  });

  // Set pixel ratio for sharp rendering on high-DPI displays
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Set initial size
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Initialize the chrome text scene
  // Scene handles its own animation loop internally
  new ChromeTextScene(renderer, canvas);

  console.log("✅ Chrome Text Scene initialized");

  // Handle window resize
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
