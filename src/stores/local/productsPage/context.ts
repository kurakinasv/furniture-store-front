import { createLocalStoreContext } from '../createLocalStoreContext';
import ProductsPageStore from './ProductsPageStore';

const { useStore: useProductsPageStore, Provider: ProductsPageStoreProvider } =
  createLocalStoreContext(ProductsPageStore);

export { useProductsPageStore, ProductsPageStoreProvider };
