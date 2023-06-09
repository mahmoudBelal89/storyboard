'use client';

import { ReactNode, useContext } from 'react';
import { motion, MotionValue } from 'framer-motion';
import { ScrollAnimation } from './types';
import { reshape } from './helper/motion-value-helper';
import { SlideContext } from './Slides';

type Props = {
  scrollAnimation?: ScrollAnimation;
  transitions: ((slideProgress: MotionValue<number>) => any)[];
  children: ReactNode;
};

function Slide({ scrollAnimation, transitions, children }: Props) {
  const slideContext = useContext(SlideContext);
  let slideProgress = slideContext.slideProgress;
  if (scrollAnimation) {
    slideProgress = reshape(
      slideProgress,
      scrollAnimation,
      slideContext.slideIndex === 0 ? 0 : -1
    );
  }

  return (
    <motion.div
      className='absolute viewport'
      style={{
        ...transitions
          .map((v) => v(slideProgress))
          .reduce((prev, v) => ({ ...prev, ...v })),
      }}
    >
      {children}
    </motion.div>
  );
}
export default Slide;
