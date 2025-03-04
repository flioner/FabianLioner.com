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
  const phase = useRef(Math.random() * Math.PI * 2);
  const modifier = 0.5;
  const freq = useRef(
    new THREE.Vector3(
      Math.random() * 1 + modifier,
      Math.random() * 1 + modifier,
      Math.random() * 1 + modifier
    )
  );
  const initialized = useRef(false);

  // Store time from last frame
  const lastFrameTime = useRef(0);
  const targetFPS = 30;
  const frameInterval = 1 / targetFPS; // Time interval per frame for 30 FPS

  useFrame(({ clock }) => {
    const currentTime = clock.getElapsedTime();
    // Check if enough time has passed to update the frame (to limit FPS)
    if (currentTime - lastFrameTime.current >= frameInterval) {
      lastFrameTime.current = currentTime; // Update the last frame time

      if (meshRef.current) {
        const t = clock.getElapsedTime() * 0.7;
        const intensity = 0.7;
        const offset = new THREE.Vector3(
          Math.sin(t * freq.current.x + phase.current) * intensity,
          Math.cos(t * freq.current.y + phase.current) * intensity,
          Math.sin(t * freq.current.z + phase.current) * intensity
        );
        const target = new THREE.Vector3(0, 0, 0).add(offset);
        if (!initialized.current) {
          meshRef.current.position.copy(target);
          initialized.current = true;
        } else {
          meshRef.current.position.lerp(target, 0.0035);
        }
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
