'use client';

import { ReactNode, useRef } from 'react';
import { MotionValue, useScroll, useTransform } from 'framer-motion';

const SPRING: 'spring' = 'spring';
export const PlayDefaultProps = {
  scenesCount: 2,
  height: (scenesCount: number) => scenesCount * 150 + 'vh',
  offset: ['0 0', '1 1'],
  transition: { type: SPRING, damping: 20, stiffness: 75, mass: 1.5 },
};
const Default = PlayDefaultProps;
type Props = {
  scenesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  children: (scrollProgress: MotionValue<number>) => ReactNode;
};

function Play({
  scenesCount = Default.scenesCount,
  height = Default.height(scenesCount),
  backgroundColor,
  offset = Default.offset,
  children,
}: Props) {
  const root = useRef(null);
  let { scrollYProgress } = useScroll({
    target: root,
    offset: offset,
  });
  scrollYProgress = useTransform(scrollYProgress, (v) => {
    for (let i = 0; i < scenesCount; i++) {
      if (v >= i / scenesCount && v < (i + 1) / scenesCount) {
        return i;
      }
    }
    if (v >= 1) {
      return scenesCount - 1;
    } else {
      return 0;
    }
  });

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
export default Play;
