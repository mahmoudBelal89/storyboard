'use client';

import { ReactNode, useRef } from 'react';
import {
  MotionValue,
  useScroll,
  useTransform,
  useSpring,
  SpringOptions,
} from 'framer-motion';

export const StoryboardScrollLinkedDefaultProps = {
  sketchesCount: 2,
  height: (sketchesCount: number) => sketchesCount * 200 + 200 + 'vh',
  offset: (sketchesCount: number) =>
    sketchesCount === 2 ? ['0.5 1', '0.5 0'] : ['0 0', '1 1'],
  transitionExtent: 1,
  isSpring: false,
};
const Default = StoryboardScrollLinkedDefaultProps;
type Props = {
  sketchesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transitionExtent?: number;
  isSpring?: boolean;
  springConfig?: SpringOptions;
  children: (scrollProgress: MotionValue<number>) => ReactNode;
};

function StoryboardScrollLinked({
  sketchesCount = Default.sketchesCount,
  height = Default.height(sketchesCount),
  backgroundColor,
  offset = Default.offset(sketchesCount),
  transitionExtent = Default.transitionExtent,
  isSpring = Default.isSpring,
  springConfig,
  children,
}: Props) {
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
      className='viewport-width'
      style={{
        minHeight: height,
        maxHeight: height,
        backgroundColor: backgroundColor,
      }}
    >
      <div className='sticky-viewport'>{children(scrollYProgress)}</div>
    </div>
  );
}
export default StoryboardScrollLinked;
