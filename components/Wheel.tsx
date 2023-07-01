"use client";

import React, {
  ReactNode,
  CSSProperties,
  useRef,
  createContext,
  useContext,
} from "react";
import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { ScrollAnimation, ScrollTriggered, Direction } from "./types";
import { DirectionContext } from "./DirectionProvider";
import { translateIn } from "./transition";
import { reshape, slideProgress } from "./helper/motion-value-helper";

const ABSOLUTE: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
};
const WHEEL_STICKY: CSSProperties = {
  position: "sticky",
  left: 0,
  top: 0,
  minHeight: "100vh",
  maxHeight: "100vh",
  height: "100vh",
  overflow: "hidden",
};
function allWidth(width?: string): CSSProperties {
  return { minWidth: width, maxWidth: width, width: width };
}
function allHeight(height?: string): CSSProperties {
  return { minHeight: height, maxHeight: height, height: height };
}

export type WheelContextProps = {
  slidesCount: number;
  offset: any;
  transitionRatio: number;
  width: string;
  height: string;
};
export type WheelContextType = {
  props: WheelContextProps;
  scrollProgress: MotionValue<number>;
  wheelProgress: MotionValue<number>;
};
export const WheelContext = createContext<WheelContextType>(null!);

type WheelProps = {
  slidesCount?: number;
  offset?: any;
  transitionRatio?: number;
  width?: string;
  height?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

function Wheel({
  slidesCount = 2,
  offset = ["start", "end"],
  transitionRatio = 2,
  width = "100vw",
  height = slidesCount * 300 + "vh", // slidesCount * 100 + (slidesCount - 1) * 200 + 200 + "vh"
  className,
  style,
  children,
}: WheelProps) {
  const root = useRef(null);
  const { scrollYProgress } = useScroll({
    target: root,
    offset: offset,
  });
  let wheelProgress = scrollYProgress;
  if (slidesCount > 2) {
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
    wheelProgress = useTransform(scrollYProgress, inputRange, outputRange);
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
            props: {
              slidesCount: slidesCount,
              offset: offset,
              transitionRatio: transitionRatio,
              width: width,
              height: height,
            },
            scrollProgress: scrollYProgress,
            wheelProgress: wheelProgress,
          }}
        >
          {children}
        </WheelContext.Provider>
      </div>
    </div>
  );
}
Wheel.Slides = Slides;
Wheel.Slide = Slide;
Wheel.CoverSlides = CoverSlides;
export default Wheel;

export type SlidesContextProps = {
  isZIndexNegative: boolean;
  isDisabledWhileTransition: boolean;
  width: string;
  height: string;
};
export type SlidesContextType = {
  props: SlidesContextProps;
};
export const SlidesContext = createContext<SlidesContextType>(null!);

export const SlideIndexContext = createContext<number>(null!);

type SlidesProps = {
  isZIndexNegative?: boolean;
  isDisabledWhileTransition?: boolean;
  width?: string;
  height?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

function Slides({
  isZIndexNegative = false,
  isDisabledWhileTransition = true,
  width,
  height = "100vh",
  className,
  style,
  children,
}: SlidesProps) {
  const wheelContext = useContext(WheelContext);
  if (width === undefined) {
    width = wheelContext.props.width;
  }
  const slidesCount = wheelContext.props.slidesCount;
  const wheelProgress = wheelContext.wheelProgress;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        ...style,
        ...allWidth(width),
        ...allHeight(height),
        overflow: "hidden",
      }}
    >
      {[
        isDisabledWhileTransition && (
          <motion.div
            style={{
              ...ABSOLUTE,
              display: isDisabledWhileTransition
                ? useTransform(wheelProgress, (v) =>
                    Number.isInteger(v) ? "none" : "block"
                  )
                : undefined,
              ...allWidth(width),
              ...allHeight(height),
              zIndex: slidesCount,
            }}
          />
        ),
        <SlidesContext.Provider
          value={{
            props: {
              isZIndexNegative: isZIndexNegative,
              isDisabledWhileTransition: isDisabledWhileTransition,
              width: width,
              height: height,
            },
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
        </SlidesContext.Provider>,
      ]}
    </div>
  );
}

type SlideProps = {
  scrollAnimation?: ScrollAnimation;
  transitions: ((slideProgress: MotionValue<number>) => any)[];
  visibleRange?: number;
  children: ReactNode;
};

function Slide({
  scrollAnimation,
  transitions,
  visibleRange = 1,
  children,
}: SlideProps) {
  const wheelProgress = useContext(WheelContext).wheelProgress;
  const slidesContext = useContext(SlidesContext);
  const slideIndex = useContext(SlideIndexContext);
  let _slideProgress = slideProgress(wheelProgress, slideIndex);
  if (scrollAnimation) {
    _slideProgress = reshape(
      _slideProgress,
      scrollAnimation,
      slideIndex === 0 ? 0 : -1
    );
  }

  return (
    <motion.div
      style={{
        ...ABSOLUTE,
        display: useTransform(
          [wheelProgress, _slideProgress],
          ([v, slideV]: number[]) =>
            (v <= slideIndex - visibleRange && slideV === -1) ||
            (v >= slideIndex + visibleRange && slideV === 1)
              ? "none"
              : "block"
        ),
        ...allWidth(slidesContext.props.width),
        ...allHeight(slidesContext.props.height),
        ...transitions
          .map((v) => v(_slideProgress))
          .reduce((prev, v) => ({ ...prev, ...v })),
        overflow: "hidden",
        zIndex: slidesContext.props.isZIndexNegative ? -slideIndex : slideIndex,
      }}
    >
      {children}
    </motion.div>
  );
}

type CoverSlidesProps = {
  scrollAnimation?: ScrollAnimation;
  direction?: Direction;
  width?: string;
  height?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

function CoverSlides({
  scrollAnimation = new ScrollTriggered(),
  direction,
  width,
  height,
  className,
  style,
  children,
}: CoverSlidesProps) {
  if (!direction) {
    direction = useContext(DirectionContext) ?? "left";
  }

  return (
    <Slides width={width} height={height} className={className} style={style}>
      {React.Children.toArray(children)
        .slice(0, useContext(WheelContext).props.slidesCount)
        .map((v) => (
          <Slide
            scrollAnimation={scrollAnimation}
            transitions={[translateIn(direction)]}
            visibleRange={2}
          >
            {v}
          </Slide>
        ))}
    </Slides>
  );
}
