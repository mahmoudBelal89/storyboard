'use client';

import { ReactNode } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { FadeOptions } from './types';
import SlowAct from './SlowAct';

type Props = {
  scenesCount?: number;
  height?: string;
  fadeConfig?: FadeOptions;
  backgroundColor?: string;
  offset?: any;
  transitionExtent?: number;
  children: ReactNode;
};

function SlowFade({
  scenesCount,
  height,
  fadeConfig = 'smoothly',
  backgroundColor = 'black',
  offset,
  transitionExtent,
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
      <motion.div
        className='absolute viewport'
        style={{
          opacity: opacity,
        }}
      >
        {scene}
      </motion.div>
    );
  };

  return (
    <SlowAct
      scenesCount={scenesCount}
      height={height}
      backgroundColor={backgroundColor}
      offset={offset}
      transitionExtent={transitionExtent}
      isSpring={false}
    >
      {{ scenes: children, render: render }}
    </SlowAct>
  );
}
export default SlowFade;
