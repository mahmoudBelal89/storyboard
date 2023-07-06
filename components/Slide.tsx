'use client';

import { ReactNode, useContext } from 'react';
import { motion, MotionValue } from 'framer-motion';
import { ScrollAnimation } from './types';
import { animateProgress } from './helper/motion-value-helper';
import { SlidesContext, SlideContext } from './Slides';

type Props = {
  scrollAnimation?: ScrollAnimation;
  transitions: ((slideProgress: MotionValue<number>) => any)[];
  children: ReactNode;
};

function Slide({ scrollAnimation, transitions, children }: Props) {
  const slidesContext = useContext(SlidesContext);
  const width = slidesContext.props.width;
  const height = slidesContext.props.height;
  const slideContext = useContext(SlideContext);
  let slideProgress = slideContext.slideProgress;
  if (scrollAnimation) {
    slideProgress = animateProgress(
      slideProgress,
      scrollAnimation,
      slideContext.slideIndex === 0 ? 0 : -1
    );
  }

  return (
    <motion.div
      className='overflow-hidden'
      style={{
        minWidth: width,
        maxWidth: width,
        minHeight: height,
        maxHeight: height,
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
