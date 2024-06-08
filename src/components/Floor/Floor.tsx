import { FC } from 'react';
import * as THREE from 'three';
import vertexShader from '../../shaders/vertex';
import fragmentShader from '../../shaders/fragment';

const texture = new THREE.TextureLoader().load('./textures/floor.webp');

const Floor: FC = () => {
  return (
    <mesh rotation-x={Math.PI * -0.5}>
      <planeGeometry attach='geometry' args={[8, 5]} />
      <shaderMaterial
        attach='material'
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        uniforms={{
          uTexture: { value: texture },
          uRadius: { value: 1 },
        }}
      />
    </mesh>
  );
};

export default Floor;
