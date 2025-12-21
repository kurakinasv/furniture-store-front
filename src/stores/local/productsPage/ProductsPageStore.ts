import { MOCK_PRODUCTS } from 'config/mocks/products';
import { makeAutoObservable } from 'mobx';
import type { Product } from 'stores/models/product';
import type { ILocalStore } from 'stores/types';

class ProductsPageStore implements ILocalStore {
  private _products: Product[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  get products(): Product[] {
    return this._products;
  }

  fetchProducts = async (): Promise<void> => {
    // todo: прикрутить бэк
    this._products = MOCK_PRODUCTS;
  };

  destroy = (): void => {
    this._products = [];
  };
}

export default ProductsPageStore;
