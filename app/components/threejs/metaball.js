"use client";

import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  MarchingCubes,
  MarchingCube,
  Environment,
  Bounds,
} from "@react-three/drei";
import { Physics, RigidBody, BallCollider } from "@react-three/rapier";

// Metaball component with force logic
function MetaBall({ color, vec = new THREE.Vector3(), ...props }) {
  const api = useRef(null);

  useFrame((state, delta) => {
    if (!api.current) {
      console.log("MetaBall: No API loaded");
      return;
    }
    console.log("MetaBall: API loaded"); // This should now be printed if the API loads
    delta = Math.min(delta, 0.1);

    // Apply a force from the pointer to the metaball
    const pointer = state.pointer;
    const ballPos = api.current.translation();
    const distance = ballPos.distanceTo(pointer);

    console.log("MetaBall pointer:", pointer); // Log the pointer position
    console.log("MetaBall position:", ballPos); // Log the metaball position

    if (distance < 1.5) {
      // If the pointer is close enough, apply an impulse
      const direction = new THREE.Vector3()
        .subVectors(ballPos, pointer)
        .normalize();
      const force = direction.multiplyScalar(10); // Adjust strength of the force

      api.current.applyImpulse(force);
    }
  });

  return (
    <RigidBody
      colliders={false}
      linearDamping={4}
      angularDamping={0.95}
      {...props}
      onCreated={(body) => {
        console.log("MetaBall: RigidBody created", body);
        if (body) {
          api.current = body;
        }
      }}
    >
      <MarchingCube strength={0.35} subtract={6} color={color} />
      <BallCollider args={[0.1]} type="dynamic" />
    </RigidBody>
  );
}

// Pointer component to follow pointer movement
function Pointer() {
  const api = useRef(null);
  const pointerPos = useRef(new THREE.Vector3());
  const [pointerPosition, setPointerPosition] = useState({ x: 0, y: 0 });

  // Explicitly handle mousemove event
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    setPointerPosition({
      x: (clientX / window.innerWidth) * 2 - 1,
      y: -(clientY / window.innerHeight) * 2 + 1,
    });
  };

  // Attach mousemove listener to the canvas
  useEffect(() => {
    const canvas = document.querySelector("canvas");
    canvas.addEventListener("mousemove", handleMouseMove);
    return () => {
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useFrame(({ camera }) => {
    if (!api.current) {
      console.log("Pointer: No API loaded");
      return;
    }
    console.log("Pointer: API loaded"); // This should now be printed if the API loads

    // Map 2D pointer position to 3D world space
    pointerPos.current.set(pointerPosition.x, pointerPosition.y, 0);
    pointerPos.current.unproject(camera); // Unproject to 3D space

    console.log("Pointer 3D position:", pointerPos.current); // Log 3D pointer position

    api.current.setNextKinematicTranslation(pointerPos.current); // Move the pointer ball in 3D space
  });

  return (
    <RigidBody
      type="kinematicPosition"
      colliders={false}
      onCreated={(body) => {
        console.log("Pointer: RigidBody created", body);
        if (body) {
          api.current = body;
        }
      }}
    >
      <MarchingCube strength={0.5} subtract={10} color="orange" />
      <BallCollider args={[0.1]} type="dynamic" />
    </RigidBody>
  );
}

export default function MetaballsPage() {
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 5], fov: 25 }}>
      <color attach="background" args={["#f0f0f0"]} />
      <ambientLight intensity={1} />
      <Physics gravity={[0, 0, 0]}>
        {/* Metaballs and Pointer */}
        <MarchingCubes
          resolution={80}
          maxPolyCount={10000}
          enableUvs={false}
          enableColors
        >
          <meshStandardMaterial vertexColors thickness={0.15} roughness={0} />
          <MetaBall color="indianred" position={[0, 0, 0.1]} />
          <MetaBall color="skyblue" position={[0.1, 0, 0]} />
          <MetaBall color="teal" position={[0, 0.1, 0]} />
          <MetaBall color="orange" position={[0.2, 0, 0]} />
          <MetaBall color="hotpink" position={[0, 0.2, 0]} />
          <MetaBall color="aquamarine" position={[0, 0, 0.2]} />
          <Pointer />
        </MarchingCubes>
      </Physics>
      <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/industrial_workshop_foundry_1k.hdr" />
      <Bounds fit clip observe margin={1}>
        <mesh visible={false}>
          <boxGeometry />
        </mesh>
      </Bounds>
    </Canvas>
  );
}
