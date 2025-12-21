import { makeAutoObservable } from 'mobx';
import type { Product, ProductServer } from './types';

class ProductModel implements Product {
  id: number;
  title: string;
  description: string;
  price: string;
  imageUrl: string;
  imagePlaceholder: string;

  constructor(product: Product) {
    this.id = product.id;
    this.title = product.title;
    this.description = product.description;
    this.price = product.price;
    this.imageUrl = product.imageUrl;
    this.imagePlaceholder = product.imagePlaceholder;

    makeAutoObservable(this);
  }

  static normalize = (product: ProductServer): Product => {
    return {
      id: product.id,
      title: product.title,
      description: product.description,
      price: product.price,
      imageUrl: product.imageUrl,
      imagePlaceholder: product.imagePlaceholder,
    };
  };
}

export default ProductModel;
