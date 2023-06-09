'use client';

import React, { ReactNode, useContext } from 'react';
import { ScrollAnimation, ScrollTriggered } from './types';
import { PresentationContext } from './Presentation';
import Slides from './Slides';
import Slide from './Slide';
import { zoomOut } from './transition';

type Props = {
  scrollAnimation?: ScrollAnimation;
  children: ReactNode;
};

function ZoomOutSlides({
  scrollAnimation = new ScrollTriggered(),
  children,
}: Props) {
  return (
    <Slides isZIndexNegative={true}>
      {React.Children.toArray(children)
        .slice(0, useContext(PresentationContext).props.slidesCount)
        .map((v) => (
          <Slide scrollAnimation={scrollAnimation} transitions={zoomOut}>
            {v}
          </Slide>
        ))}
    </Slides>
  );
}
export default ZoomOutSlides;
