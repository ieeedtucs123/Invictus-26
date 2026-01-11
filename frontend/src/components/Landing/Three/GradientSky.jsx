"use client";

import { useMemo } from "react";
import * as THREE from "three";

export function GradientSky() {
  const skyTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    // Create gradient from horizon to zenith
    const gradient = ctx.createLinearGradient(0, canvas.height, 0, 0);
    
    // Sky gradient colors (bottom to top)
    gradient.addColorStop(0, '#87CEEB');    // Light sky blue at horizon
    gradient.addColorStop(0.3, '#6DB3D8'); // Slightly deeper blue
    gradient.addColorStop(0.5, '#5FA4D0'); // Medium blue
    gradient.addColorStop(0.7, '#4A8BC2'); // Deeper blue
    gradient.addColorStop(1, '#3D75AD');   // Deep blue at zenith
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some subtle noise/texture for realism
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 8;
      data[i] = Math.max(0, Math.min(255, data[i] + noise));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    return new THREE.CanvasTexture(canvas);
  }, []);

  return (
    <mesh scale={[1, 1, 1]}>
      <sphereGeometry args={[100, 32, 32]} />
      <meshBasicMaterial map={skyTexture} side={THREE.BackSide} />
    </mesh>
  );
}
