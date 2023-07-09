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
  FADE_SMOOTHLY,
  PUSH_RIGHT,
} from '@/components/transitions';

export default function Home() {
  return (
    <main>
      <div className='w-screen h-[300vh] bg-blue-800'></div>
      <Wheel slidesCount={5}>
        <Wheel.SlideShow
          animationConfig={new ScrollTriggered({ duration: 5 })}
          transitions={[COVER_DOWN, COVER_DOWN, COVER_DOWN, COVER_DOWN]}
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
