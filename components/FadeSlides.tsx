'use client';

import React, { ReactNode, useContext } from 'react';
import { ScrollAnimation, ScrollTriggered, FadeOptions } from './types';
import { FadeConfigContext } from './FadeConfigProvider';
import { WheelContext } from './Wheel';
import Slides from './Slides';
import Slide from './Slide';
import { fade } from './transition';

type Props = {
  scrollAnimation?: ScrollAnimation;
  fadeConfig?: FadeOptions;
  isHiddenWhileNoProgress?: boolean;
  width?: string;
  height?: string;
  className?: string;
  children: ReactNode;
};

function FadeSlides({
  scrollAnimation = new ScrollTriggered(),
  fadeConfig,
  isHiddenWhileNoProgress,
  width,
  height,
  className,
  children,
}: Props) {
  if (!fadeConfig) {
    fadeConfig = useContext(FadeConfigContext) ?? 'smoothly';
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
            transitions={[fade(fadeConfig)]}
          >
            {v}
          </Slide>
        ))}
    </Slides>
  );
}
export default FadeSlides;
