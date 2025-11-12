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

const float matcapRotation = 3.1459;
const float threshold = 0.25; // Lowered to capture more gradient (less grey borders)
const float cutoff = 0.5; // Lowered slightly for softer edges
const float strength = 4.5; // Reduced to sample more colorful center of matcap
const float offsetStrength = 0.008;

// Helper function to sample with threshold
float sampleWithThreshold(vec2 uv) {
  float value = texture2D(uBlurredTexture, uv).r;
  return value > threshold ? value : 0.0;
}

// Multi-step sampling for smoother normals
// This loop won't run for any fragments outside the blur
const int STEPS = 15;

void main() {
  // Get the center sample and apply threshold
  float normalSample = sampleWithThreshold(vUv);

  // Skip transparent pixels
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
  constructor(renderer, canvas) {
    this.renderer = renderer;
    this.canvas = canvas;

    // === CONFIGURATION OPTIONS ===
    // Organized from FASTEST (Option 1) to SLOWEST (Option 3)

    // OPTION 1: Fastest - Smallest buffer, 32k particles (~2.5M pixels)
    // this.OFFSCREEN_WIDTH = 1600 * 1.5; // 2400
    // this.OFFSCREEN_HEIGHT = 700 * 1.5; // 1050
    // this.SCALE = 2;
    // this.GRID_WIDTH = 256;
    // this.GRID_HEIGHT = 128;

    // OPTION 2: Balanced - Shopify's dimensions, 32k particles (~3.1M pixels)
    this.OFFSCREEN_WIDTH = 1340 * 2; // 2680
    this.OFFSCREEN_HEIGHT = 584 * 2; // 1168
    this.SCALE = 2.58;
    this.GRID_WIDTH = 256;
    this.GRID_HEIGHT = 128;

    // OPTION 3: Slowest - Higher quality, 131k particles (~2.5M pixels)
    // this.OFFSCREEN_WIDTH = 1600 * 1.5; // 2400
    // this.OFFSCREEN_HEIGHT = 700 * 1.5; // 1050
    // this.SCALE = 2;
    // this.GRID_WIDTH = 512;
    // this.GRID_HEIGHT = 256;

    this.PARTICLE_COUNT = this.GRID_WIDTH * this.GRID_HEIGHT;

    this.isTouchDevice = "ontouchstart" in window;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
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
    window.addEventListener("mousemove", this.mouseMoveHandler);

    this.resizeHandler = this.onWindowResize.bind(this);
    window.addEventListener("resize", this.resizeHandler);

    // Listen for browser zoom changes (Cmd/Ctrl +/-)
    if (window.visualViewport) {
      this.visualViewport = window.visualViewport;
      this.zoomHandler = () => {
        // Reset baseline when zoom changes
        this.baselineQuadScale = null;
      };
      this.visualViewport.addEventListener("resize", this.zoomHandler);
    }

    this.init();
  }

  handleMouseMove(event) {
    const now = performance.now();
    const dt = Math.max(now - this.lastMoveTime, 16);

    this.lastMouse.copy(this.mouse);

    // Normalized device coordinates (-1 to 1) relative to canvas
    const rect = this.canvas.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

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

    // Initialize parameters
    this.params = {
      pushStrength: 150,
      interactionRadius: 0.04,
      velocityScale: 150,
      maxVelocity: 10,
      velocitySmoothing: 0.2,
      threshold: 0.25,
      cutoff: 0.5,
      strength: 4.5,
      pointSize: 20.0,
    };

    // Load textures
    const loader = new THREE.TextureLoader();

    // Get the theme URL from WordPress
    const themeUrl = window.agtheme_config?.themeUrl || "";

    // SWAP YOUR "FONT" TEXTURE HERE:
    const POSITION_TEXTURE = "hero-text-11-southwave.png"; // Change this to test different fonts

    const [positionTexture, matcapTexture] = await Promise.all([
      new Promise((resolve) =>
        loader.load(`${themeUrl}/assets/textures/${POSITION_TEXTURE}`, resolve)
      ),
      new Promise((resolve) =>
        loader.load(`${themeUrl}/assets/textures/matcap_512.png`, resolve)
      ),
    ]);

    console.log("✅ Textures loaded");

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

    // Create final scene
    this.setupFinalScene(matcapTexture);

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

    // Setup composer with blur
    this.composer = new EffectComposer(this.renderer);
    this.composer.setSize(this.OFFSCREEN_WIDTH, this.OFFSCREEN_HEIGHT);
    this.composer.addPass(
      new RenderPass(this.offscreenScene, this.offscreenCamera)
    );

    // Blur configuration - maintain quality
    // resolutionScale: higher = smoother but slower
    this.blurPass = new KawaseBlurPass({
      renderer: this.renderer,
      kernels: [0, 1, 2, 3, 4, 5, 6], // Full 7 passes for smooth chrome
      resolutionScale: 0.5, // Keep quality high
    });
    this.composer.addPass(this.blurPass);
  }

  setupFinalScene(matcapTexture) {
    // Final material using blurred texture
    this.finalMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uBlurredTexture: { value: null },
        uOpacity: { value: 1 },
        uMatcap: { value: matcapTexture },
        uIntroProgress: { value: 1.5 },
      },
      vertexShader: finalVertexShader,
      fragmentShader: finalFragmentShader,
      depthTest: false,
      transparent: true,
    });

    // Create fullscreen quad
    const planeHeight = 2 * (this.OFFSCREEN_HEIGHT / this.OFFSCREEN_WIDTH);
    const fsQuadGeometry = new THREE.PlaneGeometry(2, planeHeight);
    this.fullscreenQuad = new THREE.Mesh(fsQuadGeometry, this.finalMaterial);

    // Scale and position
    const aspectRatio = window.innerWidth / window.innerHeight;
    let scale = Math.min(1200, window.innerWidth) / window.innerWidth;

    if (aspectRatio > 1) {
      if (window.innerHeight < 500) scale *= 0.35;
      else if (window.innerHeight < 600) scale *= 0.5;
      else if (window.innerHeight < 700) scale *= 0.6;
      else if (window.innerHeight < 800) scale *= 0.65;
      else if (window.innerHeight < 900) scale *= 0.7;
      else if (window.innerHeight < 1100) scale *= 0.85;
      else if (window.innerHeight < 1200) scale *= 0.9;
    }

    const yOffset = aspectRatio > 1 ? 1 - 2 * 0.434 : 1 - 2 * 0.345;

    this.fullscreenQuad.position.y = yOffset;
    this.fullscreenQuad.scale.set(
      scale * this.SCALE,
      scale * this.SCALE * (window.innerWidth / window.innerHeight),
      1
    );

    this.scene.add(this.fullscreenQuad);
  }

  updateParticleSimulation(deltaTime) {
    // The quad is scaled and positioned, so we need to inverse-transform the mouse
    const quadScale = this.fullscreenQuad.scale;
    const quadPos = this.fullscreenQuad.position;

    // Store baseline scale on first run
    if (!this.baselineQuadScale) {
      this.baselineQuadScale = { x: quadScale.x, y: quadScale.y };
    }

    // Calculate dynamic compression factor based on offscreen dimensions and SCALE
    // Original Shopify (2680x1168, SCALE=2.58) used 0.87
    // Adjust proportionally for different setups
    const shopifyReference = { width: 1340 * 2, scale: 2.58, factor: 0.87 };
    const baseCompressionFactor =
      shopifyReference.factor *
      (shopifyReference.scale / this.SCALE) *
      (shopifyReference.width / this.OFFSCREEN_WIDTH);
    const scaleRatioX = this.baselineQuadScale.x / quadScale.x;
    const scaleRatioY = this.baselineQuadScale.y / quadScale.y;

    const transformedMouse = new THREE.Vector2(
      this.mouse.x * baseCompressionFactor * scaleRatioX,
      (this.mouse.y - quadPos.y) * baseCompressionFactor * scaleRatioY
    );

    this.simulationMaterial.uniforms.uMouse.value.copy(transformedMouse);

    // Debug output
    if (this.debugReadout) {
      this.debugReadout.innerHTML = `
        Raw: (${this.mouse.x.toFixed(3)}, ${this.mouse.y.toFixed(3)})<br>
        Transform: (${transformedMouse.x.toFixed(
          3
        )}, ${transformedMouse.y.toFixed(3)})<br>
        Compression: ${(baseCompressionFactor * scaleRatioX).toFixed(3)}<br>
        ScaleRatio: ${scaleRatioX.toFixed(3)}
      `;
    }

    // Apply Shopify's exact velocity scaling
    const xVelocityScale = 0.5;
    const yVelocityScale = this.isTouchDevice ? 2.5 : 1.5;
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
    const deltaTime = Math.min(
      (now - (this.lastFrameTime || now)) / 1000,
      1 / 30
    );
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

    // Render final scene
    this.renderer.render(this.scene, this.camera);

    this.animationId = requestAnimationFrame(() => this.animate());
  }

  onWindowResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);

    // Update fullscreen quad scaling
    const aspectRatio = width / height;
    let scale = Math.min(1200, width) / width;

    if (aspectRatio > 1) {
      if (height < 500) scale *= 0.35;
      else if (height < 600) scale *= 0.5;
      else if (height < 700) scale *= 0.6;
      else if (height < 800) scale *= 0.65;
      else if (height < 900) scale *= 0.7;
      else if (height < 1100) scale *= 0.85;
      else if (height < 1200) scale *= 0.9;
    }

    const yOffset = aspectRatio > 1 ? 1 - 2 * 0.434 : 1 - 2 * 0.345;

    if (this.fullscreenQuad) {
      this.fullscreenQuad.position.y = yOffset;
      this.fullscreenQuad.scale.set(
        scale * this.SCALE,
        scale * this.SCALE * (width / height),
        1
      );

      // Reset baseline scale so compression factor recalculates
      this.baselineQuadScale = null;
    }
  }

  cleanup() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }

    if (this.mouseMoveHandler) {
      window.removeEventListener("mousemove", this.mouseMoveHandler);
    }

    if (this.resizeHandler) {
      window.removeEventListener("resize", this.resizeHandler);
    }

    if (this.zoomHandler && this.visualViewport) {
      this.visualViewport.removeEventListener("resize", this.zoomHandler);
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
