/// <reference types="@react-three/fiber" />
import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { WeaponProps } from '../types';
import * as THREE from 'three';

const Weapon: React.FC<WeaponProps> = ({ isShooting }) => {
  const weaponRef = useRef<THREE.Group>(null);
  const flashRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);
  
  const [flashOpacity, setFlashOpacity] = useState(0);

  useEffect(() => {
    if (isShooting) {
      setFlashOpacity(1);
      setTimeout(() => setFlashOpacity(0), 50);
    }
  }, [isShooting]);

  useFrame((state) => {
    if (!weaponRef.current) return;
    
    // Subtle idle sway
    const time = state.clock.getElapsedTime();
    weaponRef.current.position.y = -0.4 + Math.sin(time * 2) * 0.005;
    weaponRef.current.position.x = 0.5 + Math.cos(time * 1.5) * 0.003;
    
    // Recoil animation
    if (isShooting) {
      weaponRef.current.position.z = 0.2;
      weaponRef.current.rotation.x = -0.1;
    } else {
      weaponRef.current.position.z = THREE.MathUtils.lerp(weaponRef.current.position.z, 0, 0.1);
      weaponRef.current.rotation.x = THREE.MathUtils.lerp(weaponRef.current.rotation.x, 0, 0.1);
    }

    if (flashRef.current) {
        flashRef.current.visible = flashOpacity > 0;
        flashRef.current.scale.setScalar(0.5 + Math.random() * 0.5);
    }
    if (lightRef.current) {
        lightRef.current.intensity = flashOpacity * 5;
    }
  });

  return (
    <group ref={weaponRef} position={[0.5, -0.4, 0]}>
      {/* Rifle Body */}
      <mesh position={[0, 0, -1]}>
        <boxGeometry args={[0.08, 0.15, 1.2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
      </mesh>
      {/* Hand Guard */}
      <mesh position={[0, -0.05, -0.8]}>
        <boxGeometry args={[0.1, 0.1, 0.6]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      {/* Barrel */}
      <mesh position={[0, 0.02, -1.8]}>
        <cylinderGeometry args={[0.02, 0.02, 0.8]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#111" />
      </mesh>
      {/* Sight */}
      <mesh position={[0, 0.1, -1]}>
        <boxGeometry args={[0.02, 0.05, 0.1]} />
        <meshStandardMaterial color="#000" />
      </mesh>
      
      {/* Muzzle Flash Effect */}
      <group position={[0, 0.02, -2.2]}>
        <mesh ref={flashRef} visible={false}>
          <sphereGeometry args={[0.2, 8, 8]} />
          <meshBasicMaterial color="#ffcc33" transparent opacity={0.8} />
        </mesh>
        <pointLight ref={lightRef} color="#ffaa00" intensity={0} distance={5} />
      </group>
    </group>
  );
};

export default Weapon;