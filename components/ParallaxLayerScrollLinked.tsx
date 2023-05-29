'use client';

import { ReactNode, useContext } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Direction } from './types';
import { xy } from './helper';
import { LayerScrollLinkedContext } from './LayerScrollLinked';
import { PresentationContext } from './Presentation';

type Props = {
  direction?: Direction;
  length: number;
  isStickyToExtent?: boolean;
  children: ReactNode;
};

function ParallaxLayerScrollLinked({
  direction = 'up',
  length,
  isStickyToExtent = true,
  children,
}: Props) {
  const layerContext = useContext(LayerScrollLinkedContext);
  const layerExtent = layerContext.props.layerExtent;
  const layerProgress = layerContext.layerProgress;

  const dimensions =
    direction === 'up' || direction === 'down'
      ? {
          minHeight: length + 'vh',
          maxHeight: length + 'vh',
          minWidth: '100vw',
          maxWidth: '100vw',
        }
      : {
          minHeight: '100vh',
          maxHeight: '100vh',
          minWidth: length + 'vw',
          maxWidth: length + 'vw',
        };
  const position = xy(
    direction,
    direction === 'left' || direction === 'up'
      ? useTransform(layerProgress, [0, 1], [0, -(length - 100)])
      : useTransform(layerProgress, [0, 1], [-(length - 100), 0])
  );

  return isStickyToExtent ? (
    <motion.div
      className='absolute viewport overflow-hidden'
      style={{
        ...xy(
          direction,
          useTransform(
            useContext(PresentationContext).slidesProgress,
            [
              layerExtent.fromSlide - 1,
              layerExtent.fromSlide,
              layerExtent.toSlide,
              layerExtent.toSlide + 1,
            ],
            [100, 0, 0, -100]
          )
        ),
      }}
    >
      <motion.div
        className='absolute'
        style={{
          ...dimensions,
          ...position,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  ) : (
    <motion.div
      className='absolute'
      style={{
        ...dimensions,
        ...position,
      }}
    >
      {children}
    </motion.div>
  );
}
export default ParallaxLayerScrollLinked;
