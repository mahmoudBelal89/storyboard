'use client';

import { ReactNode } from 'react';
import {
  motion,
  MotionValue,
  useTransform,
  ValueAnimationTransition,
} from 'framer-motion';
import { FadeOptions } from './types';
import Act from './Act';

type Props = {
  scenesCount?: number;
  height?: string;
  fadeConfig?: FadeOptions;
  backgroundColor?: string;
  offset?: any;
  transition?: ValueAnimationTransition<number>;
  children: ReactNode;
};

function Fade({
  scenesCount,
  height,
  fadeConfig = 'smoothly',
  backgroundColor = 'black',
  offset,
  transition = { type: 'spring', damping: 25, stiffness: 25, mass: 5 },
  children,
}: Props) {
  const render = (
    scene: ReactNode,
    index: number,
    transitionProgress: MotionValue<number>,
    scrollProgress: MotionValue<number>
  ) => {
    const opacity =
      fadeConfig === 'smoothly'
        ? useTransform(transitionProgress, [-1, 0, 1], [0, 1, 0])
        : useTransform(transitionProgress, [-0.45, 0, 0.45], [0, 1, 0]);

    return (
      <motion.div className='absolute viewport' style={{ opacity: opacity }}>
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
    >
      {{ scenes: children, render: render }}
    </Act>
  );
}
export default Fade;
