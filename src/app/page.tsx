'use client';
import Scene from '@/components/Scene/Scene';
import { Canvas } from '@react-three/fiber';

export default function Home() {
  return (
    <main>
      <Canvas className='canvas'>
        <color attach='background' args={['#000000']} />
        <Scene />
      </Canvas>
    </main>
  );
}
