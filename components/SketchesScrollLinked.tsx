'use client';

import React, { ReactNode } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import StoryboardScrollLinked, {
  StoryboardScrollLinkedDefaultProps,
} from './StoryboardScrollLinked';

export const SketchesScrollLinkedDefaultProps = {
  isZIndexNegative: false,
  isDisabledWhileTransition: true,
};
const Default = SketchesScrollLinkedDefaultProps;
type Props = {
  sketchesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transitionExtent?: number;
  isZIndexNegative?: boolean;
  isDisabledWhileTransition?: boolean;
  children: {
    sketches: ReactNode;
    render: (
      sketch: ReactNode,
      index: number,
      scrollProgress: MotionValue<number>,
      storyboardScrollProgress: MotionValue<number>
    ) => ReactNode;
  };
};

function SketchesScrollLinked({
  sketchesCount = StoryboardScrollLinkedDefaultProps.sketchesCount,
  height,
  backgroundColor,
  offset,
  transitionExtent,
  isZIndexNegative = Default.isZIndexNegative,
  isDisabledWhileTransition = Default.isDisabledWhileTransition,
  children,
}: Props) {
  const render = (storyboardScrollProgress: MotionValue<number>) => {
    const coverDisplay = isDisabledWhileTransition
      ? useTransform(storyboardScrollProgress, (v) =>
          Number.isInteger(v) ? 'none' : 'block'
        )
      : undefined;

    return [
      isDisabledWhileTransition && (
        <motion.div
          className='absolute viewport'
          style={{ display: coverDisplay, zIndex: sketchesCount }}
        />
      ),
      React.Children.toArray(children.sketches)
        .slice(0, sketchesCount)
        .map((v, i) => {
          const scrollProgress = useTransform(
            storyboardScrollProgress,
            [i - 1, i, i + 1],
            [-1, 0, 1]
          );
          const display = useTransform(scrollProgress, (v) =>
            v === -1 || v === 1 ? 'none' : 'block'
          );

          return (
            <motion.div
              className='absolute viewport'
              style={{
                display: display,
                zIndex: isZIndexNegative ? -i : i,
              }}
            >
              {children.render(v, i, scrollProgress, storyboardScrollProgress)}
            </motion.div>
          );
        }),
    ];
  };

  return (
    <StoryboardScrollLinked
      sketchesCount={sketchesCount}
      height={height}
      backgroundColor={backgroundColor}
      offset={offset}
      transitionExtent={transitionExtent}
    >
      {render}
    </StoryboardScrollLinked>
  );
}
export default SketchesScrollLinked;
