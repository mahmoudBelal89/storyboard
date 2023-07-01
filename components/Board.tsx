'use client';

import { ReactNode, useContext } from 'react';
import { add } from './helper/string-helper';
import { WheelContext, WheelContextType } from './Wheel';

type Props = {
  width?: string;
  height?: string;
  className?: string;
  children: (context: WheelContextType) => ReactNode;
};

function Board({ width, height = '100vh', className, children }: Props) {
  return (
    <div
      className={add('overflow-hidden', className)}
      style={{
        minWidth: width,
        maxWidth: width,
        minHeight: height,
        maxHeight: height,
      }}
    >
      {children(useContext(WheelContext))}
    </div>
  );
}
export default Board;
