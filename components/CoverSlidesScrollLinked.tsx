'use client';

import React, { ReactNode, useContext } from 'react';
import { Direction } from './types';
import DirectionProvider from './DirectionProvider';
import { SlidesScrollLinkedContext } from './SlidesScrollLinked';
import SoloSlidesScrollLinked from './SoloSlidesScrollLinked';
import SlideScrollLinked from './SlideScrollLinked';
import { moveIn } from './slide-transition';

type Props = {
  direction?: Direction;
  children: ReactNode;
};

function CoverSlidesScrollLinked({ direction = 'left', children }: Props) {
  return (
    <DirectionProvider direction={direction}>
      <SoloSlidesScrollLinked>
        {React.Children.toArray(children)
          .slice(0, useContext(SlidesScrollLinkedContext).props.slidesCount)
          .map((v) => (
            <SlideScrollLinked slideTransitions={[moveIn()]}>
              {v}
            </SlideScrollLinked>
          ))}
      </SoloSlidesScrollLinked>
      ;
    </DirectionProvider>
  );
}
export default CoverSlidesScrollLinked;
