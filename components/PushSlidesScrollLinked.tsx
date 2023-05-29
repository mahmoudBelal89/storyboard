'use client';

import React, { ReactNode, useContext } from 'react';
import { Direction } from './types';
import DirectionProvider from './DirectionProvider';
import { PresentationContext } from './Presentation';
import SoloSlidesScrollLinked from './SoloSlidesScrollLinked';
import SlideScrollLinked from './SlideScrollLinked';
import { translateInOut } from './slide-transition';

type Props = {
  direction?: Direction;
  children: ReactNode;
};

function PushSlidesScrollLinked({ direction = 'left', children }: Props) {
  return (
    <DirectionProvider direction={direction}>
      <SoloSlidesScrollLinked>
        {React.Children.toArray(children)
          .slice(0, useContext(PresentationContext).props.slidesCount)
          .map((v) => (
            <SlideScrollLinked slideTransitions={[translateInOut()]}>
              {v}
            </SlideScrollLinked>
          ))}
      </SoloSlidesScrollLinked>
    </DirectionProvider>
  );
}
export default PushSlidesScrollLinked;
