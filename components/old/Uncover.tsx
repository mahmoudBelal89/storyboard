'use client';

import { ReactNode } from 'react';
import {
  motion,
  MotionValue,
  useTransform,
  ValueAnimationTransition,
} from 'framer-motion';
import { Direction } from '../types';
import { xy } from '../helper/motion-value-helper';
import Act from './Act';

type Props = {
  direction?: Direction;
  scenesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transition?: ValueAnimationTransition<number>;
  children: ReactNode;
};

function Uncover({
  direction = 'left',
  scenesCount,
  height,
  backgroundColor,
  offset,
  transition,
  children,
}: Props) {
  const render = (
    scene: ReactNode,
    index: number,
    transitionProgress: MotionValue<number>,
    scrollProgress: MotionValue<number>
  ) => {
    const position =
      direction === 'left' || direction === 'up'
        ? useTransform(transitionProgress, [0, 1], [0, -100])
        : useTransform(transitionProgress, [0, 1], [0, 100]);
    const [x, y] = xy(direction, position);

    return (
      <motion.div
        className='absolute viewport'
        style={{
          x: x,
          y: y,
        }}
      >
        {scene}
      </motion.div>
    );
  };

  return (
    <Act
      scenesCount={scenesCount}
      height={height}
      backgroundColor={backgroundColor}
      offset={offset}
      transition={transition}
      isZIndexNegative={true}
    >
      {{ scenes: children, render: render }}
    </Act>
  );
}
export default Uncover;
