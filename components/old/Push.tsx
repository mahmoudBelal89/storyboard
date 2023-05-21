'use client';

import React, { ReactNode } from 'react';
import {
  motion,
  motionValue,
  MotionValue,
  useMotionValueEvent,
  animate,
  ValueAnimationTransition,
} from 'framer-motion';
import { _FLEX_DIRECTION_VARIANTS } from '../constants';
import { Direction } from '../types';
import { xy } from '../helper';
import Play, { PlayDefaultProps } from './Play';

type Props = {
  direction?: Direction;
  scenesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transition?: ValueAnimationTransition;
  children: ReactNode;
};

function Push({
  direction = 'left',
  scenesCount = PlayDefaultProps.scenesCount,
  height,
  backgroundColor,
  offset,
  transition = PlayDefaultProps.transition,
  children,
}: Props) {
  const render = (scrollProgress: MotionValue<number>) => {
    const initialReversePosition = (scenesCount - 1) * -100;
    const position = motionValue(
      direction === 'right' || direction === 'down' ? initialReversePosition : 0
    );
    useMotionValueEvent(scrollProgress, 'change', (v) => {
      if (direction === 'left' || direction === 'up') {
        animate(position, -v * 100, transition);
      } else {
        animate(position, initialReversePosition + v * 100, transition);
      }
    });
    const [x, y] = xy(direction, position);

    return (
      <motion.div
        className={`flex ${_FLEX_DIRECTION_VARIANTS[direction]} fit`}
        style={{ x: x, y: y }}
      >
        {React.Children.toArray(children)
          .slice(0, scenesCount)
          .map((v) => (
            <div className='relative viewport'>{v}</div>
          ))}
      </motion.div>
    );
  };

  return (
    <Play
      scenesCount={scenesCount}
      height={height}
      backgroundColor={backgroundColor}
      offset={offset}
    >
      {render}
    </Play>
  );
}
export default Push;
