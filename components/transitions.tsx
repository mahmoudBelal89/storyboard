//------------------------------ IMPORT

import { MotionValue, useTransform } from 'framer-motion';
import { Direction } from './types';
import { xy } from './helper/motion-value-helper';

//------------------------------ TRANSITION

type Transition = (progress: MotionValue<number>) => any;

//------------------------------ TRANSLATE

function translateIn(
  direction: Direction = 'left',
  from = 1,
  fromValue = 100
): Transition {
  return (progress: MotionValue<number>) => {
    return xy(
      direction === 'left' || direction === 'up'
        ? useTransform(progress, [-from, 0], [fromValue, 0])
        : useTransform(progress, [-from, 0], [-fromValue, 0]),
      direction
    );
  };
}
function translateOut(
  direction: Direction = 'left',
  to = 1,
  toValue = 100
): Transition {
  return (progress: MotionValue<number>) => {
    return xy(
      direction === 'left' || direction === 'up'
        ? useTransform(progress, [0, to], [0, -toValue])
        : useTransform(progress, [0, to], [0, toValue]),
      direction
    );
  };
}
function translateInOut(
  direction: Direction = 'left',
  from = 1,
  to = 1,
  fromValue = 100,
  toValue = 100
): Transition {
  return (progress: MotionValue<number>) => {
    return xy(
      direction === 'left' || direction === 'up'
        ? useTransform(progress, [-from, 0, to], [fromValue, 0, -toValue])
        : useTransform(progress, [-from, 0, to], [-fromValue, 0, toValue]),
      direction
    );
  };
}

//------------------------------ SCALE

function scaleIn(from = 1, fromValue = 0): Transition {
  return (progress: MotionValue<number>) => {
    progress = useTransform(progress, [-from, 0], [fromValue, 1]);
    return {
      scaleX: progress,
      scaleY: progress,
    };
  };
}
function scaleOut(to = 1, toValue = 0): Transition {
  return (progress: MotionValue<number>) => {
    progress = useTransform(progress, [0, to], [1, toValue]);
    return {
      scaleX: progress,
      scaleY: progress,
    };
  };
}

//------------------------------ OPACITY

function opacityIn(from = 1, fromValue = 0): Transition {
  return (progress: MotionValue<number>) => {
    return {
      opacity: useTransform(progress, [-from, 0], [fromValue, 1]),
    };
  };
}
function opacityOut(to = 1, toValue = 0): Transition {
  return (progress: MotionValue<number>) => {
    return {
      opacity: useTransform(progress, [0, to], [1, toValue]),
    };
  };
}
function opacityInOut(
  from = 1,
  to = 1,
  fromValue = 0,
  toValue = 0
): Transition {
  return (progress: MotionValue<number>) => {
    return {
      opacity: useTransform(progress, [-from, 0, to], [fromValue, 1, toValue]),
    };
  };
}

//------------------------------ CONSTANTS

const COVER_LEFT: [Transition[], Transition[]] = [[], [translateIn()]];
const COVER_UP: [Transition[], Transition[]] = [[], [translateIn('up')]];
const COVER_RIGHT: [Transition[], Transition[]] = [[], [translateIn('right')]];
const COVER_DOWN: [Transition[], Transition[]] = [[], [translateIn('down')]];

const UNCOVER_LEFT: [Transition[], Transition[]] = [[translateInOut()], []];
const UNCOVER_UP: [Transition[], Transition[]] = [[translateInOut('up')], []];
const UNCOVER_RIGHT: [Transition[], Transition[]] = [
  [translateInOut('right')],
  [],
];
const UNCOVER_DOWN: [Transition[], Transition[]] = [
  [translateInOut('down')],
  [],
];

const PUSH_LEFT: [Transition[], Transition[]] = [
  [translateOut()],
  [translateIn()],
];
const PUSH_UP: [Transition[], Transition[]] = [
  [translateOut('up')],
  [translateIn('up')],
];
const PUSH_RIGHT: [Transition[], Transition[]] = [
  [translateOut('right')],
  [translateIn('right')],
];
const PUSH_DOWN: [Transition[], Transition[]] = [
  [translateOut('down')],
  [translateIn('down')],
];

const ZOOM_IN: [Transition[], Transition[]] = [
  [],
  [scaleIn(1, 0.25), opacityIn()],
];

const ZOOM_OUT: [Transition[], Transition[]] = [
  [scaleOut(1, 0.25), opacityOut()],
  [],
];

const FADE_SMOOTHLY: [Transition[], Transition[]] = [
  [opacityOut()],
  [opacityIn()],
];
const FADE_THROUGH_COLOR: [Transition[], Transition[]] = [
  [opacityOut(0.45)],
  [opacityIn(0.45)],
];

//------------------------------ EXPORT

export type { Transition };
export {
  translateIn,
  translateOut,
  translateInOut,
  scaleIn,
  scaleOut,
  opacityIn,
  opacityOut,
  opacityInOut,
  COVER_LEFT,
  COVER_UP,
  COVER_RIGHT,
  COVER_DOWN,
  UNCOVER_LEFT,
  UNCOVER_UP,
  UNCOVER_RIGHT,
  UNCOVER_DOWN,
  PUSH_LEFT,
  PUSH_UP,
  PUSH_RIGHT,
  PUSH_DOWN,
  ZOOM_IN,
  ZOOM_OUT,
  FADE_SMOOTHLY,
  FADE_THROUGH_COLOR,
};
