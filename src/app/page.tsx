'use client';
import Overlay from '@/components/Overlay/Overlay';
import Scene from '@/components/Scene/Scene';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';

export default function Home() {
  return (
    <main>
      <Overlay />
      <Suspense fallback={null}>
        <Canvas className='canvas' dpr={[1, 2]}>
          <color attach='background' args={['#000000']} />
          <Scene />
        </Canvas>
      </Suspense>
    </main>
  );
}
