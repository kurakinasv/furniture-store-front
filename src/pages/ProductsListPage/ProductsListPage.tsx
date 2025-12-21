import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { PageWrapper } from 'components/layout';
import { Typography } from 'components/common';
import { useLocalStore } from 'stores/local/hooks';
import { ProductsPageStore, ProductsPageStoreProvider } from 'stores/local/productsPage';

import { CardsList } from './CardsList';

import s from './ProductsListPage.module.scss';

const ProductsListPage: React.FC = () => {
  const productsPageStore = useLocalStore(() => new ProductsPageStore());

  React.useEffect(() => {
    productsPageStore?.fetchProducts();
  }, [productsPageStore]);

  return (
    <ProductsPageStoreProvider store={productsPageStore}>
      <PageWrapper>
        <header className={s.header}>
          <Typography tag="h1" variant="heading" className={s.title}>
            Каталог мебели
          </Typography>
          <Typography variant="text-base" color="gray">
            Найдено товаров: {productsPageStore?.products.length}
          </Typography>
        </header>
        <CardsList products={productsPageStore?.products ?? []} />
      </PageWrapper>
    </ProductsPageStoreProvider>
  );
};

export default observer(ProductsListPage);
