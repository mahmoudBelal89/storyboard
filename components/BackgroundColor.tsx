'use client';

import { useContext } from 'react';
import { motion, useTransform } from 'framer-motion';
import { ScrollAnimation, ScrollTriggered } from './types';
import { reshape } from './helper/motion-value-helper';
import { PresentationContext } from './Presentation';

type Props = {
  scrollAnimation?: ScrollAnimation;
  colors: string[];
  width?: string;
  height?: string;
  className?: string;
};

function BackgroundColor({
  scrollAnimation = new ScrollTriggered(),
  colors,
  width = '100%',
  height = '100%',
  className,
}: Props) {
  const presentationContext = useContext(PresentationContext);
  const presentationProgress = reshape(
    presentationContext.presentationProgress,
    scrollAnimation
  );

  return (
    <motion.div
      className={className}
      style={{
        minWidth: width,
        maxWidth: width,
        minHeight: height,
        maxHeight: height,
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