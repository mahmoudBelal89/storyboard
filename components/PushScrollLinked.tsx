'use client';

import React, { ReactNode } from 'react';
import {
  motion,
  MotionValue,
  useTransform,
  SpringOptions,
} from 'framer-motion';
import { _FLEX_DIRECTION_VARIANTS } from './constants';
import { Direction } from './types';
import StoryboardScrollLinked, {
  StoryboardScrollLinkedDefaultProps,
} from './StoryboardScrollLinked';

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
  sketchesCount = StoryboardScrollLinkedDefaultProps.sketchesCount,
  height,
  backgroundColor,
  offset,
  transitionExtent,
  isSpring,
  springConfig,
  children,
}: Props) {
  const render = (scrollProgress: MotionValue<number>) => {
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
        className={`flex ${_FLEX_DIRECTION_VARIANTS[direction]} fit`}
        style={{
          x: direction === 'left' || direction === 'right' ? push : undefined,
          y: direction === 'up' || direction === 'down' ? push : undefined,
        }}
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
    <StoryboardScrollLinked
      sketchesCount={sketchesCount}
      height={height}
      backgroundColor={backgroundColor}
      offset={offset}
      transitionExtent={transitionExtent}
      isSpring={isSpring}
      springConfig={springConfig}
    >
      {render}
    </StoryboardScrollLinked>
  );
}
export default PushScrollLinked;
