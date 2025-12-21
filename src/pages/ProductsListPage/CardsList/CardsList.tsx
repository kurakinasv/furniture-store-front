import * as React from 'react';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';

import { Card } from 'components/common';
import { routes, RoutesEnum } from 'config/routes';
import { useProductsPageStore } from 'stores/local/productsPage';
import { useFavouritesStore } from 'stores/global/hooks';

import s from './CardsList.module.scss';

const CardsList: React.FC = () => {
  const navigate = useNavigate();

  const { products } = useProductsPageStore();
  const { toggleFavourite, isFavourite } = useFavouritesStore();

  const handleCardClick = (productId: number) => {
    navigate(routes[RoutesEnum.PRODUCT].id(String(productId)));
  };

  const onToggleFavorite = (productId: number) => () => {
    toggleFavourite(productId);
  };

  const handleAddToCart = (productId: number, title: string) => {
    console.log(`Added to cart: ${title} (ID: ${productId})`);
  };

  return (
    <div className={s.grid}>
      {products.map((product) => (
        <Card
          key={product.id}
          title={product.title}
          price={product.price}
          imageUrl={product.imageUrl}
          imagePlaceholder={product.imagePlaceholder}
          isFavorite={isFavourite(product.id)}
          onFavoriteClick={onToggleFavorite(product.id)}
          onAddToCart={() => handleAddToCart(product.id, product.title)}
          onClick={() => handleCardClick(product.id)}
        />
      ))}
    </div>
  );
};

export default observer(CardsList);
