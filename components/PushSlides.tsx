'use client';

import React, { ReactNode, useContext } from 'react';
import { ScrollAnimation, ScrollTriggered, Direction } from './types';
import { DirectionContext } from './DirectionProvider';
import { WheelContext } from './Wheel';
import Slides from './Slides';
import Slide from './Slide';
import { translateInOut } from './transition';

type Props = {
  scrollAnimation?: ScrollAnimation;
  direction?: Direction;
  isHiddenWhileNoProgress?: boolean;
  width?: string;
  height?: string;
  className?: string;
  children: ReactNode;
};

function PushSlides({
  scrollAnimation = new ScrollTriggered(),
  direction,
  isHiddenWhileNoProgress,
  width,
  height,
  className,
  children,
}: Props) {
  if (!direction) {
    direction = useContext(DirectionContext) ?? 'left';
  }

  return (
    <Slides
      isHiddenWhileNoProgress={isHiddenWhileNoProgress}
      width={width}
      height={height}
      className={className}
    >
      {React.Children.toArray(children)
        .slice(0, useContext(WheelContext).props.slidesCount)
        .map((v) => (
          <Slide
            scrollAnimation={scrollAnimation}
            transitions={[translateInOut(direction)]}
          >
            {v}
          </Slide>
        ))}
    </Slides>
  );
}
export default PushSlides;
