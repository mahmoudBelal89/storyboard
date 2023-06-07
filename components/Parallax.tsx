'use client';

import { ReactNode, useContext } from 'react';
import { motion, useTransform } from 'framer-motion';
import { ScrollAnimationType, Direction } from './types';
import { DirectionContext } from './DirectionProvider';
import { animateAtIntegers, xy } from './helper/motion-value-helper';
import { PresentationContext } from './Presentation';

type Props = {
  scrollAnimationType?: ScrollAnimationType;
  direction?: Direction;
  length: number;
  children: ReactNode;
};

function Parallax({
  scrollAnimationType = 'scrollLinked',
  direction,
  length,
  children,
}: Props) {
  if (!direction) {
    direction = useContext(DirectionContext) ?? 'up';
  }
  const presentationContext = useContext(PresentationContext);
  const slidesCount = presentationContext.props.slidesCount;
  let presentationProgress = presentationContext.presentationProgress;
  if (scrollAnimationType === 'scrollTriggered') {
    presentationProgress = animateAtIntegers(presentationProgress, 0);
  }

  const size =
    direction === 'up' || direction === 'down'
      ? {
          minHeight: length + 'vh',
          maxHeight: length + 'vh',
          minWidth: '100vw',
          maxWidth: '100vw',
        }
      : {
          minHeight: '100vh',
          maxHeight: '100vh',
          minWidth: length + 'vw',
          maxWidth: length + 'vw',
        };

  return (
    <motion.div
      className='absolute'
      style={{
        ...size,
        ...xy(
          useTransform(
            presentationProgress,
            [0, slidesCount - 1],
            direction === 'left' || direction === 'up'
              ? [0, -(length - 100)]
              : [-(length - 100), 0]
          ),
          direction
        ),
      }}
    >
      {children}
    </motion.div>
  );
}
export default Parallax;
