'use client';

import { ReactNode, useRef, createContext } from 'react';
import { MotionValue, useScroll, useTransform } from 'framer-motion';
import { add } from './helper/string-helper';

export type PresentationContextProps = {
  slidesCount: number;
  offset: any;
  transitionExtent: number;
  width: string;
  height: string;
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
  offset?: any;
  transitionExtent?: number;
  width?: string;
  height?: string;
  className?: string;
  children: ReactNode;
};

function Presentation({
  slidesCount = 2,
  offset = slidesCount === 2 ? ['0.5 1', '0.5 0'] : ['0 0', '1 1'],
  transitionExtent = 1.2,
  width = '100vw',
  height = slidesCount * 350 + 'vh',
  className,
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
      className={add('overflow-hidden', className)}
      style={{
        minWidth: width,
        maxWidth: width,
        minHeight: height,
        maxHeight: height,
      }}
    >
      <div
        className='presentation-sticky'
        style={{
          minWidth: width,
          maxWidth: width,
        }}
      >
        <PresentationContext.Provider
          value={{
            props: {
              slidesCount: slidesCount,
              offset: offset,
              transitionExtent: transitionExtent,
              width: width,
              height: height,
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
