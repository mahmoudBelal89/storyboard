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
import { animateToIntegers } from './helper/motion-value-helper';
import ContextUser from './ContextUser';
import { Transition, getStyle } from './transitions';

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
            slidesProgress: useTransform(
              scrollYProgress,
              inputRange,
              outputRange
            ),
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
Wheel.Board = Board;
Wheel.Piece = Piece;
Wheel.BackgroundColor = BackgroundColor;

//------------------------------ SCROLL-ANIMATION-OPTIONS

type ScrollAnimationOptions = ScrollTriggered | ScrollLinked;
type ScrollTriggered = {
  framerTransition?: ValueAnimationTransition<number>;
};
type ScrollLinked = {
  isSpring?: boolean; // = false
  springConfig?: SpringOptions;
};
const SCROLL_TRIGGERED: ScrollTriggered = {
  framerTransition: undefined,
};
const SCROLL_LINKED: ScrollLinked = {
  isSpring: false,
  springConfig: undefined,
};
const SMOOTH_SCROLL_LINKED: ScrollLinked = {
  isSpring: true,
  springConfig: { bounce: 0.1 },
};

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
  if (config) {
    if ('framerTransition' in config) {
      slidesProgress = animateToIntegers(
        slidesProgress,
        0,
        config.framerTransition
      );
    } else if ('isSpring' in config && config.isSpring) {
      slidesProgress = useSpring(slidesProgress, config.springConfig);
    }
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
  transitions: Transition[];
  isDisabledWhileTransition: boolean;
  width: string;
  height: string;
  zOrder: number[];
};
const SlideShowContext = createContext<SlideShowContextType>(null!);
const SlideIndexContext = createContext<number>(null!);

type SlideShowProps = {
  transitions: Transition[];
  isDisabledWhileTransition?: boolean;
  width?: string;
  height?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};
function SlideShow({
  transitions,
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
      {[
        isDisabledWhileTransition && (
          <motion.div
            style={{
              ...ABSOLUTE,
              display: isDisabledWhileTransition
                ? useTransform(
                    useContext(ScrollAnimationContext).slidesProgress,
                    (v) => (Number.isInteger(v) ? 'none' : 'block')
                  )
                : undefined,
              ...allWidth(width),
              ...allHeight(height),
              zIndex: slidesCount,
            }}
          />
        ),
        <SlideShowContext.Provider
          value={{
            transitions: transitions,
            isDisabledWhileTransition: isDisabledWhileTransition,
            width: width,
            height: height,
            zOrder: [false, ...transitions.map((v) => v.isZIndexNegative)].map(
              (v, i, a) => {
                let negAfter = 0;
                for (let _i = i + 1; _i < a.length; _i++) {
                  if (a[_i]) negAfter++;
                  else break;
                }
                if (!v) return i + negAfter;
                else {
                  let negBeforeAndSelf = 1;
                  for (let _i = i - 1; _i >= 0; _i--) {
                    if (a[_i]) negBeforeAndSelf++;
                    else break;
                  }
                  return i + negAfter - negBeforeAndSelf;
                }
              }
            ),
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
        ...getStyle(slideProgress, {
          enter: index !== 0 ? transitions[index - 1].enter : [],
          exit:
            index < useContext(WheelContext).slidesCount - 1
              ? transitions[index].exit
              : [],
        }),
        overflow: 'hidden',
        zIndex: slideShowContext.zOrder[index],
      }}
    >
      {children}
    </motion.div>
  );
}

//------------------------------ BOARD & PIECE

type BoardProps = {
  width?: string;
  height?: string;
  className?: string;
  style?: CSSProperties;
  children: (context: {
    wheelContext: WheelContextType;
    scrollAnimationContext: ScrollAnimationContextType;
  }) => ReactNode;
};
function Board({
  width,
  height = '100vh',
  className,
  style,
  children,
}: BoardProps) {
  const wheelContext = useContext(WheelContext);
  if (width === undefined) {
    width = wheelContext.width;
  }

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
      {children({
        wheelContext: wheelContext,
        scrollAnimationContext: useContext(ScrollAnimationContext),
      })}
    </div>
  );
}

type PieceProps = {
  children: (context: {
    wheelContext: WheelContextType;
    scrollAnimationContext: ScrollAnimationContextType;
  }) => ReactNode;
};
function Piece({ children }: PieceProps) {
  return (
    <>
      {children({
        wheelContext: useContext(WheelContext),
        scrollAnimationContext: useContext(ScrollAnimationContext),
      })}
    </>
  );
}

//------------------------------ BACKGROUND_COLOR

type BackgroundColorProps = {
  colors: string[];
  width?: string;
  height?: string;
  className?: string;
  style?: CSSProperties;
};
function BackgroundColor({
  colors,
  width,
  height = '100vh',
  className,
  style,
}: BackgroundColorProps) {
  const wheelContext = useContext(WheelContext);
  if (width === undefined) {
    width = wheelContext.width;
  }

  return (
    <motion.div
      className={className}
      style={{
        position: 'relative',
        ...style,
        ...allWidth(width),
        ...allHeight(height),
        background: useTransform(
          useContext(ScrollAnimationContext).slidesProgress,
          Array.from(Array(wheelContext.slidesCount).keys()),
          colors
        ),
      }}
    />
  );
}

//------------------------------ EXPORT

export default Wheel;
export type {
  WheelContextType,
  ScrollAnimationOptions,
  ScrollTriggered,
  ScrollLinked,
  ScrollAnimationContextType,
  SlideShowContextType,
};
export {
  WheelContext,
  ScrollAnimationContext,
  SCROLL_TRIGGERED,
  SCROLL_LINKED,
  SMOOTH_SCROLL_LINKED,
  SlideShowContext,
  SlideIndexContext,
};
