'use client';

import React, { ReactNode, useContext } from 'react';
import { Direction } from './types';
import DirectionProvider from './DirectionProvider';
import { PresentationContext } from './Presentation';
import Slides from './Slides';
import Slide from './Slide';
import { translateInOut } from './slide-transition';

type Props = {
  direction?: Direction;
  children: ReactNode;
};

function PushSlidesScrollLinked({ direction = 'left', children }: Props) {
  return (
    <DirectionProvider direction={direction}>
      <Slides>
        {React.Children.toArray(children)
          .slice(0, useContext(PresentationContext).props.slidesCount)
          .map((v) => (
            <Slide slideTransitions={[translateInOut()]}>{v}</Slide>
          ))}
      </Slides>
    </DirectionProvider>
  );
}
export default PushSlidesScrollLinked;
