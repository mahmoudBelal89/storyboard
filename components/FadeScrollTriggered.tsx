'use client';

import React, { ReactNode, useState } from 'react';
import {
  motion,
  MotionValue,
  useMotionValueEvent,
  Transition,
  useAnimate,
  ValueAnimationTransition,
  motionValue,
  animate,
  useTransform,
} from 'framer-motion';
import { _FLEX_DIRECTION_VARIANTS } from './constants';
import { FadeOptions } from './types';
import StickyScrollTriggered from './StickyScrollTriggered';
import { offsetAnimation } from './transform';

type Props = {
  sketchesCount?: number;
  height?: string;
  fadeConfig?: FadeOptions;
  backgroundColor?: string;
  offset?: any;
  transition?: Transition | ValueAnimationTransition<number>;
  children: ReactNode;
};

function FadeScrollTriggered({
  sketchesCount,
  height,
  fadeConfig = 'smoothly',
  backgroundColor,
  offset,
  transition,
  children,
}: Props) {
  const render = (scrollProgress: MotionValue<number>, defaultProps: any) => {
    sketchesCount = sketchesCount ?? defaultProps.sketchesCount;
    const [coverDisplay, setCoverDisplay] = useState<'block' | 'hidden'>(
      'hidden'
    );

    return [
      <div className={`${coverDisplay} absolute viewport z-[2]`} />,
      React.Children.toArray(children)
        .slice(0, sketchesCount)
        .map((v, i) => {
          const opacity = offsetAnimation(
            scrollProgress,
            (v) => v === i,
            0.5,
            i === 0 ? 1 : 0,
            transition as ValueAnimationTransition<number>
          );
          useMotionValueEvent(opacity, 'change', (v) => {
            console.log(v);
            if (Number.isInteger(v)) {
              setCoverDisplay('hidden');
            } else {
              setCoverDisplay('block');
            }
          });

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
              style={{ opacity: opacity, display: display, zIndex: zIndex }}
              className='absolute viewport'
            >
              {v}
            </motion.div>
          );
        }),
    ];
  };

  return (
    <StickyScrollTriggered
      sketchesCount={sketchesCount}
      height={height}
      backgroundColor={backgroundColor}
      offset={offset}
    >
      {render}
    </StickyScrollTriggered>
  );
}
export default FadeScrollTriggered;
