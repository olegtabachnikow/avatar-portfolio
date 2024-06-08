import { FC, useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

const Avatar: FC = () => {
  const model = useGLTF('./avatar.glb');
  const { actions } = useAnimations(model.animations, model.scene);

  useEffect(() => {
    actions.Staying?.play();
  }, [actions]);

  return <primitive object={model.scene} />;
};

export default Avatar;

useGLTF.preload('./avatar.glb');
