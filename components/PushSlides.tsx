'use client';

import React, { ReactNode, useContext } from 'react';
import { Direction } from './types';
import { DirectionContext } from './DirectionProvider';
import { PresentationContext } from './Presentation';
import Slides from './Slides';
import Slide from './Slide';
import { translateInOut } from './transition';

type Props = {
  direction?: Direction;
  children: ReactNode;
};

function PushSlides({ direction, children }: Props) {
  if (!direction) {
    direction = useContext(DirectionContext) ?? 'left';
  }

  return (
    <Slides>
      {React.Children.toArray(children)
        .slice(0, useContext(PresentationContext).props.slidesCount)
        .map((v) => (
          <Slide transitions={[translateInOut(direction)]}>{v}</Slide>
        ))}
    </Slides>
  );
}
export default PushSlides;
