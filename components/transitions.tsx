//------------------------------ IMPORT

import { MotionValue, useTransform } from 'framer-motion';

//------------------------------ TRANSITION

type PropTransitionProps = {
  prop: string;
  from?: number;
  to?: number;
  fromValue?: number;
  zeroValue?: number;
  toValue?: number;
  unit?: string;
};

class PropTransition {
  static merge(enter: PropTransition, exit: PropTransition) {
    return new PropTransition({
      prop: enter.prop,
      from: enter.from,
      to: exit.to,
      fromValue: enter.fromValue,
      zeroValue: enter.zeroValue,
      toValue: exit.toValue,
      unit: enter.unit,
    });
  }
  static getStyle(
    progress: MotionValue<number>,
    enter: PropTransition[],
    exit: PropTransition[]
  ) {
    let all = enter.map((v) => {
      let mapResult = v;
      exit.forEach((e) => {
        if (v.prop === e.prop) {
          mapResult = PropTransition.merge(v, e);
        }
      });
      return mapResult;
    });
    all = all.concat(
      exit.filter((v) => {
        let filterResult = true;
        enter.forEach((e) => {
          if (v.prop === e.prop) {
            filterResult = false;
          }
        });
        return filterResult;
      })
    );
    return all.reduce(
      (
        acc: { [key: string]: MotionValue<number> | MotionValue<string> },
        v
      ) => {
        acc[v.prop] = v.getMotionValue(progress);
        return acc;
      },
      {}
    );
  }

  prop: string;
  from?: number;
  to?: number;
  fromValue?: number;
  zeroValue: number;
  toValue?: number;
  unit?: string;

  constructor({
    prop,
    from,
    to,
    fromValue,
    zeroValue = 0,
    toValue,
    unit,
  }: PropTransitionProps) {
    this.prop = prop;
    this.from = from;
    this.to = to;
    this.fromValue = fromValue;
    this.zeroValue = zeroValue;
    this.toValue = toValue;
    this.unit = unit;
  }

  getMotionValue(progress: MotionValue<number>) {
    let value: MotionValue<number> | MotionValue<string>;

    if (this.from && this.to) {
      value = useTransform(
        progress,
        [this.from, 0, this.to],
        [this.fromValue!, this.zeroValue, this.toValue!]
      );
    } else if (this.from) {
      value = useTransform(
        progress,
        [this.from, 0],
        [this.fromValue!, this.zeroValue]
      );
    } else {
      value = useTransform(
        progress,
        [0, this.to!],
        [this.zeroValue, this.toValue!]
      );
    }

    if (this.unit) {
      value = useTransform(value, (v) => v + this.unit!);
    }

    return value;
  }
}

type Transition = [PropTransition[], PropTransition[]];

//------------------------------ CONSTANTS

//------------------------------ COVER

const COVER_LEFT: Transition = [
  [
    new PropTransition({
      prop: 'x',
      from: -1,
      fromValue: 100,
      unit: '%',
    }),
  ],
  [],
];
const COVER_UP: Transition = [
  [
    new PropTransition({
      prop: 'y',
      from: -1,
      fromValue: 100,
      unit: '%',
    }),
  ],
  [],
];
const COVER_RIGHT: Transition = [
  [
    new PropTransition({
      prop: 'x',
      from: -1,
      fromValue: -100,
      unit: '%',
    }),
  ],
  [],
];
const COVER_DOWN: Transition = [
  [
    new PropTransition({
      prop: 'y',
      from: -1,
      fromValue: -100,
      unit: '%',
    }),
  ],
  [],
];

//------------------------------ UNCOVER

const UNCOVER_LEFT: Transition = [
  [],
  [
    new PropTransition({
      prop: 'x',
      to: 1,
      toValue: -100,
      unit: '%',
    }),
  ],
];
const UNCOVER_UP: Transition = [
  [],
  [
    new PropTransition({
      prop: 'y',
      to: 1,
      toValue: -100,
      unit: '%',
    }),
  ],
];
const UNCOVER_RIGHT: Transition = [
  [],
  [
    new PropTransition({
      prop: 'x',
      to: 1,
      toValue: 100,
      unit: '%',
    }),
  ],
];
const UNCOVER_DOWN: Transition = [
  [],
  [
    new PropTransition({
      prop: 'y',
      to: 1,
      toValue: 100,
      unit: '%',
    }),
  ],
];

//------------------------------ PUSH

const PUSH_LEFT: Transition = [
  [
    new PropTransition({
      prop: 'x',
      from: -1,
      fromValue: 100,
      unit: '%',
    }),
  ],
  [
    new PropTransition({
      prop: 'x',
      to: 1,
      toValue: -100,
      unit: '%',
    }),
  ],
];
const PUSH_UP: Transition = [
  [
    new PropTransition({
      prop: 'y',
      from: -1,
      fromValue: 100,
      unit: '%',
    }),
  ],
  [
    new PropTransition({
      prop: 'y',
      to: 1,
      toValue: -100,
      unit: '%',
    }),
  ],
];
const PUSH_RIGHT: Transition = [
  [
    new PropTransition({
      prop: 'x',
      from: -1,
      fromValue: -100,
      unit: '%',
    }),
  ],
  [
    new PropTransition({
      prop: 'x',
      to: 1,
      toValue: 100,
      unit: '%',
    }),
  ],
];
const PUSH_DOWN: Transition = [
  [
    new PropTransition({
      prop: 'y',
      from: -1,
      fromValue: -100,
      unit: '%',
    }),
  ],
  [
    new PropTransition({
      prop: 'y',
      to: 1,
      toValue: 100,
      unit: '%',
    }),
  ],
];

//------------------------------ FADE

const FADE_SMOOTHLY: Transition = [
  [
    new PropTransition({
      prop: 'opacity',
      from: -1,
      fromValue: 0,
      zeroValue: 1,
    }),
  ],
  [
    new PropTransition({
      prop: 'opacity',
      to: 1,
      zeroValue: 1,
      toValue: 0,
    }),
  ],
];

const FADE_THROUGH_COLOR: Transition = [
  [
    new PropTransition({
      prop: 'opacity',
      from: -0.45,
      fromValue: 0,
      zeroValue: 1,
    }),
  ],
  [
    new PropTransition({
      prop: 'opacity',
      to: 0.45,
      zeroValue: 1,
      toValue: 0,
    }),
  ],
];

//------------------------------ ZOOM

const ZOOM_IN: Transition = [
  [
    new PropTransition({
      prop: 'scaleX',
      from: -1,
      fromValue: 0.25,
      zeroValue: 1,
    }),
    new PropTransition({
      prop: 'scaleY',
      from: -1,
      fromValue: 0.25,
      zeroValue: 1,
    }),
    new PropTransition({
      prop: 'opacity',
      from: -1,
      fromValue: 0,
      zeroValue: 1,
    }),
  ],
  [],
];

const ZOOM_OUT: Transition = [
  [],
  [
    new PropTransition({
      prop: 'scaleX',
      to: 1,
      zeroValue: 1,
      toValue: 0.25,
    }),
    new PropTransition({
      prop: 'scaleY',
      to: 1,
      zeroValue: 1,
      toValue: 0.25,
    }),
    new PropTransition({
      prop: 'opacity',
      to: 1,
      zeroValue: 1,
      toValue: 0,
    }),
  ],
];

//------------------------------ EXPORT

export type { Transition };
export {
  PropTransition,
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
  FADE_SMOOTHLY,
  FADE_THROUGH_COLOR,
  ZOOM_IN,
  ZOOM_OUT,
};
