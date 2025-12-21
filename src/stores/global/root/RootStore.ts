import { makeAutoObservable } from 'mobx';
import { FavouritesStore } from '../favourites';

class RootStore {
  isAuthenticated = false;
  favouritesStore: FavouritesStore;

  constructor() {
    this.favouritesStore = new FavouritesStore();
    makeAutoObservable(this);
  }

  setIsAuthenticated = (isAuthenticated: boolean) => {
    this.isAuthenticated = isAuthenticated;
  };
}

const rootStore = new RootStore();

export { rootStore, RootStore };
