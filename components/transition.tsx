import { MotionValue, useTransform } from 'framer-motion';
import { Direction, FadeOptions } from './types';
import { xy } from './helper/motion-value-helper';

export function translateIn(
  direction: Direction = 'left',
  from = 1,
  fromValue = 100
): (progress: MotionValue<number>) => any {
  return (progress: MotionValue<number>) => {
    return xy(
      direction === 'left' || direction === 'up'
        ? useTransform(progress, [-from, 0], [fromValue, 0])
        : useTransform(progress, [-from, 0], [-fromValue, 0]),
      direction
    );
  };
}
export function translateOut(
  direction: Direction = 'left',
  to = 1,
  toValue = 100
): (progress: MotionValue<number>) => any {
  return (progress: MotionValue<number>) => {
    return xy(
      direction === 'left' || direction === 'up'
        ? useTransform(progress, [0, to], [0, -toValue])
        : useTransform(progress, [0, to], [0, toValue]),
      direction
    );
  };
}
export function translateInOut(
  direction: Direction = 'left',
  from = 1,
  to = 1,
  fromValue = 100,
  toValue = 100
): (progress: MotionValue<number>) => any {
  return (progress: MotionValue<number>) => {
    return xy(
      direction === 'left' || direction === 'up'
        ? useTransform(progress, [-from, 0, to], [fromValue, 0, -toValue])
        : useTransform(progress, [-from, 0, to], [-fromValue, 0, toValue]),
      direction
    );
  };
}

export function opacityIn(
  from = 1,
  fromValue = 0
): (progress: MotionValue<number>) => any {
  return (progress: MotionValue<number>) => {
    return {
      opacity: useTransform(progress, [-from, 0], [fromValue, 1]),
    };
  };
}
export function opacityOut(
  to = 1,
  toValue = 0
): (progress: MotionValue<number>) => any {
  return (progress: MotionValue<number>) => {
    return {
      opacity: useTransform(progress, [0, to], [1, toValue]),
    };
  };
}
export function opacityInOut(
  from = 1,
  to = 1,
  fromValue = 0,
  toValue = 0
): (progress: MotionValue<number>) => any {
  return (progress: MotionValue<number>) => {
    return {
      opacity: useTransform(progress, [-from, 0, to], [fromValue, 1, toValue]),
    };
  };
}
export function scaleIn(
  from = 1,
  fromValue = 0
): (progress: MotionValue<number>) => any {
  return (progress: MotionValue<number>) => {
    progress = useTransform(progress, [-from, 0], [fromValue, 1]);
    return {
      scaleX: progress,
      scaleY: progress,
    };
  };
}
export function scaleOut(
  to = 1,
  toValue = 0
): (progress: MotionValue<number>) => any {
  return (progress: MotionValue<number>) => {
    progress = useTransform(progress, [0, to], [1, toValue]);
    return {
      scaleX: progress,
      scaleY: progress,
    };
  };
}

export function fade(
  fadeConfig: FadeOptions = 'smoothly'
): (progress: MotionValue<number>) => any {
  return fadeConfig === 'smoothly' ? opacityInOut() : opacityInOut(0.45, 0.45);
}

export const zoomIn = [scaleIn(1, 0.25), opacityIn()];
export const zoomOut = [scaleOut(1, 0.25), opacityOut()];
