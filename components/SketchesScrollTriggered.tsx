'use client';

import React, { ReactNode } from 'react';
import {
  animate,
  motion,
  motionValue,
  MotionValue,
  useMotionValueEvent,
  useTransform,
  ValueAnimationTransition,
} from 'framer-motion';
import StoryboardScrollTriggered, {
  StoryboardScrollTriggeredDefaultProps,
} from './StoryboardScrollTriggered';

export const SketchesScrollTriggeredDefaultProps = {
  isZIndexNegative: false,
  isDisabledWhileTransition: false,
};
type Props = {
  sketchesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transition?: ValueAnimationTransition<number>;
  isZIndexNegative?: boolean;
  isDisabledWhileTransition?: boolean;
  children: {
    sketches: ReactNode;
    render: (
      sketch: ReactNode,
      index: number,
      motionProgress: MotionValue<number>,
      storyboardScrollProgress: MotionValue<number>
    ) => ReactNode;
  };
};

function SketchesScrollTriggered({
  sketchesCount = StoryboardScrollTriggeredDefaultProps.sketchesCount,
  height,
  backgroundColor,
  offset,
  transition,
  isZIndexNegative = SketchesScrollTriggeredDefaultProps.isZIndexNegative,
  isDisabledWhileTransition = SketchesScrollTriggeredDefaultProps.isDisabledWhileTransition,
  children,
}: Props) {
  const render = (storyboardScrollProgress: MotionValue<number>) => {
    return React.Children.toArray(children.sketches)
      .slice(0, sketchesCount)
      .map((v, i) => {
        const motionProgress = motionValue(i === 0 ? 0 : -1);
        useMotionValueEvent(storyboardScrollProgress, 'change', (v) => {
          if (v === i) {
            animate(motionProgress, 0, transition);
          } else if (v > i) {
            animate(motionProgress, 1, transition);
          } else {
            animate(motionProgress, -1, transition);
          }
        });
        const display = useTransform(motionProgress, (v) =>
          v === -1 || v === 1 ? 'none' : 'block'
        );
        const coverDisplay = isDisabledWhileTransition
          ? useTransform(motionProgress, (v) =>
              v === -1 || v === 0 || v === 1 ? 'none' : 'block'
            )
          : undefined;

        return [
          isDisabledWhileTransition && (
            <motion.div
              className='absolute viewport'
              style={{ display: coverDisplay, zIndex: sketchesCount }}
            />
          ),
          <motion.div
            className='absolute viewport'
            style={{
              display: display,
              zIndex: isZIndexNegative ? -i : i,
            }}
          >
            {children.render(v, i, motionProgress, storyboardScrollProgress)}
          </motion.div>,
        ];
      });
  };

  return (
    <StoryboardScrollTriggered
      sketchesCount={sketchesCount}
      height={height}
      backgroundColor={backgroundColor}
      offset={offset}
    >
      {render}
    </StoryboardScrollTriggered>
  );
}
export default SketchesScrollTriggered;
