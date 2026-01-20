import React, { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Plane } from "@react-three/drei";
import * as THREE from "three";
import fragment from "./shader/fragment.js";
import vertex from "./shader/vertex.js";

export function UnrollPlane({ image, progress = 0, angle = 0.3 }) {
  const meshRef = useRef();
  const { size } = useThree();

  // Texture setup
  const texture = useMemo(() => {
    const tex = new THREE.Texture(image);
    tex.needsUpdate = true;
    tex.minFilter = THREE.LinearFilter;
    return tex;
  }, [image]);

  // Calculate aspect ratios for cover
  const imageAspect = image.height / image.width;
  let a1, a2;
  if (size.height / size.width > imageAspect) {
    a1 = (size.width / size.height) * imageAspect;
    a2 = 1;
  } else {
    a1 = 1; 
    a2 = size.height / size.width / imageAspect;
  }

  // Shader uniforms
  const uniforms = useMemo(
    () => ({
      time: { value: 0 },
      progress: { value: progress },
      angle: { value: angle },
      texture1: { value: texture },
      resolution: { value: new THREE.Vector4(size.width, size.height, a1, a2) },
      uvRate1: { value: new THREE.Vector2(1, 1) }
    }),
    [texture, progress, angle, size.width, size.height, a1, a2]
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.time.value = state.clock.getElapsedTime();
      meshRef.current.material.uniforms.progress.value = progress;
      meshRef.current.material.uniforms.angle.value = angle;
    }
  });

  return (
    <Plane
      ref={meshRef}
      args={[1, 1, 80, 80]}
      scale={[size.width, size.height, size.width / 2]}
    >
      <shaderMaterial
        attach="material"
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        transparent
        extensions={{ derivatives: "#extension GL_OES_standard_derivatives : enable" }}
      />
    </Plane>
  );
}
