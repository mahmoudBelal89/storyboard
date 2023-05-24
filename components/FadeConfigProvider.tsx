'use client';

import { ReactNode, createContext } from 'react';
import { FadeOptions } from './types';

export const FadeConfigContext = createContext<FadeOptions | null>(null);

type Props = {
  fadeConfig: FadeOptions;
  children: ReactNode;
};

function FadeConfigProvider({ fadeConfig, children }: Props) {
  return (
    <FadeConfigContext.Provider value={fadeConfig}>
      {children}
    </FadeConfigContext.Provider>
  );
}
export default FadeConfigProvider;
