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
    
    // Sunset gradient colors (bottom to top)
    gradient.addColorStop(0, '#FF6B35');    // Deep orange at horizon
    gradient.addColorStop(0.2, '#FF8C42'); // Orange
    gradient.addColorStop(0.4, '#FFA07A'); // Light salmon
    gradient.addColorStop(0.6, '#E9967A'); // Pink salmon
    gradient.addColorStop(0.8, '#6A5ACD'); // Purple
    gradient.addColorStop(1, '#1E3A8A');   // Deep blue at zenith
    
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
