'use client';

import { ReactNode, useContext } from 'react';
import { PresentationContext, PresentationContextType } from './Presentation';

type Props = {
  width?: string;
  height?: string;
  className?: string;
  children: (context: PresentationContextType) => ReactNode;
};

function Board({
  width = '100%',
  height = '100%',
  className,
  children,
}: Props) {
  return (
    <div
      className={className}
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
