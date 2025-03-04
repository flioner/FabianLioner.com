"use client";

import React, { useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MarchingCubes,
  MarchingCube,
  Environment,
  Bounds,
} from "@react-three/drei";

function MetaBall({ color, position, ...props }) {
  const meshRef = useRef();
  // Random phase and frequencies for varied motion
  const phase = useRef(Math.random() * Math.PI * 2);
  const modifier = 0.5;
  const freq = useRef(
    new THREE.Vector3(
      Math.random() * 1 + modifier,
      Math.random() * 1 + modifier,
      Math.random() * 1 + modifier
    )
  );
  // Flag to skip the initial lerp transition
  const initialized = useRef(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() * 0.5; // Reduce speed (0.3 is an example)
      // Compute a per-axis oscillatory offset using random frequencies
      const offset = new THREE.Vector3(
        Math.sin(t * freq.current.x + phase.current) * 0.5,
        Math.cos(t * freq.current.y + phase.current) * 0.5,
        Math.sin(t * freq.current.z + phase.current) * 0.15
      );
      // Calculate the target position: center plus the oscillation offset
      const target = new THREE.Vector3(0, 0, 0).add(offset);
      if (!initialized.current) {
        // On the first frame, set the position directly to avoid a transition
        meshRef.current.position.copy(target);
        initialized.current = true;
      } else {
        // Afterwards, smoothly interpolate toward the oscillatory target
        meshRef.current.position.lerp(target, 0.0035);
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position} {...props}>
      <MarchingCube strength={0.35} subtract={6} color={color} />
    </mesh>
  );
}

export default function MetaballsPage() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 0.5], fov: 5 }}>
      <color attach="background" args={["#ffffff"]} />
      <ambientLight intensity={0} />
      <MarchingCubes
        resolution={80}
        maxPolyCount={10000}
        enableUvs={false}
        enableColors
      >
        <meshStandardMaterial vertexColors thickness={0.15} roughness={0.2} />
        <MetaBall color="blue" position={[0, 0, 0.1]} />
        <MetaBall color="skyblue" position={[0.25, 0, 0]} />
        <MetaBall color="aqua" position={[0, 0.25, 0]} />
        <MetaBall color="purple" position={[0, 0.25, 0]} />
        <MetaBall color="hotpink" position={[0.25, 0.25, 0]} />
        <MetaBall color="pink" position={[-0.1, -0.1, 0.01]} />
      </MarchingCubes>
      <Environment
        intensity={0.5}
        files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr"
      />
      <Bounds fit clip observe margin={1}>
        <mesh visible={false}>
          <boxGeometry />
        </mesh>
      </Bounds>
    </Canvas>
  );
}
