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

    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 7;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); // Set background color to transparent
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Set up Perlin noise
    const simplex = new Noise.SimplexNoise();

    // Define function to create blobs
    const createBlob = () => {
      const sphereGeometry = new THREE.SphereGeometry(1, 128, 128);
      const material = new THREE.MeshNormalMaterial();
      const sphere = new THREE.Mesh(sphereGeometry, material);

      // Random position within the container
      sphere.position.set(
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        Math.random() * 10 - 1 // Adjust z-axis position to create depth variation
      );

      scene.add(sphere);
      return { sphere, noiseOffset: Math.random() * 100 }; // Return noise offset for each blob
    };

    // Create multiple blobs
    const blobs: {
      sphere: THREE.Mesh<THREE.SphereGeometry, THREE.MeshNormalMaterial>;
      noiseOffset: number;
    }[] = [];
    for (let i = 0; i < 7; i++) {
      blobs.push(createBlob());
    }

    const update = () => {
      const time = performance.now() * 0.001; // Time for animation
      blobs.forEach((blobData) => {
        const { sphere, noiseOffset } = blobData;
        const positions = (
          sphere.geometry as THREE.BufferGeometry
        ).getAttribute("position") as THREE.BufferAttribute;

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
          ); // Using simplex noise with time variation and noise offset
          positions.setXYZ(i, p.x, p.y, p.z);
        }
        positions.needsUpdate = true; // Update positions
      });
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

  return <div ref={containerRef} style={{ width: "100%", height: "100%" }} />;
};

export default MetaballsPage;
