import { makeAutoObservable } from 'mobx';

import { LocalStorageModel } from 'stores/models/localStorage';
import type { Product } from 'stores/models/product';
import { MOCK_PRODUCTS } from 'config/mocks/products';

import type { IFavouritesStore } from './types';

const STORAGE_KEY = 'favouriteProductIds';

class FavouritesStore implements IFavouritesStore {
  private _storage = new LocalStorageModel<number[]>(STORAGE_KEY);
  private _products: Product[] = [];

  favouriteIds: Set<number> = new Set();

  constructor() {
    this._loadFromStorage();

    makeAutoObservable(this);
  }

  get favouriteProducts(): Product[] {
    return this._products.filter((product) => this.favouriteIds.has(product.id));
  }

  isFavourite = (productId: number): boolean => {
    return this.favouriteIds.has(productId);
  };

  fetchFavouriteProducts = async (): Promise<void> => {
    // todo: прикрутить бэк получения избранного
    this._products = MOCK_PRODUCTS;
  };

  addFavourite = (productId: number): void => {
    if (!this.isFavourite(productId)) {
      this.favouriteIds.add(productId);
      this._saveToStorage();
    }
  };

  removeFavourite = (productId: number): void => {
    if (this.isFavourite(productId)) {
      this.favouriteIds.delete(productId);
      this._saveToStorage();
    }
  };

  toggleFavourite = (productId: number): void => {
    if (this.isFavourite(productId)) {
      this.removeFavourite(productId);
    } else {
      this.addFavourite(productId);
    }
  };

  clearFavourites = (): void => {
    this.favouriteIds.clear();
    this._storage.remove();
  };

  private _loadFromStorage = (): void => {
    const storedIds = this._storage.get();

    if (storedIds && Array.isArray(storedIds)) {
      this.favouriteIds = new Set(storedIds);
    }
  };

  private _saveToStorage = (): void => {
    this._storage.set(Array.from(this.favouriteIds));
  };
}

export default FavouritesStore;
