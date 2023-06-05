'use client';

import { ReactNode, createContext, useContext } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { PresentationContext } from './Presentation';

export type LayerContextProps = {
  layerExtent: { fromSlide: number; slidesCount: number };
  isDisabledOutOfExtent: boolean;
};
export type LayerContextType = {
  props: LayerContextProps;
  layerProgress: MotionValue<number>;
};
export const LayerContext = createContext<LayerContextType>(null!);

type Props = {
  layerExtent: { fromSlide: number; slidesCount: number };
  isDisabledOutOfExtent?: boolean;
  children: ReactNode;
};

function Layer({
  layerExtent,
  isDisabledOutOfExtent = false,
  children,
}: Props) {
  const layerProgress = useTransform(
    useContext(PresentationContext).presentationProgress,
    [
      layerExtent.fromSlide - 1,
      layerExtent.fromSlide + layerExtent.slidesCount + 1,
    ],
    [-1, layerExtent.slidesCount + 1]
  );

  return (
    <motion.div
      className='absolute viewport'
      style={{
        display: isDisabledOutOfExtent
          ? useTransform(layerProgress, (v) =>
              v <= -1 || v >= layerExtent.slidesCount + 1 ? 'none' : 'block'
            )
          : undefined,
      }}
    >
      <LayerContext.Provider
        value={{
          props: {
            layerExtent: layerExtent,
            isDisabledOutOfExtent: isDisabledOutOfExtent,
          },
          layerProgress: layerProgress,
        }}
      >
        {children}
      </LayerContext.Provider>
    </motion.div>
  );
}
export default Layer;
