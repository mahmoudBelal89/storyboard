'use client';

import React, { ReactNode, useContext } from 'react';
import { FadeOptions } from './types';
import { PresentationContext } from './Presentation';
import Slides from './Slides';
import Slide from './Slide';
import { opacityInOut } from './slide-transition';
import FadeConfigProvider from './FadeConfigProvider';

type Props = {
  fadeConfig?: FadeOptions;
  children: ReactNode;
};

function FadeSlidesScrollLinked({ fadeConfig = 'smoothly', children }: Props) {
  return (
    <FadeConfigProvider fadeConfig={fadeConfig}>
      <Slides>
        {React.Children.toArray(children)
          .slice(0, useContext(PresentationContext).props.slidesCount)
          .map((v) => (
            <Slide slideTransitions={[opacityInOut()]}>{v}</Slide>
          ))}
      </Slides>
    </FadeConfigProvider>
  );
}
export default FadeSlidesScrollLinked;
