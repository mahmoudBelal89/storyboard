'use client';

import { ReactNode } from 'react';
import {
  motion,
  MotionValue,
  useTransform,
  ValueAnimationTransition,
} from 'framer-motion';
import SketchesScrollTriggered from './SketchesScrollTriggered';

type Props = {
  sketchesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transition?: ValueAnimationTransition<number>;
  children: ReactNode;
};

function CoverScrollTriggered({
  sketchesCount,
  height,
  backgroundColor,
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
    const xNumber = useTransform(motionProgress, [-1, 0], [100, 0]);
    const x = useTransform(xNumber, (v) => v + 'vw');

    return (
      <motion.div
        className='absolute viewport'
        style={{
          x: x,
        }}
      >
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
export default CoverScrollTriggered;
