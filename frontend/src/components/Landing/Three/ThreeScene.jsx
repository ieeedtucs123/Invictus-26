"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { SceneContent } from "./SceneContent";

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
