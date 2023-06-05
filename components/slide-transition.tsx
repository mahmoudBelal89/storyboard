import { useContext } from 'react';
import { MotionValue, useTransform } from 'framer-motion';
import { Direction, FadeOptions } from './types';
import { xy } from './helper/motion-value-helper';
import { DirectionContext } from './DirectionProvider';
import { FadeConfigContext } from './FadeConfigProvider';

export function translateIn(
  direction?: Direction,
  value = 100
): (slideProgress: MotionValue<number>) => any {
  return (slideProgress: MotionValue<number>) => {
    if (!direction) {
      direction = useContext(DirectionContext) ?? 'left';
    }
    return xy(
      direction === 'left' || direction === 'up'
        ? useTransform(slideProgress, [-1, 0], [value, 0])
        : useTransform(slideProgress, [-1, 0], [-value, 0]),
      direction
    );
  };
}

export function translateOut(
  direction?: Direction
): (slideProgress: MotionValue<number>) => any {
  return (transitionProgress: MotionValue<number>) => {
    if (!direction) {
      direction = useContext(DirectionContext) ?? 'left';
    }
    return xy(
      direction,
      direction === 'left' || direction === 'up'
        ? useTransform(transitionProgress, [0, 1], [0, -100])
        : useTransform(transitionProgress, [0, 1], [0, 100])
    );
  };
}

export function translateInOut(
  direction?: Direction
): (slideProgress: MotionValue<number>) => any {
  return (transitionProgress: MotionValue<number>) => {
    if (!direction) {
      direction = useContext(DirectionContext) ?? 'left';
    }
    return xy(
      direction,
      direction === 'left' || direction === 'up'
        ? useTransform(transitionProgress, [-1, 0, 1], [100, 0, -100])
        : useTransform(transitionProgress, [-1, 0, 1], [-100, 0, 100])
    );
  };
}

export function opacityInOut(
  fadeConfig?: FadeOptions
): (slideProgress: MotionValue<number>) => any {
  return (transitionProgress: MotionValue<number>) => {
    if (!fadeConfig) {
      fadeConfig = useContext(FadeConfigContext) ?? 'smoothly';
    }
    return {
      opacity:
        fadeConfig === 'smoothly'
          ? useTransform(transitionProgress, [-1, 0, 1], [0, 1, 0])
          : useTransform(transitionProgress, [-0.45, 0, 0.45], [0, 1, 0]),
    };
  };
}
