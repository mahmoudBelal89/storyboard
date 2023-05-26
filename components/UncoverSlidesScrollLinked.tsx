'use client';

import React, { ReactNode, useContext } from 'react';
import { Direction } from './types';
import DirectionProvider from './DirectionProvider';
import { SlidesScrollLinkedContext } from './SlidesScrollLinked';
import SoloSlidesScrollLinked from './SoloSlidesScrollLinked';
import SlideScrollLinked from './SlideScrollLinked';
import { translateOut } from './slide-transition';

type Props = {
  direction?: Direction;
  children: ReactNode;
};

function UncoverSlidesScrollLinked({ direction = 'left', children }: Props) {
  return (
    <DirectionProvider direction={direction}>
      <SoloSlidesScrollLinked isZIndexNegative={true}>
        {React.Children.toArray(children)
          .slice(0, useContext(SlidesScrollLinkedContext).props.slidesCount)
          .map((v) => (
            <SlideScrollLinked slideTransitions={[translateOut()]}>
              {v}
            </SlideScrollLinked>
          ))}
      </SoloSlidesScrollLinked>
    </DirectionProvider>
  );
}
export default UncoverSlidesScrollLinked;
