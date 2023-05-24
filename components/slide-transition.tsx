import { useContext } from 'react';
import { MotionValue, useTransform } from 'framer-motion';
import { Direction, FadeOptions } from './types';
import { xy } from './helper';
import { DirectionContext } from './DirectionProvider';
import { FadeConfigContext } from './FadeConfigProvider';

export function moveIn(
  direction?: Direction
): (transitionProgress: MotionValue<number>) => any {
  return (transitionProgress: MotionValue<number>) => {
    if (!direction) {
      direction = useContext(DirectionContext) ?? 'left';
    }
    const [x, y] = xy(
      direction,
      direction === 'left' || direction === 'up'
        ? useTransform(transitionProgress, [-1, 0], [100, 0])
        : useTransform(transitionProgress, [-1, 0], [-100, 0])
    );
    return { x: x, y: y };
  };
}

export function moveOut(
  direction?: Direction
): (transitionProgress: MotionValue<number>) => any {
  return (transitionProgress: MotionValue<number>) => {
    if (!direction) {
      direction = useContext(DirectionContext) ?? 'left';
    }
    const [x, y] = xy(
      direction,
      direction === 'left' || direction === 'up'
        ? useTransform(transitionProgress, [0, 1], [0, -100])
        : useTransform(transitionProgress, [0, 1], [0, 100])
    );
    return { x: x, y: y };
  };
}

export function moveInOut(
  direction?: Direction
): (transitionProgress: MotionValue<number>) => any {
  return (transitionProgress: MotionValue<number>) => {
    if (!direction) {
      direction = useContext(DirectionContext) ?? 'left';
    }
    const [x, y] = xy(
      direction,
      direction === 'left' || direction === 'up'
        ? useTransform(transitionProgress, [-1, 0, 1], [100, 0, -100])
        : useTransform(transitionProgress, [-1, 0, 1], [-100, 0, 100])
    );
    return { x: x, y: y };
  };
}

export function fadeInOut(
  fadeConfig?: FadeOptions
): (transitionProgress: MotionValue<number>) => any {
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
