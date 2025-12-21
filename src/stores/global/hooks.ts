import { useContext } from 'react';
import { RootStore, RootStoreContext } from 'stores/global/root';
import type { FavouritesStore } from './favourites';

export const useRootStore = (): RootStore => {
  const context = useContext(RootStoreContext);

  if (!context) {
    throw new Error('useRootStore must be used within a RootStoreProvider');
  }

  return context;
};

export const useFavouritesStore = (): FavouritesStore => {
  return useRootStore().favouritesStore;
};
