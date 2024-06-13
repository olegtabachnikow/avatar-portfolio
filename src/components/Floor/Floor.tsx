import { FC } from 'react';
import * as THREE from 'three';
import vertexShader from '../../shaders/floor/vertex.glsl';
import fragmentShader from '../../shaders/floor/fragment.glsl';

const Floor: FC = () => {
  const floorTexture = new THREE.TextureLoader().load('./textures/floor.webp');
  return (
    <mesh rotation-x={Math.PI * -0.5}>
      <planeGeometry attach='geometry' args={[8, 5]} />
      <shaderMaterial
        attach='material'
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        uniforms={{
          uTexture: { value: floorTexture },
          uRadius: { value: 1 },
        }}
      />
    </mesh>
  );
};

export default Floor;
