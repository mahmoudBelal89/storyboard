'use client';

import { ReactNode, useContext } from 'react';
import { WheelContext, WheelContextType } from './Wheel';

type Props = {
  children: (context: WheelContextType) => ReactNode;
};

function Piece({ children }: Props) {
  return children(useContext(WheelContext));
}
export default Piece;
