'use client';

import { ReactNode, useContext } from 'react';
import { motion, useTransform } from 'framer-motion';
import { Direction } from './types';
import { triggerMotion, xy } from './helper/motion-value-helper';
import { PresentationContext } from './Presentation';
import { LayerContext } from './Layer';

type Props = {
  direction?: Direction;
  length: number;
  isStickyToExtent?: boolean;
  children: ReactNode;
};

function Parallax({
  direction = 'up',
  length,
  isStickyToExtent = true,
  children,
}: Props) {
  const layerContext = useContext(LayerContext);
  const layerExtent = layerContext.props.layerExtent;
  let layerProgress = layerContext.layerProgress;

  const extentLength = layerExtent.toSlide - layerExtent.fromSlide;
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

  layerProgress = triggerMotion(layerProgress);
  const position = xy(
    direction,
    direction === 'left' || direction === 'up'
      ? useTransform(layerProgress, [0, extentLength], [0, -(length - 100)])
      : useTransform(layerProgress, [0, extentLength], [-(length - 100), 0])
  );

  return isStickyToExtent ? (
    <motion.div
      className='absolute viewport overflow-hidden'
      style={{
        ...xy(
          direction,
          useTransform(
            layerProgress,
            [-1, 0, extentLength, extentLength + 1],
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
export default Parallax;
