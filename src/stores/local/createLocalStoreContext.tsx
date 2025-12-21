import { createContext, useContext } from 'react';
import type { ILocalStore } from 'stores/types';

export const createLocalStoreContext = <T extends ILocalStore>(
  Constructor: new (...args: unknown[]) => T,
): {
  useStore: () => T;
  Provider: React.FC<React.PropsWithChildren<{ store: T | null }>>;
} => {
  const Context = createContext<T | null>(null);

  const Provider: React.FC<React.PropsWithChildren<{ store: T | null }>> = ({
    children,
    store,
  }) => {
    return <Context.Provider value={store}>{children}</Context.Provider>;
  };

  const useStore = () => {
    const localStore = useContext(Context);

    if (!localStore) {
      throw new Error(`${Constructor?.name} must be used within a Provider`);
    }

    return localStore;
  };

  return { useStore, Provider };
};
