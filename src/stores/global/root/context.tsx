import { createContext } from 'react';
import { rootStore, type RootStore } from './RootStore';

const RootStoreContext = createContext<RootStore | null>(null);

const RootStoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return <RootStoreContext.Provider value={rootStore}>{children}</RootStoreContext.Provider>;
};

export { RootStoreContext, RootStoreProvider };
