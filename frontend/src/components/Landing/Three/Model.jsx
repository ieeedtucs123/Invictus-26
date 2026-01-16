import { useGLTF } from "@react-three/drei";

export function Model(props) {
  const { scene } = useGLTF("/model/model.glb");

  return (
    <primitive
      object={scene}
      {...props}
      dispose={null}
    />
  );
}

// Preload for performance
useGLTF.preload("/model/model.glb");
