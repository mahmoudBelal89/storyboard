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
import { xy } from './helper';
import SlowPlay, { SlowPlayDefaultProps } from './SlowPlay';

type Props = {
  direction?: Direction;
  scenesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transitionExtent?: number;
  isSpring?: boolean;
  springConfig?: SpringOptions;
  children: ReactNode;
};

function SlowPush({
  direction = 'left',
  scenesCount = SlowPlayDefaultProps.scenesCount,
  height,
  backgroundColor,
  offset,
  transitionExtent,
  isSpring,
  springConfig,
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
      <motion.div
        className={`flex ${_FLEX_DIRECTION_VARIANTS[direction]} fit`}
        style={{
          x: x,
          y: y,
        }}
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
    <SlowPlay
      scenesCount={scenesCount}
      height={height}
      backgroundColor={backgroundColor}
      offset={offset}
      transitionExtent={transitionExtent}
      isSpring={isSpring}
      springConfig={springConfig}
    >
      {render}
    </SlowPlay>
  );
}
export default SlowPush;
