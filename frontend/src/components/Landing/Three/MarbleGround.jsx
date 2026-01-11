"use client";

import { useRef, useMemo } from "react";
import * as THREE from "three";

export function MarbleGround() {
  const textureRef = useRef();
  
  // Create a marble tile texture with black strips
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    
    const tileSize = 128; // Size of each marble tile
    const stripWidth = 8; // Width of black strips between tiles
    
    // Draw marble tiles
    for (let x = 0; x < canvas.width; x += tileSize) {
      for (let y = 0; y < canvas.height; y += tileSize) {
        // White marble tile with slight variation
        const variation = Math.random() * 10 + 240;
        ctx.fillStyle = `rgb(${variation}, ${variation}, ${variation})`;
        ctx.fillRect(x, y, tileSize - stripWidth, tileSize - stripWidth);
        
        // Add marble veining
        ctx.strokeStyle = `rgba(180, 180, 180, ${Math.random() * 0.3 + 0.2})`;
        ctx.lineWidth = 1 + Math.random() * 2;
        ctx.beginPath();
        ctx.moveTo(x + Math.random() * tileSize, y);
        ctx.quadraticCurveTo(
          x + tileSize / 2 + Math.random() * 20 - 10,
          y + tileSize / 2,
          x + Math.random() * tileSize,
          y + tileSize
        );
        ctx.stroke();
      }
    }
    
    // Draw black strips (grout lines)
    ctx.fillStyle = '#1a1a1a';
    for (let x = 0; x < canvas.width; x += tileSize) {
      ctx.fillRect(x + tileSize - stripWidth, 0, stripWidth, canvas.height);
    }
    for (let y = 0; y < canvas.height; y += tileSize) {
      ctx.fillRect(0, y + tileSize - stripWidth, canvas.width, stripWidth);
    }
    
    // Add grain and noise overlay to entire canvas
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      // Add grain (subtle noise)
      const grain = (Math.random() - 0.5) * 15;
      data[i] = Math.max(0, Math.min(255, data[i] + grain));     // R
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + grain)); // G
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + grain)); // B
      
      // Add occasional stronger noise specks
      if (Math.random() < 0.02) {
        const noiseFactor = (Math.random() - 0.5) * 40;
        data[i] = Math.max(0, Math.min(255, data[i] + noiseFactor));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noiseFactor));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noiseFactor));
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(4, 4);
    
    return tex;
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial 
        map={texture}
        roughness={0.3} 
        metalness={0.1}
      />
    </mesh>
  );
}
