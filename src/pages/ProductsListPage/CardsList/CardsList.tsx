import * as React from 'react';
import { useNavigate } from 'react-router';
import { observer } from 'mobx-react-lite';

import { Card } from 'components/common';
import { routes, RoutesEnum } from 'config/routes';
import { useFavouritesStore } from 'stores/global/hooks';
import type { Product } from 'stores/models/product';

import s from './CardsList.module.scss';

type Props = {
  products: Product[];
};

const CardsList: React.FC<Props> = ({ products }) => {
  const navigate = useNavigate();

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
