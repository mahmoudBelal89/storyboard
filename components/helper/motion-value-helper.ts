import {
  motionValue,
  MotionValue,
  useMotionValueEvent,
  useTransform,
  animate,
  ValueAnimationTransition,
  useSpring,
} from 'framer-motion';
import { Direction } from '../types';
import { ScrollAnimationOptions, ScrollTriggered } from '../Wheel';

export function round(value: MotionValue<number>) {
  return useTransform(value, (v) => Math.round(v));
}
export function animateAtIntegers(
  value: MotionValue<number>,
  initial = 0,
  transition?: ValueAnimationTransition<number>
) {
  const motion = motionValue(initial);
  useMotionValueEvent(round(value), 'change', (v) => {
    animate(motion, v, transition);
  });
  return motion;
}
function animateProgress(
  value: MotionValue<number>,
  config: ScrollAnimationOptions,
  scrollTriggeredInitial?: number
) {
  if (config instanceof ScrollTriggered) {
    value = animateAtIntegers(value, scrollTriggeredInitial, config.transition);
  } else if (config.isSpring) {
    value = useSpring(value, config.springConfig);
  }
  return value;
}
function slideProgress(value: MotionValue<number>, index: number) {
  return useTransform(value, [index - 1, index, index + 1], [-1, 0, 1]);
}
export function xy(value: MotionValue<number>, direction: Direction) {
  const _xy = useTransform(value, (v) => v + '%');
  return direction === 'left' || direction === 'right'
    ? { x: _xy, y: undefined }
    : { x: undefined, y: _xy };
}
