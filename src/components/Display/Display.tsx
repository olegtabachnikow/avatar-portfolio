import { FC } from 'react';
import classes from './Display.module.css';
import { Html } from '@react-three/drei';
import useStore from '@/store/store';

const Display: FC = () => {
  const isTabletMode = useStore((state) => state.isTabletMode);

  return (
    <Html
      visible={isTabletMode}
      frustumCulled={false}
      occlude='blending'
      transform
      distanceFactor={0.087}
      position={[-0.133, 1.5635, 0.4585]}
      rotation={[Math.PI * 0.2505, Math.PI * 0.858, -Math.PI * 0.068]}
      wrapperClass={classes.display}
    >
      <iframe src='https://polyhaven.com/' />
    </Html>
  );
};

export default Display;
