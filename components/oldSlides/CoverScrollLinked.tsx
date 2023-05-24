'use client';

import { ReactNode, useContext } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Direction } from '../types';
import { xy } from '../helper';
import { DirectionContext } from '../DirectionProvider';
import { SoloSlidesScrollLinkedContext } from '../SoloSlidesScrollLinked';

type Props = {
  direction?: Direction;
  children: ReactNode;
};

function CoverScrollLinked({ direction, children }: Props) {
  const directionContext = useContext(DirectionContext);
  if (!direction) {
    direction = directionContext ?? 'left';
  }
  const transitionProgress = useContext(
    SoloSlidesScrollLinkedContext
  ).transitionProgress;
  const position =
    direction === 'left' || direction === 'up'
      ? useTransform(transitionProgress, [-1, 0], [100, 0])
      : useTransform(transitionProgress, [-1, 0], [-100, 0]);
  const [x, y] = xy(direction, position);

  return (
    <motion.div
      className='absolute viewport'
      style={{
        x: x,
        y: y,
      }}
    >
      {children}
    </motion.div>
  );
}
export default CoverScrollLinked;
