
import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Lotus(props) {
  const { nodes, materials } = useGLTF('/model/lotus.glb')
  const lotusRef = useRef()

  useFrame((state) => {
    if (lotusRef.current) {
      const time = state.clock.getElapsedTime()
      
      lotusRef.current.position.x = props.position[0] + Math.sin(time * 0.5) * 0.15
      lotusRef.current.position.z = props.position[2] + Math.cos(time * 0.3) * 0.1
      
      lotusRef.current.position.y = props.position[1] + Math.sin(time * 0.8) * 0.05
      
      lotusRef.current.rotation.y = Math.sin(time * 0.4) * 0.05
      lotusRef.current.rotation.z = Math.cos(time * 0.6) * 0.02
    }
  })

  return (
    <group ref={lotusRef} {...props} dispose={null}>
      <mesh geometry={nodes.defaultMaterial.geometry} material={materials.LillypadMat} scale={0.005} />
      <mesh geometry={nodes.defaultMaterial_1.geometry} material={materials.LotusMat} scale={0.005} />
    </group>
  )
}

useGLTF.preload('/model/lotus.glb')
