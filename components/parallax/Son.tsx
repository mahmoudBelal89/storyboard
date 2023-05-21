'use client';

import React, { ReactElement, ReactNode } from 'react';
import {
  motion,
  MotionValue,
  useTransform,
  SpringOptions,
} from 'framer-motion';
import { _FLEX_DIRECTION_VARIANTS } from '../constants';
import { Direction } from '../types';
import { xy } from '../helper';
import { PlaySlowDefaultProps } from '../old/PlaySlow';

type Props = {
  direction?: Direction;
  scenesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transitionExtent?: number;
  isSpring?: boolean;
  springConfig?: SpringOptions;
  children: ReactElement[];
};

function Son({
  direction = 'left',
  scenesCount = PlaySlowDefaultProps.scenesCount,
  backgroundColor = 'transparent',
  children,
}: Props) {
  const render = (scrollProgress: MotionValue<number>) => {
    const position = useTransform(scrollProgress, (v) => {
      return direction === 'left' || direction === 'up'
        ? -v * 100
        : v * 100 - 100 * (scenesCount! - 1);
    });
    const [x, y] = xy(direction, position);

    return (
      <div className='absolute viewport'>
        <motion.div
          className={`flex ${_FLEX_DIRECTION_VARIANTS[direction]} fit`}
          style={{
            x: x,
            y: y,
          }}
        >
          {children.slice(0, scenesCount).map((v) => (
            <div className='relative viewport opacity-50'>{v}</div>
          ))}
        </motion.div>
      </div>
    );
  };

  return render;
}
export default Son;
