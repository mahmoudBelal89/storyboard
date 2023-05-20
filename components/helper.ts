import { MotionValue, useTransform } from 'framer-motion';
import { Direction } from './types';

export function xy(direction: Direction, position: MotionValue) {
  return [
    direction === 'left' || direction === 'right'
      ? useTransform(position, (v) => v + 'vw')
      : undefined,
    direction === 'up' || direction === 'down'
      ? useTransform(position, (v) => v + 'vh')
      : undefined,
  ];
}
