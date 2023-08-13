'use client';

import { ReactNode, CSSProperties, useContext } from 'react';
import { motion, useTransform } from 'framer-motion';
import { xy } from './helper/motion-value-helper';
import { Direction } from './types';
import { WheelContext, ScrollAnimationContext } from './Wheel';

type Props = {
  direction?: Direction;
  mainAxisLength: number;
  width?: string;
  height?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};
function Parallax({
  direction = 'up',
  mainAxisLength,
  width,
  height = '100vh',
  className,
  style,
  children,
}: Props) {
  const wheelContext = useContext(WheelContext);
  if (width === undefined) {
    width = wheelContext.width;
  }
  const slidesCount = wheelContext.slidesCount;
  const slidesProgress = useContext(ScrollAnimationContext).slidesProgress;

  let widthNum: number;
  let widthUnit: string;
  let heightNum: number;
  let heightUnit: string;
  let mainAxisExtraLength: number;
  if (direction === 'left' || direction === 'right') {
    const match = width.match(/\d+(\.\d+)?([a-z]+)/)!;
    widthNum = parseFloat(match[0]);
    widthUnit = match[1];
    mainAxisExtraLength = mainAxisLength - widthNum;
  } else {
    const match = height.match(/\d+(\.\d+)?([a-z]+)/)!;
    heightNum = parseFloat(match[0]);
    heightUnit = match[1];
    mainAxisExtraLength = mainAxisLength - heightNum;
  }

  return (
    <div
      className={className}
      style={{
        ...style,
        minWidth: width,
        maxWidth: width,
        minHeight: height,
        maxHeight: height,
      }}
    >
      <motion.div
        className='overflow-hidden'
        style={{
          ...(direction === 'up' || direction === 'down'
            ? {
                minHeight: mainAxisLength,
                maxHeight: mainAxisLength,
                minWidth: width,
                maxWidth: width,
              }
            : {
                minHeight: height,
                maxHeight: height,
                minWidth: mainAxisLength,
                maxWidth: mainAxisLength,
              }),
          ...xy(
            useTransform(
              slidesProgress,
              [0, slidesCount - 1],
              direction === 'left' || direction === 'up'
                ? [0, -mainAxisExtraLength]
                : [-mainAxisExtraLength, 0]
            ),
            direction
          ),
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
export default Parallax;
