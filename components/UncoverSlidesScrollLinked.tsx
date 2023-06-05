'use client';

import React, { ReactNode, useContext } from 'react';
import { Direction } from './types';
import DirectionProvider from './DirectionProvider';
import { PresentationContext } from './Presentation';
import Slides from './Slides';
import Slide from './Slide';
import { translateOut } from './slide-transition';

type Props = {
  direction?: Direction;
  children: ReactNode;
};

function UncoverSlidesScrollLinked({ direction = 'left', children }: Props) {
  return (
    <DirectionProvider direction={direction}>
      <Slides isZIndexNegative={true}>
        {React.Children.toArray(children)
          .slice(0, useContext(PresentationContext).props.slidesCount)
          .map((v) => (
            <Slide slideTransitions={[translateOut()]}>{v}</Slide>
          ))}
      </Slides>
    </DirectionProvider>
  );
}
export default UncoverSlidesScrollLinked;
