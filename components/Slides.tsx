'use client';

import React, { ReactNode, createContext, useContext } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { add } from './helper/string-helper';
import { WheelContext } from './Wheel';

export type SlidesContextProps = {
  isZIndexNegative: boolean;
  isHiddenWhileNoProgress: boolean;
  isDisabledWhileTransition: boolean;
  width: string;
  height: string;
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
  isHiddenWhileNoProgress?: boolean;
  isDisabledWhileTransition?: boolean;
  width?: string;
  height?: string;
  className?: string;
  children: ReactNode;
};

function Slides({
  isZIndexNegative = false,
  isHiddenWhileNoProgress = true,
  isDisabledWhileTransition = true,
  width,
  height = '100vh',
  className,
  children,
}: Props) {
  const presentationContext = useContext(WheelContext);
  if (width === undefined) {
    width = presentationContext.props.width;
  }
  const slidesCount = presentationContext.props.slidesCount;
  const presentationProgress = presentationContext.slidesProgress;

  return (
    <div
      className={add('overflow-hidden', className)}
      style={{
        minWidth: width,
        maxWidth: width,
        minHeight: height,
        maxHeight: height,
      }}
    >
      {[
        isDisabledWhileTransition && (
          <motion.div
            className='absolute'
            style={{
              display: isDisabledWhileTransition
                ? useTransform(presentationProgress, (v) =>
                    Number.isInteger(v) ? 'none' : 'block'
                  )
                : undefined,
              minWidth: width,
              maxWidth: width,
              minHeight: height,
              maxHeight: height,
              zIndex: slidesCount,
            }}
          />
        ),
        <SlidesContext.Provider
          value={{
            props: {
              isZIndexNegative: isZIndexNegative,
              isHiddenWhileNoProgress: isHiddenWhileNoProgress,
              isDisabledWhileTransition: isDisabledWhileTransition,
              width: width,
              height: height,
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
                  className='absolute overflow-hidden'
                  style={{
                    display: isHiddenWhileNoProgress
                      ? useTransform(slideProgress, (v) =>
                          v === -1 || v === 1 ? 'none' : 'block'
                        )
                      : undefined,
                    minWidth: width,
                    maxWidth: width,
                    minHeight: height,
                    maxHeight: height,
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
