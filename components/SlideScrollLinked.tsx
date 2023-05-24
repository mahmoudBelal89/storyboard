'use client';

import { ReactNode, useContext } from 'react';
import { motion, MotionValue } from 'framer-motion';
import { SoloSlidesScrollLinkedContext } from './SoloSlidesScrollLinked';

type Props = {
  slideTransitions: ((transitionProgress: MotionValue<number>) => any)[];
  children: ReactNode;
};

function SlideScrollLinked({ slideTransitions, children }: Props) {
  const transitionProgress = useContext(
    SoloSlidesScrollLinkedContext
  ).transitionProgress;

  return (
    <motion.div
      className='absolute viewport'
      style={{
        ...slideTransitions
          .map((v) => v(transitionProgress))
          .reduce((prev, v) => ({ ...prev, ...v })),
      }}
    >
      {children}
    </motion.div>
  );
}
export default SlideScrollLinked;
