"use client";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform float uSmoothedRatio;  // Using the actual ratio instead of discrete states
  varying vec2 vUv;

  const float PI = 3.14159265359;

  // Pseudo-random function
  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  // 2D noise
  float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x)
         + (c - a)* u.y * (1.0 - u.x)
         + (d - b) * u.x * u.y;
  }

  // Fractal Brownian Motion
  float fbm(vec2 st) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    // More octaves for more detail
    for (int i = 0; i < 8; i++) {
      value += amplitude * noise(st * frequency);
      st += st * 1.2;
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    return value;
  }

  // Warping function
  vec2 warp(vec2 pos, float time) {
    vec2 offset = vec2(0.0);
    
    // Layer 1: Large slow movement
    offset.x += sin(pos.y * 2.0 + time * 0.5) * 0.2;
    offset.y += cos(pos.x * 2.0 + time * 0.3) * 0.2;
    
    // Layer 2: Medium frequency movement
    offset += vec2(
      sin(pos.y * 4.0 + time * 1.1 + offset.x) * 0.1,
      cos(pos.x * 4.0 + time * 0.9 + offset.y) * 0.1
    );
    
    // Layer 3: High frequency subtle movement
    offset += vec2(
      sin(pos.y * 8.0 + time * 2.0) * 0.05,
      cos(pos.x * 8.0 + time * 1.7) * 0.05
    );
    
    return pos + offset;
  }

  vec3 getColorPalette(float ratio, float time) {
    // -----------------------------------------------------------
    // 1) DEFINE MORE EXPANDED COLOR PALETTES FOR EACH STATE
    //    (Bright colors have been toned down)
    // -----------------------------------------------------------

    // Focus colors: "cool" blues/cyans
    vec3 focus1 = vec3(0.05, 0.20, 0.40); // Deep teal-blue
    vec3 focus2 = vec3(0.15, 0.35, 0.65); // Muted blue
    vec3 focus3 = vec3(0.00, 0.50, 0.70); // Brighter cyan
    vec3 focus4 = vec3(0.20, 0.60, 0.80); // Light blue
    
    // Slightly less bright than before:
    vec3 focus5 = vec3(0.00, 0.65, 0.80); // was 0.00, 0.75, 0.90
    vec3 focus6 = vec3(0.30, 0.80, 0.90); // was 0.40, 0.90, 1.00

    // Relaxation colors: "warm" oranges/reds/pinks
    vec3 relax1 = vec3(0.80, 0.20, 0.10); // Deep red
    vec3 relax2 = vec3(0.90, 0.35, 0.30); // Reddish-orange
    vec3 relax3 = vec3(1.00, 0.50, 0.40); // Orange-pink
    vec3 relax4 = vec3(0.95, 0.60, 0.40); // Warm peach

    // Slightly less bright than before:
    vec3 relax5 = vec3(1.00, 0.65, 0.45); // was 1.00, 0.70, 0.50
    vec3 relax6 = vec3(1.00, 0.80, 0.55); // was 1.00, 0.85, 0.60

    // Neutral colors: purples/soft blues
    vec3 neutral1 = vec3(0.40, 0.30, 0.50); // Purple-ish
    vec3 neutral2 = vec3(0.50, 0.40, 0.60); // Muted purple
    vec3 neutral3 = vec3(0.45, 0.50, 0.65); // Soft bluish-purple
    vec3 neutral4 = vec3(0.50, 0.60, 0.70); // Gray-blue

    // Slightly less bright than before:
    vec3 neutral5 = vec3(0.60, 0.50, 0.70); // was 0.65, 0.55, 0.75
    vec3 neutral6 = vec3(0.65, 0.60, 0.75); // was 0.70, 0.65, 0.80

    // -----------------------------------------------------------
    // 2) DECIDE BLEND FACTORS BASED ON RATIO
    // -----------------------------------------------------------
    float focusBlend   = smoothstep(1.4, 1.2, ratio);   // More focus below 1.4
    float relaxBlend   = smoothstep(1.8, 2.0, ratio);   // More relaxed above 2.0
    float neutralBlend = 1.0 - focusBlend - relaxBlend; // Everything in between

    // -----------------------------------------------------------
    // 3) TIME-BASED VARIATIONS
    // -----------------------------------------------------------
    float variation  = sin(time * 0.5)                * 0.5 + 0.5;
    float variation2 = cos(time * 0.7)                * 0.5 + 0.5;
    float variation3 = sin(time * 0.3 + PI / 3.0)     * 0.5 + 0.5;
    float variation4 = cos(time * 0.4 + PI / 6.0)     * 0.5 + 0.5;

    // -----------------------------------------------------------
    // 4) BLEND MULTIPLE COLORS WITHIN EACH STATE
    // -----------------------------------------------------------

    // -- Focus blend --
    vec3 fMix1 = mix(focus1, focus2, variation);
    vec3 fMix2 = mix(focus3, focus4, variation2);
    vec3 fMix3 = mix(focus5, focus6, variation3);

    vec3 fIntermediate = mix(fMix1, fMix2, sin(time * 0.4) * 0.5 + 0.5);
    vec3 focusColor = mix(fIntermediate, fMix3, cos(time * 0.3) * 0.5 + 0.5);

    // -- Relax blend --
    vec3 rMix1 = mix(relax1, relax2, variation);
    vec3 rMix2 = mix(relax3, relax4, variation2);
    vec3 rMix3 = mix(relax5, relax6, variation3);

    vec3 rIntermediate = mix(rMix1, rMix2, cos(time * 0.45) * 0.5 + 0.5);
    vec3 relaxColor = mix(rIntermediate, rMix3, sin(time * 0.37) * 0.5 + 0.5);

    // -- Neutral blend --
    vec3 nMix1 = mix(neutral1, neutral2, variation);
    vec3 nMix2 = mix(neutral3, neutral4, variation2);
    vec3 nMix3 = mix(neutral5, neutral6, variation3);

    vec3 nIntermediate = mix(nMix1, nMix2, sin(time * 0.35) * 0.5 + 0.5);
    vec3 neutralColor = mix(nIntermediate, nMix3, cos(time * 0.4) * 0.5 + 0.5);

    // -----------------------------------------------------------
    // 5) FINAL STATE BLEND (focus vs. neutral vs. relax)
    // -----------------------------------------------------------
    vec3 finalStateColor = focusColor * focusBlend 
                         + neutralColor * neutralBlend 
                         + relaxColor * relaxBlend;

    return finalStateColor;
  }

  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.3;
    
    // Create dynamic warping
    vec2 warpedUv = warp(uv, time);
    
    // Generate multiple layers of FBM noise with different scales and speeds
    float noise1 = fbm(warpedUv * 3.0 + vec2(time * 0.1));
    float noise2 = fbm(warpedUv * 2.0 - vec2(time * 0.15));
    float noise3 = fbm(warpedUv * 4.0 + vec2(sin(time * 0.2), cos(time * 0.3)));
    
    // Get color palette based on the smoothed ratio
    vec3 baseColor = getColorPalette(uSmoothedRatio, time);
    
    // Complex color blending with the base color
    vec3 finalColor = mix(
      mix(baseColor, baseColor * 1.2, noise1),
      mix(baseColor * 0.8, baseColor * 1.4, noise2),
      noise3
    );
    
    // Keep existing effects but adjust their intensity based on state
    float stateIntensity = uSmoothedRatio > 2.0 
      ? 1.2 
      : (uSmoothedRatio < 1.4 ? 0.8 : 1.0);
    
    // Add swirling effect
    float swirl = sin(length(uv - 0.5) * 8.0 - time * 2.0) * 0.5 + 0.5;
    finalColor = mix(finalColor, baseColor * 1.5, swirl * 0.1 * stateIntensity);
    
    // Dynamic vignette
    float vignette = length(uv - 0.5) * (1.0 + sin(time) * 0.2);
    finalColor *= smoothstep(1.2, 0.5, vignette);
    
    // Add pulsing highlights
    float pulse = sin(time * 2.0) * 0.5 + 0.5;
    float highlight = smoothstep(0.4, 0.6, noise3) * pulse;
    finalColor += highlight * 0.2 * stateIntensity;
    
    // Add subtle color aberration
    float aberration = 0.02 * stateIntensity;
    vec2 uvR = warp(uv + vec2(aberration, 0.0), time);
    vec2 uvB = warp(uv - vec2(aberration, 0.0), time);
    float noiseR = fbm(uvR * 3.0);
    float noiseB = fbm(uvB * 3.0);
    finalColor.r += noiseR * 0.05;
    finalColor.b += noiseB * 0.05;
    
    gl_FragColor = vec4(finalColor, 1.0);
  }
`;

export default function AnimatedBackground() {
  const containerRef = useRef();
  const [smoothedRatio, setSmoothedRatio] = useState(1.7);
  const ratioHistoryRef = useRef([]);
  const prevRatioRef = useRef(1.7);
  const HISTORY_LENGTH = 40;

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/eeg");
    let animationFrameId;

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.smoothed_ratio) {
        // Update ratio history
        ratioHistoryRef.current.push(data.smoothed_ratio);
        if (ratioHistoryRef.current.length > HISTORY_LENGTH) {
          ratioHistoryRef.current.shift();
        }

        // Calculate weighted moving average
        const weightedSum = ratioHistoryRef.current.reduce((acc, val, idx) => {
          const weight = (idx + 1) / ratioHistoryRef.current.length;
          return acc + val * weight;
        }, 0);

        const totalWeight = ratioHistoryRef.current.reduce((acc, _, idx) => {
          return acc + (idx + 1) / ratioHistoryRef.current.length;
        }, 0);

        const avgRatio = weightedSum / totalWeight;

        // Smooth transition between previous and new ratio
        const lerpFactor = 0.02; // Very smooth
        const newRatio =
          prevRatioRef.current + (avgRatio - prevRatioRef.current) * lerpFactor;

        prevRatioRef.current = newRatio;
        setSmoothedRatio(newRatio);
      }
    };

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });

    // Get container dimensions
    const container = containerRef.current;
    const { clientWidth: width, clientHeight: height } = container;
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Create plane geometry that fills the screen
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSmoothedRatio: { value: smoothedRatio },
      },
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    let lastTime = 0;
    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) * 0.001;
      lastTime = currentTime;

      material.uniforms.uTime.value += deltaTime * 0.3; // Keep it slow
      material.uniforms.uSmoothedRatio.value = smoothedRatio;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate(0);

    // Handle resize
    const handleResize = () => {
      const { clientWidth: width, clientHeight: height } = container;
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      ws.close();
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
    };
  }, [smoothedRatio]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
      }}
    />
  );
}
