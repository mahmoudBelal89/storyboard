import {
  motionValue,
  MotionValue,
  useMotionValueEvent,
  useTransform,
  animate,
  ValueAnimationTransition,
} from 'framer-motion';
import { Direction } from '../types';

export function round(value: MotionValue<number>) {
  return useTransform(value, (v) => Math.round(v));
}
export function triggerMotionAtIntegers(
  value: MotionValue<number>,
  transition?: ValueAnimationTransition<number>
) {
  const motion = motionValue(0);
  useMotionValueEvent(round(value), 'change', (v) => {
    animate(motion, v, transition);
  });
  return motion;
}
export function xy(value: MotionValue<number>, direction: Direction) {
  return direction === 'left' || direction === 'right'
    ? { x: useTransform(value, (v) => v + 'vw'), y: undefined }
    : { x: undefined, y: useTransform(value, (v) => v + 'vh') };
}
