import {
  motionValue,
  MotionValue,
  useMotionValueEvent,
  useTransform,
  animate,
  AnimationPlaybackControls,
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
  framerTransition?: ValueAnimationTransition<number>
) {
  let prevAnimation: AnimationPlaybackControls | null;
  const _value = motionValue(initial);
  useMotionValueEvent(round(value), 'change', (v) => {
    if (prevAnimation) {
      prevAnimation.then(() => {
        prevAnimation = animate(_value, v, framerTransition);
        prevAnimation.then(() => {
          prevAnimation = null;
        });
      });
    } else {
      prevAnimation = animate(_value, v, framerTransition);
      prevAnimation.then(() => {
        prevAnimation = null;
      });
    }
  });
  return _value;
}
function animateProgress(
  value: MotionValue<number>,
  config: ScrollAnimationOptions,
  scrollTriggeredInitial?: number
) {
  if (config instanceof ScrollTriggered) {
    value = animateAtIntegers(
      value,
      scrollTriggeredInitial,
      config.framerTransition
    );
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
