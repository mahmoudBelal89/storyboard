import { useRef } from 'react';
import {
  MotionValue,
  Transition,
  ValueAnimationTransition,
  animate,
  motionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';

type ScrollDirection = 'down' | 'up' | 'none';

function getPreviousValue<T>(motionValue: MotionValue<T>) {
  const previousValue = useRef<T>();
  return useTransform(motionValue, (v) => {
    let prevV = previousValue.current;
    previousValue.current = v;
    return { value: v, previousValue: prevV };
  });
}

function getScrollDirectionOfStickyScrollLinked(
  scrollProgress: MotionValue<number>
) {
  const previousValue = useRef<number>();
  const previousDirection = useRef<ScrollDirection>();
  return useTransform(scrollProgress, (v) => {
    let prevV = previousValue.current;
    let direction = previousDirection.current;
    if (v === prevV) {
      direction = 'none';
    }
    if (Number.isInteger(prevV)) {
      if (v > prevV!) {
        direction = 'down';
      } else if (v < prevV!) {
        direction = 'up';
      }
    }
    previousValue.current = v;
    previousDirection.current = direction;
    return {
      scrollProgress: v,
      previousScrollProgress: prevV,
      scrollDirection: direction,
    };
  });
}

function offsetAnimation(
  scrollProgress: MotionValue<number>,
  condition: (v: number) => boolean,
  offset: number,
  defaultValue: number,
  transition: ValueAnimationTransition<number>
) {
  const allMotion = motionValue(defaultValue);
  useMotionValueEvent(scrollProgress, 'change', (v) => {
    if (condition(v)) {
      animate(allMotion, 1, transition as ValueAnimationTransition<number>);
    } else {
      animate(allMotion, 0, transition as ValueAnimationTransition<number>);
    }
  });
  const newMotion = useTransform(allMotion, [0, offset, 1], [0, 0, 1]);
  return newMotion;
}
