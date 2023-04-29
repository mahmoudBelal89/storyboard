'use client';

import StickyScrollTriggered from '@/components/StickyScrollTriggered';
import PushScrollLinked from '@/components/PushScrollLinked';
import StickyScrollLinked from '@/components/StickyScrollLinked';
import { motion, useTransform } from 'framer-motion';
import { _SCREEN_SIZE } from '@/components/constants';
import PushScrollTriggered from '@/components/PushScrollTriggered';

export default function Home() {
  return (
    <main>
      <div className='w-screen h-[300vh] bg-blue-800'></div>
      <StickyScrollTriggered sketchesCount={5}>
        {(scrollProgress, defaultProps) => {
          const scrollString = useTransform(
            scrollProgress,
            (v) => v * 10 + 'vh'
          );

          return (
            <div className={`${_SCREEN_SIZE} bg-red-400`}>
              <motion.p style={{ y: scrollString }}>xxxxx</motion.p>
            </div>
          );
        }}
      </StickyScrollTriggered>
      <div className='w-screen h-[300vh] bg-blue-800'></div>
      <PushScrollTriggered
        direction='down'
        backgroundColor='green'
        sketchesCount={7}
        transition={{ duration: 2 }}
      >
        <div className={`${_SCREEN_SIZE} bg-red-400`} />
        <div className={`${_SCREEN_SIZE} bg-red-600`} />
        <div className={`${_SCREEN_SIZE} bg-yellow-800`} />
        <div className={`${_SCREEN_SIZE} bg-green-400`} />
        <div className={`${_SCREEN_SIZE} bg-orange-600`} />
        <div className={`${_SCREEN_SIZE} bg-purple-800`} />
        <div className={`${_SCREEN_SIZE} bg-black`} />
      </PushScrollTriggered>
      <div className='w-screen h-[300vh] bg-blue-800'></div>
    </main>
  );
}
