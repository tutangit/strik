/// <reference types="@react-three/fiber" />
import React from 'react';
import { useBox, usePlane } from '@react-three/cannon';
import * as THREE from 'three';

const Wall: React.FC<{ position: [number, number, number]; size: [number, number, number]; color?: string }> = ({ position, size, color = "#d2b48c" }) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    args: size,
  }));

  return (
    <mesh ref={ref as any} receiveShadow castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color={color} roughness={0.8} />
    </mesh>
  );
};

const Ramp: React.FC<{ position: [number, number, number]; size: [number, number, number]; rotation: [number, number, number] }> = ({ position, size, rotation }) => {
  const [ref] = useBox(() => ({
    type: 'Static',
    position,
    args: size,
    rotation,
  }));

  return (
    <mesh ref={ref as any} receiveShadow castShadow>
      <boxGeometry args={size} />
      <meshStandardMaterial color="#c2a47c" roughness={0.9} />
    </mesh>
  );
};

const Map: React.FC = () => {
  const [floorRef] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  return (
    <group>
      {/* Ground */}
      <mesh ref={floorRef as any} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#e3c29b" roughness={1} />
      </mesh>

      {/* Perimeter Walls */}
      <Wall position={[0, 5, -25]} size={[50, 10, 1]} />
      <Wall position={[0, 5, 25]} size={[50, 10, 1]} />
      <Wall position={[-25, 5, 0]} size={[1, 10, 50]} />
      <Wall position={[25, 5, 0]} size={[1, 10, 50]} />

      {/* Interior Buildings/Obstacles (Dust2-like vibe) */}
      <Wall position={[-10, 2, -10]} size={[5, 4, 10]} />
      <Wall position={[10, 3, 5]} size={[6, 6, 6]} />
      
      {/* Archway Area */}
      <Wall position={[0, 6, -5]} size={[10, 2, 1]} />
      <Wall position={[-4, 2, -5]} size={[2, 4, 1]} />
      <Wall position={[4, 2, -5]} size={[2, 4, 1]} />

      {/* Ramps */}
      <Ramp position={[10, 1, -5]} size={[5, 0.5, 10]} rotation={[-0.3, 0, 0]} />
      <Ramp position={[-15, 1, 15]} size={[8, 0.5, 5]} rotation={[0, 0, 0.2]} />

      {/* Crates/Props */}
      <Wall position={[5, 0.5, 5]} size={[1, 1, 1]} color="#8b4513" />
      <Wall position={[5, 1.5, 5]} size={[1, 1, 1]} color="#8b4513" />
      <Wall position={[6, 0.5, 5]} size={[1, 1, 1]} color="#8b4513" />
    </group>
  );
};

export default Map;