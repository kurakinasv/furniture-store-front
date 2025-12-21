import * as React from 'react';
import { useNavigate } from 'react-router';
import { PageWrapper } from 'components/layout';
import { Card, Typography } from 'components/common';
import { routes, RoutesEnum } from 'config/routes';

import s from './ProductsListPage.module.scss';
import { MOCK_PRODUCTS } from 'config/mocks/products';

const ProductsListPage: React.FC = () => {
  const navigate = useNavigate();
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
    <PageWrapper>
      <div className={s.root}>
        <header className={s.header}>
          <Typography tag="h1" variant="heading" className={s.title}>
            Каталог мебели
          </Typography>
          <Typography variant="text-base" color="gray" className={s.subtitle}>
            Найдено товаров: {MOCK_PRODUCTS.length}
          </Typography>
        </header>

        <div className={s.grid}>
          {MOCK_PRODUCTS.map((product) => (
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
      </div>
    </PageWrapper>
  );
};

export default ProductsListPage;
