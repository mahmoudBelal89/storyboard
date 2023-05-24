'use client';

import React, { ReactNode, useContext } from 'react';
import { motion, useTransform } from 'framer-motion';
import { _FLEX_DIRECTION_VARIANTS } from './constants';
import { Direction } from './types';
import { xy } from './helper';
import { SlidesScrollLinkedContext } from './SlidesScrollLinked';

type Props = {
  direction?: Direction;
  children: ReactNode;
};

function PushScrollLinked({ direction = 'left', children }: Props) {
  const slidesContext = useContext(SlidesScrollLinkedContext);
  const slidesCount = slidesContext.props.slidesCount;
  const slidesProgress = slidesContext.slidesProgress;
  const position = useTransform(slidesProgress, (v) => {
    return direction === 'left' || direction === 'up'
      ? -v * 100
      : v * 100 - 100 * (slidesCount - 1);
  });
  const [x, y] = xy(direction, position);

  return (
    <motion.div
      className={`absolute flex ${_FLEX_DIRECTION_VARIANTS[direction]} fit`}
      style={{
        x: x,
        y: y,
      }}
    >
      {React.Children.toArray(children)
        .slice(0, slidesCount)
        .map((v) => (
          <div className='relative viewport'>{v}</div>
        ))}
    </motion.div>
  );
}
export default PushScrollLinked;
