'use client';

import React, { ReactNode, useContext } from 'react';
import { ScrollAnimation, ScrollTriggered } from './types';
import { WheelContext } from './Wheel';
import Slides from './Slides';
import Slide from './Slide';
import { zoomOut } from './transition';

type Props = {
  scrollAnimation?: ScrollAnimation;
  isHiddenWhileNoProgress?: boolean;
  width?: string;
  height?: string;
  className?: string;
  children: ReactNode;
};

function ZoomOutSlides({
  scrollAnimation = new ScrollTriggered(),
  isHiddenWhileNoProgress,
  width,
  height,
  className,
  children,
}: Props) {
  return (
    <Slides
      isZIndexNegative={true}
      isHiddenWhileNoProgress={isHiddenWhileNoProgress}
      width={width}
      height={height}
      className={className}
    >
      {React.Children.toArray(children)
        .slice(0, useContext(WheelContext).props.slidesCount)
        .map((v) => (
          <Slide scrollAnimation={scrollAnimation} transitions={zoomOut}>
            {v}
          </Slide>
        ))}
    </Slides>
  );
}
export default ZoomOutSlides;
