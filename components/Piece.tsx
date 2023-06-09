'use client';

import { ReactNode, useContext } from 'react';
import { PresentationContext, PresentationContextType } from './Presentation';

type Props = {
  children: (context: PresentationContextType) => ReactNode;
};

function Piece({ children }: Props) {
  return children(useContext(PresentationContext));
}
export default Piece;
