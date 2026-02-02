import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

export function Boat(props) {
  const { nodes, materials } = useGLTF("/model/boatwithrobo.glb");
  const boatRef = useRef();

  useFrame((state) => {
    if (boatRef.current) {
      const time = state.clock.getElapsedTime();
      const speed = 0.3; // Speed of revolution
      const radius = 22; // Radius of circular orbit around the center

      // Calculate angle based on time
      const angle = time * speed;

      // Circular motion around the center (0, 0)
      boatRef.current.position.x = Math.cos(angle) * radius;
      boatRef.current.position.z = Math.sin(angle) * radius;
      boatRef.current.position.y = -1.5 + Math.sin(time * 0.5) * 0.05; // On water with gentle bobbing

      // Make boat face tangent to the circle (direction of movement)
      // Adding Math.PI/2 to rotate 90 degrees so the boat's front faces the movement direction
      boatRef.current.rotation.y = - angle - Math.PI / 2;
    }
  });
  return (
     <group ref={boatRef} {...props} dispose={null}>
      <mesh geometry={nodes.Object_2.geometry} material={materials.details_SHD} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_3.geometry} material={materials.ledges_SHD} rotation={[-Math.PI / 2, 0, 0]} />
      <mesh geometry={nodes.Object_4.geometry} material={materials.shell_SHD} rotation={[-Math.PI / 2, 0, 0]} />
      <group position={[-0.222, -0.677, 0]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={0.011}>
        <mesh geometry={nodes.Mesh001.geometry} material={materials.BH_2} />
        <mesh geometry={nodes.Mesh001_1.geometry} material={materials.BH_2_GLASS} />
      </group>
      <mesh geometry={nodes.Plane.geometry} material={materials.black} position={[0.133, 0.967, -0.014]} rotation={[Math.PI / 2, 0, -Math.PI / 2]} scale={[0.501, 0.194, 0.249]} />
    </group>
  );
}

useGLTF.preload("/model/boatwithrobo.glb");
