import { MotionValue, useTransform } from 'framer-motion';
import { Direction } from './types';

export function xy(direction: Direction, position: MotionValue<number>) {
  return direction === 'left' || direction === 'right'
    ? { x: useTransform(position, (v) => v + 'vw'), y: undefined }
    : { x: undefined, y: useTransform(position, (v) => v + 'vh') };
}
