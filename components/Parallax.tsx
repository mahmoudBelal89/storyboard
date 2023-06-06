'use client';

import { ReactNode, useContext } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Direction } from './types';
import { xy } from './helper/motion-value-helper';
import { PresentationContext } from './Presentation';

type Props = {
  direction?: Direction;
  length: number;
  children: ReactNode;
};

function Parallax({ direction = 'up', length, children }: Props) {
  const presentationContext = useContext(PresentationContext);
  const slidesCount = presentationContext.props.slidesCount;
  const presentationProgress = presentationContext.presentationProgress;

  const dimensions =
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

  const position = xy(
    direction === 'left' || direction === 'up'
      ? useTransform(
          presentationProgress,
          [0, slidesCount - 1],
          [0, -(length - 100)]
        )
      : useTransform(
          presentationProgress,
          [0, slidesCount - 1],
          [-(length - 100), 0]
        ),
    direction
  );

  return (
    <motion.div
      className='absolute'
      style={{
        ...dimensions,
        ...position,
      }}
    >
      {children}
    </motion.div>
  );
}
export default Parallax;
