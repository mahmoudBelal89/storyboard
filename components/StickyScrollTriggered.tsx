'use client';

import { ReactNode, useRef } from 'react';
import { MotionValue, useScroll, useTransform } from 'framer-motion';
import { _SCREEN_SIZE } from './constants';

type defaultProps = {
  sketchesCount: number;
  height: string;
  offset: any;
};
type Props = {
  sketchesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  children: (
    scrollProgress: MotionValue<number>,
    defaultProps: defaultProps
  ) => ReactNode;
};

function StickyScrollTriggered({
  sketchesCount = 2,
  height,
  backgroundColor,
  offset = ['0 0', '1 1'],
  children,
}: Props) {
  height = height ?? sketchesCount * 100 + 200 + 'vh';
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
        })}
      </div>
    </div>
  );
}
export default StickyScrollTriggered;
