"use client";

export function Walls() {
  const groundSize = 100;
  const wallHeight = 3;
  const wallThickness = 0.3;
  
  return (
    <group>
      {/* Front Wall (positive Z) */}
      <mesh position={[0, -1.2 + wallHeight / 2, groundSize / 2]} castShadow receiveShadow>
        <boxGeometry args={[groundSize, wallHeight, wallThickness]} />
        <meshStandardMaterial color="#d4c5b0" roughness={0.9} metalness={0.1} />
      </mesh>
      
      {/* Back Wall (negative Z) */}
      <mesh position={[0, -1.2 + wallHeight / 2, -groundSize / 2]} castShadow receiveShadow>
        <boxGeometry args={[groundSize, wallHeight, wallThickness]} />
        <meshStandardMaterial color="#d4c5b0" roughness={0.9} metalness={0.1} />
      </mesh>
      
      {/* Left Wall (negative X) */}
      <mesh position={[-groundSize / 2, -1.2 + wallHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[wallThickness, wallHeight, groundSize]} />
        <meshStandardMaterial color="#d4c5b0" roughness={0.9} metalness={0.1} />
      </mesh>
      
      {/* Right Wall (positive X) */}
      <mesh position={[groundSize / 2, -1.2 + wallHeight / 2, 0]} castShadow receiveShadow>
        <boxGeometry args={[wallThickness, wallHeight, groundSize]} />
        <meshStandardMaterial color="#d4c5b0" roughness={0.9} metalness={0.1} />
      </mesh>
    </group>
  );
}
