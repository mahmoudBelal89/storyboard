'use client';

import { motion, useTransform } from 'framer-motion';
import Push from '@/components/old/Push';

import Image from 'next/image';
import FighterImage from '../resources/images/fighter.jpg';
import HouseImage from '../resources/images/house.png';
import SpaceImage from '../resources/images/space.png';
import TreesImage from '../resources/images/trees.jpg';
import UmbrellaImage from '../resources/images/umbrella.jpg';

import Parallax from '@/components/parallax/Parallax';
import Father from '@/components/parallax/Father';
import Son from '@/components/parallax/Son';
import { Children } from 'react';
import PlaySlow from '@/components/context/PlaySlow';
import PushSlow from '@/components/context/PushSlow';
import CoverSlow from '@/components/context/CoverSlow';
import ActSlow from '@/components/context/ActSlow';

export default function Home() {
  return (
    <main>
      <div className='w-screen h-[300vh] bg-blue-800'></div>
      <PlaySlow scenesCount={5}>
        <ActSlow>
          <CoverSlow>
            <Image
              src={FighterImage}
              alt='fighter'
              className='viewport object-cover opacity-50'
            />
          </CoverSlow>
          <CoverSlow>
            <Image
              src={HouseImage}
              alt='house'
              className='viewport object-cover opacity-50'
            />
          </CoverSlow>
          <CoverSlow>
            <Image
              src={SpaceImage}
              alt='space'
              className='viewport object-cover opacity-50'
            />
          </CoverSlow>
          <CoverSlow>
            <Image
              src={TreesImage}
              alt='trees'
              className='viewport object-cover opacity-50'
            />
          </CoverSlow>
          <CoverSlow>
            <Image
              src={UmbrellaImage}
              alt='umbrella'
              className='viewport object-cover opacity-50'
            />
          </CoverSlow>
        </ActSlow>
      </PlaySlow>
      <div className='w-screen h-[300vh] bg-blue-800'></div>
      <Father
        scenesCount={3}
        children={[
          Son({
            direction: 'up',
            scenesCount: 3,
            children: [
              <div className='viewport bg-red-400 border-8'>one</div>,
              <div className='viewport bg-red-600 border-8'>two</div>,
              <div className='viewport bg-yellow-800 border-8'>three</div>,
            ],
          }),
          Son({
            direction: 'left',
            scenesCount: 3,
            children: [
              <div className='viewport bg-green-400 border-8'>four</div>,
              <div className='viewport bg-pink-600 border-8'>five</div>,
              <div className='viewport bg-green-800 border-8'>six</div>,
            ],
          }),
        ]}
      ></Father>
      <div className='w-screen h-[300vh] bg-blue-800'></div>
      <Parallax scenesCount={7}>
        {[
          {
            child: (
              <div className='w-40 h-[300vh] bg-red-400 overflow-clip'>
                <div className={`viewport bg-red-400 border-8`} />
                <div className={`viewport bg-red-600 border-8`} />
                <div className={`viewport bg-yellow-800 border-8`} />
              </div>
            ),
            height: 300,
          },
          {
            child: (
              <div className='absolute left-44 w-72 h-[700vh] bg-green-400'>
                <div className={`viewport bg-red-400 border-8`} />
                <div className={`viewport bg-red-600 border-8`} />
                <div className={`viewport bg-yellow-800 border-8`} />
                <div className={`viewport bg-green-400 border-8`} />
                <div className={`viewport bg-orange-600 border-8`} />
                <div className={`viewport bg-purple-800 border-8`} />
                <div className={`viewport bg-black border-8`} />
              </div>
            ),
            height: 700,
          },
        ]}
      </Parallax>
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
