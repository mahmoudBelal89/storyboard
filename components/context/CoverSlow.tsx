'use client';

import { ReactNode, useContext } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Direction } from '../types';
import { dimensions } from '../helper';
import { ActSlowContext } from './ActSlow';

type Props = {
  direction?: Direction;
  children: ReactNode;
};

function CoverSlow({ direction = 'left', children }: Props) {
  const actSlowContext = useContext(ActSlowContext);
  const transitionProgress = actSlowContext.transitionProgress;
  const position =
    direction === 'left' || direction === 'up'
      ? useTransform(transitionProgress, [-1, 0], [100, 0])
      : useTransform(transitionProgress, [-1, 0], [-100, 0]);
  const [x, y] = dimensions(direction, position);

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
export default CoverSlow;
