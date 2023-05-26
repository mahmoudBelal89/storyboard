'use client';

import React, { ReactNode, createContext, useContext } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { SlidesScrollLinkedContext } from './SlidesScrollLinked';

export type SoloSlidesScrollLinkedContextProps = {
  isZIndexNegative: boolean;
  isDisabledWhileTransition: boolean;
};
export type SoloSlidesScrollLinkedContextType = {
  props: SoloSlidesScrollLinkedContextProps;
  slideIndex: number;
  transitionProgress: MotionValue<number>;
};
export const SoloSlidesScrollLinkedContext =
  createContext<SoloSlidesScrollLinkedContextType>(null!);

type Props = {
  isZIndexNegative?: boolean;
  isDisabledWhileTransition?: boolean;
  children: ReactNode;
};

function SoloSlidesScrollLinked({
  isZIndexNegative = false,
  isDisabledWhileTransition = true,
  children,
}: Props) {
  const slidesContext = useContext(SlidesScrollLinkedContext);
  const slidesCount = slidesContext.props.slidesCount;
  const slidesProgress = slidesContext.slidesProgress;

  return (
    <div className='absolute viewport'>
      {[
        isDisabledWhileTransition && (
          <motion.div
            className='absolute viewport'
            style={{
              display: isDisabledWhileTransition
                ? useTransform(slidesProgress, (v) =>
                    Number.isInteger(v) ? 'none' : 'block'
                  )
                : undefined,
              zIndex: slidesCount,
            }}
          />
        ),
        React.Children.toArray(children)
          .slice(0, slidesCount)
          .map((v, i) => {
            const transitionProgress = useTransform(
              slidesProgress,
              [i - 1, i, i + 1],
              [-1, 0, 1]
            );

            return (
              <motion.div
                className='absolute viewport'
                style={{
                  display: useTransform(transitionProgress, (v) =>
                    v === -1 || v === 1 ? 'none' : 'block'
                  ),
                  zIndex: isZIndexNegative ? -i : i,
                }}
              >
                <SoloSlidesScrollLinkedContext.Provider
                  value={{
                    props: {
                      isZIndexNegative: isZIndexNegative,
                      isDisabledWhileTransition: isDisabledWhileTransition,
                    },
                    slideIndex: i,
                    transitionProgress: transitionProgress,
                  }}
                >
                  {v}
                </SoloSlidesScrollLinkedContext.Provider>
              </motion.div>
            );
          }),
      ]}
    </div>
  );
}
export default SoloSlidesScrollLinked;
