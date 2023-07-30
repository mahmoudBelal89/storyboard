//------------------------------ IMPORT

import { MotionValue, useTransform } from 'framer-motion';

//------------------------------ TRANSITION

type Transition = {
  enter?: EnterPropTransition[]; // = []
  exit?: ExitPropTransition[]; // = []
  isZIndexNegative?: boolean; // = false
};
type PropTransition =
  | EnterPropTransition
  | ExitPropTransition
  | EnterExitPropTransition;
type EnterPropTransition = {
  prop: string;
  from: number;
  fromValue: number;
  zeroValue: number;
  unit?: string;
};
type ExitPropTransition = {
  prop: string;
  to: number;
  zeroValue: number;
  toValue: number;
  unit?: string;
};
type EnterExitPropTransition = EnterPropTransition & ExitPropTransition;

function getPropProgress(
  progress: MotionValue<number>,
  propTransition: PropTransition
) {
  let value: MotionValue<number> | MotionValue<string>;
  if ('from' in propTransition && 'to' in propTransition) {
    value = useTransform(
      progress,
      [propTransition.from, 0, propTransition.to],
      [
        propTransition.fromValue,
        propTransition.zeroValue,
        propTransition.toValue,
      ]
    );
  } else if ('from' in propTransition) {
    value = useTransform(
      progress,
      [propTransition.from, 0],
      [propTransition.fromValue, propTransition.zeroValue]
    );
  } else {
    value = useTransform(
      progress,
      [0, propTransition.to],
      [propTransition.zeroValue, propTransition.toValue]
    );
  }
  if (propTransition.unit) {
    value = useTransform(value, (v) => v + propTransition.unit!);
  }
  return value;
}

function getStyle(progress: MotionValue<number>, transition: Transition) {
  const enter: PropTransition[] = transition.enter ?? [];
  const exit = transition.exit ?? [];
  return enter
    .map((v) => {
      const sameProp = exit.find((_v) => _v.prop === v.prop);
      return sameProp ? { ...v, ...sameProp } : v;
    })
    .concat(
      exit.filter((v) => {
        return !enter.some((_v) => _v.prop === v.prop);
      })
    )
    .reduce(
      (
        acc: { [key: string]: MotionValue<number> | MotionValue<string> },
        v
      ) => {
        acc[v.prop] = getPropProgress(progress, v);
        return acc;
      },
      {}
    );
}

//------------------------------ CONSTANTS

//------------------------------ COVER

const COVER_LEFT: Transition = {
  enter: [
    {
      prop: 'x',
      from: -1,
      fromValue: 100,
      zeroValue: 0,
      unit: '%',
    },
  ],
};
const COVER_UP: Transition = {
  enter: [
    {
      prop: 'y',
      from: -1,
      fromValue: 100,
      zeroValue: 0,
      unit: '%',
    },
  ],
};
const COVER_RIGHT: Transition = {
  enter: [
    {
      prop: 'x',
      from: -1,
      fromValue: -100,
      zeroValue: 0,
      unit: '%',
    },
  ],
};
const COVER_DOWN: Transition = {
  enter: [
    {
      prop: 'y',
      from: -1,
      fromValue: -100,
      zeroValue: 0,
      unit: '%',
    },
  ],
};

//------------------------------ UNCOVER

const UNCOVER_LEFT: Transition = {
  exit: [
    {
      prop: 'x',
      to: 1,
      zeroValue: 0,
      toValue: -100,
      unit: '%',
    },
  ],
  isZIndexNegative: true,
};
const UNCOVER_UP: Transition = {
  exit: [
    {
      prop: 'y',
      to: 1,
      zeroValue: 0,
      toValue: -100,
      unit: '%',
    },
  ],
  isZIndexNegative: true,
};
const UNCOVER_RIGHT: Transition = {
  exit: [
    {
      prop: 'x',
      to: 1,
      zeroValue: 0,
      toValue: 100,
      unit: '%',
    },
  ],
  isZIndexNegative: true,
};
const UNCOVER_DOWN: Transition = {
  exit: [
    {
      prop: 'y',
      to: 1,
      zeroValue: 0,
      toValue: 100,
      unit: '%',
    },
  ],
  isZIndexNegative: true,
};

//------------------------------ PUSH

const PUSH_LEFT: Transition = {
  enter: [
    {
      prop: 'x',
      from: -1,
      fromValue: 100,
      zeroValue: 0,
      unit: '%',
    },
  ],
  exit: [
    {
      prop: 'x',
      to: 1,
      zeroValue: 0,
      toValue: -100,
      unit: '%',
    },
  ],
};
const PUSH_UP: Transition = {
  enter: [
    {
      prop: 'y',
      from: -1,
      fromValue: 100,
      zeroValue: 0,
      unit: '%',
    },
  ],
  exit: [
    {
      prop: 'y',
      to: 1,
      zeroValue: 0,
      toValue: -100,
      unit: '%',
    },
  ],
};
const PUSH_RIGHT: Transition = {
  enter: [
    {
      prop: 'x',
      from: -1,
      fromValue: -100,
      zeroValue: 0,
      unit: '%',
    },
  ],
  exit: [
    {
      prop: 'x',
      to: 1,
      zeroValue: 0,
      toValue: 100,
      unit: '%',
    },
  ],
};
const PUSH_DOWN: Transition = {
  enter: [
    {
      prop: 'y',
      from: -1,
      fromValue: -100,
      zeroValue: 0,
      unit: '%',
    },
  ],
  exit: [
    {
      prop: 'y',
      to: 1,
      zeroValue: 0,
      toValue: 100,
      unit: '%',
    },
  ],
};

//------------------------------ FADE

const FADE_IN_SMOOTHLY: Transition = {
  enter: [
    {
      prop: 'opacity',
      from: -1,
      fromValue: 0,
      zeroValue: 1,
    },
  ],
};

const FADE_THROUGH_COLOR: Transition = {
  enter: [
    {
      prop: 'opacity',
      from: -0.45,
      fromValue: 0,
      zeroValue: 1,
    },
  ],
  exit: [
    {
      prop: 'opacity',
      to: 0.45,
      zeroValue: 1,
      toValue: 0,
    },
  ],
};

//------------------------------ ZOOM

const ZOOM_IN: Transition = {
  enter: [
    {
      prop: 'scaleX',
      from: -1,
      fromValue: 0.25,
      zeroValue: 1,
    },
    {
      prop: 'scaleY',
      from: -1,
      fromValue: 0.25,
      zeroValue: 1,
    },
    {
      prop: 'opacity',
      from: -1,
      fromValue: 0,
      zeroValue: 1,
    },
  ],
};

const ZOOM_OUT: Transition = {
  exit: [
    {
      prop: 'scaleX',
      to: 1,
      zeroValue: 1,
      toValue: 0.25,
    },
    {
      prop: 'scaleY',
      to: 1,
      zeroValue: 1,
      toValue: 0.25,
    },
    {
      prop: 'opacity',
      to: 1,
      zeroValue: 1,
      toValue: 0,
    },
  ],
  isZIndexNegative: true,
};

//------------------------------ EXPORT

export type {
  Transition,
  PropTransition,
  EnterPropTransition,
  ExitPropTransition,
  EnterExitPropTransition,
};
export {
  getPropProgress,
  getStyle,
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
  FADE_IN_SMOOTHLY,
  FADE_THROUGH_COLOR,
  ZOOM_IN,
  ZOOM_OUT,
};
