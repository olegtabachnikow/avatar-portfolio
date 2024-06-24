import { FC, useEffect, useRef } from 'react';
import { OrbitControls, Html } from '@react-three/drei';
import Avatar from '../Avatar/Avatar';
import Floor from '../Floor/Floor';
import Display from '../Display/Display';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import { useFrame } from '@react-three/fiber';
import ParticlesBackground from '../ParticlesBackground/ParticlesBackground';
import useStore from '@/store/store';

const Scene: FC = () => {
  const controlsRef = useRef<OrbitControlsType>(null);
  const [isStarted, setIsStarted, isTabletMode] = useStore((state) => [
    state.isStarted,
    state.setIsStarted,
    state.isTabletMode,
  ]);

  useEffect(() => {
    if (controlsRef.current)
      controlsRef.current.object.position.set(0, 1.9, 1.25);
  }, []);

  const moveCameraTabletMode = () => {
    if (controlsRef.current) {
      controlsRef.current.object.position.lerp(
        { x: -0.08, y: 1.71, z: 0.33 },
        0.1
      );
      controlsRef.current.target.lerp({ x: -0.3, y: 1.2, z: 0.9 }, 0.1);
    }
  };

  const moveCameraIntro = () => {
    if (controlsRef.current) {
      controlsRef.current.object.position.lerp(
        isStarted ? { x: 0, y: 2, z: 2.5 } : { x: 0, y: 1.9, z: 1.25 },
        0.1
      );
      controlsRef.current.target.lerp(
        isStarted ? { x: 0.5, y: 1.5, z: 0 } : { x: 0, y: 1.5, z: 0 },
        0.1
      );
    }
  };

  useFrame(() => {
    isTabletMode ? moveCameraTabletMode() : moveCameraIntro();
  });
  return (
    <>
      <OrbitControls
        ref={controlsRef}
        target={[0, 1.5, 0]}
        enablePan={false}
        enableRotate={false}
        enableZoom={false}
      />
      <Html position={[0, 1, 0]}>
        <div
          style={{
            color: '#fff',
            transform: 'translate(150px, -100px)',
          }}
        >
          {isStarted ? 'Active' : 'Inactive'}
          <button onClick={() => setIsStarted(!isStarted)}>isStarted</button>
        </div>
      </Html>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={4.5} position={[-2, 2, 3]} />
      <ParticlesBackground />
      <Avatar />
      {/* <Display /> */}
      <Floor />
    </>
  );
};

export default Scene;
