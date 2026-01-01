import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import {
  Pass,
  FullScreenQuad,
} from "three/examples/jsm/postprocessing/Pass.js";
import { KawaseBlurPassGen } from "three-kawase-blur";

const KawaseBlurPass = KawaseBlurPassGen({
  THREE,
  EffectComposer,
  Pass,
  FullScreenQuad,
});

const simulationVertexShader = `varying vec2 vUv;

void main() {
  vUv = uv;

  gl_Position = vec4(position, 1.0);
}
`;

const simulationFragmentShader = `uniform sampler2D uParticleState;
uniform sampler2D uInitialState;
uniform vec2 uMouse;
uniform vec2 uMouseVelocity;
uniform float uDeltaTime;
uniform float uDamping;
uniform float uInteractionRadius;
uniform float uAspectRatio;
uniform float uPushStrength;

varying vec2 vUv;

const float springConstant = 11.0;
const float damping = 6.0; // Reduced from 8.0 for slightly faster response
const float maxVelocity = 1.7;

void main() {
  // Position is stored in the RG channels
  // Velocity is stored in the BA channels
  vec4 particleData = texture2D(uParticleState, vUv);
  vec2 pos = particleData.rg;
  vec2 velocity = particleData.ba;
  vec2 originalPos = texture2D(uInitialState, vUv).rg;
  float distToOriginal = distance(pos.xy, originalPos.xy);

  // Mouse interaction
  // The * 2.0 makes the brush a bit squashed in y direction so its not a circular brush
  vec2 mousePos = vec2(uMouse.x, uMouse.y * uAspectRatio * 2.0);
  vec2 dirToMouse = vec2(pos.x, pos.y * uAspectRatio * 2.0) - mousePos;
  float distToMouse = length(dirToMouse);

  float mouseSpeed = length(uMouseVelocity);

  // Calculate combined push force
  vec2 totalForce = vec2(0.0);
  if(distToMouse < uInteractionRadius) {
    float falloff = smoothstep(0.0, 1.0, 1.0 - distToMouse/uInteractionRadius);

    // Push force in direction of mouse velocity
    // Only apply push force when mouse is actually moving
    vec2 pushForce = vec2(0.0);
    if(mouseSpeed > 0.001) {
      pushForce = normalize(uMouseVelocity) * mouseSpeed * uPushStrength * falloff;
    }

    totalForce = pushForce;
  }

  vec2 springForce = (originalPos - pos) * springConstant;

  // Combine forces
  vec2 acceleration = totalForce + springForce;

  // Apply exponential damping (framerate independent)
  float dampingFactor = exp(-damping * uDeltaTime);
  vec2 newVelocity = velocity * dampingFactor + acceleration * uDeltaTime;

  if(length(newVelocity) > maxVelocity) {
    newVelocity = normalize(newVelocity) * maxVelocity;
  }

  vec2 newPos = pos + newVelocity * uDeltaTime;

  if (distToOriginal < 0.05 && length(newVelocity) < 0.05) {
    newPos = mix(pos, originalPos, 0.1);
    newVelocity = vec2(0.0);
  }

  // Store the new position in RG and velocity in BA
  gl_FragColor = vec4(newPos, newVelocity);
}
`;

const discVertexShader = `uniform sampler2D uPositions;
uniform sampler2D uInitialState;
uniform float uTime;

const float pointSize = 8.0; // Default only, gets replaced by rebuildDiscShader()

void main() {
  vec3 pos = texture2D(uPositions, position.xy).xyz;
  vec3 initialPos = texture2D(uInitialState, position.xy).xyz;

  float dist = distance(pos.xy, initialPos.xy);

  // Scale point size based on distance so that the blobs are more apparent the further they are
  float sizeMultiplier = 1.0 + dist * 6.0;

  gl_Position = vec4(pos.xy, 0.0, 1.0);

  gl_PointSize = pointSize * sizeMultiplier;
}
`;

const discFragmentShader = `uniform sampler2D uMap;

void main() {
  vec2 uv = gl_PointCoord;

  // Calculate distance from center (0.5, 0.5)
  float dist = distance(uv, vec2(0.5));

  if(dist > 0.5) {
    discard;
  }

  gl_FragColor = vec4(1.0);
}
`;

const finalVertexShader = `varying vec2 vUv;

void main() {
  vUv = uv;

  // No perspective transform so it's always looking head on
  gl_Position = modelMatrix * vec4(position, 1.0);
}
`;

const finalFragmentShader = `varying vec2 vUv;
uniform sampler2D uBlurredTexture;
uniform sampler2D uMatcap;
uniform float uOpacity;
uniform float uIntroProgress;
uniform float uThreshold;
uniform float uCutoff;

const float matcapRotation = 3.1459;
const float strength = 7.0; // Shopify's value - stronger normals
const float offsetStrength = 0.008;

// Helper function to sample with threshold
float sampleWithThreshold(vec2 uv) {
  float value = texture2D(uBlurredTexture, uv).r;
  return value > uThreshold ? value : 0.0;
}

// Multi-step sampling for smoother normals
// This loop won't run for any fragments outside the blur
const int STEPS = 15;

void main() {
  // Get the center sample and apply threshold
  float normalSample = sampleWithThreshold(vUv);

  // Skip transparent pixels
  if (normalSample <= uCutoff || uOpacity <= 0.0) {
    discard;
    return;
  }

  float stepSize = offsetStrength / float(STEPS);

  float sumDx = 0.0;
  float sumDy = 0.0;
  float weight = 0.0;
  float totalWeight = 0.0;

  for (int i = 1; i <= STEPS; i++) {
    float offset = float(i) * stepSize;
    weight = 1.0 - float(i) / float(STEPS); // Decreasing weight for farther samples

    // Sample in 4 directions
    float left = sampleWithThreshold(vec2(vUv.x - offset, vUv.y));
    float right = sampleWithThreshold(vec2(vUv.x + offset, vUv.y));
    float top = sampleWithThreshold(vec2(vUv.x, vUv.y - offset));
    float bottom = sampleWithThreshold(vec2(vUv.x, vUv.y + offset));

    // Calculate and accumulate weighted gradients
    sumDx += (right - left) * weight;
    sumDy += (bottom - top) * weight;
    totalWeight += weight;
  }

  // Normalize by total weight
  float dx = totalWeight > 0.0 ? sumDx / totalWeight : 0.0;
  float dy = totalWeight > 0.0 ? sumDy / totalWeight : 0.0;

  // Create normal
  vec3 normal = normalize(vec3(-dx * strength, -dy * strength, 1.0));

  // Sample matcap texture with rotation
  vec2 matcapUV = normal.xy * 0.5 + 0.5;

  float rotationOffset = 0.0;
  if (uIntroProgress > 0.2) {
    float rotationMask = clamp(vUv.x + 0.55 - uIntroProgress, 0.0, 1.0) * 2.0;
    rotationOffset = (1.0 - uIntroProgress) * 5.0 * rotationMask;
  }

  // Apply rotation to matcap UV
  float s = sin(matcapRotation + rotationOffset);
  float c = cos(matcapRotation + rotationOffset);
  vec2 matcapCenter = vec2(0.5, 0.5);
  vec2 rotatedUV = matcapCenter + mat2(c, -s, s, c) * (matcapUV - matcapCenter);

  vec3 matcapColor = texture2D(uMatcap, rotatedUV).rgb;

  vec3 color = matcapColor;

  float bloomBrightness = 65.0 * uIntroProgress;
  float bloomMask = clamp(vUv.x + 0.2 - uIntroProgress, 0.0, 1.0);
  float bloomFactor = bloomBrightness * bloomMask * bloomMask;

  gl_FragColor = vec4(color * 0.95 + vec3(5.0, 5.0, 12.0) * bloomFactor, normalSample * uOpacity);
}
`;

// Extract particles from texture
function extractParticlesFromTexture(texture, particleCount) {
  const data = new Float32Array(particleCount * 4);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not extract particle positions from texture");
  }

  canvas.width = texture.image.width;
  canvas.height = texture.image.height;
  ctx.drawImage(texture.image, 0, 0);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  const threshold = 200;
  let count = 0;
  const maxCount = particleCount;

  let minY = Infinity,
    maxY = -Infinity;

  // Extract pixels above threshold
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < canvas.width; x++) {
      const index = (y * canvas.width + x) * 4;
      if (imageData[index] > threshold && count < maxCount) {
        const particleIndex = count * 4;
        const normalizedX = (x / canvas.width) * 2 - 1;
        const normalizedY = -((y / canvas.height) * 2 - 1);
        data[particleIndex + 0] = normalizedX;
        data[particleIndex + 1] = normalizedY;
        data[particleIndex + 2] = 0; // velocity x
        data[particleIndex + 3] = 0; // velocity y

        minY = Math.min(minY, normalizedY);
        maxY = Math.max(maxY, normalizedY);

        count++;
      }
    }
  }

  console.log(
    "🔍 Particle Y range:",
    minY,
    "to",
    maxY,
    "(span:",
    maxY - minY,
    ")"
  );
  console.log("🔍 Total particles extracted:", count, "/", maxCount);

  // Fill remaining slots with zeros
  for (let i = count; i < particleCount; i++) {
    const particleIndex = i * 4;
    data[particleIndex + 0] = 0;
    data[particleIndex + 1] = 0;
    data[particleIndex + 2] = 0;
    data[particleIndex + 3] = 0;
  }

  return data;
}

class ShopifyDirectScene {
  constructor(renderer, canvas, getViewportDimensions) {
    this.renderer = renderer;
    this.canvas = canvas;
    this.getViewportDimensions =
      getViewportDimensions ||
      (() => ({
        width: window.innerWidth,
        height: window.innerHeight,
      }));

    // === CONFIGURATION OPTIONS ===
    // Use Shopify's EXACT buffer dimensions
    this.OFFSCREEN_WIDTH = 1340 * 2; // 2680 - Shopify's exact size
    this.OFFSCREEN_HEIGHT = 584 * 2; // 1168 - Shopify's exact size
    this.SCALE = 2.58; // Shopify's exact SCALE value
    this.GRID_WIDTH = 256; // Shopify's particle count
    this.GRID_HEIGHT = 128;

    console.log("🎨 Offscreen buffer (Shopify's exact settings):", {
      buffer: `${this.OFFSCREEN_WIDTH}x${this.OFFSCREEN_HEIGHT}`,
      scale: this.SCALE,
      particles: `${this.GRID_WIDTH}x${this.GRID_HEIGHT} = ${
        this.GRID_WIDTH * this.GRID_HEIGHT
      }`,
    });

    // OPTION 2: Balanced - Shopify's dimensions, 32k particles (~3.1M pixels)
    // this.OFFSCREEN_WIDTH = 1340 * 2; // 2680
    // this.OFFSCREEN_HEIGHT = 584 * 2; // 1168
    // this.SCALE = 2.58;
    // this.GRID_WIDTH = 256;
    // this.GRID_HEIGHT = 128;

    // OPTION 3: Slowest - Higher quality, 131k particles (~2.5M pixels)
    // this.OFFSCREEN_WIDTH = 1600 * 1.5; // 2400
    // this.OFFSCREEN_HEIGHT = 700 * 1.5; // 1050
    // this.SCALE = 2;
    // this.GRID_WIDTH = 512;
    // this.GRID_HEIGHT = 256;

    this.PARTICLE_COUNT = this.GRID_WIDTH * this.GRID_HEIGHT;

    // Original mobile detection (exactly as before)
    this.isTouchDevice = "ontouchstart" in window;

    console.log("📱 Device detection:", {
      isTouchDevice: this.isTouchDevice,
      screenWidth: window.innerWidth,
    });

    this.scene = new THREE.Scene();
    this.isVisible = true; // Track visibility for smooth scroll transitions

    // Use viewport dimensions for camera/scene (not render buffer size)
    const viewport = this.getViewportDimensions();
    const canvasWidth = viewport.width;
    const canvasHeight = viewport.height;

    console.log("📐 Scene dimensions:", {
      viewport: `${canvasWidth}x${canvasHeight}`,
      renderBuffer: `${this.renderer.domElement.width}x${this.renderer.domElement.height}`,
    });

    this.camera = new THREE.PerspectiveCamera(
      75,
      canvasWidth / canvasHeight,
      0.1,
      1000
    );
    this.camera.position.z = 2;

    this.scene.background = new THREE.Color(0x000000);

    // Mouse tracking
    this.mouse = new THREE.Vector2();
    this.mouseVelocity = new THREE.Vector2();
    this.lastMouse = new THREE.Vector2();
    this.lastMoveTime = performance.now();

    this.mouseMoveHandler = this.handleMouseMove.bind(this);
    this.touchMoveHandler = this.handleTouchMove.bind(this);
    window.addEventListener("mousemove", this.mouseMoveHandler);
    window.addEventListener("touchmove", this.touchMoveHandler, {
      passive: true,
    });
    window.addEventListener("touchstart", this.touchMoveHandler, {
      passive: true,
    });

    this.resizeHandler = this.onWindowResize.bind(this);
    window.addEventListener("resize", this.resizeHandler);

    this.init();
  }

  handleTouchMove(event) {
    // Convert touch event to mouse-like coordinates
    if (event.touches && event.touches.length > 0) {
      const touch = event.touches[0];
      // Create a fake event object with clientX/clientY
      this.handleMouseMove({
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
    }
  }

  handleMouseMove(event) {
    const now = performance.now();
    const dt = Math.max(now - this.lastMoveTime, 16);

    this.lastMouse.copy(this.mouse);

    // Normalized device coordinates (-1 to 1) using window dimensions like working version
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    const deltaX = this.mouse.x - this.lastMouse.x;
    const deltaY = this.mouse.y - this.lastMouse.y;

    const velocityScale = this.params?.velocityScale || 150;
    const rawVelX = (deltaX / dt) * velocityScale;
    const rawVelY = (deltaY / dt) * velocityScale;

    const velocitySmoothing = this.params?.velocitySmoothing || 0.5;
    this.mouseVelocity.x =
      this.mouseVelocity.x * velocitySmoothing +
      rawVelX * (1 - velocitySmoothing);
    this.mouseVelocity.y =
      this.mouseVelocity.y * velocitySmoothing +
      rawVelY * (1 - velocitySmoothing);

    const maxVelocity = this.params?.maxVelocity || 10.0;
    const velLength = Math.sqrt(
      this.mouseVelocity.x * this.mouseVelocity.x +
        this.mouseVelocity.y * this.mouseVelocity.y
    );
    if (velLength > maxVelocity) {
      this.mouseVelocity.x = (this.mouseVelocity.x / velLength) * maxVelocity;
      this.mouseVelocity.y = (this.mouseVelocity.y / velLength) * maxVelocity;
    }

    this.lastMoveTime = now;
  }

  createControlPanel() {
    const panel = document.createElement("div");
    panel.id = "mercury-controls";
    panel.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      width: 230px;
      max-height: 90vh;
      overflow-y: auto;
      background: transparent;
      color: white;
      padding: 20px;
      border-radius: 8px;
      font-family: monospace;
      font-size: 12px;
      z-index: 10000;
      border: none;
    `;

    const title = document.createElement("h3");
    title.textContent = "🌊 Liquid Mercury Controls";
    title.style.cssText = "margin: 0 0 15px 0; color: #fff; font-size: 14px;";
    panel.appendChild(title);

    // Debug readout
    this.debugReadout = document.createElement("div");
    this.debugReadout.style.cssText =
      "margin-bottom: 15px; color: #4a9eff; font-size: 10px; line-height: 1.4;";
    panel.appendChild(this.debugReadout);

    const createSlider = (label, min, max, step, defaultValue, onChange) => {
      const container = document.createElement("div");
      container.style.marginBottom = "15px";

      const labelEl = document.createElement("label");
      labelEl.textContent = `${label}: ${defaultValue}`;
      labelEl.style.cssText =
        "display: block; margin-bottom: 5px; color: #aaa;";

      const slider = document.createElement("input");
      slider.type = "range";
      slider.min = min;
      slider.max = max;
      slider.step = step;
      slider.value = defaultValue;
      slider.style.cssText = "width: 100%; cursor: pointer;";

      slider.addEventListener("input", (e) => {
        const value = parseFloat(e.target.value);
        labelEl.textContent = `${label}: ${value}`;
        onChange(value);
      });

      container.appendChild(labelEl);
      container.appendChild(slider);
      return container;
    };

    // Physics Controls
    const physicsTitle = document.createElement("h4");
    physicsTitle.textContent = "⚡ Physics";
    physicsTitle.style.cssText = "margin: 15px 0 10px 0; color: #4a9eff;";
    panel.appendChild(physicsTitle);

    panel.appendChild(
      createSlider("Push Strength", 10, 300, 10, 150, (v) => {
        this.params.pushStrength = v;
        if (this.simulationMaterial) {
          this.simulationMaterial.uniforms.uPushStrength.value = v;
        }
      })
    );

    panel.appendChild(
      createSlider("Interaction Radius", 0.01, 0.3, 0.01, 0.12, (v) => {
        this.params.interactionRadius = v;
        if (this.simulationMaterial) {
          this.simulationMaterial.uniforms.uInteractionRadius.value = v;
        }
      })
    );

    // Visual Controls
    const visualTitle = document.createElement("h4");
    visualTitle.textContent = "🎨 Visuals";
    visualTitle.style.cssText = "margin: 15px 0 10px 0; color: #ff4a9e;";
    panel.appendChild(visualTitle);

    panel.appendChild(
      createSlider("Threshold", 0.1, 0.5, 0.01, 0.25, (v) => {
        this.params.threshold = v;
        this.rebuildShader();
      })
    );

    panel.appendChild(
      createSlider("Cutoff", 0.3, 0.8, 0.05, 0.5, (v) => {
        this.params.cutoff = v;
        this.rebuildShader();
      })
    );

    panel.appendChild(
      createSlider("Normal Strength", 1, 10, 0.5, 4.5, (v) => {
        this.params.strength = v;
        this.rebuildShader();
      })
    );

    panel.appendChild(
      createSlider("Point Size", 2, 50, 0.5, 20, (v) => {
        this.params.pointSize = v;
        this.rebuildDiscShader();
      })
    );

    // Reset button
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset to Defaults";
    resetBtn.style.cssText = `
      width: 100%;
      padding: 10px;
      background: #333;
      color: white;
      border: 1px solid #666;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 15px;
      font-family: monospace;
    `;
    resetBtn.addEventListener("click", () => {
      location.reload();
    });
    panel.appendChild(resetBtn);

    document.body.appendChild(panel);
  }

  rebuildShader() {
    if (!this.finalMaterial) return;

    this.finalMaterial.fragmentShader = `varying vec2 vUv;
uniform sampler2D uBlurredTexture;
uniform sampler2D uMatcap;
uniform float uOpacity;
uniform float uIntroProgress;

const float matcapRotation = 3.1459;
const float threshold = ${this.params.threshold.toFixed(2)};
const float cutoff = ${this.params.cutoff.toFixed(2)};
const float strength = ${this.params.strength.toFixed(1)};
const float offsetStrength = 0.008;

float sampleWithThreshold(vec2 uv) {
  float value = texture2D(uBlurredTexture, uv).r;
  return value > threshold ? value : 0.0;
}

const int STEPS = 15;

void main() {
  float normalSample = sampleWithThreshold(vUv);

  if (normalSample <= cutoff || uOpacity <= 0.0) {
    discard;
    return;
  }

  float stepSize = offsetStrength / float(STEPS);
  float sumDx = 0.0;
  float sumDy = 0.0;
  float weight = 0.0;
  float totalWeight = 0.0;

  for (int i = 1; i <= STEPS; i++) {
    float offset = float(i) * stepSize;
    weight = 1.0 - float(i) / float(STEPS);

    float left = sampleWithThreshold(vec2(vUv.x - offset, vUv.y));
    float right = sampleWithThreshold(vec2(vUv.x + offset, vUv.y));
    float top = sampleWithThreshold(vec2(vUv.x, vUv.y - offset));
    float bottom = sampleWithThreshold(vec2(vUv.x, vUv.y + offset));

    sumDx += (right - left) * weight;
    sumDy += (bottom - top) * weight;
    totalWeight += weight;
  }

  float dx = totalWeight > 0.0 ? sumDx / totalWeight : 0.0;
  float dy = totalWeight > 0.0 ? sumDy / totalWeight : 0.0;

  vec3 normal = normalize(vec3(-dx * strength, -dy * strength, 1.0));
  vec2 matcapUV = normal.xy * 0.5 + 0.5;

  float rotationOffset = 0.0;
  if (uIntroProgress > 0.2) {
    float rotationMask = clamp(vUv.x + 0.55 - uIntroProgress, 0.0, 1.0) * 2.0;
    rotationOffset = (1.0 - uIntroProgress) * 5.0 * rotationMask;
  }

  float s = sin(matcapRotation + rotationOffset);
  float c = cos(matcapRotation + rotationOffset);
  vec2 matcapCenter = vec2(0.5, 0.5);
  vec2 rotatedUV = matcapCenter + mat2(c, -s, s, c) * (matcapUV - matcapCenter);

  vec3 matcapColor = texture2D(uMatcap, rotatedUV).rgb;
  vec3 color = matcapColor;

  float bloomBrightness = 65.0 * uIntroProgress;
  float bloomMask = clamp(vUv.x + 0.2 - uIntroProgress, 0.0, 1.0);
  float bloomFactor = bloomBrightness * bloomMask * bloomMask;

  gl_FragColor = vec4(color * 0.95 + vec3(5.0, 5.0, 12.0) * bloomFactor, normalSample * uOpacity);
}`;
    this.finalMaterial.needsUpdate = true;
  }

  rebuildDiscShader() {
    if (!this.discMaterial) return;

    this.discMaterial.vertexShader = `uniform sampler2D uPositions;
uniform sampler2D uInitialState;
uniform float uTime;

const float pointSize = ${this.params.pointSize.toFixed(1)};

void main() {
  vec3 pos = texture2D(uPositions, position.xy).xyz;
  vec3 initialPos = texture2D(uInitialState, position.xy).xyz;

  float dist = distance(pos.xy, initialPos.xy);
  float sizeMultiplier = 1.0 + dist * 6.0;

  gl_Position = vec4(pos.xy, 0.0, 1.0);
  gl_PointSize = pointSize * sizeMultiplier;
}`;
    this.discMaterial.needsUpdate = true;
  }

  async init() {
    console.log("🎨 Initializing Shopify Direct Scene...");

    // Initialize parameters - use window dimensions like working version
    const screenWidth = window.innerWidth;
    const isMobile = screenWidth < 900;

    this.params = {
      pushStrength: 150,
      interactionRadius: 0.04,
      velocityScale: 150,
      maxVelocity: 10,
      velocitySmoothing: 0.05,
      threshold: 0.36,
      cutoff: 0.6,
      strength: 7.0,
      pointSize: 20.0, // Shopify's exact value
    };

    console.log("🎨 Params:", {
      pointSize: this.params.pointSize,
      isMobile,
      screenWidth,
    });

    // Load textures
    const loader = new THREE.TextureLoader();

    // Get the theme URL from WordPress
    const themeUrl = window.agtheme_config?.themeUrl || "";

    // SWAP YOUR "FONT" TEXTURE HERE:
    const POSITION_TEXTURE = "hero-text-11-southwave.png"; // Shopify's PNG for comparison
    const CITYSCAPE_TEXTURE = "cityscape_06-edited-compressed.jpg"; // Cyberpunk background

    const [positionTexture, matcapTexture, cityscapeTexture] =
      await Promise.all([
        new Promise((resolve) =>
          loader.load(
            `${themeUrl}/assets/textures/${POSITION_TEXTURE}`,
            resolve
          )
        ),
        new Promise((resolve) =>
          loader.load(`${themeUrl}/assets/textures/matcap_512.png`, resolve)
        ),
        new Promise((resolve) =>
          loader.load(
            `${themeUrl}/assets/textures/${CITYSCAPE_TEXTURE}`,
            resolve
          )
        ),
      ]);

    console.log("✅ Textures loaded (including cityscape)");

    // Extract particles using Shopify's exact method
    const particleData = extractParticlesFromTexture(
      positionTexture,
      this.PARTICLE_COUNT
    );

    // Create initial state texture
    this.initialStateTexture = new THREE.DataTexture(
      particleData,
      this.GRID_WIDTH,
      this.GRID_HEIGHT,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    this.initialStateTexture.needsUpdate = true;

    // Create simulation render targets (ping-pong)
    const rtOptions = {
      minFilter: THREE.NearestFilter,
      magFilter: THREE.NearestFilter,
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
    };

    this.simulationRT1 = new THREE.WebGLRenderTarget(
      this.GRID_WIDTH,
      this.GRID_HEIGHT,
      rtOptions
    );
    this.simulationRT2 = new THREE.WebGLRenderTarget(
      this.GRID_WIDTH,
      this.GRID_HEIGHT,
      rtOptions
    );

    // Initialize simulation targets with initial state
    this.initializeSimulationTargets();

    // Create simulation material
    this.simulationMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uParticleState: { value: this.initialStateTexture },
        uInitialState: { value: this.initialStateTexture },
        uMouse: { value: new THREE.Vector2() },
        uMouseVelocity: { value: new THREE.Vector2() },
        uDeltaTime: { value: 0 },
        uInteractionRadius: {
          value: 0.04, // Default radius for nice liquid effect
        },
        uAspectRatio: {
          value: this.OFFSCREEN_HEIGHT / this.OFFSCREEN_WIDTH,
        },
        uPushStrength: { value: 150.0 }, // Dynamic push strength
      },
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });

    // Create offscreen rendering setup
    this.setupOffscreenRendering(matcapTexture);

    // Apply custom point size from params
    this.rebuildDiscShader();

    // Create final scene with background
    this.setupFinalScene(matcapTexture, cityscapeTexture);

    console.log("🚀 Shopify Direct Scene initialized");
    this.animate();
  }

  initializeSimulationTargets() {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshBasicMaterial({ map: this.initialStateTexture })
    );
    scene.add(quad);

    this.renderer.setRenderTarget(this.simulationRT1);
    this.renderer.render(scene, camera);
    this.renderer.setRenderTarget(this.simulationRT2);
    this.renderer.render(scene, camera);
    this.renderer.setRenderTarget(null);
  }

  setupOffscreenRendering(matcapTexture) {
    // Offscreen scene for rendering white discs
    this.offscreenScene = new THREE.Scene();
    this.offscreenCamera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    this.offscreenCamera.position.z = 1;

    // Create particle positions for rendering
    const positions = new Float32Array(this.PARTICLE_COUNT * 3);
    for (let i = 0; i < this.PARTICLE_COUNT; i++) {
      const x = (i % this.GRID_WIDTH) / this.GRID_WIDTH;
      const y = Math.floor(i / this.GRID_WIDTH) / this.GRID_HEIGHT;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = 0;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );

    // Disc rendering material
    this.discMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uPositions: { value: null },
        uInitialState: { value: this.initialStateTexture },
        uTime: { value: 0 },
      },
      vertexShader: discVertexShader,
      fragmentShader: discFragmentShader,
      transparent: false,
      depthTest: false,
    });

    this.offscreenPoints = new THREE.Points(geometry, this.discMaterial);
    this.offscreenPoints.scale.set(this.SCALE, this.SCALE, 1);
    this.offscreenScene.add(this.offscreenPoints);

    // Setup composer with blur - scale based on pixel ratio like Shopify
    this.composer = new EffectComposer(this.renderer);

    // Use offscreen dimensions directly - no pixel ratio scaling
    // This matches the working pure JS version
    this.composer.setSize(this.OFFSCREEN_WIDTH, this.OFFSCREEN_HEIGHT);
    this.composer.addPass(
      new RenderPass(this.offscreenScene, this.offscreenCamera)
    );

    // Blur configuration - match working pure JS version
    // Universal settings for all devices
    const blurKernels = [0, 1, 2, 3, 4, 5, 6]; // 7 passes
    const blurResolution = 0.5; // High quality

    console.log("🌀 Blur config (working version):", {
      passes: blurKernels.length,
      resolution: blurResolution,
    });

    console.log("🔧 Creating blur pass with:", { blurKernels, blurResolution });

    this.blurPass = new KawaseBlurPass({
      renderer: this.renderer,
      kernels: blurKernels,
      resolutionScale: blurResolution,
    });

    console.log("🔧 Blur pass created:", {
      passExists: !!this.blurPass,
      passType: this.blurPass?.constructor?.name,
      composerExists: !!this.composer,
      composerType: this.composer?.constructor?.name,
    });

    this.composer.addPass(this.blurPass);
  }

  setupFinalScene(matcapTexture, cityscapeTexture) {
    // Add cyberpunk cityscape background
    if (cityscapeTexture) {
      // Use ACTUAL viewport dimensions for background (not render buffer)
      // The render buffer may be wider than viewport on portrait mobile for text quality
      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      const canvasAspect = canvasWidth / canvasHeight;

      // Calculate visible area at background plane position
      // Camera is at z=2, background will be at z=-2, so distance = 4
      const distance = 4;
      const vFOV = (this.camera.fov * Math.PI) / 180; // Convert to radians
      const visibleHeight = 2 * Math.tan(vFOV / 2) * distance;
      const visibleWidth = visibleHeight * canvasAspect;

      // Get texture aspect ratio
      const textureAspect =
        cityscapeTexture.image.width / cityscapeTexture.image.height;

      // Calculate scale to cover (like CSS background-size: cover)
      let bgWidth, bgHeight;
      if (canvasAspect > textureAspect) {
        // Canvas is wider - fit to width
        bgWidth = visibleWidth;
        bgHeight = visibleWidth / textureAspect;
      } else {
        // Canvas is taller - fit to height
        bgHeight = visibleHeight;
        bgWidth = visibleHeight * textureAspect;
      }

      const bgGeometry = new THREE.PlaneGeometry(bgWidth, bgHeight);

      // Custom shader for neon flickering effect
      const bgMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: cityscapeTexture },
          uTime: { value: 0 },
          uBrightnessThreshold: { value: 0.7 }, // 0-1: Higher = only very bright pixels flicker
          uFlickerSpeed: { value: 2.0 }, // Speed of flickering (slower is more realistic)
          uFlickerIntensity: { value: 0.5 }, // How much brightness varies (0-1)

          // Color filtering - multiple target colors
          uTargetColor1: { value: new THREE.Vector3(0.0, 0.8, 1.0) }, // Cyan neons
          uTargetColor2: { value: new THREE.Vector3(0.96, 0.07, 0.76) }, // Magenta neons (#F513C3)
          uTargetColor3: { value: new THREE.Vector3(0.996, 0.651, 0.333) }, // Orange neons (#FEA655)
          uColorTolerance: { value: 0.99 }, // How close color must be to target colors

          // Location filtering (set both to 0,0,1,1 to disable)
          uRegionMin: { value: new THREE.Vector2(0.0, 0.0) }, // Min UV coords (left, bottom)
          uRegionMax: { value: new THREE.Vector2(1.0, 1.0) }, // Max UV coords (right, top)
        },
        vertexShader: `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D uTexture;
          uniform float uTime;
          uniform float uBrightnessThreshold;
          uniform float uFlickerSpeed;
          uniform float uFlickerIntensity;
          uniform vec3 uTargetColor1;
          uniform vec3 uTargetColor2;
          uniform vec3 uTargetColor3;
          uniform float uColorTolerance;
          uniform vec2 uRegionMin;
          uniform vec2 uRegionMax;

          varying vec2 vUv;

          // Noise function for randomness
          float hash(vec2 p) {
            return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
          }

          float noise(vec2 p) {
            vec2 i = floor(p);
            vec2 f = fract(p);
            f = f * f * (3.0 - 2.0 * f);

            float a = hash(i);
            float b = hash(i + vec2(1.0, 0.0));
            float c = hash(i + vec2(0.0, 1.0));
            float d = hash(i + vec2(1.0, 1.0));

            return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
          }

          void main() {
            vec4 texColor = texture2D(uTexture, vUv);

            // Calculate brightness
            float brightness = max(texColor.r, max(texColor.g, texColor.b));

            // Check if pixel passes brightness threshold
            bool passesBrightness = brightness > uBrightnessThreshold;

            // Check if pixel is in target region (if region filtering is enabled)
            bool inRegion = (vUv.x >= uRegionMin.x && vUv.x <= uRegionMax.x &&
                            vUv.y >= uRegionMin.y && vUv.y <= uRegionMax.y);

            // Check if pixel matches any target color (if color filtering is enabled)
            bool matchesColor = false;

            // Check if any target color is active (not black)
            if (length(uTargetColor1) > 0.01) {
              float colorDistance1 = distance(texColor.rgb, uTargetColor1);
              if (colorDistance1 < uColorTolerance) {
                matchesColor = true;
              }
            }

            if (length(uTargetColor2) > 0.01) {
              float colorDistance2 = distance(texColor.rgb, uTargetColor2);
              if (colorDistance2 < uColorTolerance) {
                matchesColor = true;
              }
            }

            if (length(uTargetColor3) > 0.01) {
              float colorDistance3 = distance(texColor.rgb, uTargetColor3);
              if (colorDistance3 < uColorTolerance) {
                matchesColor = true;
              }
            }

            // If no color filters active, match all colors
            if (length(uTargetColor1) < 0.01 && length(uTargetColor2) < 0.01 && length(uTargetColor3) < 0.01) {
              matchesColor = true;
            }

            // Only apply flickering if all conditions pass
            if (passesBrightness && inRegion && matchesColor) {
              // Create smooth position-based variation using noise instead of hash for less grain
              vec2 positionSeed = vUv * 5.0; // Lower frequency = bigger zones
              float positionPhase = noise(positionSeed) * 6.28318; // Smooth phase offset

              // Each area gets its own time offset based on position
              float localTime = uTime * uFlickerSpeed + positionPhase;

              // Multi-layered noise for organic flicker
              float flickerNoise1 = noise(vec2(localTime, positionPhase));
              float flickerNoise2 = noise(vec2(localTime * 0.5, positionPhase + 10.0));

              // Combine for more interesting variation
              float flickerNoise = flickerNoise1 * 0.7 + flickerNoise2 * 0.3;

              // More dramatic flicker range - can go from 0.5x to 1.4x brightness
              float flickerAmount = 0.5 + flickerNoise * 0.9;

              // Apply flicker to color
              texColor.rgb *= flickerAmount;
            }

            gl_FragColor = texColor;
          }
        `,
        depthTest: false,
        transparent: false,
      });

      this.backgroundPlane = new THREE.Mesh(bgGeometry, bgMaterial);
      this.backgroundPlane.position.z = -2; // Behind chrome text

      // Compensate for aspect ratio distortion on portrait mobile
      // The render buffer is wider than the viewport, so the CSS squishes horizontally
      // We need to stretch the background to counteract this squish
      const renderDimensions = this.getViewportDimensions();
      const renderAspect = renderDimensions.width / renderDimensions.height;
      const viewportAspect = canvasWidth / canvasHeight;

      if (renderAspect > viewportAspect) {
        // Render buffer is wider than viewport - CSS will squish horizontally
        // Stretch background horizontally to compensate
        const stretchFactor = renderAspect / viewportAspect;
        this.backgroundPlane.scale.x = stretchFactor;
        console.log("🖼️ Background aspect compensation:", {
          renderAspect: renderAspect.toFixed(3),
          viewportAspect: viewportAspect.toFixed(3),
          stretchFactor: stretchFactor.toFixed(3),
        });
      }

      this.scene.add(this.backgroundPlane);

      console.log("🖼️ Background sizing:", {
        actualViewport: `${canvasWidth}x${canvasHeight}`,
        canvasAspect: canvasAspect.toFixed(3),
        textureAspect: textureAspect.toFixed(3),
        textureDimensions: `${cityscapeTexture.image.width}x${cityscapeTexture.image.height}`,
        visibleArea: `${visibleWidth.toFixed(2)}x${visibleHeight.toFixed(2)}`,
        bgSize: `${bgWidth.toFixed(2)}x${bgHeight.toFixed(2)}`,
        branch:
          canvasAspect > textureAspect
            ? "wider (fit width)"
            : "taller (fit height)",
      });
    }

    // Final material using blurred texture - use window dimensions like working version

    this.finalMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uBlurredTexture: { value: null },
        uOpacity: { value: 1 },
        uMatcap: { value: matcapTexture },
        uIntroProgress: { value: 1.5 },
        uThreshold: { value: 0.36 }, // Shopify's value - filters weak blur
        uCutoff: { value: 0.6 }, // Shopify's exact value
      },
      vertexShader: finalVertexShader,
      fragmentShader: finalFragmentShader,
      depthTest: false,
      transparent: true,
    });

    console.log("🎨 Shader thresholds (universal):", {
      threshold: this.finalMaterial.uniforms.uThreshold.value,
      cutoff: this.finalMaterial.uniforms.uCutoff.value,
    });

    // Create fullscreen quad
    const planeHeight = 2 * (this.OFFSCREEN_HEIGHT / this.OFFSCREEN_WIDTH);
    const fsQuadGeometry = new THREE.PlaneGeometry(2, planeHeight);
    this.fullscreenQuad = new THREE.Mesh(fsQuadGeometry, this.finalMaterial);

    // Scale and position using window dimensions like working version
    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const aspectRatio = canvasWidth / canvasHeight;

    // Shopify's universal scale formula - from working version
    let scale = Math.min(1200, canvasWidth) / canvasWidth;
    const initialScale = scale;

    if (aspectRatio > 1) {
      if (canvasHeight < 500) scale *= 0.35;
      else if (canvasHeight < 600) scale *= 0.5;
      else if (canvasHeight < 700) scale *= 0.6;
      else if (canvasHeight < 800) scale *= 0.65;
      else if (canvasHeight < 900) scale *= 0.7;
      else if (canvasHeight < 1100) scale *= 0.85;
      else if (canvasHeight < 1200) scale *= 0.9;
    }

    console.log("📏 Text scaling (working version):", {
      canvasWidth,
      canvasHeight,
      aspectRatio: aspectRatio.toFixed(2),
      initialScale: initialScale.toFixed(3),
      finalScale: scale.toFixed(3),
      scaledByAspect: initialScale !== scale,
    });

    // Push text down to account for semi-transparent header
    // Lower values = further down the screen
    const yOffset =
      aspectRatio > 1 ? 1 - 2 * 0.434 - 0.35 : 1 - 2 * 0.345 - 0.35;

    this.fullscreenQuad.position.y = yOffset;

    // Multiply by this.SCALE like the working version
    this.fullscreenQuad.scale.set(
      scale * this.SCALE,
      scale * this.SCALE * (canvasWidth / canvasHeight),
      1
    );

    console.log("🎯 ACTUAL mesh scale:", {
      scaleValue: scale,
      SCALE: this.SCALE,
      finalScaleX: scale * this.SCALE,
      finalScaleY: scale * this.SCALE * (canvasWidth / canvasHeight),
      meshScale: this.fullscreenQuad.scale,
    });

    this.scene.add(this.fullscreenQuad);
  }

  updateParticleSimulation(deltaTime) {
    const quadScale = this.fullscreenQuad.scale;
    const quadPos = this.fullscreenQuad.position;

    // Use Shopify's coordinate transformation for BOTH mobile and desktop
    // Only velocity scaling differs between devices
    // Shopify: ze = Se.x / (H * i), x = ((-(Se.y + w) / H) * Ce) / (i * (r / o))

    const canvasWidth = window.innerWidth;
    const canvasHeight = window.innerHeight;
    const aspectRatio = canvasHeight / canvasWidth; // Ce in Shopify
    const textureAspect = this.OFFSCREEN_HEIGHT / this.OFFSCREEN_WIDTH; // r/o in Shopify

    // Extract the scale factor (H in Shopify) - quadScale.x = scale * SCALE
    const scale = quadScale.x / this.SCALE;
    const yOffset = quadPos.y; // w in Shopify

    // Transform X: ze = Se.x / (H * i)
    const transformedMouseX = this.mouse.x / (scale * this.SCALE);

    // Transform Y: x = ((-(Se.y + w) / H) * Ce) / (i * (r / o))
    const transformedMouseY =
      (((this.mouse.y - yOffset) / scale) * aspectRatio) /
      (this.SCALE * textureAspect);

    const transformedMouse = new THREE.Vector2(
      transformedMouseX,
      transformedMouseY
    );

    // Velocity scaling differs by device type
    const xVelocityScale = aspectRatio * 0.5;
    const yVelocityScale = this.isTouchDevice ? 2.5 : 1.5;

    this.simulationMaterial.uniforms.uMouse.value.copy(transformedMouse);

    // Debug output
    if (this.debugReadout) {
      this.debugReadout.innerHTML = `
        Raw: (${this.mouse.x.toFixed(3)}, ${this.mouse.y.toFixed(3)})<br>
        Transform: (${transformedMouseX.toFixed(
          3
        )}, ${transformedMouseY.toFixed(3)})<br>
        Scale: ${scale.toFixed(3)}, AR: ${aspectRatio.toFixed(3)}<br>
        Device: ${this.isTouchDevice ? "Touch" : "Desktop"}
      `;
    }

    this.simulationMaterial.uniforms.uMouseVelocity.value.set(
      this.mouseVelocity.x * xVelocityScale,
      this.mouseVelocity.y * yVelocityScale
    );
    this.simulationMaterial.uniforms.uDeltaTime.value = deltaTime;

    // Ping-pong render targets
    const inputTarget = this.simulationRT1;
    const outputTarget = this.simulationRT2;

    this.simulationMaterial.uniforms.uParticleState.value = inputTarget.texture;

    // Render simulation step
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const quad = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      this.simulationMaterial
    );
    scene.add(quad);

    this.renderer.setRenderTarget(outputTarget);
    this.renderer.render(scene, camera);
    this.renderer.setRenderTarget(null);

    // Swap targets
    this.simulationRT1 = outputTarget;
    this.simulationRT2 = inputTarget;

    // Update disc shader with new positions
    this.discMaterial.uniforms.uPositions.value = outputTarget.texture;
  }

  animate() {
    const now = performance.now();
    let deltaTime = (now - (this.lastFrameTime || now)) / 1000;

    // If deltaTime is very large (>100ms), we were likely offscreen/throttled
    // Use a small deltaTime to prevent jarring "catch up" animations
    if (deltaTime > 0.1) {
      deltaTime = 1 / 60; // Pretend only one frame passed
    } else {
      deltaTime = Math.min(deltaTime, 1 / 30);
    }

    this.lastFrameTime = now;

    // Decay mouse velocity when not moving
    const timeSinceLastMove = now - this.lastMoveTime;
    if (timeSinceLastMove > 50) {
      const decay = Math.exp(-timeSinceLastMove * 0.01);
      this.mouseVelocity.x *= decay;
      this.mouseVelocity.y *= decay;
    }

    // Update simulation
    this.updateParticleSimulation(deltaTime);

    // Render offscreen (white discs)
    this.composer.render();

    // Update final material with blurred texture
    this.finalMaterial.uniforms.uBlurredTexture.value =
      this.composer.readBuffer.texture;

    // Update background shader time for neon flickering
    if (this.backgroundPlane && this.backgroundPlane.material.uniforms) {
      this.backgroundPlane.material.uniforms.uTime.value = now * 0.001; // Convert to seconds
    }

    // Render final scene
    this.renderer.render(this.scene, this.camera);

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  setVisible(isVisible) {
    // Called by IntersectionObserver when canvas enters/exits viewport
    const wasVisible = this.isVisible;
    this.isVisible = isVisible;

    if (isVisible && !wasVisible) {
      // Returning to view - reset timing and restart animation
      this.lastFrameTime = performance.now();
      this.lastMoveTime = performance.now();
      this.mouseVelocity.set(0, 0);

      // Restart animation loop if it was stopped
      if (!this.animationId) {
        console.log("🔄 Restarting animation loop");
        this.animate();
      }
    } else if (!isVisible && wasVisible) {
      // Going offscreen - stop animation to free resources
      if (this.animationId) {
        cancelAnimationFrame(this.animationId);
        this.animationId = null;
        console.log("⏸️ Pausing animation loop");
      }
    }
  }

  onWindowResize() {
    // Use viewport dimensions for camera (not render buffer size)
    const viewport = this.getViewportDimensions();
    const width = viewport.width;
    const height = viewport.height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    // Update fullscreen quad scaling
    const aspectRatio = width / height;

    // Responsive sizing - desktop working values
    let maxSize;
    if (width < 768) {
      maxSize = 900; // Mobile - TO BE FIXED
    } else if (width < 1200) {
      maxSize = 1100; // Small desktop/tablet - WORKING
    } else if (width < 2000) {
      maxSize = 1400; // Laptops - WORKING
    } else {
      maxSize = 1100; // Large displays - WORKING
    }
    let scale = Math.min(maxSize, width) / width;

    if (aspectRatio > 1) {
      if (height < 500) scale *= 0.35;
      else if (height < 600) scale *= 0.5;
      else if (height < 700) scale *= 0.6;
      else if (height < 800) scale *= 0.65;
      else if (height < 900) scale *= 0.7;
      else if (height < 1100) scale *= 0.85;
      else if (height < 1200) scale *= 0.9;
    }

    // Push text down to account for semi-transparent header
    const yOffset =
      aspectRatio > 1 ? 1 - 2 * 0.434 - 0.35 : 1 - 2 * 0.345 - 0.35;

    if (this.fullscreenQuad) {
      this.fullscreenQuad.position.y = yOffset;
      this.fullscreenQuad.scale.set(
        scale * this.SCALE,
        scale * this.SCALE * (width / height),
        1
      );
    }
  }

  cleanup() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    if (this.mouseMoveHandler) {
      window.removeEventListener("mousemove", this.mouseMoveHandler);
    }

    if (this.touchMoveHandler) {
      window.removeEventListener("touchmove", this.touchMoveHandler);
      window.removeEventListener("touchstart", this.touchMoveHandler);
    }

    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
    }

    if (this.simulationRT1) this.simulationRT1.dispose();
    if (this.simulationRT2) this.simulationRT2.dispose();
    if (this.initialStateTexture) this.initialStateTexture.dispose();

    if (this.offscreenPoints) {
      this.offscreenPoints.geometry.dispose();
      this.offscreenPoints.material.dispose();
    }

    if (this.fullscreenQuad) {
      this.fullscreenQuad.geometry.dispose();
      this.fullscreenQuad.material.dispose();
    }

    if (this.composer) {
      this.composer.dispose();
    }

    this.scene.clear();

    // Remove control panel
    const panel = document.getElementById("mercury-controls");
    if (panel) {
      panel.remove();
    }
  }
}

export default ShopifyDirectScene;
