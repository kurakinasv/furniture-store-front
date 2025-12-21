import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { Typography } from 'components/common';
import { PageWrapper } from 'components/layout';
import { CardsList } from 'pages/ProductsListPage/CardsList';
import { useFavouritesStore } from 'stores/global/hooks';

import s from './FavouritesPage.module.scss';

const FavouritesPage: React.FC = () => {
  const { favouriteProducts, fetchFavouriteProducts } = useFavouritesStore();

  React.useEffect(() => {
    fetchFavouriteProducts();
  }, []);

  return (
    <PageWrapper>
      <header className={s.header}>
        <Typography tag="h1" variant="heading">
          Избранное
        </Typography>
      </header>
      {favouriteProducts.length > 0 ? (
        <CardsList products={favouriteProducts} />
      ) : (
        <Typography variant="text-base" color="gray">
          Список пуст
        </Typography>
      )}
    </PageWrapper>
  );
};

export default observer(FavouritesPage);
