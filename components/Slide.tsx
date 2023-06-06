'use client';

import { ReactNode, useContext } from 'react';
import { motion, MotionValue } from 'framer-motion';
import { ScrollAnimationType } from './types';
import { animateAtIntegers } from './helper/motion-value-helper';
import { SlideContext } from './Slides';

type Props = {
  scrollAnimationType?: ScrollAnimationType;
  transitions: ((slideProgress: MotionValue<number>) => any)[];
  children: ReactNode;
};

function Slide({
  scrollAnimationType = 'scrollTriggered',
  transitions,
  children,
}: Props) {
  let slideProgress = useContext(SlideContext).slideProgress;
  if (scrollAnimationType === 'scrollTriggered') {
    slideProgress = animateAtIntegers(slideProgress);
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
