'use client';

import React, { ReactNode, useContext } from 'react';
import { ScrollAnimation, ScrollTriggered } from './types';
import { PresentationContext } from './Presentation';
import Slides from './Slides';
import Slide from './Slide';
import { zoomIn } from './transition';

type Props = {
  scrollAnimation?: ScrollAnimation;
  children: ReactNode;
};

function ZoomInSlides({
  scrollAnimation = new ScrollTriggered(),
  children,
}: Props) {
  return (
    <Slides>
      {React.Children.toArray(children)
        .slice(0, useContext(PresentationContext).props.slidesCount)
        .map((v) => (
          <Slide scrollAnimation={scrollAnimation} transitions={zoomIn}>
            {v}
          </Slide>
        ))}
    </Slides>
  );
}
export default ZoomInSlides;
