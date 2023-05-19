'use client';

import { ReactNode } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { FadeOptions } from './types';
import SketchesScrollLinked from './SketchesScrollLinked';

type Props = {
  sketchesCount?: number;
  height?: string;
  fadeConfig?: FadeOptions;
  backgroundColor?: string;
  offset?: any;
  transitionExtent?: number;
  children: ReactNode;
};

function FadeScrollLinked({
  sketchesCount,
  height,
  fadeConfig = 'smoothly',
  backgroundColor = 'black',
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
    const opacity =
      fadeConfig === 'smoothly'
        ? useTransform(scrollProgress, [-1, 0, 1], [0, 1, 0])
        : useTransform(scrollProgress, [-0.45, 0, 0.45], [0, 1, 0]);

    return (
      <motion.div
        className='absolute viewport'
        style={{
          opacity: opacity,
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
      isDisabledWhileTransition={true}
    >
      {{ sketches: children, render: render }}
    </SketchesScrollLinked>
  );
}
export default FadeScrollLinked;
