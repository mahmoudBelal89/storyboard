'use client';

import React, { ReactNode, createContext, useContext } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { PlaySlowContext } from './PlaySlow';

export type ActSlowContextProps = {
  isZIndexNegative: boolean;
  isDisabledWhileTransition: boolean;
};
export type ActSlowContextType = {
  sceneIndex: number;
  transitionProgress: MotionValue<number>;
  props: ActSlowContextProps;
};
export const ActSlowContext = createContext<ActSlowContextType>(null!);

type Props = {
  isZIndexNegative?: boolean;
  isDisabledWhileTransition?: boolean;
  children: ReactNode;
};

function ActSlow({
  isZIndexNegative = false,
  isDisabledWhileTransition = true,
  children,
}: Props) {
  const context = useContext(PlaySlowContext);
  const scenesCount = context.props.scenesCount;
  const scenesProgress = context.scenesProgress;
  const coverDisplay = isDisabledWhileTransition
    ? useTransform(scenesProgress, (v) =>
        Number.isInteger(v) ? 'none' : 'block'
      )
    : undefined;

  return (
    <div className='absolute viewport'>
      {[
        isDisabledWhileTransition && (
          <motion.div
            className='absolute viewport'
            style={{ display: coverDisplay, zIndex: scenesCount }}
          />
        ),
        React.Children.toArray(children)
          .slice(0, scenesCount)
          .map((v, i) => {
            const transitionProgress = useTransform(
              scenesProgress,
              [i - 1, i, i + 1],
              [-1, 0, 1]
            );
            const display = useTransform(transitionProgress, (v) =>
              v === -1 || v === 1 ? 'none' : 'block'
            );

            return (
              <motion.div
                className='absolute viewport'
                style={{
                  display: display,
                  zIndex: isZIndexNegative ? -i : i,
                }}
              >
                <ActSlowContext.Provider
                  value={{
                    sceneIndex: i,
                    transitionProgress: transitionProgress,
                    props: {
                      isZIndexNegative: isZIndexNegative,
                      isDisabledWhileTransition: isDisabledWhileTransition,
                    },
                  }}
                >
                  {children}
                </ActSlowContext.Provider>
              </motion.div>
            );
          }),
      ]}
    </div>
  );
}
export default ActSlow;
