"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function GlitchIntro() {
  const [stage, setStage] = useState("idle");

  useEffect(() => {
    const timers = [];

    // wait 2 seconds before starting
    timers.push(
      setTimeout(() => setStage("one"), 1400)
    );

    // show second image after 0.5s
    timers.push(
      setTimeout(() => setStage("two"), 1500)
    );

    // remove everything after another 0.5s
    timers.push(
      setTimeout(() => setStage("done"), 1660)
    );

    return () => timers.forEach(clearTimeout);
  }, []);

  if (stage === "done" || stage === "idle") return null;

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden"
    >

      {/* SCANLINES
      <div className="absolute inset-0 glitch-scanlines opacity-40" />  */}

      {stage === "one" && (
        <Image
          src="/model/gltich1.png"
          alt="glitch layer 1"
          fill
          priority
          className="mix-blend-screen opacity-80"
        />
      )}

      {stage === "two" && (
        <Image
          src="/model/gltich2.png"
          alt="glitch layer 2"
          fill
          priority
          className="mix-blend-difference opacity-70"
        />
      )}
    </div>
  );
}
