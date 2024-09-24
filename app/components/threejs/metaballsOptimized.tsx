"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import * as Noise from "ts-perlin-simplex";
import s from "./threejs.module.css";

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

    const camera = new THREE.PerspectiveCamera(20, 1, 0.1, 1000);
    camera.position.z = 7;
    camera.position.y = -0.5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); // Set background color to transparent
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Set up Perlin noise
    const simplex = new Noise.SimplexNoise();

    // Create a single blob
    const createBlob = () => {
      const sphereGeometry = new THREE.SphereGeometry(1, 128, 128);
      const material = new THREE.MeshNormalMaterial();
      const sphere = new THREE.Mesh(sphereGeometry, material);

      // Position the blob at the center of the scene
      sphere.position.set(0, 0, 0);

      scene.add(sphere);
      return { sphere, noiseOffset: Math.random() * 100 };
    };

    const blob = createBlob();

    const update = () => {
      const time = performance.now() * 0.001; // Time for animation
      const { sphere, noiseOffset } = blob;
      const positions = (sphere.geometry as THREE.BufferGeometry).getAttribute(
        "position"
      ) as THREE.BufferAttribute;

      for (let i = 0; i < positions.count; i++) {
        const p = new THREE.Vector3();
        p.fromBufferAttribute(positions, i);
        const speed = 0.1;
        const blobSize = 0.6;
        p.normalize().multiplyScalar(
          1 +
            0.3 *
              simplex.noise3d(
                p.x * blobSize + time * speed + noiseOffset, // Add noise offset
                p.y * blobSize + time * speed + noiseOffset, // Add noise offset
                p.z * blobSize + time * speed + noiseOffset // Add noise offset
              )
        );
        positions.setXYZ(i, p.x, p.y, p.z);
      }
      positions.needsUpdate = true;
    };

    const animate = () => {
      requestAnimationFrame(animate);
      update();
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        const renderer = rendererRef.current;
        const scene = sceneRef.current;
        const camera = cameraRef.current;
        renderer.render(scene, camera);
      }
    };
    animate();

    const handleResize = () => {
      if (rendererRef.current && cameraRef.current) {
        const renderer = rendererRef.current;
        const camera = cameraRef.current;
        const containerRect = container.getBoundingClientRect();
        renderer.setSize(containerRect.width, containerRect.height);
        camera.aspect = containerRect.width / containerRect.height;
        camera.updateProjectionMatrix();
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rendererRef.current) {
        const renderer = rendererRef.current;
        container.removeChild(renderer.domElement);
        renderer.dispose();
      }
    };
  }, []);

  return (
    <div
      className={s.texture}
      ref={containerRef}
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default MetaballsPage;
