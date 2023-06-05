'use client';

import { ReactNode } from 'react';
import {
  motion,
  MotionValue,
  SpringOptions,
  useTransform,
} from 'framer-motion';
import { Direction } from '../types';
import PlaySlow, { PlaySlowDefaultProps } from '../old/PlaySlow';
import { xy } from '../helper/motion-value-helper';

type Props = {
  direction?: Direction;
  scenesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transitionExtent?: number;
  isSpring?: boolean;
  springConfig?: SpringOptions;
  children: { child: ReactNode; height: number }[];
};

function Parallax({
  direction = 'up',
  scenesCount = PlaySlowDefaultProps.scenesCount,
  height,
  backgroundColor,
  offset,
  transitionExtent,
  isSpring,
  springConfig,
  children,
}: Props) {
  const render = (scrollProgress: MotionValue<number>) => {
    return children.map((v, i) => {
      const height = v.height + 'vh';
      const position = useTransform(
        scrollProgress,
        [0, scenesCount - 1],
        [0, -(v.height - 100)]
      );
      const [x, y] = xy(direction, position);

      return (
        <motion.div
          className='absolute viewport-width'
          style={{
            minHeight: height,
            maxHeight: height,
            x: x,
            y: y,
            zIndex: i,
          }}
        >
          {v.child}
        </motion.div>
      );
    });
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
export default Parallax;
