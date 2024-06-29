import { FC, useRef, useEffect } from 'react';
import classes from './IntroButton.module.css';
import Image from 'next/image';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import useStore from '@/store/store';

const IntroButton: FC = () => {
  const [isStarted, setIsStarted] = useStore((state) => [
    state.isStarted,
    state.setIsStarted,
  ]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { contextSafe } = useGSAP({ scope: buttonRef });

  const handleStart = contextSafe(() => {
    gsap.to(buttonRef.current, {
      duration: 1.5,
      ease: 'linear',
      scale: 0,
      x: '-200%',
      autoAlpha: 0,
    });
  });

  const handleFinish = contextSafe(() => {
    gsap.to(buttonRef.current, {
      duration: 1.5,
      ease: 'linear',
      scale: 1,
      x: 0,
      autoAlpha: 1,
    });
  });

  const handleClick = () => {
    setIsStarted(!isStarted);
  };

  useEffect(() => {
    isStarted ? handleStart() : handleFinish();
  }, [isStarted]);

  return (
    <button ref={buttonRef} onClick={handleClick} className={classes.button}>
      <Image
        src='/images/play.svg'
        width={50}
        height={50}
        alt='play (start)'
        quality={100}
      />
    </button>
  );
};

export default IntroButton;
