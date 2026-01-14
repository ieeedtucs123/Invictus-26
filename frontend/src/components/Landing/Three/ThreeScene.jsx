"use client";

import { Canvas } from "@react-three/fiber";
import { ScrollControls } from "@react-three/drei";
import { SceneContent } from "./SceneContent";
import { useState } from "react";
import GlitchIntro from "./GlitchIntro";
import VideoTransition from "./VideoTransition";
/* -----------------------------
   Canvas Wrapper
----------------------------- */
export default function ThreeScene() {

  const [playTransition, setPlayTransition] = useState(false);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <GlitchIntro />

      <Canvas
        camera={{ position: [0, 12, 12], fov: 50 }}
        className="absolute inset-0"
        frameloop={playTransition ? "never" : "always"}
        >
        <ScrollControls pages={3} damping={0.18}>
          <SceneContent playTransition={playTransition} onStartExplore={() => setPlayTransition(true)} />
        </ScrollControls>
      </Canvas>

      <VideoTransition
        play={playTransition}
        onEnd={() => {

          window.location.href = "/";
          //unmount the model or three scene & start the site or show the model at in the starting only at /model directly then route to /
        }}
      />
    </div>
  );
}
