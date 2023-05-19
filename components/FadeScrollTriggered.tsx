'use client';

import { ReactNode } from 'react';
import {
  motion,
  MotionValue,
  useTransform,
  ValueAnimationTransition,
} from 'framer-motion';
import { FadeOptions } from './types';
import SketchesScrollTriggered from './SketchesScrollTriggered';

type Props = {
  sketchesCount?: number;
  height?: string;
  fadeConfig?: FadeOptions;
  backgroundColor?: string;
  offset?: any;
  transition?: ValueAnimationTransition<number>;
  children: ReactNode;
};

function FadeScrollTriggered({
  sketchesCount,
  height,
  fadeConfig = 'smoothly',
  backgroundColor = 'black',
  offset,
  transition,
  children,
}: Props) {
  const render = (
    sketch: ReactNode,
    index: number,
    motionProgress: MotionValue<number>,
    storyboardScrollProgress: MotionValue<number>
  ) => {
    const opacity =
      fadeConfig === 'smoothly'
        ? useTransform(motionProgress, [-1, 0, 1], [0, 1, 0])
        : useTransform(motionProgress, [-0.45, 0, 0.45], [0, 1, 0]);

    return (
      <motion.div className='absolute viewport' style={{ opacity: opacity }}>
        {sketch}
      </motion.div>
    );
  };

  return (
    <SketchesScrollTriggered
      sketchesCount={sketchesCount}
      height={height}
      backgroundColor={backgroundColor}
      offset={offset}
      transition={transition}
    >
      {{ sketches: children, render: render }}
    </SketchesScrollTriggered>
  );
}
export default FadeScrollTriggered;
