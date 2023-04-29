'use client';

import React, { ReactNode, useState } from 'react';
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  Transition,
} from 'framer-motion';
import { _SCREEN_SIZE, _LAYOUT_VARIANTS } from './constants';
import { Direction } from './Direction';
import StickyScrollTriggered from './StickyScrollTriggered';

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
        className={`flex ${_LAYOUT_VARIANTS[direction]} min-w-fit max-w-fit min-h-fit max-h-fit`}
        initial={
          direction === 'right'
            ? { x: -100 * (sketchesCount! - 1) + 'vw' }
            : direction === 'down'
            ? { y: -100 * (sketchesCount! - 1) + 'vh' }
            : {}
        }
        animate={
          direction === 'left'
            ? { x: -push * 100 + 'vw' }
            : direction === 'up'
            ? { y: -push * 100 + 'vh' }
            : direction === 'right'
            ? { x: push * 100 - 100 * (sketchesCount! - 1) + 'vw' }
            : { y: push * 100 - 100 * (sketchesCount! - 1) + 'vh' } // direction === 'down'
        }
        transition={transition}
      >
        {React.Children.toArray(children)
          .slice(0, sketchesCount)
          .map((v) => (
            <div className={`relative ${_SCREEN_SIZE}`}>{v}</div>
          ))}
      </motion.div>
    );
  };

  return (
    <StickyScrollTriggered
      sketchesCount={sketchesCount}
      height={height}
      backgroundColor={backgroundColor}
      offset={offset}
    >
      {render}
    </StickyScrollTriggered>
  );
}
export default PushScrollTriggered;
