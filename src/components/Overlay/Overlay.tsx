import { FC, useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './Overlay.module.css';
import { useGSAP } from '@gsap/react';
import useStore from '@/store/store';

const Overlay: FC = () => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const isStarted = useStore((state) => state.isStarted);
  const { contextSafe } = useGSAP({ scope: overlayRef });

  const handleStart = contextSafe(() => {
    gsap.to(overlayRef.current, {
      duration: 1.5,
      ease: 'power1.out',
      width: 900,
      x: '-30%',
      height: 900,
      autoAlpha: 0,
    });
  });

  const handleFinish = contextSafe(() => {
    gsap.to(overlayRef.current, {
      duration: 1.5,
      ease: 'expo.inOut',
      width: 300,
      height: 300,
      x: 0,
      autoAlpha: 1,
    });
  });

  useEffect(() => {
    isStarted ? handleStart() : handleFinish();
  }, [isStarted]);

  return (
    <div className={styles.container}>
      <div ref={overlayRef} className={styles.overlay} />
    </div>
  );
};

export default Overlay;
