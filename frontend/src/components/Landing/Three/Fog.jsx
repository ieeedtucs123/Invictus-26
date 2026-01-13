import { Cloud } from "@react-three/drei";

export function Fog() {
  return (
    <>
      <Cloud position={[0, 0, -12]} speed={0.4} opacity={0.2} seed={1} scale={[2, 2, 2]} />
      <Cloud position={[7, 0, 5]} speed={0.5} opacity={0.24} seed={2} scale={[1, 0.5, 10]} />
      <Cloud position={[0, 0, 12]} speed={0.8} opacity={0.24} seed={3} scale={[1, 0.5, 1]} />
      <Cloud position={[-7, 0, 5]} speed={0.6} opacity={0.25} seed={4} scale={[1, 0.5, 8]} />
    </>
  );
}
