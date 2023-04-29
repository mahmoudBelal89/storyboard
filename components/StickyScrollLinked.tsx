'use client';

import { ReactNode, useRef } from 'react';
import {
  MotionValue,
  useScroll,
  useTransform,
  useSpring,
  SpringOptions,
} from 'framer-motion';
import { _SCREEN_SIZE } from './constants';

type defaultProps = {
  sketchesCount: number;
  height: string;
  offset: any;
  transitionExtent: number;
  isSpring: boolean;
};
type Props = {
  sketchesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transitionExtent?: number;
  isSpring?: boolean;
  springConfig?: SpringOptions;
  children: (
    scrollProgress: MotionValue<number>,
    defaultProps: defaultProps
  ) => ReactNode;
};

function StickyScrollLinked({
  sketchesCount = 2,
  height,
  backgroundColor,
  offset,
  transitionExtent = 1,
  isSpring = false,
  springConfig,
  children,
}: Props) {
  height = height ?? sketchesCount * 200 + 200 + 'vh';
  offset = offset ?? sketchesCount === 2 ? ['0.5 1', '0.5 0'] : ['0 0', '1 1'];
  const root = useRef(null);
  let { scrollYProgress } = useScroll({
    target: root,
    offset: offset,
  });
  if (sketchesCount > 2) {
    const totalExtent = sketchesCount + transitionExtent * (sketchesCount - 1);
    const inputRange: number[] = [];
    const outputRange: number[] = [];
    for (let i = 0; i < sketchesCount; i++) {
      inputRange.push(
        (i * (1 + transitionExtent)) / totalExtent,
        (1 + i * (1 + transitionExtent)) / totalExtent
      );
      outputRange.push(i, i);
    }
    scrollYProgress = useTransform(scrollYProgress, inputRange, outputRange);
  }
  if (isSpring) {
    scrollYProgress = useSpring(scrollYProgress, springConfig);
  }

  return (
    <div
      ref={root}
      style={{
        minHeight: height,
        maxHeight: height,
        backgroundColor: backgroundColor,
      }}
      className='min-w-[100vw] max-w-[100vw]'
    >
      <div className={`sticky top-0 ${_SCREEN_SIZE} overflow-hidden`}>
        {children(scrollYProgress, {
          sketchesCount,
          height,
          offset,
          transitionExtent,
          isSpring,
        })}
      </div>
    </div>
  );
}
export default StickyScrollLinked;
