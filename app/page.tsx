'use client';

import Image from 'next/image';
import FighterImage from '../resources/images/fighter.jpg';
import HouseImage from '../resources/images/house.png';
import SpaceImage from '../resources/images/space.png';
import TreesImage from '../resources/images/trees.jpg';
import UmbrellaImage from '../resources/images/umbrella.jpg';

import Wheel, {
  SCROLL_LINKED,
  SCROLL_TRIGGERED,
  SMOOTH_SCROLL_LINKED,
  ScrollLinked,
  ScrollTriggered,
} from '@/components/Wheel';
import {
  COVER_DOWN,
  COVER_LEFT,
  COVER_UP,
  FADE_IN_SMOOTHLY,
  PUSH_RIGHT,
  ZOOM_IN,
  ZOOM_OUT,
} from '@/components/transitions';
import {
  easeIn,
  easeInOut,
  easeOut,
  motion,
  useTransform,
} from 'framer-motion';

export default function Home() {
  return (
    <main>
      <div className='w-screen h-[300vh] bg-blue-800'></div>
      <Wheel slidesCount={15}>
        <Wheel.ScrollAnimation config={SMOOTH_SCROLL_LINKED}>
          <Wheel.Parallax height='50vh' mainAxisLength={500}>
            <div className='bg-gradient-to-b from-green-100 to-fuchsia-100 via-yellow-950 min-w-[100vw] max-w-[100vw] min-h-[500vh] max-h-[500vh]' />
          </Wheel.Parallax>
        </Wheel.ScrollAnimation>
        <Wheel.ScrollAnimation config={{ framerTransition: { duration: 1 } }}>
          <Wheel.SlideShow
            style={{ position: 'absolute', top: '0', left: '0', zIndex: 5 }}
            transitions={[
              ZOOM_OUT,
              ZOOM_OUT,
              ZOOM_OUT,
              ZOOM_OUT,
              PUSH_RIGHT,
              COVER_DOWN,
              ZOOM_OUT,
              ZOOM_OUT,
              ZOOM_OUT,
              PUSH_RIGHT,
              COVER_DOWN,
              ZOOM_OUT,
              ZOOM_OUT,
              PUSH_RIGHT,
            ]}
            width='50vw'
            height='50vh'
          >
            <Wheel.Slide>
              <div className='bg-slate-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-red-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-cyan-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-green-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-slate-200 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-slate-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-red-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-cyan-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-green-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-slate-200 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-slate-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-red-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-cyan-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-green-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-slate-200 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
          </Wheel.SlideShow>
          <Wheel.SlideShow
            style={{
              position: 'absolute',
              top: '25vh',
              left: '25vw',
              zIndex: 6,
            }}
            transitions={[
              ZOOM_OUT,
              ZOOM_OUT,
              ZOOM_OUT,
              ZOOM_OUT,
              PUSH_RIGHT,
              COVER_DOWN,
              ZOOM_OUT,
              ZOOM_OUT,
              ZOOM_OUT,
              PUSH_RIGHT,
              COVER_DOWN,
              ZOOM_OUT,
              ZOOM_OUT,
              PUSH_RIGHT,
            ]}
            width='50vw'
            height='50vh'
          >
            <Wheel.Slide>
              <div className='bg-red-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-cyan-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-green-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-slate-200 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-slate-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-red-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-cyan-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-green-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-slate-200 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-slate-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-red-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-cyan-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-green-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-slate-200 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
            <Wheel.Slide>
              <div className='bg-slate-600 min-w-[50vw] max-w-[50vw] min-h-[50vh] max-h-[50vh]' />
            </Wheel.Slide>
          </Wheel.SlideShow>
        </Wheel.ScrollAnimation>
        <Wheel.ScrollAnimation config={{ framerTransition: { duration: 1 } }}>
          <Wheel.BackgroundColor
            style={{ position: 'absolute', top: 0, left: 0, zIndex: 2 }}
            colors={[
              '#fff',
              '#000',
              '#fff',
              '#000',
              '#fff',
              '#000',
              '#fff',
              '#000',
              '#fff',
              '#000',
              '#fff',
              '#000',
              '#fff',
              '#000',
              '#fff',
            ]}
          />
          <Wheel.Board
            style={{ position: 'absolute', top: '0', left: '0', zIndex: 20 }}
          >
            {(context) => (
              <motion.h1
                style={{
                  fontSize: useTransform(
                    context.scrollAnimationContext.slidesProgress,
                    (v) => v + 'cm'
                  ),
                }}
              >
                I Like You
              </motion.h1>
            )}
          </Wheel.Board>
        </Wheel.ScrollAnimation>
        <Wheel.ScrollAnimation config={SMOOTH_SCROLL_LINKED}>
          <Wheel.Piece>
            {(context) => (
              <motion.div
                className='bg-red-600 min-w-[10vw] max-w-[10vw] min-h-[10vh] max-h-[10vh]'
                style={{
                  position: 'absolute',
                  top: useTransform(
                    context.scrollAnimationContext.slidesProgress,
                    (v) => v * 20
                  ),
                  left: useTransform(
                    context.scrollAnimationContext.slidesProgress,
                    (v) => v * 20
                  ),
                  zIndex: 100,
                }}
              />
            )}
          </Wheel.Piece>
        </Wheel.ScrollAnimation>
      </Wheel>
      <div className='w-screen h-[300vh] bg-blue-800'></div>
    </main>
  );
}
