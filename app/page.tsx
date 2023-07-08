'use client';

import Image from 'next/image';
import FighterImage from '../resources/images/fighter.jpg';
import HouseImage from '../resources/images/house.png';
import SpaceImage from '../resources/images/space.png';
import TreesImage from '../resources/images/trees.jpg';
import UmbrellaImage from '../resources/images/umbrella.jpg';

import Wheel, { ScrollLinked, ScrollTriggered } from '@/components/Wheel';
import {
  COVER_DOWN,
  COVER_LEFT,
  FADE_SMOOTHLY,
  FADE_THROUGH_COLOR,
  PUSH_LEFT,
  PUSH_RIGHT,
  PUSH_UP,
  UNCOVER_DOWN,
  ZOOM_IN,
  ZOOM_OUT,
  scaleIn,
} from '@/components/transitions';

export default function Home() {
  return (
    <main>
      <div className='w-screen h-[300vh] bg-blue-800'></div>
      <Wheel slidesCount={5}>
        <Wheel.SlideShow
          animationConfig={new ScrollTriggered({ duration: 2 })}
          transitions={[COVER_DOWN, FADE_SMOOTHLY, FADE_SMOOTHLY, PUSH_RIGHT]}
          width='50vw'
          height='50vh'
        >
          <Wheel.Slide>
            <Image
              src={FighterImage}
              alt='fighter'
              className='min-w-[50vw] min-h-[50vh] object-cover'
            />
          </Wheel.Slide>
          <Wheel.Slide>
            <Image
              src={HouseImage}
              alt='house'
              className='min-w-[50vw] min-h-[50vh] object-cover'
            />
          </Wheel.Slide>
          <Wheel.Slide>
            <Image
              src={SpaceImage}
              alt='space'
              className='min-w-[50vw] min-h-[50vh] object-cover'
            />
          </Wheel.Slide>
          <Wheel.Slide>
            <Image
              src={TreesImage}
              alt='trees'
              className='min-w-[50vw] min-h-[50vh] object-cover'
            />
          </Wheel.Slide>
          <Wheel.Slide>
            <Image
              src={UmbrellaImage}
              alt='umbrella'
              className='min-w-[50vw] min-h-[50vh] object-cover'
            />
          </Wheel.Slide>
        </Wheel.SlideShow>
      </Wheel>
      <div className='w-screen h-[300vh] bg-blue-800'></div>
    </main>
  );
}
