'use client';

import { ReactNode, useContext } from 'react';
import { PresentationContext, PresentationContextType } from './Presentation';

type Props = {
  children: (context: PresentationContextType) => ReactNode;
};

function Board({ children }: Props) {
  return (
    <div className='absolute viewport'>
      {children(useContext(PresentationContext))}
    </div>
  );
}
export default Board;
