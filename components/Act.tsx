'use client';

import React, { ReactNode } from 'react';
import {
  motion,
  motionValue,
  MotionValue,
  useMotionValueEvent,
  useTransform,
  animate,
  ValueAnimationTransition,
} from 'framer-motion';
import Play, { PlayDefaultProps } from './Play';

export const ActDefaultProps = {
  isZIndexNegative: false,
  isDisabledWhileTransition: true,
};
const Default = ActDefaultProps;
type Props = {
  scenesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transition?: ValueAnimationTransition<number>;
  isZIndexNegative?: boolean;
  isDisabledWhileTransition?: boolean;
  children: {
    scenes: ReactNode;
    render: (
      sketch: ReactNode,
      index: number,
      transitionProgress: MotionValue<number>,
      scrollProgress: MotionValue<number>
    ) => ReactNode;
  };
};

function Act({
  scenesCount = PlayDefaultProps.scenesCount,
  height,
  backgroundColor,
  offset,
  transition = PlayDefaultProps.transition,
  isZIndexNegative = Default.isZIndexNegative,
  isDisabledWhileTransition = Default.isDisabledWhileTransition,
  children,
}: Props) {
  const render = (scrollProgress: MotionValue<number>) => {
    return React.Children.toArray(children.scenes)
      .slice(0, scenesCount)
      .map((v, i) => {
        const transitionProgress = motionValue(i === 0 ? 0 : -1);
        useMotionValueEvent(scrollProgress, 'change', (v) => {
          if (v === i) {
            animate(transitionProgress, 0, transition);
          } else if (v > i) {
            animate(transitionProgress, 1, transition);
          } else {
            animate(transitionProgress, -1, transition);
          }
        });
        const display = useTransform(transitionProgress, (v) =>
          v === -1 || v === 1 ? 'none' : 'block'
        );
        const coverDisplay = isDisabledWhileTransition
          ? useTransform(transitionProgress, (v) =>
              v === -1 || v === 0 || v === 1 ? 'none' : 'block'
            )
          : undefined;

        return [
          isDisabledWhileTransition && (
            <motion.div
              className='absolute viewport'
              style={{ display: coverDisplay, zIndex: scenesCount }}
            />
          ),
          <motion.div
            className='absolute viewport'
            style={{
              display: display,
              zIndex: isZIndexNegative ? -i : i,
            }}
          >
            {children.render(v, i, transitionProgress, scrollProgress)}
          </motion.div>,
        ];
      });
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
export default Act;
