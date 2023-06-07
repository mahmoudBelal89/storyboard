'use client';

import React, { ReactNode, useContext } from 'react';
import { ScrollAnimationType, FadeOptions } from './types';
import { FadeConfigContext } from './FadeConfigProvider';
import { PresentationContext } from './Presentation';
import Slides from './Slides';
import Slide from './Slide';
import { fade } from './transition';

type Props = {
  scrollAnimationType?: ScrollAnimationType;
  fadeConfig?: FadeOptions;
  children: ReactNode;
};

function FadeSlides({
  scrollAnimationType = 'scrollTriggered',
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
            scrollAnimationType={scrollAnimationType}
            transitions={[fade(fadeConfig)]}
          >
            {v}
          </Slide>
        ))}
    </Slides>
  );
}
export default FadeSlides;
