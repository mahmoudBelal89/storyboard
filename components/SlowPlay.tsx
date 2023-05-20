'use client';

import { ReactNode, useRef } from 'react';
import {
  MotionValue,
  useScroll,
  useTransform,
  useSpring,
  SpringOptions,
} from 'framer-motion';

export const SlowPlayDefaultProps = {
  scenesCount: 2,
  height: (scenesCount: number) => scenesCount * 300 + 'vh',
  offset: (scenesCount: number) =>
    scenesCount === 2 ? ['0.5 1', '0.5 0'] : ['0 0', '1 1'],
  transitionExtent: 1.2,
  isSpring: true,
  springConfig: (isSpring: boolean) =>
    isSpring ? { damping: 20, stiffness: 60, mass: 1.5 } : undefined,
};
const Default = SlowPlayDefaultProps;
type Props = {
  scenesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transitionExtent?: number;
  isSpring?: boolean;
  springConfig?: SpringOptions;
  children: (scrollProgress: MotionValue<number>) => ReactNode;
};

function SlowPlay({
  scenesCount = Default.scenesCount,
  height = Default.height(scenesCount),
  backgroundColor,
  offset = Default.offset(scenesCount),
  transitionExtent = Default.transitionExtent,
  isSpring = Default.isSpring,
  springConfig = Default.springConfig(isSpring),
  children,
}: Props) {
  const root = useRef(null);
  let { scrollYProgress } = useScroll({
    target: root,
    offset: offset,
  });
  if (scenesCount > 2) {
    const totalExtent = scenesCount + transitionExtent * (scenesCount - 1);
    const inputRange: number[] = [];
    const outputRange: number[] = [];
    for (let i = 0; i < scenesCount; i++) {
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
export default SlowPlay;
