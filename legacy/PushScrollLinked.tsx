'use client';

import React from 'react';
import { ReactNode, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  SpringOptions,
} from 'framer-motion';
import { Direction } from '../components/types';
import {
  _SCREEN_SIZE,
  _FLEX_DIRECTION_VARIANTS,
} from '../components/constants';

type Props = {
  direction?: Direction;
  height?: string;
  offset?: any;
  isSpring?: boolean;
  springConfig?: SpringOptions;
  children: ReactNode;
};

function PushScrollLinked({
  direction = 'left',
  height = '400vh',
  offset = ['0.5 1', '0.5 0'],
  isSpring = false,
  springConfig,
  children,
}: Props) {
  const root = useRef(null);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: offset,
  });
  const pushProgress = useTransform(
    isSpring ? useSpring(scrollYProgress, springConfig) : scrollYProgress,
    (value) => {
      return direction === 'left'
        ? -value * 100 + 'vw'
        : direction === 'up'
        ? -value * 100 + 'vh'
        : direction === 'right'
        ? value * 100 - 100 + 'vw'
        : value * 100 - 100 + 'vh'; // direction === 'down'
    }
  );

  return (
    <div
      ref={root}
      style={{ minHeight: height, maxHeight: height }}
      className='min-w-[100vw] max-w-[100vw]'
    >
      <div className={`sticky top-0 ${_SCREEN_SIZE} overflow-hidden`}>
        <motion.div
          className={`flex ${_FLEX_DIRECTION_VARIANTS[direction]} min-w-fit max-w-fit min-h-fit max-h-fit`}
          style={
            direction === 'left' || direction === 'right'
              ? { x: pushProgress }
              : { y: pushProgress }
          }
        >
          <div className={`relative ${_SCREEN_SIZE}`}>
            {React.Children.toArray(children)[0]}
          </div>
          <div className={`relative ${_SCREEN_SIZE}`}>
            {React.Children.toArray(children)[1]}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
export default PushScrollLinked;
