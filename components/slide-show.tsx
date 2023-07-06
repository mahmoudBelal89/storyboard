//------------------------------ IMPORT

import React, { ReactNode, CSSProperties, useContext } from 'react';
import { MotionValue } from 'framer-motion';
import { Direction } from './types';
import { translateIn } from './transition';
import Wheel, {
  WheelContext,
  ScrollAnimationOptions,
  ScrollTriggered,
} from './Wheel';

//------------------------------ SLIDE-SHOW

type GenericSlideShowProps = {
  transitions: ((slideProgress: MotionValue<number>) => any)[];
  direction?: Direction;
  animationConfig?: ScrollAnimationOptions;
  width?: string;
  height?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

function Wheel_GenericSlideShow({
  transitions,
  animationConfig = new ScrollTriggered(),
  width,
  height,
  className,
  style,
  children,
}: GenericSlideShowProps) {
  return (
    <Wheel.SlideShow
      animationConfig={animationConfig}
      width={width}
      height={height}
      className={className}
      style={style}
    >
      {React.Children.toArray(children)
        .slice(0, useContext(WheelContext).slidesCount)
        .map((v) => (
          <Wheel.Slide transitions={transitions}>{v}</Wheel.Slide>
        ))}
    </Wheel.SlideShow>
  );
}

//------------------------------ COVER-SLIDE-SHOW

type CoverSlideShowProps = {
  direction?: Direction;
  animationConfig?: ScrollAnimationOptions;
  width?: string;
  height?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

function Wheel_CoverSlideShow({
  direction = 'left',
  animationConfig = new ScrollTriggered(),
  width,
  height,
  className,
  style,
  children,
}: CoverSlideShowProps) {
  return (
    <Wheel.SlideShow
      animationConfig={animationConfig}
      width={width}
      height={height}
      className={className}
      style={style}
    >
      {React.Children.toArray(children)
        .slice(0, useContext(WheelContext).slidesCount)
        .map((v) => (
          <Wheel.Slide transitions={[translateIn(direction)]}>{v}</Wheel.Slide>
        ))}
    </Wheel.SlideShow>
  );
}

//------------------------------ EXPORT

export { Wheel_CoverSlideShow };
