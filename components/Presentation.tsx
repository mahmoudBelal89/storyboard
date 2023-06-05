'use client';

import { ReactNode, useRef, createContext } from 'react';
import { MotionValue, useScroll, useTransform } from 'framer-motion';

export type PresentationContextProps = {
  slidesCount: number;
  height: string;
  backgroundColor?: string;
  offset: any;
  transitionExtent: number;
};
export type PresentationContextType = {
  props: PresentationContextProps;
  scrollProgress: MotionValue<number>;
  presentationProgress: MotionValue<number>;
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
  children: ReactNode;
};

function Presentation({
  slidesCount = 2,
  height = slidesCount * 350 + 'vh',
  backgroundColor,
  offset = slidesCount === 2 ? ['0.5 1', '0.5 0'] : ['0 0', '1 1'],
  transitionExtent = 1.2,
  children,
}: Props) {
  const root = useRef(null);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: offset,
  });
  let presentationProgress = scrollYProgress;
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
    presentationProgress = useTransform(
      scrollYProgress,
      inputRange,
      outputRange
    );
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
            },
            scrollProgress: scrollYProgress,
            presentationProgress: presentationProgress,
          }}
        >
          {children}
        </PresentationContext.Provider>
      </div>
    </div>
  );
}
export default Presentation;
