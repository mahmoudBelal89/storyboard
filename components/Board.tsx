'use client';

import { ReactNode, useContext } from 'react';
import { add } from './helper/string-helper';
import { PresentationContext, PresentationContextType } from './Presentation';

type Props = {
  width?: string;
  height?: string;
  className?: string;
  children: (context: PresentationContextType) => ReactNode;
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
      {children(useContext(PresentationContext))}
    </div>
  );
}
export default Board;
