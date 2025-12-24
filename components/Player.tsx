/// <reference types="@react-three/fiber" />
import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useSphere } from '@react-three/cannon';
import * as THREE from 'three';
import { useKeyboard } from '../hooks/useKeyboard';
import Weapon from './Weapon';

const Player: React.FC = () => {
  const { camera } = useThree();
  const [isShooting, setIsShooting] = useState(false);
  const actions = useKeyboard();
  
  // Physics body for the player
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: 'Dynamic',
    position: [0, 5, 0],
    args: [0.6],
    fixedRotation: true,
  }));

  const velocity = useRef([0, 0, 0]);
  useEffect(() => api.velocity.subscribe((v) => (velocity.current = v)), [api.velocity]);

  const pos = useRef([0, 0, 0]);
  useEffect(() => api.position.subscribe((p) => (pos.current = p)), [api.position]);

  const shoot = () => {
    setIsShooting(true);
    setTimeout(() => setIsShooting(false), 100);
  };

  useEffect(() => {
    const handleMouseDown = () => shoot();
    window.addEventListener('mousedown', handleMouseDown);
    return () => window.removeEventListener('mousedown', handleMouseDown);
  }, []);

  useFrame(() => {
    // Synchronize camera with physics body
    camera.position.copy(new THREE.Vector3(pos.current[0], pos.current[1] + 1.2, pos.current[2]));

    // Calculate movement vectors
    const direction = new THREE.Vector3();
    const frontVector = new THREE.Vector3(
      0,
      0,
      Number(actions.backward) - Number(actions.forward)
    );
    const sideVector = new THREE.Vector3(
      Number(actions.left) - Number(actions.right),
      0,
      0
    );

    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(5)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, velocity.current[1], direction.z);

    // Jump logic
    if (actions.jump && Math.abs(velocity.current[1]) < 0.05) {
      api.velocity.set(velocity.current[0], 5, velocity.current[2]);
    }
  });

  return (
    <>
      <mesh ref={ref as any} />
      <group>
        {/* We attach the weapon to the camera so it follows perfectly */}
        <primitive object={camera}>
            <Weapon isShooting={isShooting} />
        </primitive>
      </group>
    </>
  );
};

export default Player;