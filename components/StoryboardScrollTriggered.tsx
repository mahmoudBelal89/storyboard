'use client';

import { ReactNode, useRef } from 'react';
import { MotionValue, useScroll, useTransform } from 'framer-motion';

export const StoryboardScrollTriggeredDefaultProps = {
  sketchesCount: 2,
  height: (sketchesCount: number) => sketchesCount * 100 + 200 + 'vh',
  offset: ['0 0', '1 1'],
};
const Default = StoryboardScrollTriggeredDefaultProps;
type Props = {
  sketchesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  children: (scrollProgress: MotionValue<number>) => ReactNode;
};

function StoryboardScrollTriggered({
  sketchesCount = Default.sketchesCount,
  height = Default.height(sketchesCount),
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
    for (let i = 0; i < sketchesCount; i++) {
      if (v >= i / sketchesCount && v < (i + 1) / sketchesCount) {
        return i;
      }
    }
    if (v >= 1) {
      return sketchesCount - 1;
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
export default StoryboardScrollTriggered;
