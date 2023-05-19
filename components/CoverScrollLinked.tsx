'use client';

import { ReactNode } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import SketchesScrollLinked from './SketchesScrollLinked';

type Props = {
  sketchesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transitionExtent?: number;
  children: ReactNode;
};

function CoverScrollLinked({
  sketchesCount,
  height,
  backgroundColor,
  offset,
  transitionExtent,
  children,
}: Props) {
  const render = (
    sketch: ReactNode,
    index: number,
    scrollProgress: MotionValue<number>,
    storyboardScrollProgress: MotionValue<number>
  ) => {
    const xNumber = useTransform(scrollProgress, [-1, 0], [100, 0]);
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
    <SketchesScrollLinked
      sketchesCount={sketchesCount}
      height={height}
      backgroundColor={backgroundColor}
      offset={offset}
      transitionExtent={transitionExtent}
    >
      {{ sketches: children, render: render }}
    </SketchesScrollLinked>
  );
}
export default CoverScrollLinked;
