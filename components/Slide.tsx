'use client';

import { ReactNode, useContext } from 'react';
import { motion, MotionValue } from 'framer-motion';
import { scrollAnimationType } from './types';
import { SlideContext } from './Slides';
import { triggerMotionAtIntegers } from './helper/motion-value-helper';

type Props = {
  animationType?: scrollAnimationType;
  slideTransitions: ((slideProgress: MotionValue<number>) => any)[];
  children: ReactNode;
};

function Slide({
  animationType = 'scrollTriggered',
  slideTransitions,
  children,
}: Props) {
  let slideProgress = useContext(SlideContext).slideProgress;
  if (animationType === 'scrollTriggered') {
    slideProgress = triggerMotionAtIntegers(slideProgress);
  }

  return (
    <motion.div
      className='absolute viewport'
      style={{
        ...slideTransitions
          .map((v) => v(slideProgress))
          .reduce((prev, v) => ({ ...prev, ...v })),
      }}
    >
      {children}
    </motion.div>
  );
}
export default Slide;
