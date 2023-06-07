'use client';

import { useContext } from 'react';
import { motion, useTransform } from 'framer-motion';
import { ScrollAnimationType } from './types';
import { animateAtIntegers } from './helper/motion-value-helper';
import { PresentationContext } from './Presentation';

type Props = {
  scrollAnimationType?: ScrollAnimationType;
  colors: string[];
};

function BackgroundColor({
  scrollAnimationType = 'scrollTriggered',
  colors,
}: Props) {
  const presentationContext = useContext(PresentationContext);
  let presentationProgress = presentationContext.presentationProgress;
  if (scrollAnimationType === 'scrollTriggered') {
    presentationProgress = animateAtIntegers(presentationProgress, 0);
  }

  return (
    <motion.div
      className='absolute viewport'
      style={{
        background: useTransform(
          presentationProgress,
          Array.from(Array(presentationContext.props.slidesCount).keys()),
          colors
        ),
      }}
    />
  );
}
export default BackgroundColor;
