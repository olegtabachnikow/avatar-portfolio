import { FC, useState, useEffect } from 'react';
import classes from './Display.module.css';
import { Html } from '@react-three/drei';
import useStore from '@/store/store';

const Display: FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const isTabletMode = useStore((state) => state.isTabletMode);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isTabletMode) {
      timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
    }
    return () => clearTimeout(timer);
  });

  return (
    <Html
      visible={isVisible}
      frustumCulled={false}
      occlude='blending'
      transform
      zIndexRange={[10, 0]}
      distanceFactor={0.087}
      position={[-0.131, 1.567, 0.455]}
      rotation={[Math.PI * 0.25, Math.PI * 0.855, -Math.PI * 0.07]}
      wrapperClass={`${classes.iframe} ${isTabletMode ? 'visible' : ''}`}
    >
      <iframe src='https://polyhaven.com/' />
    </Html>
  );
};

export default Display;
