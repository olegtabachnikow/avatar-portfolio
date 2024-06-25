import { FC } from 'react';
import classes from './IntroButton.module.css';
import Image from 'next/image';
import useStore from '@/store/store';

const IntroButton: FC = () => {
  const [isStarted, setIsStarted] = useStore((state) => [
    state.isStarted,
    state.setIsStarted,
  ]);

  const handleClick = () => {
    setIsStarted(!isStarted);
  };

  return (
    <button onClick={handleClick} className={classes.button}>
      <Image
        src='/images/play.svg'
        width={64}
        height={64}
        alt='play (start)'
        style={{ transform: 'translateX(5px)' }}
        quality={100}
      />
    </button>
  );
};

export default IntroButton;
