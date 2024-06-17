import * as THREE from 'three';
import { GLTF } from 'three-stdlib';

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

export type GLTFResult = GLTF & {
  nodes: {
    Body002: THREE.SkinnedMesh;
    Body002_1: THREE.SkinnedMesh;
    Body002_2: THREE.SkinnedMesh;
    Body002_3: THREE.SkinnedMesh;
    Body002_4: THREE.SkinnedMesh;
    Body002_5: THREE.SkinnedMesh;
    Body002_6: THREE.SkinnedMesh;
    Head: THREE.Bone;
    Trinket: THREE.Mesh;
    Macbook002: THREE.Mesh;
    Macbook002_1: THREE.Mesh;
    Macbook002_2: THREE.Mesh;
    Macbook002_3: THREE.Mesh;
    Macbook002_4: THREE.Mesh;
    Macbook002_5: THREE.Mesh;
    Macbook002_6: THREE.Mesh;
    Macbook002_7: THREE.Mesh;
    Macbook002_8: THREE.Mesh;
    iPad: THREE.Group;
    iPad_1: THREE.Mesh;
    iPad_2: THREE.Mesh;
    iPad_3: THREE.Mesh;
    iPad_4: THREE.Mesh;
    iPad_5: THREE.Mesh;
    iPad_6: THREE.Mesh;
    iPad_7: THREE.Mesh;
    iPad_8: THREE.Mesh;
    iPad_9: THREE.Mesh;
    iPad_10: THREE.Mesh;
    iPad_11: THREE.Mesh;
    iPad_12: THREE.Mesh;
    iPad_13: THREE.Mesh;
    iPad_14: THREE.Mesh;
    Hips: THREE.Bone;
  };
  materials: {
    ['Body.002']: THREE.MeshPhysicalMaterial;
    ['Outfit_Bottom.002']: THREE.MeshStandardMaterial;
    ['Outfit_Footwear.002']: THREE.MeshStandardMaterial;
    ['Outfit_Top.002']: THREE.MeshStandardMaterial;
    ['Skin.002']: THREE.MeshStandardMaterial;
    ['Eye.002']: THREE.MeshStandardMaterial;
    ['Hair.002']: THREE.MeshStandardMaterial;
    ['Trinket.002']: THREE.MeshStandardMaterial;
    ['Top.002']: THREE.MeshStandardMaterial;
    ['Rubber.002']: THREE.MeshStandardMaterial;
    ['AppleLogo.002']: THREE.MeshStandardMaterial;
    ['Bottom.002']: THREE.MeshStandardMaterial;
    ['UsbCInside.002']: THREE.MeshStandardMaterial;
    ['Legs.002']: THREE.MeshStandardMaterial;
    ['HingeBlack.002']: THREE.MeshStandardMaterial;
    ['HeadPhoneHole.002']: THREE.MeshStandardMaterial;
    bezel: THREE.MeshStandardMaterial;
    Body: THREE.MeshStandardMaterial;
    Line: THREE.MeshStandardMaterial;
    material: THREE.MeshStandardMaterial;
    cameraframe_and_logo: THREE.MeshStandardMaterial;
    camera12: THREE.MeshStandardMaterial;
    front_camera: THREE.MeshStandardMaterial;
    glass: THREE.MeshStandardMaterial;
    camera1: THREE.MeshStandardMaterial;
    camera2: THREE.MeshStandardMaterial;
    Camera_Flash: THREE.MeshStandardMaterial;
    ['camera2.001']: THREE.MeshStandardMaterial;
    LiDar: THREE.MeshStandardMaterial;
  };
};
