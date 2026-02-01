export function Sun({ ref, position = [30, 15, -40] }) {
  return (
    <group position={position} ref={ref}>
      {/* Sun core with emissive glow */}
      <mesh>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial color="#FFD700" toneMapped={false} />
      </mesh>

      {/* Outer glow layer 1 */}
      <mesh scale={1.3}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial
          color="#FFA500"
          transparent
          opacity={0.4}
          toneMapped={false}
        />
      </mesh>

      {/* Outer glow layer 2 */}
      <mesh scale={1.6}>
        <sphereGeometry args={[4, 32, 32]} />
        <meshBasicMaterial
          color="#FF6347"
          transparent
          opacity={0.2}
          toneMapped={false}
        />
      </mesh>

      {/* Point light from sun */}
      <pointLight intensity={2} distance={100} decay={2} color="#FFD700" />
      {/* <hemisphereLight
        skyColor={"#0000ff"}
        groundColor={"#00ff00"}
        intensity={0.6}
      /> */}
    </group>
  );
}
