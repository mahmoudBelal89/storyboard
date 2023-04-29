'use client';

import { ReactNode, useRef } from 'react';
import {
  MotionValue,
  useScroll,
  useSpring,
  SpringOptions,
} from 'framer-motion';
import { _SCREEN_SIZE } from '../components/constants';

type Props = {
  height?: string;
  offset?: any;
  isSpring?: boolean;
  springConfig?: SpringOptions;
  children: (scrollProgress: MotionValue<number>) => ReactNode;
};

function StickyScrollLinked({
  height = '400vh',
  offset = ['0.5 1', '0.5 0'],
  isSpring = false,
  springConfig,
  children,
}: Props) {
  const root = useRef(null);
  let { scrollYProgress } = useScroll({
    target: root,
    offset: offset,
  });
  if (isSpring) {
    scrollYProgress = useSpring(scrollYProgress, springConfig);
  }

  return (
    <div
      ref={root}
      style={{ minHeight: height, maxHeight: height }}
      className='min-w-[100vw] max-w-[100vw]'
    >
      <div
        className={`sticky top-0 ${_SCREEN_SIZE} overflow-hidden bg-slate-400`}
      >
        {children(scrollYProgress)}
      </div>
    </div>
  );
}
export default StickyScrollLinked;
