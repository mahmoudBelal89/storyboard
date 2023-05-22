'use client';

import React, { ReactNode, useContext } from 'react';
import { motion, useTransform } from 'framer-motion';
import { _FLEX_DIRECTION_VARIANTS } from '../constants';
import { Direction } from '../types';
import { xy } from '../helper';
import { PlaySlowContext } from './PlaySlow';

type Props = {
  direction?: Direction;
  children: ReactNode;
};

function PushSlow({ direction = 'left', children }: Props) {
  const context = useContext(PlaySlowContext);
  const scenesCount = context.props.scenesCount;
  const scenesProgress = context.scenesProgress;
  const position = useTransform(scenesProgress, (v) => {
    return direction === 'left' || direction === 'up'
      ? -v * 100
      : v * 100 - 100 * (scenesCount - 1);
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
        .slice(0, scenesCount)
        .map((v) => (
          <div className='relative viewport'>{v}</div>
        ))}
    </motion.div>
  );
}
export default PushSlow;
