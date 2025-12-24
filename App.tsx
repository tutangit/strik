/// <reference types="@react-three/fiber" />
import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, PointerLockControls, Stars, Environment } from '@react-three/drei';
import { Physics } from '@react-three/cannon';
import Player from './components/Player';
import Map from './components/Map';

const App: React.FC = () => {
  const [isLocked, setIsLocked] = useState(false);

  return (
    <div className="w-full h-full relative">
      {!isLocked && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-black/60 backdrop-blur-sm">
          <div className="text-center p-8 bg-zinc-900 border border-zinc-700 rounded-lg shadow-2xl">
            <h1 className="text-4xl font-black text-white mb-4 uppercase tracking-tighter">Dust Strike 3D</h1>
            <p className="text-zinc-400 mb-8">Click to start the game</p>
            <div className="grid grid-cols-2 gap-4 text-left text-sm text-zinc-500">
              <div><span className="text-yellow-500 font-bold">WASD</span> Movement</div>
              <div><span className="text-yellow-500 font-bold">CLICK</span> Shoot</div>
              <div><span className="text-yellow-500 font-bold">SPACE</span> Jump</div>
              <div><span className="text-yellow-500 font-bold">MOUSE</span> Camera</div>
            </div>
            <button 
              onClick={() => setIsLocked(true)}
              className="mt-8 px-8 py-3 bg-yellow-600 hover:bg-yellow-500 text-black font-bold rounded transition-colors uppercase tracking-widest"
            >
              Enter Warzone
            </button>
          </div>
        </div>
      )}

      {/* HUD Overlay */}
      <div className="absolute bottom-8 left-8 z-20 flex items-end gap-4 pointer-events-none">
          <div className="bg-black/50 p-4 border-l-4 border-yellow-500">
            <div className="text-xs text-yellow-500 font-bold uppercase">Health</div>
            <div className="text-4xl font-black text-white">100</div>
          </div>
          <div className="bg-black/50 p-4 border-l-4 border-yellow-500">
            <div className="text-xs text-yellow-500 font-bold uppercase">Ammo</div>
            <div className="text-4xl font-black text-white">30 / 90</div>
          </div>
      </div>

      <Canvas shadows camera={{ fov: 75 }}>
        <Sky sunPosition={[100, 20, 100]} turbidity={0.1} rayleigh={2} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} castShadow intensity={1} />
        
        <Suspense fallback={null}>
          <Physics gravity={[0, -9.81, 0]}>
            <Player />
            <Map />
          </Physics>
        </Suspense>

        {isLocked && <PointerLockControls onUnlock={() => setIsLocked(false)} />}
      </Canvas>
    </div>
  );
};

export default App;