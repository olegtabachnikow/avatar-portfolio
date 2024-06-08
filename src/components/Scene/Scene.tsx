import { FC, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls, Html } from '@react-three/drei';
import Avatar from '../Avatar/Avatar';
import Floor from '../Floor/Floor';
import type { OrbitControls as OrbitControlsType } from 'three-stdlib';
import { useFrame } from '@react-three/fiber';

const Scene: FC = () => {
  const [isMoved, setIsMoved] = useState<boolean>(false);
  const controlsRef = useRef<OrbitControlsType>(null);

  useFrame(() => {
    // state.camera.position.lerp(
    //   new THREE.Vector3(0, isMoved ? 2.5 : 1.2, isMoved ? 2 : 3),
    //   0.05
    // );
    if (controlsRef.current) {
      controlsRef.current.object.position.lerp(
        { x: 0, y: isMoved ? 1.7 : 3, z: isMoved ? 1.5 : 0.5 },
        0.05
      );
      controlsRef.current.target.lerp(
        new THREE.Vector3(0, isMoved ? 1.5 : 2.8, isMoved ? 1.3 : 0.4),
        0.05
      );
    }
  });
  return (
    <>
      <OrbitControls
        ref={controlsRef}
        target={[0, 1, 0]}
        enablePan={false}
        enableRotate={false}
        enableZoom={false}
      />
      <axesHelper args={[5]} />
      <Html position={[0, 1, 0]}>
        <div style={{ color: '#fff', transform: 'translate(300px, -200px)' }}>
          {isMoved ? 'Active' : 'Inactive'}
          <button onClick={() => setIsMoved((state) => !state)}>BTN</button>
        </div>
      </Html>
      {/* <PerspectiveCamera makeDefault position={[0, 1.2, 2]} /> */}
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
