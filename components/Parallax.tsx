'use client';

import { ReactNode, useContext } from 'react';
import { motion, useTransform } from 'framer-motion';
import { ScrollAnimation, Direction } from './types';
import { DirectionContext } from './DirectionProvider';
import { add } from './helper/string-helper';
import { reshape, xy } from './helper/motion-value-helper';
import { WheelContext } from './Wheel';

type Props = {
  scrollAnimation?: ScrollAnimation;
  direction?: Direction;
  parallaxSize: string;
  width?: string;
  height?: string;
  className?: string;
  children: ReactNode;
};

function Parallax({
  scrollAnimation,
  direction,
  parallaxSize,
  width,
  height = '100vh',
  className,
  children,
}: Props) {
  if (!direction) {
    direction = useContext(DirectionContext) ?? 'up';
  }
  const presentationContext = useContext(WheelContext);
  if (width === undefined) {
    width = presentationContext.props.width;
  }
  const slidesCount = presentationContext.props.slidesCount;
  let presentationProgress = presentationContext.wheelProgress;
  if (scrollAnimation) {
    presentationProgress = reshape(presentationProgress, scrollAnimation);
  }

  const parallaxDelta = -(
    parseFloat(parallaxSize) -
    (direction === 'left' || direction === 'right'
      ? parseFloat(width)
      : parseFloat(height))
  );

  return (
    <div
      className={add('overflow-hidden', className)}
      style={{
        minWidth: width,
        maxWidth: width,
        minHeight: height,
        maxHeight: height,
      }}
    >
      <motion.div
        className='overflow-hidden'
        style={{
          ...(direction === 'up' || direction === 'down'
            ? {
                minHeight: parallaxSize,
                maxHeight: parallaxSize,
                minWidth: width,
                maxWidth: width,
              }
            : {
                minHeight: height,
                maxHeight: height,
                minWidth: parallaxSize,
                maxWidth: parallaxSize,
              }),
          ...xy(
            useTransform(
              presentationProgress,
              [0, slidesCount - 1],
              direction === 'left' || direction === 'up'
                ? [0, parallaxDelta]
                : [parallaxDelta, 0]
            ),
            direction
          ),
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
export default Parallax;
