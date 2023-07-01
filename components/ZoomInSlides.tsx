'use client';

import React, { ReactNode, useContext } from 'react';
import { ScrollAnimation, ScrollTriggered } from './types';
import { WheelContext } from './Wheel';
import Slides from './Slides';
import Slide from './Slide';
import { zoomIn } from './transition';

type Props = {
  scrollAnimation?: ScrollAnimation;
  isHiddenWhileNoProgress?: boolean;
  width?: string;
  height?: string;
  className?: string;
  children: ReactNode;
};

function ZoomInSlides({
  scrollAnimation = new ScrollTriggered(),
  isHiddenWhileNoProgress,
  width,
  height,
  className,
  children,
}: Props) {
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
          <Slide scrollAnimation={scrollAnimation} transitions={zoomIn}>
            {v}
          </Slide>
        ))}
    </Slides>
  );
}
export default ZoomInSlides;
