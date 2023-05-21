'use client';

import { ReactNode, useRef, createContext } from 'react';
import {
  MotionValue,
  useScroll,
  useTransform,
  useSpring,
  SpringOptions,
} from 'framer-motion';

export type PlaySlowContextProps = {
  scenesCount: number;
  height: string;
  backgroundColor?: string;
  offset: any;
  transitionExtent: number;
  isSpring: boolean;
  springConfig?: SpringOptions;
};
export type PlaySlowContextType = {
  scrollProgress: MotionValue<number>;
  scenesProgress: MotionValue<number>;
  props: PlaySlowContextProps;
};
export const PlaySlowContext = createContext<PlaySlowContextType>(null!);

type Props = {
  scenesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transitionExtent?: number;
  isSpring?: boolean;
  springConfig?: SpringOptions;
  children: ReactNode;
};

function PlaySlow({
  scenesCount = 2,
  height = scenesCount * 300 + 'vh',
  backgroundColor,
  offset = scenesCount === 2 ? ['0.5 1', '0.5 0'] : ['0 0', '1 1'],
  transitionExtent = 1.2,
  isSpring = false,
  springConfig,
  children,
}: Props) {
  const root = useRef(null);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: offset,
  });
  let scenesProgress = scrollYProgress;
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
    scenesProgress = useTransform(scenesProgress, inputRange, outputRange);
  }
  if (isSpring) {
    scenesProgress = useSpring(scenesProgress, springConfig);
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
      <div className='sticky-viewport'>
        <PlaySlowContext.Provider
          value={{
            scrollProgress: scrollYProgress,
            scenesProgress: scenesProgress,
            props: {
              scenesCount: scenesCount,
              height: height,
              backgroundColor: backgroundColor,
              offset: offset,
              transitionExtent: transitionExtent,
              isSpring: isSpring,
              springConfig: springConfig,
            },
          }}
        >
          {children}
        </PlaySlowContext.Provider>
      </div>
    </div>
  );
}
export default PlaySlow;
