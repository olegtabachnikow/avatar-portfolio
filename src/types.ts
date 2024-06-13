import * as THREE from 'three';

export interface ParticlesType {
  geometry: THREE.BufferGeometry;
  material: THREE.ShaderMaterial;
  count: number;
  positions: THREE.Float32BufferAttribute[];
  index: number;
  maxCount: number;
  colorA: string;
  colorB: string;
  morph?: (index: number) => void;
}
