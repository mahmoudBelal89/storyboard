'use client';

import React, { ReactNode } from 'react';
import {
  motion,
  MotionValue,
  useTransform,
  SpringOptions,
} from 'framer-motion';
import { _SCREEN_SIZE, _LAYOUT_VARIANTS } from './constants';
import { Direction } from './Direction';
import StickyScrollLinked from './StickyScrollLinked';

type Props = {
  direction?: Direction;
  sketchesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transitionExtent?: number;
  isSpring?: boolean;
  springConfig?: SpringOptions;
  children: ReactNode;
};

function PushScrollLinked({
  direction = 'left',
  sketchesCount,
  height,
  backgroundColor,
  offset,
  transitionExtent,
  isSpring,
  springConfig,
  children,
}: Props) {
  const render = (scrollProgress: MotionValue<number>, defaultProps: any) => {
    sketchesCount = sketchesCount ?? defaultProps.sketchesCount;
    const push = useTransform(scrollProgress, (v) => {
      return direction === 'left'
        ? -v * 100 + 'vw'
        : direction === 'up'
        ? -v * 100 + 'vh'
        : direction === 'right'
        ? v * 100 - 100 * (sketchesCount! - 1) + 'vw'
        : v * 100 - 100 * (sketchesCount! - 1) + 'vh'; // direction === 'down'
    });

    return (
      <motion.div
        className={`flex ${_LAYOUT_VARIANTS[direction]} min-w-fit max-w-fit min-h-fit max-h-fit`}
        style={
          direction === 'left' || direction === 'right'
            ? { x: push }
            : { y: push }
        }
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
    <StickyScrollLinked
      sketchesCount={sketchesCount}
      height={height}
      backgroundColor={backgroundColor}
      offset={offset}
      transitionExtent={transitionExtent}
      isSpring={isSpring}
      springConfig={springConfig}
    >
      {render}
    </StickyScrollLinked>
  );
}
export default PushScrollLinked;
