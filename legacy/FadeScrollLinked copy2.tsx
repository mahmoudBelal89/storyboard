'use client';

import React, { ReactNode, useRef } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { _FLEX_DIRECTION_VARIANTS } from '../components/constants';
import SlidesScrollLinked from '../components/SlidesScrollLinked';
import { getScrollDirectionOfStickyScrollLinked } from './transform';

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
    const scrollDirection =
      getScrollDirectionOfStickyScrollLinked(scrollProgress);

    return React.Children.toArray(children)
      .slice(0, sketchesCount)
      .map((v, i) => {
        const opacity = useTransform(
          scrollProgress,
          [i - 1, i - 1, i, i + 0.9999, i + 1, i + 1],
          [0, 0, 1, 1, 0, 0]
          //[(i - 1, i - 1, i - 0.9999, i, i + 1, i + 1)],
          //[0, 0, 1, 1, 0, 0]
        );
        const opacity2 = useTransform(scrollDirection, (v) => {
          const p = v.scrollProgress;
          const d = v.scrollDirection;

          if (p <= i - 1 || p >= i + 1) {
            return 0;
          } else {
            if (d === 'down') {
              if (p > i - 1 && p <= i) {
                return 1;
              } else {
                return p / i;
              }
            }
            if (d === 'up') {
            } else if (p < i + 1 && p >= i) {
              return 1;
            } else {
              return p / i;
            }
          }
        });

        const display = useTransform(opacity2, (v) =>
          v === 0 ? 'none' : 'block'
        );
        const zIndex = useTransform(
          scrollProgress,
          (v) => (v > i - 1 && v <= i ? 1 : -1)
          //v >= i && v < i + 1 ? 1 : -1
        );

        return (
          <motion.div
            style={{
              display: display,
              zIndex: zIndex,
              opacity: opacity2,
            }}
            className='absolute viewport'
          >
            {v}
          </motion.div>
        );
      });
  };

  return (
    <SlidesScrollLinked
      sketchesCount={sketchesCount}
      height={height}
      backgroundColor={backgroundColor}
      offset={offset}
      transitionExtent={transitionExtent}
    >
      {render}
    </SlidesScrollLinked>
  );
}
export default FadeScrollLinked;
