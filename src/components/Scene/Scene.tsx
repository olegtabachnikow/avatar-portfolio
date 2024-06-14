import { FC, useRef, useState } from 'react';
import { OrbitControls, Html, PresentationControls } from '@react-three/drei';
import Avatar from '../Avatar/Avatar';
import Floor from '../Floor/Floor';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import { useFrame } from '@react-three/fiber';
import ParticlesBackground from '../ParticlesBackground/ParticlesBackground';

const Scene: FC = () => {
  const [isMoved, setIsMoved] = useState<boolean>(false);
  const controlsRef = useRef<OrbitControlsType>(null);

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.object.position.lerp(
        isMoved ? { x: 0, y: 2, z: 2.5 } : { x: 0, y: 2, z: 1.5 },
        0.025
      );
      controlsRef.current.target.lerp(
        isMoved ? { x: 0.5, y: 1.5, z: 0 } : { x: 0, y: 1.5, z: 0 },
        0.025
      );
    }
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
            transform: 'translate(300px, -200px)',
          }}
        >
          {isMoved ? 'Active' : 'Inactive'}
          <button onClick={() => setIsMoved((state) => !state)}>BTN</button>
        </div>
      </Html>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={4.5} position={[0, 2, 3]} />
      <ParticlesBackground />
      <PresentationControls
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 4, tension: 400 }}
      >
        <group position={[-0.05, 0, 0]} rotation-y={Math.PI * -0.05}>
          <Avatar />
          {/* <Floor /> */}
        </group>
      </PresentationControls>
    </>
  );
};

export default Scene;
