'use client';

import { useContext } from 'react';
import { motion, useTransform } from 'framer-motion';
import { ScrollAnimation, ScrollTriggered } from './types';
import { reshape } from './helper/motion-value-helper';
import { WheelContext } from './Wheel';

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
  width,
  height = '100vh',
  className,
}: Props) {
  const presentationContext = useContext(WheelContext);
  if (width === undefined) {
    width = presentationContext.props.width;
  }
  const presentationProgress = reshape(
    presentationContext.wheelProgress,
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
