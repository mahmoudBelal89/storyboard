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

export function animateToIntegers(
  value: MotionValue<number>,
  initial = 0,
  framerTransition?: ValueAnimationTransition<number>
) {
  const _value = motionValue(initial);
  let curr = initial;
  let to = initial;
  let isWhileNotRunning = true;
  useMotionValueEvent(round(value), 'change', async (v) => {
    to = v;
    if (isWhileNotRunning) {
      isWhileNotRunning = false;
      while (curr !== to) {
        if (curr < to) {
          await animate(_value, curr + 1, framerTransition);
          curr++;
        } else if (curr > to) {
          await animate(_value, curr - 1, framerTransition);
          curr--;
        }
      }
      isWhileNotRunning = true;
    }
  });
  return _value;
}

export function xy(value: MotionValue<number>, direction: Direction) {
  const _xy = useTransform(value, (v) => v + '%');
  return direction === 'left' || direction === 'right'
    ? { x: _xy, y: undefined }
    : { x: undefined, y: _xy };
}

function animateProgress(
  value: MotionValue<number>,
  config: ScrollAnimationOptions,
  scrollTriggeredInitial?: number
) {
  if (config instanceof ScrollTriggered) {
    value = animateToIntegers(
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
