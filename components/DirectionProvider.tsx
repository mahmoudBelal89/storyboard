'use client';

import { ReactNode, createContext } from 'react';
import { Direction } from './types';

export const DirectionContext = createContext<Direction | null>(null);

type Props = {
  direction: Direction;
  children: ReactNode;
};

function DirectionProvider({ direction, children }: Props) {
  return (
    <DirectionContext.Provider value={direction}>
      {children}
    </DirectionContext.Provider>
  );
}
export default DirectionProvider;
