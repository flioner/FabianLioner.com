"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as Noise from "ts-perlin-simplex";
import s from "./threejs.module.css";

const MetaballsPage = ({ paused }: { paused: boolean }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const frameRef = useRef<number | null>(null);
  const simplex = new Noise.SimplexNoise();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // If paused, completely remove the WebGL canvas and stop everything
    if (paused) {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      sceneRef.current = null;
      cameraRef.current = null;
      setInitialized(false);
      return;
    }

    // Prevent re-initializing if it's already running
    if (initialized) return;
    setInitialized(true);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(20, 1, 0.1, 1000);
    camera.position.z = 7;
    camera.position.y = -0.5;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const p = new THREE.Vector3();

    const createBlob = () => {
      const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
      const material = new THREE.MeshNormalMaterial();
      const sphere = new THREE.Mesh(sphereGeometry, material);
      scene.add(sphere);
      return { sphere, noiseOffset: Math.random() * 100 };
    };

    const blob = createBlob();

    const updateBlobGeometry = (
      blob: { sphere: THREE.Mesh; noiseOffset: number },
      time: number
    ) => {
      const positions = (
        blob.sphere.geometry as THREE.BufferGeometry
      ).getAttribute("position") as THREE.BufferAttribute;
      const speed = 0.1;
      const blobSize = 0.6;

      for (let i = 0; i < positions.count; i++) {
        p.fromBufferAttribute(positions, i);
        p.normalize().multiplyScalar(
          1 +
            0.3 *
              simplex.noise3d(
                p.x * blobSize + time * speed + blob.noiseOffset,
                p.y * blobSize + time * speed + blob.noiseOffset,
                p.z * blobSize + time * speed + blob.noiseOffset
              )
        );
        positions.setXYZ(i, p.x, p.y, p.z);
      }
      positions.needsUpdate = true;
    };

    const animate = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current)
        return;
      frameRef.current = requestAnimationFrame(animate);

      const time = performance.now() * 0.0005;
      updateBlobGeometry(blob, time);
      rendererRef.current.render(sceneRef.current, cameraRef.current);
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

    let resizeTimeout: NodeJS.Timeout | null = null;
    const debouncedResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => handleResize(), 200);
    };

    handleResize();
    window.addEventListener("resize", debouncedResize);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      if (resizeTimeout) clearTimeout(resizeTimeout);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      if (rendererRef.current) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
      sceneRef.current = null;
      cameraRef.current = null;
      setInitialized(false);
    };
  }, [paused]); // Restart effect when paused state changes

  return (
    <div
      className={s.texture}
      ref={containerRef}
      style={{
        width: "100%",
        height: "100%",
        display: paused ? "none" : "block", // Completely hide when paused
      }}
    />
  );
};

export default MetaballsPage;
