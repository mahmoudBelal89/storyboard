'use client';

//------------------------------ IMPORT

import React, {
  ReactNode,
  CSSProperties,
  useRef,
  createContext,
  useContext,
} from 'react';
import {
  motion,
  MotionValue,
  ValueAnimationTransition,
  useScroll,
  useTransform,
  useSpring,
  SpringOptions,
} from 'framer-motion';
import ContextUser from './ContextUser';
import { PropTransition, Transition } from './transitions';
import { animateToIntegers } from './helper/motion-value-helper';

//------------------------------ PRIVATE

const ABSOLUTE: CSSProperties = {
  position: 'absolute',
  left: 0,
  top: 0,
};
const WHEEL_STICKY: CSSProperties = {
  position: 'sticky',
  left: 0,
  top: 0,
  ...allHeight('100vh'),
  overflow: 'hidden',
};
function allWidth(value?: string): CSSProperties {
  return { minWidth: value, maxWidth: value, width: value };
}
function allHeight(value?: string): CSSProperties {
  return { minHeight: value, maxHeight: value, height: value };
}

//------------------------------ PUBLIC
//------------------------------ WHEEL

type WheelContextType = {
  slidesCount: number;
  transitionRatio: number;
  width: string;
  height: string;
  scrollProgress: MotionValue<number>;
  slidesProgress: MotionValue<number>;
};
const WheelContext = createContext<WheelContextType>(null!);

type WheelProps = {
  slidesCount?: number;
  transitionRatio?: number;
  width?: string;
  height?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

function Wheel({
  slidesCount = 2,
  transitionRatio = 2,
  width = '100vw',
  height = slidesCount * 300 + 'vh', // slidesCount * 100 + (slidesCount - 1) * 200 + 200 + "vh"
  className,
  style,
  children,
}: WheelProps) {
  const root = useRef(null);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: ['start', 'end'],
  });
  const totalExtent = slidesCount + transitionRatio * (slidesCount - 1);
  const inputRange: number[] = [];
  const outputRange: number[] = [];
  for (let i = 0; i < slidesCount; i++) {
    inputRange.push(
      (i * (1 + transitionRatio)) / totalExtent,
      (1 + i * (1 + transitionRatio)) / totalExtent
    );
    outputRange.push(i, i);
  }
  const slidesProgress = useTransform(scrollYProgress, inputRange, outputRange);

  return (
    <div
      ref={root}
      className={className}
      style={{
        ...style,
        ...allWidth(width),
        ...allHeight(height),
      }}
    >
      <div
        style={{
          ...WHEEL_STICKY,
          ...allWidth(width),
        }}
      >
        <WheelContext.Provider
          value={{
            slidesCount: slidesCount,
            transitionRatio: transitionRatio,
            width: width,
            height: height,
            scrollProgress: scrollYProgress,
            slidesProgress: slidesProgress,
          }}
        >
          {children}
        </WheelContext.Provider>
      </div>
    </div>
  );
}
Wheel.ScrollAnimation = ScrollAnimation;
Wheel.SlideShow = SlideShow;
Wheel.Slide = Slide;

//------------------------------ SCROLL-ANIMATION-OPTIONS

type ScrollAnimationOptions = ScrollTriggered | ScrollLinked;
class ScrollTriggered {
  constructor(framerTransition?: ValueAnimationTransition<number>) {
    this.framerTransition = framerTransition;
  }
  framerTransition?: ValueAnimationTransition<number>;
}
class ScrollLinked {
  constructor(isSpring = false, springConfig?: SpringOptions) {
    this.isSpring = isSpring;
    this.springConfig = springConfig;
  }
  isSpring: boolean;
  springConfig?: SpringOptions;
}

//------------------------------ SCROLL-ANIMATION

type ScrollAnimationContextType = {
  config?: ScrollAnimationOptions;
  slidesProgress: MotionValue<number>;
};
const ScrollAnimationContext = createContext<ScrollAnimationContextType>(null!);

type ScrollAnimationProps = {
  config?: ScrollAnimationOptions;
  children: ReactNode;
};
function ScrollAnimation({ config, children }: ScrollAnimationProps) {
  let slidesProgress = useContext(WheelContext).slidesProgress;
  if (config instanceof ScrollTriggered) {
    slidesProgress = animateToIntegers(
      slidesProgress,
      0,
      config.framerTransition
    );
  } else if (config && config.isSpring) {
    slidesProgress = useSpring(slidesProgress, config.springConfig);
  }

  return (
    <ScrollAnimationContext.Provider
      value={{
        config: config,
        slidesProgress: slidesProgress,
      }}
    >
      {children}
    </ScrollAnimationContext.Provider>
  );
}

//------------------------------ SLIDE-SHOW

type SlideShowContextType = {
  animationConfig: ScrollAnimationOptions;
  transitions: Transition[];
  isZIndexNegative: boolean;
  isDisabledWhileTransition: boolean;
  width: string;
  height: string;
};
const SlideShowContext = createContext<SlideShowContextType>(null!);
const SlideIndexContext = createContext<number>(null!);

type SlideShowProps = {
  animationConfig?: ScrollAnimationOptions;
  transitions: Transition[];
  isZIndexNegative?: boolean;
  isDisabledWhileTransition?: boolean;
  width?: string;
  height?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

function SlideShow({
  animationConfig = new ScrollTriggered(),
  transitions,
  isZIndexNegative = false,
  isDisabledWhileTransition = true,
  width,
  height = '100vh',
  className,
  style,
  children,
}: SlideShowProps) {
  const wheelContext = useContext(WheelContext);
  if (width === undefined) {
    width = wheelContext.width;
  }
  const slidesCount = wheelContext.slidesCount;

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        ...style,
        ...allWidth(width),
        ...allHeight(height),
        overflow: 'hidden',
      }}
    >
      <ScrollAnimation config={animationConfig}>
        {[
          isDisabledWhileTransition && (
            <ContextUser<ScrollAnimationContextType>
              context={ScrollAnimationContext}
            >
              {(value: ScrollAnimationContextType) => {
                return (
                  <motion.div
                    style={{
                      ...ABSOLUTE,
                      display: isDisabledWhileTransition
                        ? useTransform(value.slidesProgress, (v) =>
                            Number.isInteger(v) ? 'none' : 'block'
                          )
                        : undefined,
                      ...allWidth(width),
                      ...allHeight(height),
                      zIndex: slidesCount,
                    }}
                  />
                );
              }}
            </ContextUser>
          ),
          <SlideShowContext.Provider
            value={{
              animationConfig: animationConfig,
              transitions: transitions,
              isZIndexNegative: isZIndexNegative,
              isDisabledWhileTransition: isDisabledWhileTransition,
              width: width,
              height: height,
            }}
          >
            {React.Children.toArray(children)
              .slice(0, slidesCount)
              .map((v, i) => {
                return (
                  <SlideIndexContext.Provider value={i}>
                    {v}
                  </SlideIndexContext.Provider>
                );
              })}
          </SlideShowContext.Provider>,
        ]}
      </ScrollAnimation>
    </div>
  );
}

//------------------------------ SLIDE

type SlideProps = {
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

function Slide({ className, style, children }: SlideProps) {
  const slideShowContext = useContext(SlideShowContext);
  const transitions = slideShowContext.transitions;
  const index = useContext(SlideIndexContext);
  const slideProgress = useTransform(
    useContext(ScrollAnimationContext).slidesProgress,
    [index - 1, index, index + 1],
    [-1, 0, 1]
  );
  const enter = index !== 0 ? transitions[index - 1][0] : [];
  const exit =
    index < useContext(WheelContext).slidesCount - 1
      ? transitions[index][1]
      : [];
  const styleTest = PropTransition.getStyle(slideProgress, enter, exit);

  return (
    <motion.div
      className={className}
      style={{
        ...style,
        ...ABSOLUTE,
        display: useTransform(slideProgress, (v) =>
          v === -1 || v === 1 ? 'none' : 'block'
        ),
        ...allWidth(slideShowContext.width),
        ...allHeight(slideShowContext.height),
        ...styleTest,
        overflow: 'hidden',
        zIndex: slideShowContext.isZIndexNegative ? -index : index,
      }}
    >
      {children}
    </motion.div>
  );
}

//------------------------------ EXPORT

export default Wheel;
export type {
  WheelContextType,
  ScrollAnimationOptions,
  ScrollAnimationContextType,
  SlideShowContextType,
};
export {
  WheelContext,
  ScrollAnimationContext,
  ScrollTriggered,
  ScrollLinked,
  SlideShowContext,
  SlideIndexContext,
};
