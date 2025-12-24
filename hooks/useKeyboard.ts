
import { useState, useEffect } from 'react';
import { KeyboardState } from '../types';

export const useKeyboard = () => {
  const [actions, setActions] = useState<KeyboardState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': setActions(prev => ({ ...prev, forward: true })); break;
        case 'KeyS': setActions(prev => ({ ...prev, backward: true })); break;
        case 'KeyA': setActions(prev => ({ ...prev, left: true })); break;
        case 'KeyD': setActions(prev => ({ ...prev, right: true })); break;
        case 'Space': setActions(prev => ({ ...prev, jump: true })); break;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'KeyW': setActions(prev => ({ ...prev, forward: false })); break;
        case 'KeyS': setActions(prev => ({ ...prev, backward: false })); break;
        case 'KeyA': setActions(prev => ({ ...prev, left: false })); break;
        case 'KeyD': setActions(prev => ({ ...prev, right: false })); break;
        case 'Space': setActions(prev => ({ ...prev, jump: false })); break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return actions;
};
