"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import * as Noise from "ts-perlin-simplex";

const MetaballsPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

  const simplex = new Noise.SimplexNoise();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(15, 1, 0.1, 1000);
    camera.position.z = 10;
    camera.position.y = -0.4;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const light1 = new THREE.DirectionalLight(0xffffff, 1.5);
    light1.position.set(-15, 30, 50);
    light1.castShadow = true;
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 1.5);
    light2.position.set(-15, 0, 10);
    light2.castShadow = true;
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0x000000);
    scene.add(ambientLight);

    const vertexShader = `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    // Simplex noise function for 3D noise
    float hash(vec3 p) {
      p = fract(p * 0.3183099 + vec3(0.1, 0.1, 0.1));
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }
    
    float noise(vec3 p) {
      vec3 i = floor(p);
      vec3 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(mix(hash(i + vec3(0.0, 0.0, 0.0)), 
                          hash(i + vec3(1.0, 0.0, 0.0)), f.x),
                     mix(hash(i + vec3(0.0, 1.0, 0.0)), 
                          hash(i + vec3(1.0, 1.0, 0.0)), f.x), f.y),
                 mix(mix(hash(i + vec3(0.0, 0.0, 1.0)), 
                          hash(i + vec3(1.0, 0.0, 1.0)), f.x),
                     mix(hash(i + vec3(0.0, 1.0, 1.0)), 
                          hash(i + vec3(1.0, 1.0, 1.0)), f.x), f.y), f.z);
    }
    
    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
    }
    
    // Smooth gradient function
    vec3 colorGradient(float t) {
      vec3 color;
      if (t < 0.25) {
        color = mix(vec3(1.0, 0.0, 1.0), vec3(0.0, 0.0, 1.0), t * 4.0);
      } else if (t < 0.5) {
        color = mix(vec3(0.0, 0.0, 1.0), vec3(0.0, 1.0, 1.0), (t - 0.25) * 4.0);
      } else if (t < 0.75) {
        color = mix(vec3(0.0, 1.0, 1.0), vec3(0.0, 1.0, 0.0), (t - 0.5) * 4.0);
      } else {
        color = mix(vec3(0.0, 1.0, 0.0), vec3(1.0, 1.0, 0.0), (t - 0.75) * 4.0);
      }
      return color;
    }
    
    void main() {
      float intensity = dot(vNormal, vec3(0.0, 0.0, 1.0));
      
      // High-resolution 3D noise based on world position
      float noise3D = noise(vPosition * 2000.0); // Increase frequency for finer detail
      
      // High-resolution 2D noise based on screen position
      float noise2D = random(gl_FragCoord.xy * 0.1);
      
      // Blend 50% 3D noise with 50% 2D noise
      float grain = mix(noise3D, noise2D, 0.5);
      grain = mix(grain, 0.0, intensity);
      
      // Compute a radial gradient based on distance from the center
      float radius = length(vPosition);
      float gradient = smoothstep(0.5, 1.5, radius); // Adjust values for the gradient range
      
      // Apply the gradient color
      vec3 baseColor = colorGradient(gradient);
      
      // Integrate noise effect into the color
      vec3 color = mix(baseColor, vec3(grain), 0.5); // Blend base color with noise effect
      
      // Apply intensity to color
      color = mix(color, vec3(0.0), 1.0 - intensity);
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        time: { value: 0 },
      },
    });

    const createBlob = () => {
      const sphereGeometry = new THREE.SphereGeometry(1, 64, 64); // Reduced complexity
      const sphere = new THREE.Mesh(sphereGeometry, material);
      sphere.castShadow = true;
      scene.add(sphere);
      return { sphere, noiseOffset: Math.random() * 100 };
    };

    const blobs = [createBlob()]; // Only one blob

    const update = () => {
      const time = performance.now() * 0.0005;
      blobs.forEach(({ sphere, noiseOffset }) => {
        const positions = (
          sphere.geometry as THREE.BufferGeometry
        ).getAttribute("position") as THREE.BufferAttribute;

        // Use a local variable for performance
        const simplexNoise = simplex.noise3d.bind(simplex);

        for (let i = 0; i < positions.count; i++) {
          const p = new THREE.Vector3();
          p.fromBufferAttribute(positions, i);
          const speed = 0.1;
          const blobSize = 0.6;
          p.normalize().multiplyScalar(
            1 +
              0.3 *
                simplexNoise(
                  p.x * blobSize + time * speed + noiseOffset,
                  p.y * blobSize + time * speed + noiseOffset,
                  p.z * blobSize + time * speed + noiseOffset
                )
          );
          positions.setXYZ(i, p.x, p.y, p.z);
        }
        positions.needsUpdate = true;
      });
    };

    const animate = () => {
      requestAnimationFrame(animate);
      update();
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    const handleResize = () => {
      if (rendererRef.current && cameraRef.current) {
        const containerRect = container.getBoundingClientRect();
        rendererRef.current.setSize(containerRect.width, containerRect.height);
        cameraRef.current.aspect = containerRect.width / containerRect.height;
        cameraRef.current.updateProjectionMatrix();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100%", height: "160%" }} />;
};

export default MetaballsPage;
