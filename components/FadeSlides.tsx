'use client';

import React, { ReactNode, useContext } from 'react';
import { ScrollAnimation, ScrollTriggered, FadeOptions } from './types';
import { FadeConfigContext } from './FadeConfigProvider';
import { PresentationContext } from './Presentation';
import Slides from './Slides';
import Slide from './Slide';
import { fade } from './transition';

type Props = {
  scrollAnimation?: ScrollAnimation;
  fadeConfig?: FadeOptions;
  children: ReactNode;
};

function FadeSlides({
  scrollAnimation = new ScrollTriggered(),
  fadeConfig,
  children,
}: Props) {
  if (!fadeConfig) {
    fadeConfig = useContext(FadeConfigContext) ?? 'smoothly';
  }

  return (
    <Slides>
      {React.Children.toArray(children)
        .slice(0, useContext(PresentationContext).props.slidesCount)
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