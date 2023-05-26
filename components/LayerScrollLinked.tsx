'use client';

import { ReactNode, createContext, useContext } from 'react';
import { motion, MotionValue, useTransform } from 'framer-motion';
import { SlidesScrollLinkedContext } from './SlidesScrollLinked';

export type LayerScrollLinkedContextProps = {
  layerExtent: { fromSlide: number; toSlide: number };
  isDisabledOutOfExtent: boolean;
};
export type LayerScrollLinkedContextType = {
  props: LayerScrollLinkedContextProps;
  layerProgress: MotionValue<number>;
};
export const LayerScrollLinkedContext =
  createContext<LayerScrollLinkedContextType>(null!);

type Props = {
  layerExtent: { fromSlide: number; toSlide: number };
  isDisabledOutOfExtent?: boolean;
  children: ReactNode;
};

function LayerScrollLinked({
  layerExtent,
  isDisabledOutOfExtent = false,
  children,
}: Props) {
  const slidesProgress = useContext(SlidesScrollLinkedContext).slidesProgress;
  const layerProgress = useTransform(
    slidesProgress,
    [layerExtent.fromSlide, layerExtent.toSlide],
    [0, 1]
  );
  return (
    <motion.div
      className='absolute viewport'
      style={{
        display: isDisabledOutOfExtent
          ? useTransform(slidesProgress, (v) =>
              v < layerExtent.fromSlide || v > layerExtent.toSlide
                ? 'none'
                : 'block'
            )
          : undefined,
      }}
    >
      <LayerScrollLinkedContext.Provider
        value={{
          props: {
            layerExtent: layerExtent,
            isDisabledOutOfExtent: isDisabledOutOfExtent,
          },
          layerProgress: layerProgress,
        }}
      >
        {children}
      </LayerScrollLinkedContext.Provider>
    </motion.div>
  );
}
export default LayerScrollLinked;
