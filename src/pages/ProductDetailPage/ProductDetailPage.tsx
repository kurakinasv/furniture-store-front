import * as React from 'react';
import { useNavigate, useParams } from 'react-router';
import { PageWrapper } from 'components/layout';
import { Button, Typography, IconButton } from 'components/common';
import HeartIcon from 'assets/icons/heart.svg?react';
import ArrowLeftIcon from 'assets/icons/arrow-left.svg?react';

import s from './ProductDetailPage.module.scss';
import { MOCK_PRODUCTS } from 'config/mocks/products';

const ProductDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [isFavorite, setIsFavorite] = React.useState(false);

  const product = id ? MOCK_PRODUCTS.find((product) => product.id === Number(id)) : null;

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    console.log(`Added to cart: ${product?.title}`);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  if (!product) {
    return (
      <PageWrapper>
        <div className={s.root}>
          <Typography variant="heading">Товар не найден</Typography>
          <Button onClick={handleBack} className={s['back-button']}>
            Назад
          </Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <div className={s.root}>
        <Button color="transparent" onClick={handleBack} className={s['back-button']}>
          <ArrowLeftIcon />
          Назад
        </Button>

        <div className={s.content}>
          <div className={s['image-section']}>
            <div className={s['image-wrapper']}>
              {product.imageUrl ? (
                <img src={product.imageUrl} alt={product.title} className={s.image} />
              ) : (
                <div className={s['image-placeholder']}>
                  {product.imagePlaceholder && <span>{product.imagePlaceholder}</span>}
                </div>
              )}
            </div>
          </div>

          <div className={s['info-section']}>
            <div className={s.header}>
              <Typography tag="h1" variant="heading" className={s.title}>
                {product.title}
              </Typography>
              <Typography tag="p" variant="sub-heading-bold" className={s.price}>
                {product.price}
              </Typography>
            </div>

            <div className={s.description}>
              <Typography tag="h2" variant="sub-heading-bold" className={s['description-title']}>
                Описание
              </Typography>
              <Typography variant="text-base" className={s['description-text']}>
                {product.description}
              </Typography>
            </div>

            <div className={s.actions}>
              <Button size="l" onClick={handleAddToCart} className={s['add-to-cart']}>
                В корзину
              </Button>
              <IconButton
                size="l"
                variant="favorite"
                active={isFavorite}
                icon={<HeartIcon />}
                onClick={toggleFavorite}
                alt={isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
              />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ProductDetailPage;
