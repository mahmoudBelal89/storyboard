'use client';

import React, { ReactNode } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { _FLEX_DIRECTION_VARIANTS } from './constants';
import StickyScrollLinked from './StickyScrollLinked';

type Props = {
  sketchesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transitionExtent?: number;
  children: {
    children: ReactNode;
    renderSingle: (
      child: ReactNode,
      singleScrollProgress: MotionValue<number>
    ) => ReactNode;
  };
};

function SingleScrollLinked({
  sketchesCount,
  height,
  backgroundColor,
  offset,
  transitionExtent,
  children,
}: Props) {
  const render = (scrollProgress: MotionValue<number>, defaultProps: any) => {
    sketchesCount = sketchesCount ?? defaultProps.sketchesCount;

    return React.Children.toArray(children.children)
      .slice(0, sketchesCount)
      .map((v, i) => {
        const singleProgress = useTransform(
          scrollProgress,
          [i - 1, i - 1, i, i + 1, i + 1],
          [-1, -1, 0, 1, 1]
        );
        const display = useTransform(singleProgress, (v) =>
          v === -1 || v === 1 ? 'none' : 'block'
        );

        return (
          <motion.div
            style={{
              display: display,
              zIndex: i,
            }}
            className='absolute viewport'
          >
            {children.renderSingle(v, singleProgress)}
          </motion.div>
        );
      });
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
export default SingleScrollLinked;
