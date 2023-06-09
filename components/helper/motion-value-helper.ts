import {
  motionValue,
  MotionValue,
  useMotionValueEvent,
  useTransform,
  animate,
  ValueAnimationTransition,
  useSpring,
} from 'framer-motion';
import { ScrollAnimation, ScrollTriggered, Direction } from '../types';

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
export function reshape(
  value: MotionValue<number>,
  scrollAnimation: ScrollAnimation,
  scrollTriggeredInitial?: number
) {
  if (scrollAnimation instanceof ScrollTriggered) {
    value = animateAtIntegers(
      value,
      scrollTriggeredInitial,
      scrollAnimation.transition
    );
  } else if (scrollAnimation.isSpring) {
    value = useSpring(value, scrollAnimation.springConfig);
  }
  return value;
}
export function xy(value: MotionValue<number>, direction: Direction) {
  return direction === 'left' || direction === 'right'
    ? { x: useTransform(value, (v) => v + 'vw'), y: undefined }
    : { x: undefined, y: useTransform(value, (v) => v + 'vh') };
}
