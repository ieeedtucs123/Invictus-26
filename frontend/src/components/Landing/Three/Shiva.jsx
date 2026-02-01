import React from "react";
import { useGLTF } from "@react-three/drei";

export function Shiva(props) {
  const { nodes, materials } = useGLTF("/model/shiva.glb");
  
  const greyMaterial = materials.Shiva_Ciccioga.clone();
  greyMaterial.color.set('#6b7280');
  
  return (
    <group {...props} dispose={null}>
      <mesh
        geometry={nodes.Shiva_Ciccioga_Scuro_Ori_1_Shiva_Ciccioga_0.geometry}
        material={greyMaterial}
        castShadow={true}
        rotation={[-Math.PI / 2, 0, Math.PI/2]}
      />
    </group>
  );
}

useGLTF.preload("/model/shiva.glb");
