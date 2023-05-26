'use client';

import React, { ReactNode, useContext } from 'react';
import { FadeOptions } from './types';
import { SlidesScrollLinkedContext } from './SlidesScrollLinked';
import SoloSlidesScrollLinked from './SoloSlidesScrollLinked';
import SlideScrollLinked from './SlideScrollLinked';
import { opacityInOut } from './slide-transition';
import FadeConfigProvider from './FadeConfigProvider';

type Props = {
  fadeConfig?: FadeOptions;
  children: ReactNode;
};

function FadeSlidesScrollLinked({ fadeConfig = 'smoothly', children }: Props) {
  return (
    <FadeConfigProvider fadeConfig={fadeConfig}>
      <SoloSlidesScrollLinked>
        {React.Children.toArray(children)
          .slice(0, useContext(SlidesScrollLinkedContext).props.slidesCount)
          .map((v) => (
            <SlideScrollLinked slideTransitions={[opacityInOut()]}>
              {v}
            </SlideScrollLinked>
          ))}
      </SoloSlidesScrollLinked>
    </FadeConfigProvider>
  );
}
export default FadeSlidesScrollLinked;
