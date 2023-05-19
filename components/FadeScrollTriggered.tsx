'use client';

import React, { ReactNode, useState } from 'react';
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  Transition,
  useAnimate,
  ValueAnimationTransition,
  motionValue,
  animate,
  useTransform,
} from 'framer-motion';
import { _FLEX_DIRECTION_VARIANTS } from './constants';
import { FadeOptions } from './types';
import { StoryboardScrollTriggeredDefaultProps } from './StoryboardScrollTriggered';
import { offsetAnimation } from './transform';
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
  sketchesCount = StoryboardScrollTriggeredDefaultProps.sketchesCount,
  height,
  fadeConfig = 'smoothly',
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
    const opacity = useTransform(motionProgress, [-1, 0, 1], [0, 1, 0]);

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
      isDisabledWhileTransition={true}
    >
      {{ sketches: children, render: render }}
    </SketchesScrollTriggered>
  );
}
export default FadeScrollTriggered;
