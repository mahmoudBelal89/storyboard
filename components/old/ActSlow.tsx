'use client';

import React, { ReactNode } from 'react';
import {
  motion,
  MotionValue,
  useTransform,
  SpringOptions,
} from 'framer-motion';
import PlaySlow, { PlaySlowDefaultProps } from './PlaySlow';

export const ActSlowDefaultProps = {
  isZIndexNegative: false,
  isDisabledWhileTransition: true,
};
const Default = ActSlowDefaultProps;
type Props = {
  scenesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transitionExtent?: number;
  isSpring?: boolean;
  springConfig?: SpringOptions;
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

function ActSlow({
  scenesCount = PlaySlowDefaultProps.scenesCount,
  height,
  backgroundColor,
  offset,
  transitionExtent,
  isSpring,
  springConfig,
  isZIndexNegative = Default.isZIndexNegative,
  isDisabledWhileTransition = Default.isDisabledWhileTransition,
  children,
}: Props) {
  const render = (scrollProgress: MotionValue<number>) => {
    const coverDisplay = isDisabledWhileTransition
      ? useTransform(scrollProgress, (v) =>
          Number.isInteger(v) ? 'none' : 'block'
        )
      : undefined;

    return [
      isDisabledWhileTransition && (
        <motion.div
          className='absolute viewport'
          style={{ display: coverDisplay, zIndex: scenesCount }}
        />
      ),
      React.Children.toArray(children.scenes)
        .slice(0, scenesCount)
        .map((v, i) => {
          const transitionProgress = useTransform(
            scrollProgress,
            [i - 1, i, i + 1],
            [-1, 0, 1]
          );
          const display = useTransform(transitionProgress, (v) =>
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
              {children.render(v, i, transitionProgress, scrollProgress)}
            </motion.div>
          );
        }),
    ];
  };

  return (
    <PlaySlow
      scenesCount={scenesCount}
      height={height}
      backgroundColor={backgroundColor}
      offset={offset}
      transitionExtent={transitionExtent}
      isSpring={isSpring}
      springConfig={springConfig}
    >
      {render}
    </PlaySlow>
  );
}
export default ActSlow;
