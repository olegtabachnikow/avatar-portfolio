import * as THREE from 'three';
import { FC, useRef, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';
import type { GLTFResult } from '@/types';

const Avatar: FC = (props: JSX.IntrinsicElements['group']) => {
  const group = useRef<THREE.Group>(null);
  const { nodes, materials, animations } = useGLTF(
    '/avatarM.glb'
  ) as GLTFResult;
  const { actions } = useAnimations<any>(animations, group);

  useEffect(() => {
    nodes.iPad.visible = false;
    console.log(nodes.iPad);
    actions.Staying?.play();
  }, [actions]);

  const takePhone = () => {
    actions.Staying?.fadeOut(0.2);
    actions.Staying?.stop();
    actions.PickPhone?.setDuration(2).play();
    setTimeout(() => {
      nodes.iPad.visible = true;
    }, 700);
    setTimeout(function () {
      if (actions.PickPhone) actions.PickPhone.paused = true;
    }, 1900);
  };

  return (
    <group ref={group} {...props} dispose={null} onClick={takePhone}>
      <group name='Scene'>
        <group name='Armature'>
          <group name='Body'>
            <skinnedMesh
              name='Body002'
              geometry={nodes.Body002.geometry}
              material={materials['Body.002']}
              skeleton={nodes.Body002.skeleton}
              morphTargetDictionary={nodes.Body002.morphTargetDictionary}
              morphTargetInfluences={nodes.Body002.morphTargetInfluences}
            />
            <skinnedMesh
              name='Body002_1'
              geometry={nodes.Body002_1.geometry}
              material={materials['Outfit_Bottom.002']}
              skeleton={nodes.Body002_1.skeleton}
              morphTargetDictionary={nodes.Body002_1.morphTargetDictionary}
              morphTargetInfluences={nodes.Body002_1.morphTargetInfluences}
            />
            <skinnedMesh
              name='Body002_2'
              geometry={nodes.Body002_2.geometry}
              material={materials['Outfit_Footwear.002']}
              skeleton={nodes.Body002_2.skeleton}
              morphTargetDictionary={nodes.Body002_2.morphTargetDictionary}
              morphTargetInfluences={nodes.Body002_2.morphTargetInfluences}
            />
            <skinnedMesh
              name='Body002_3'
              geometry={nodes.Body002_3.geometry}
              material={materials['Outfit_Top.002']}
              skeleton={nodes.Body002_3.skeleton}
              morphTargetDictionary={nodes.Body002_3.morphTargetDictionary}
              morphTargetInfluences={nodes.Body002_3.morphTargetInfluences}
            />
            <skinnedMesh
              name='Body002_4'
              geometry={nodes.Body002_4.geometry}
              material={materials['Skin.002']}
              skeleton={nodes.Body002_4.skeleton}
              morphTargetDictionary={nodes.Body002_4.morphTargetDictionary}
              morphTargetInfluences={nodes.Body002_4.morphTargetInfluences}
            />
            <skinnedMesh
              name='Body002_5'
              geometry={nodes.Body002_5.geometry}
              material={materials['Eye.002']}
              skeleton={nodes.Body002_5.skeleton}
              morphTargetDictionary={nodes.Body002_5.morphTargetDictionary}
              morphTargetInfluences={nodes.Body002_5.morphTargetInfluences}
            />
            <skinnedMesh
              name='Body002_6'
              geometry={nodes.Body002_6.geometry}
              material={materials['Hair.002']}
              skeleton={nodes.Body002_6.skeleton}
              morphTargetDictionary={nodes.Body002_6.morphTargetDictionary}
              morphTargetInfluences={nodes.Body002_6.morphTargetInfluences}
            />
          </group>
          <primitive object={nodes.Hips} />
        </group>
      </group>
    </group>
  );
};

export default Avatar;
useGLTF.preload('/avatarM.glb');
