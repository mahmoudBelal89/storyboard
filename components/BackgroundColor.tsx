'use client';

import { useContext } from 'react';
import { motion, useTransform } from 'framer-motion';
import { ScrollAnimation, ScrollTriggered } from './types';
import { reshape } from './helper/motion-value-helper';
import { PresentationContext } from './Presentation';

type Props = {
  scrollAnimation?: ScrollAnimation;
  colors: string[];
};

function BackgroundColor({
  scrollAnimation = new ScrollTriggered(),
  colors,
}: Props) {
  const presentationContext = useContext(PresentationContext);
  const presentationProgress = reshape(
    presentationContext.presentationProgress,
    scrollAnimation
  );

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
