import { FC, useRef, useState } from 'react';
import { OrbitControls, Html } from '@react-three/drei';
import Avatar from '../Avatar/Avatar';
import Floor from '../Floor/Floor';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import { useFrame } from '@react-three/fiber';

const Scene: FC = () => {
  const [isMoved, setIsMoved] = useState<boolean>(false);
  const controlsRef = useRef<OrbitControlsType>(null);

  useFrame(() => {
    if (controlsRef.current) {
      controlsRef.current.object.position.lerp(
        { x: 0, y: isMoved ? 2 : 2, z: isMoved ? 2.5 : 1.5 },
        0.05
      );
    }
  });
  return (
    <>
      <OrbitControls
        target={[0, 1.5, 0]}
        ref={controlsRef}
        enablePan={false}
        enableRotate={false}
        enableZoom={false}
      />
      <Html position={[0, 1, 0]}>
        <div style={{ color: '#fff', transform: 'translate(300px, -200px)' }}>
          {isMoved ? 'Active' : 'Inactive'}
          <button onClick={() => setIsMoved((state) => !state)}>BTN</button>
        </div>
      </Html>
      <ambientLight intensity={0.5} />
      <directionalLight intensity={4.5} position={[0, 2, 3]} />
      <group position={[0, 0, 0]}>
        <Avatar />
        <Floor />
      </group>
    </>
  );
};

export default Scene;
