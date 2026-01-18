
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Boat(props) {
  const { nodes, materials } = useGLTF('/model/boat.glb')
  const boatRef = useRef()

  useFrame((state) => {
    if (boatRef.current) {
      const time = state.clock.getElapsedTime()
      const speed = 0.01 // Speed of movement
      const distance = 80 // Total distance to travel
      
      // Calculate progress (0 to 1) and loop it
      const progress = (time * speed) % 2
      
      // Back and forth motion
      let t = progress
      let direction = 1
      
      if (progress > 1) {
        // Going back
        t = 2 - progress
        direction = -1
      }
      
      // Linear movement along X axis
      boatRef.current.position.x = -15
      boatRef.current.position.z = -distance / 2 + t * distance
      boatRef.current.position.y = -1.5 + Math.sin(time * 0.5) * 0.05 // On water with gentle bobbing
      
      // Make boat face direction of movement
      boatRef.current.rotation.y = direction > 0 ? Math.PI / 2 : -Math.PI / 2
    }
  })

  return (
    <group ref={boatRef} {...props} dispose={null}>
      <mesh geometry={nodes.Object_2.geometry} material={materials.details_SHD} rotation={[-Math.PI / 2, 0, Math.PI]} />
      <mesh geometry={nodes.Object_3.geometry} material={materials.ledges_SHD} rotation={[-Math.PI / 2, 0, Math.PI]} />
      <mesh geometry={nodes.Object_4.geometry} material={materials.shell_SHD} rotation={[-Math.PI / 2, 0, Math.PI]} />
    </group>
  )
}

useGLTF.preload('/model/boat.glb')
