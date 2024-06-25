import * as THREE from 'three';
import { FC, useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import type { GLTFResult } from '@/types';
import useStore from '@/store/store';

const target = new THREE.Object3D();
// target.position.set(-1, 1.5, 2);
target.position.set(0, 1.8, 2);
const intersectionPoint = new THREE.Vector3();
const planeNormal = new THREE.Vector3();
const plane = new THREE.Plane();
const mousePosition = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

let head: THREE.Bone | null = null;

const Avatar: FC = (props: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF('/avatar.glb') as GLTFResult;
  const { actions } = useAnimations<any>(animations, group);
  const [isStarted, setIsTabletMode, setIsParticlesMode3] = useStore(
    (state) => [
      state.isStarted,
      state.setIsTabletMode,
      state.setIsParticlesMode3,
    ]
  );
  const { scene, camera } = useThree();

  head = nodes?.Head;

  const handleRaycaster = (event: MouseEvent) => {
    mousePosition.x = (event.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = -(event.clientY / window.innerHeight) * 2 + 1;
    planeNormal.copy(camera.position).normalize();
    plane.setFromNormalAndCoplanarPoint(planeNormal, scene.position);
    raycaster.setFromCamera(mousePosition, camera);
    raycaster.ray.intersectPlane(plane, intersectionPoint);
    target.position.set(intersectionPoint.x, intersectionPoint.y, 10);
  };

  // useEffect(() => {
  //   window.addEventListener('mousemove', handleRaycaster);
  //   return () => window.removeEventListener('mousemove', handleRaycaster);
  // }, []);

  useEffect(() => {
    nodes.iPad.visible = false;
    if (actions.Wave) actions.Wave.repetitions = 0;
    actions.Wave?.fadeIn(0.2);
    actions.Wave?.play();
  }, [nodes.iPad, actions]);

  useEffect(() => {
    if (isStarted) actions.Staying?.play();
  }, [actions, isStarted]);

  const takePhone = () => {
    actions.Staying?.fadeOut(0.2);
    actions.PickPhone?.setDuration(2).play();
    setTimeout(() => {
      nodes.iPad.visible = true;
      setIsParticlesMode3(true);
    }, 700);
    setTimeout(function () {
      setIsTabletMode(true);
      if (actions.PickPhone) actions.PickPhone.paused = true;
    }, 1900);
  };

  useFrame(() => {
    if (head && !isStarted) {
      head.lookAt(target.position);
    }
  });

  return (
    <group ref={group} {...props} dispose={null} onClick={takePhone}>
      <group name='Scene'>
        <group name='Armature'>
          <group name='Body'>
            <skinnedMesh
              name='Body_1'
              geometry={nodes.Body_1.geometry}
              material={materials['Body.001']}
              skeleton={nodes.Body_1.skeleton}
              morphTargetDictionary={nodes.Body_1.morphTargetDictionary}
              morphTargetInfluences={nodes.Body_1.morphTargetInfluences}
            />
            <skinnedMesh
              name='Body_2'
              geometry={nodes.Body_2.geometry}
              material={materials.Outfit_Bottom}
              skeleton={nodes.Body_2.skeleton}
              morphTargetDictionary={nodes.Body_2.morphTargetDictionary}
              morphTargetInfluences={nodes.Body_2.morphTargetInfluences}
            />
            <skinnedMesh
              name='Body_3'
              geometry={nodes.Body_3.geometry}
              material={materials.Outfit_Footwear}
              skeleton={nodes.Body_3.skeleton}
              morphTargetDictionary={nodes.Body_3.morphTargetDictionary}
              morphTargetInfluences={nodes.Body_3.morphTargetInfluences}
            />
            <skinnedMesh
              name='Body_4'
              geometry={nodes.Body_4.geometry}
              material={materials.Outfit_Top}
              skeleton={nodes.Body_4.skeleton}
              morphTargetDictionary={nodes.Body_4.morphTargetDictionary}
              morphTargetInfluences={nodes.Body_4.morphTargetInfluences}
            />
            <skinnedMesh
              name='Body_5'
              geometry={nodes.Body_5.geometry}
              material={materials.Skin}
              skeleton={nodes.Body_5.skeleton}
              morphTargetDictionary={nodes.Body_5.morphTargetDictionary}
              morphTargetInfluences={nodes.Body_5.morphTargetInfluences}
            />
            <skinnedMesh
              name='Body_6'
              geometry={nodes.Body_6.geometry}
              material={materials.Eye}
              skeleton={nodes.Body_6.skeleton}
              morphTargetDictionary={nodes.Body_6.morphTargetDictionary}
              morphTargetInfluences={nodes.Body_6.morphTargetInfluences}
            />
            <skinnedMesh
              name='Body_7'
              geometry={nodes.Body_7.geometry}
              material={materials.Hair}
              skeleton={nodes.Body_7.skeleton}
              morphTargetDictionary={nodes.Body_7.morphTargetDictionary}
              morphTargetInfluences={nodes.Body_7.morphTargetInfluences}
            />
          </group>
          <primitive object={nodes.Hips} />
        </group>
      </group>
    </group>
  );
};

export default Avatar;
useGLTF.preload('/avatar.glb');
