'use client';

import React, { ReactNode, useState, useRef } from 'react';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  Transition,
} from 'framer-motion';
import { Direction } from '../components/Direction';
import { _SCREEN_SIZE, _LAYOUT_VARIANTS } from '../components/constants';

type Props = {
  direction?: Direction;
  height?: string;
  at?: number;
  transition?: Transition;
  children: ReactNode;
};

function PushScrollTriggered({
  direction = 'left',
  height = '250vh',
  at: offset = 0.5,
  transition,
  children,
}: Props) {
  const [isTriggered, setIsTriggered] = useState(false);
  const root = useRef(null);
  const { scrollYProgress } = useScroll({
    target: root,
  });
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (value > offset) {
      if (!isTriggered) {
        setIsTriggered(true);
      }
    } else {
      if (isTriggered) {
        setIsTriggered(false);
      }
    }
  });

  return (
    <div
      ref={root}
      style={{ minHeight: height, maxHeight: height }}
      className='min-w-[100vw] max-w-[100vw]'
    >
      <div className={`sticky top-0 ${_SCREEN_SIZE} overflow-hidden`}>
        <motion.div
          className={`flex ${_LAYOUT_VARIANTS[direction]} min-w-fit max-w-fit min-h-fit max-h-fit`}
          initial={
            direction === 'right'
              ? { x: '-100vw' }
              : direction === 'down'
              ? { y: '-100vh' }
              : {}
          }
          animate={
            isTriggered
              ? direction === 'left'
                ? { x: '-100vw' }
                : direction === 'up'
                ? { y: '-100vh' }
                : direction === 'right'
                ? { x: '0vw' }
                : { y: '0vh' } // direction === 'down'
              : {}
          }
          transition={transition}
        >
          <div className={`relative ${_SCREEN_SIZE}`}>
            {React.Children.toArray(children)[0]}
          </div>
          <div className={`relative ${_SCREEN_SIZE}`}>
            {React.Children.toArray(children)[1]}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
export default PushScrollTriggered;
