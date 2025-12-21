import type { ILocalStorageModel } from './types';

class LocalStorageModel<T> implements ILocalStorageModel<T> {
  private readonly key: string;

  constructor(key: string) {
    this.key = key;
  }

  get = (): T | null => {
    try {
      const item = localStorage.getItem(this.key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error(`Error reading from localStorage key "${this.key}":`, error);
      return null;
    }
  };

  set = (value: T): void => {
    try {
      localStorage.setItem(this.key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing to localStorage key "${this.key}":`, error);
    }
  };

  remove = (): void => {
    try {
      localStorage.removeItem(this.key);
    } catch (error) {
      console.error(`Error removing localStorage key "${this.key}":`, error);
    }
  };
}

export default LocalStorageModel;
