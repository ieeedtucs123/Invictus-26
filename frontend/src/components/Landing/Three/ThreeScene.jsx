"use client";//use client rhene dena because nextJs server side rendering krta model client side p dikhana

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import { useRef, useEffect } from "react";
import * as THREE from "three";
import { Model } from "./Model";

function SceneContent() {
  const modelRef = useRef();
  const scroll = useScroll();

  // Camera keyframes
  const cameraShots = [
    {
      pos: new THREE.Vector3(4, 9, -12), // TOP VIEW
      lookAt: new THREE.Vector3(0, 0, 0),
    },
    {
      pos: new THREE.Vector3(10, 0, 2), // SIDE VIEW
      lookAt: new THREE.Vector3(0, 2, 0),
    },
    {
      pos: new THREE.Vector3(0, -0.2, 9), // FRONT VIEW
      lookAt: new THREE.Vector3(0, 0, 0),
    },
  ];

  useFrame((state) => {
    
    const totalSections = cameraShots.length - 1;
    const progress = scroll.offset * totalSections;

    const sectionIndex = Math.floor(progress);
    const sectionT = progress % 1;

    const current = cameraShots[sectionIndex];
    const next =
      cameraShots[Math.min(sectionIndex + 1, totalSections)];

    // Smooth camera movement
    state.camera.position.lerpVectors(
      current.pos,
      next.pos,
      sectionT
    );

    const lookAt = current.lookAt
      .clone()
      .lerp(next.lookAt, sectionT);

    state.camera.lookAt(lookAt);

    // Optional: subtle model parallax
    if (modelRef.current) {
      modelRef.current.position.y = -1 - scroll.offset * 0.3;
    }
  });


  return (

    
    <>
      {/* Lights */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />

      {/* Temple Model */}
      <Model
        ref={modelRef}
        scale={0.055}
        position={[0, -1, 0]}
      />

      {/* Sky */}
      <Environment preset="night" background />
    </>
  );
}

/* -----------------------------
   Canvas Wrapper
----------------------------- */
export default function ThreeScene() {
  return (
    <Canvas
      camera={{ position: [0, 12, 12], fov: 50 }}
      style={{ width: "100%", height: "100vh" }}
    >
      {/* 3 scroll sections */}
      <ScrollControls pages={3} damping={0.18}>
        <SceneContent />
      </ScrollControls>
    </Canvas>
  );
}
