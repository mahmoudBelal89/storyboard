'use client';

import { ReactNode, useRef, createContext } from 'react';
import {
  MotionValue,
  useScroll,
  useTransform,
  useSpring,
  SpringOptions,
} from 'framer-motion';

export type SlidesScrollLinkedContextProps = {
  slidesCount: number;
  height: string;
  backgroundColor?: string;
  offset: any;
  transitionExtent: number;
  isSpring: boolean;
  springConfig?: SpringOptions;
};
export type PresentationContextType = {
  props: SlidesScrollLinkedContextProps;
  scrollProgress: MotionValue<number>;
  slidesProgress: MotionValue<number>;
};
export const PresentationContext = createContext<PresentationContextType>(
  null!
);

type Props = {
  slidesCount?: number;
  height?: string;
  backgroundColor?: string;
  offset?: any;
  transitionExtent?: number;
  isSpring?: boolean;
  springConfig?: SpringOptions;
  children: ReactNode;
};

function Presentation({
  slidesCount = 2,
  height = slidesCount * 350 + 'vh',
  backgroundColor,
  offset = slidesCount === 2 ? ['0.5 1', '0.5 0'] : ['0 0', '1 1'],
  transitionExtent = 1.2,
  isSpring = true,
  springConfig = isSpring ? { damping: 19 } : undefined,
  children,
}: Props) {
  const root = useRef(null);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: offset,
  });
  let slidesProgress = scrollYProgress;
  if (slidesCount > 2) {
    const totalExtent = slidesCount + transitionExtent * (slidesCount - 1);
    const inputRange: number[] = [];
    const outputRange: number[] = [];
    for (let i = 0; i < slidesCount; i++) {
      inputRange.push(
        (i * (1 + transitionExtent)) / totalExtent,
        (1 + i * (1 + transitionExtent)) / totalExtent
      );
      outputRange.push(i, i);
    }
    slidesProgress = useTransform(slidesProgress, inputRange, outputRange);
  }
  if (isSpring) {
    slidesProgress = useSpring(slidesProgress, springConfig);
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
        <PresentationContext.Provider
          value={{
            props: {
              slidesCount: slidesCount,
              height: height,
              backgroundColor: backgroundColor,
              offset: offset,
              transitionExtent: transitionExtent,
              isSpring: isSpring,
              springConfig: springConfig,
            },
            scrollProgress: scrollYProgress,
            slidesProgress: slidesProgress,
          }}
        >
          {children}
        </PresentationContext.Provider>
      </div>
    </div>
  );
}
export default Presentation;
