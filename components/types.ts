import { ValueAnimationTransition, SpringOptions } from 'framer-motion';

export class ScrollTriggered {
  constructor(transition?: ValueAnimationTransition<number>) {
    this.transition = transition;
  }
  transition?: ValueAnimationTransition<number>;
}
export class ScrollLinked {
  constructor(isSpring = false, springConfig?: SpringOptions) {
    this.isSpring = isSpring;
    this.springConfig = springConfig;
  }
  isSpring: boolean;
  springConfig?: SpringOptions;
}
export type ScrollAnimation = ScrollTriggered | ScrollLinked;
export type Direction = 'up' | 'right' | 'down' | 'left';
export type FadeOptions = 'smoothly' | 'throughColor';
