import { makeAutoObservable } from 'mobx';

class RootStore {
  isAuthenticated = false;

  constructor() {
    makeAutoObservable(this);
  }

  setIsAuthenticated = (isAuthenticated: boolean) => {
    this.isAuthenticated = isAuthenticated;
  };
}

const rootStore = new RootStore();

export { rootStore, RootStore };
