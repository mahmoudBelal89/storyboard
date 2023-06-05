'use client';

import React, { ReactNode, createContext, useContext } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { PresentationContext } from './Presentation';

export type SlidesContextProps = {
  isZIndexNegative: boolean;
  isDisabledWhileTransition: boolean;
};
export type SlidesContextType = {
  props: SlidesContextProps;
};
export const SlidesContext = createContext<SlidesContextType>(null!);

export type SlideContextType = {
  slideIndex: number;
  slideProgress: MotionValue<number>;
};
export const SlideContext = createContext<SlideContextType>(null!);

type Props = {
  isZIndexNegative?: boolean;
  isDisabledWhileTransition?: boolean;
  children: ReactNode;
};

function Slides({
  isZIndexNegative = false,
  isDisabledWhileTransition = true,
  children,
}: Props) {
  const presentationContext = useContext(PresentationContext);
  const slidesCount = presentationContext.props.slidesCount;
  const presentationProgress = presentationContext.presentationProgress;

  return (
    <div className='absolute viewport'>
      {[
        isDisabledWhileTransition && (
          <motion.div
            className='absolute viewport'
            style={{
              display: isDisabledWhileTransition
                ? useTransform(presentationProgress, (v) =>
                    Number.isInteger(v) ? 'none' : 'block'
                  )
                : undefined,
              zIndex: slidesCount,
            }}
          />
        ),
        <SlidesContext.Provider
          value={{
            props: {
              isZIndexNegative: isZIndexNegative,
              isDisabledWhileTransition: isDisabledWhileTransition,
            },
          }}
        >
          {React.Children.toArray(children)
            .slice(0, slidesCount)
            .map((v, i) => {
              const slideProgress = useTransform(
                presentationProgress,
                [i - 1, i, i + 1],
                [-1, 0, 1]
              );

              return (
                <motion.div
                  className='absolute viewport'
                  style={{
                    display: useTransform(slideProgress, (v) =>
                      v === -1 || v === 1 ? 'none' : 'block'
                    ),
                    zIndex: isZIndexNegative ? -i : i,
                  }}
                >
                  <SlideContext.Provider
                    value={{
                      slideIndex: i,
                      slideProgress: slideProgress,
                    }}
                  >
                    {v}
                  </SlideContext.Provider>
                </motion.div>
              );
            })}
        </SlidesContext.Provider>,
      ]}
    </div>
  );
}
export default Slides;
