'use client';

import React, { ReactNode, useState } from 'react';
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  Transition,
} from 'framer-motion';
import { _FLEX_DIRECTION_VARIANTS } from './constants';
import { Direction } from './types';
import StoryboardScrollTriggered from './StoryboardScrollTriggered';

type Props = {
  direction?: Direction;
  sketchesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transition?: Transition;
  children: ReactNode;
};

function PushScrollTriggered({
  direction = 'left',
  sketchesCount,
  height,
  backgroundColor,
  offset,
  transition,
  children,
}: Props) {
  const [push, setPush] = useState(0);
  const render = (scrollProgress: MotionValue<number>, defaultProps: any) => {
    sketchesCount = sketchesCount ?? defaultProps.sketchesCount;
    useMotionValueEvent(scrollProgress, 'change', (v) => {
      setPush(v);
    });

    return (
      <motion.div
        className={`flex ${_FLEX_DIRECTION_VARIANTS[direction]} fit`}
        initial={{
          x:
            direction === 'right'
              ? -100 * (sketchesCount! - 1) + 'vw'
              : undefined,
          y:
            direction === 'down'
              ? -100 * (sketchesCount! - 1) + 'vh'
              : undefined,
        }}
        animate={{
          x:
            direction === 'left'
              ? -push * 100 + 'vw'
              : direction === 'right'
              ? push * 100 - 100 * (sketchesCount! - 1) + 'vw'
              : undefined,
          y:
            direction === 'up'
              ? -push * 100 + 'vh'
              : direction === 'down'
              ? push * 100 - 100 * (sketchesCount! - 1) + 'vh'
              : undefined,
        }}
        transition={transition}
      >
        {React.Children.toArray(children)
          .slice(0, sketchesCount)
          .map((v) => (
            <div className='relative viewport'>{v}</div>
          ))}
      </motion.div>
    );
  };

  return (
    <StoryboardScrollTriggered
      sketchesCount={sketchesCount}
      height={height}
      backgroundColor={backgroundColor}
      offset={offset}
    >
      {render}
    </StoryboardScrollTriggered>
  );
}
export default PushScrollTriggered;
