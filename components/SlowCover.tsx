'use client';

import { ReactNode } from 'react';
import {
  motion,
  MotionValue,
  useTransform,
  SpringOptions,
} from 'framer-motion';
import { Direction } from './types';
import { xy } from './helper';
import SlowAct from './SlowAct';

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

function SlowCover({
  direction = 'left',
  scenesCount,
  height,
  backgroundColor,
  offset,
  transitionExtent,
  isSpring,
  springConfig,
  children,
}: Props) {
  const render = (
    scene: ReactNode,
    index: number,
    transitionProgress: MotionValue<number>,
    scrollProgress: MotionValue<number>
  ) => {
    const position =
      direction === 'left' || direction === 'up'
        ? useTransform(transitionProgress, [-1, 0], [100, 0])
        : useTransform(transitionProgress, [-1, 0], [-100, 0]);
    const [x, y] = xy(direction, position);

    return (
      <motion.div
        className='absolute viewport'
        style={{
          x: x,
          y: y,
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
      isSpring={isSpring}
      springConfig={springConfig}
    >
      {{ scenes: children, render: render }}
    </SlowAct>
  );
}
export default SlowCover;
