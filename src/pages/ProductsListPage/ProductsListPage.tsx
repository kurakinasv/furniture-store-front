import * as React from 'react';
import { observer } from 'mobx-react-lite';
import { PageWrapper } from 'components/layout';
import { Typography } from 'components/common';
//import { useLocalStore } from 'stores/local/hooks';
//import { ProductsPageStore, ProductsPageStoreProvider } from 'stores/local/productsPage';
import { CardsList } from './CardsList';
import { useProducts } from '../../hooks/useProducts.ts';
import s from './ProductsListPage.module.scss';

const ProductsListPage: React.FC = () => {
  //const productsPageStore = useLocalStore(() => new ProductsPageStore());
  /*
  React.useEffect(() => {
    productsPageStore?.fetchProducts();
  }, [productsPageStore]);*/
  const { products, loading, error } = useProducts();
  React.useEffect(() => {
    console.log('ProductsListPage state: ', { loading, error, productsCount: products.length });
  }, [loading, products, error]);
  /*
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
  );*/

  if (loading) {
    return (
      <PageWrapper>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
          }}
        >
          <Typography variant="text-base">Загружаем каталог...</Typography>
        </div>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '400px',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <Typography variant="text-base" color="black">
            Ошибка: {error}
          </Typography>
          <Typography variant="text-base" color="gray">
            Проверьте: 1) Запущен ли бэкенд? (localhost:8000) 2) Открыта ли документация?
            (localhost:8000/docs)
          </Typography>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <header className={s.header}>
        <Typography tag="h1" variant="heading" className={s.title}>
          Каталог мебели
        </Typography>
        <Typography variant="text-base" color="gray">
          Найдено товаров: {products.length}
        </Typography>
      </header>
      <CardsList products={products} />
    </PageWrapper>
  );
};

export default observer(ProductsListPage);
