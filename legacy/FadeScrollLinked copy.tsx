'use client';

import React, { ReactNode } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { _FLEX_DIRECTION_VARIANTS } from '../components/constants';
import SlowPlay from '../components/SlowPlay';

type Props = {
  sketchesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transitionExtent?: number;
  children: ReactNode;
};

function FadeScrollLinked({
  sketchesCount,
  height,
  backgroundColor,
  offset,
  transitionExtent,
  children,
}: Props) {
  const render = (scrollProgress: MotionValue<number>, defaultProps: any) => {
    sketchesCount = sketchesCount ?? defaultProps.sketchesCount;

    return React.Children.toArray(children)
      .slice(0, sketchesCount)
      .map((v, i) => {
        const opacity = useTransform(
          scrollProgress,
          [i - 1, i - 1, i, i + 1, i + 1],
          [0, 0, 1, 0, 0]
        );
        const display = useTransform(opacity, (v) =>
          v === 0 ? 'none' : 'block'
        );
        const zIndex = useTransform(opacity, (v) => (v >= 0.5 ? 1 : -1));

        return (
          <motion.div
            style={{
              display: display,
              zIndex: zIndex,
              opacity: opacity,
            }}
            className='absolute viewport'
          >
            {v}
          </motion.div>
        );
      });
  };

  return (
    <SlowPlay
      sketchesCount={sketchesCount}
      height={height}
      backgroundColor={backgroundColor}
      offset={offset}
      transitionExtent={transitionExtent}
    >
      {render}
    </SlowPlay>
  );
}
export default FadeScrollLinked;
