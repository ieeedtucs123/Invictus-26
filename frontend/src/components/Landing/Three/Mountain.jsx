import React from "react";
import { useGLTF } from "@react-three/drei";

export function Mountain(props) {
  const { nodes, materials } = useGLTF("/model/mountain.glb");

  const snowMaterial = materials.material_1.clone();
  snowMaterial.color.set(materials.material.color);

  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Mountain_A_0.geometry}
        material={materials.material}
        position={[1.4, 0, -1.051]}
        scale={9.185}
      />
      <mesh
        geometry={nodes.Mountain_B_0.geometry}
        material={snowMaterial}
        position={[1.4, 0, -1.051]}
        scale={9.185}
      />
    </group>
  );
}

useGLTF.preload("/model/mountain.glb");
