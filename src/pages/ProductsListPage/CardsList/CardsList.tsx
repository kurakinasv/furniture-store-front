import { Card } from 'components/common';
import { routes, RoutesEnum } from 'config/routes';
import * as React from 'react';
import { useNavigate } from 'react-router';
import { useProductsPageStore } from 'stores/local/productsPage';

import s from './CardsList.module.scss';
import { observer } from 'mobx-react-lite';

const CardsList: React.FC = () => {
  const navigate = useNavigate();
  const { products } = useProductsPageStore();

  const [favorites, setFavorites] = React.useState<Set<number>>(new Set());

  const handleCardClick = (productId: number) => {
    navigate(routes[RoutesEnum.PRODUCT].id(String(productId)));
  };

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(productId)) {
        newFavorites.delete(productId);
      } else {
        newFavorites.add(productId);
      }
      return newFavorites;
    });
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
          isFavorite={favorites.has(product.id)}
          onFavoriteClick={() => toggleFavorite(product.id)}
          onAddToCart={() => handleAddToCart(product.id, product.title)}
          onClick={() => handleCardClick(product.id)}
        />
      ))}
    </div>
  );
};

export default observer(CardsList);
