'use client';

import React, { ReactNode, useState } from 'react';
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import { _FLEX_DIRECTION_VARIANTS } from './constants';
import { FadeOptions } from './types';
import StickyScrollLinked from './StickyScrollLinked';

type Props = {
  sketchesCount?: number;
  height?: string;
  fadeConfig?: FadeOptions;
  backgroundColor?: string;
  offset?: any;
  transitionExtent?: number;
  children: ReactNode;
};

function FadeScrollLinked({
  sketchesCount,
  height,
  fadeConfig = 'smoothly',
  backgroundColor,
  offset,
  transitionExtent,
  children,
}: Props) {
  const render = (scrollProgress: MotionValue<number>, defaultProps: any) => {
    sketchesCount = sketchesCount ?? defaultProps.sketchesCount;
    const [coverDisplay, setCoverDisplay] = useState<'block' | 'hidden'>(
      'hidden'
    );
    useMotionValueEvent(scrollProgress, 'change', (v) => {
      if (Number.isInteger(v)) {
        setCoverDisplay('hidden');
      } else {
        setCoverDisplay('block');
      }
    });

    return [
      <div className={`${coverDisplay} absolute viewport z-[2]`} />,
      React.Children.toArray(children)
        .slice(0, sketchesCount)
        .map((v, i) => {
          const opacity =
            fadeConfig === 'smoothly'
              ? useTransform(
                  scrollProgress,
                  [i - 1, i - 1, i, i + 1, i + 1],
                  [0, 0, 1, 0, 0]
                )
              : useTransform(
                  scrollProgress,
                  [i - 0.45, i - 0.45, i, i + 0.45, i + 0.45],
                  [0, 0, 1, 0, 0]
                );
          const display = useTransform(opacity, (v) =>
            v === 0 ? 'none' : 'block'
          );
          const zIndex = fadeConfig
            ? useTransform(scrollProgress, (v) =>
                v > i - 1 && v <= i ? 1 : -1
              )
            : undefined;

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
        }),
    ];
  };

  return (
    <StickyScrollLinked
      sketchesCount={sketchesCount}
      height={height}
      backgroundColor={backgroundColor}
      offset={offset}
      transitionExtent={transitionExtent}
    >
      {render}
    </StickyScrollLinked>
  );
}
export default FadeScrollLinked;
