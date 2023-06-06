'use client';

import { motion, useTransform } from 'framer-motion';
import Push from '@/components/old/Push';

import Image from 'next/image';
import FighterImage from '../resources/images/fighter.jpg';
import HouseImage from '../resources/images/house.png';
import SpaceImage from '../resources/images/space.png';
import TreesImage from '../resources/images/trees.jpg';
import UmbrellaImage from '../resources/images/umbrella.jpg';

import Presentation from '@/components/Presentation';
import Slides from '@/components/Slides';
import DirectionProvider from '@/components/DirectionProvider';
import Slide from '@/components/Slide';
import {
  opacityInOut,
  translateIn,
  translateInOut,
  translateOut,
} from '@/components/transition';
import FadeConfigProvider from '@/components/FadeConfigProvider';
import CoverSlides from '@/components/CoverSlides';
import Parallax from '@/components/Parallax';
import PushSlides from '@/components/PushSlides';

export default function Home() {
  return (
    <main>
      <div className='w-screen h-[300vh] bg-blue-800'></div>
      <Presentation slidesCount={5}>
        <CoverSlides scrollAnimationType='scrollLinked'>
          <Image
            src={FighterImage}
            alt='fighter'
            className='viewport object-cover'
          />
          <Image
            src={HouseImage}
            alt='house'
            className='viewport object-cover'
          />
          <Image
            src={SpaceImage}
            alt='space'
            className='viewport object-cover'
          />
          <Image
            src={TreesImage}
            alt='trees'
            className='viewport object-cover'
          />
          <Image
            src={UmbrellaImage}
            alt='umbrella'
            className='viewport object-cover'
          />
        </CoverSlides>
      </Presentation>
      <div className='w-screen h-[300vh] bg-blue-800'></div>
      <Presentation slidesCount={5}>
        <Parallax length={350}>
          <div className='min-w-[100vw] max-w-[100vw] min-h-[100vh] max-h-[100vh] bg-red-400 border-8 opacity-0'></div>
          <div className='min-w-[100vw] max-w-[100vw] min-h-[50vh] max-h-[50vh] bg-red-400 border-8 opacity-50' />
          <div className='min-w-[100vw] max-w-[100vw] min-h-[50vh] max-h-[50vh] bg-red-600 border-8 opacity-50' />
          <div className='min-w-[100vw] max-w-[100vw] min-h-[50vh] max-h-[50vh] bg-yellow-800 border-8 opacity-50' />
          <div className='min-w-[100vw] max-w-[100vw] min-h-[100vh] max-h-[100vh] bg-red-400 border-8 opacity-0'></div>
        </Parallax>
      </Presentation>
      <div className='w-screen h-[300vh] bg-blue-800'></div>
      <Presentation slidesCount={5}>
        <DirectionProvider direction='left'>
          <FadeConfigProvider fadeConfig='smoothly'>
            <Slides>
              <Slide transitions={[translateInOut(), opacityInOut()]}>
                <Image
                  src={FighterImage}
                  alt='fighter'
                  className='viewport object-cover'
                />
              </Slide>
              <Slide transitions={[translateInOut(), opacityInOut()]}>
                <Image
                  src={HouseImage}
                  alt='house'
                  className='viewport object-cover'
                />
              </Slide>
              <Slide transitions={[translateInOut(), opacityInOut()]}>
                <Image
                  src={SpaceImage}
                  alt='space'
                  className='viewport object-cover'
                />
              </Slide>
              <Slide transitions={[translateInOut(), opacityInOut()]}>
                <Image
                  src={TreesImage}
                  alt='trees'
                  className='viewport object-cover'
                />
              </Slide>
              <Slide transitions={[translateInOut(), opacityInOut()]}>
                <Image
                  src={UmbrellaImage}
                  alt='umbrella'
                  className='viewport object-cover'
                />
              </Slide>
            </Slides>
          </FadeConfigProvider>
        </DirectionProvider>
      </Presentation>
      <div className='w-screen h-[300vh] bg-blue-800'></div>
      <Presentation slidesCount={5}>
        <CoverSlides direction='up'>
          <Image
            src={FighterImage}
            alt='fighter'
            className='viewport object-cover'
          />
          <Image
            src={HouseImage}
            alt='house'
            className='viewport object-cover'
          />
          <Image
            src={SpaceImage}
            alt='space'
            className='viewport object-cover'
          />
          <Image
            src={TreesImage}
            alt='trees'
            className='viewport object-cover'
          />
          <Image
            src={UmbrellaImage}
            alt='umbrella'
            className='viewport object-cover'
          />
        </CoverSlides>
      </Presentation>
      <div className='w-screen h-[300vh] bg-blue-800'></div>
      {/*       <PushSlow direction='right'>
        <Image
          src={FighterImage}
          alt='fighter'
          className='viewport object-cover'
        />
        <Image src={HouseImage} alt='house' className='viewport object-cover' />
        <Image src={SpaceImage} alt='space' className='viewport object-cover' />
        <Image src={TreesImage} alt='trees' className='viewport object-cover' />
        <Image
          src={UmbrellaImage}
          alt='umbrella'
          className='viewport object-cover'
        />

        <div className=' viewport'>
          <div className='m-4 bg-red-900 border rounded-2xl w-96 h-96'>
            <button
              className='m-4 w-52 border rounded-2xl bg-slate-400'
              onClick={() => console.log('first')}
            >
              the first guy
            </button>
          </div>
        </div>
        <div className='viewport'>
          <div className='mt-20 mx-8 bg-blue-900 border rounded-2xl w-96 h-96'>
            <button
              className='m-4 w-52 border rounded-2xl bg-slate-400'
              onClick={() => console.log('second')}
            >
              the second guy
            </button>
          </div>
        </div>
        <div className='viewport bg-yellow-900 border-8'>
          <button
            className='w-52 bg-blue-400'
            onClick={() => console.log('third')}
          >
            the third guy
          </button>
        </div>
        <div className='viewport bg-green-900 border-8'>
          <button
            className='w-52 bg-red-400'
            onClick={() => console.log('fourth')}
          >
            the fourth guy
          </button>
        </div>
        <div className='viewport bg-pink-900 border-8'>
          <button
            className='w-52 bg-blue-400'
            onClick={() => console.log('fifth')}
          >
            the fifth guy
          </button>
        </div>
      </PushSlow> */}
      <div className='w-screen h-[300vh] bg-blue-800'></div>
      <Push backgroundColor='white' scenesCount={5}>
        <Image
          src={FighterImage}
          alt='fighter'
          className='viewport object-cover'
        />
        <Image src={HouseImage} alt='house' className='viewport object-cover' />
        <Image src={SpaceImage} alt='space' className='viewport object-cover' />
        <Image src={TreesImage} alt='trees' className='viewport object-cover' />
        <Image
          src={UmbrellaImage}
          alt='umbrella'
          className='viewport object-cover'
        />
      </Push>
      <div className='w-screen h-[300vh] bg-blue-800'></div>
      <Push direction='left' backgroundColor='green' scenesCount={7}>
        <div className={`viewport bg-red-400 border-8`} />
        <div className={`viewport bg-red-600 border-8`} />
        <div className={`viewport bg-yellow-800 border-8`} />
        <div className={`viewport bg-green-400 border-8`} />
        <div className={`viewport bg-orange-600 border-8`} />
        <div className={`viewport bg-purple-800 border-8`} />
        <div className={`viewport bg-black border-8`} />
      </Push>
      <div className='w-screen h-[300vh] bg-blue-800'></div>
    </main>
  );
}
