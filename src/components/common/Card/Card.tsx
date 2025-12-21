import clsx from 'clsx';
import * as React from 'react';

import HeartIcon from 'assets/icons/heart.svg?react';
import { Button } from '../Button';
import { IconButton } from '../IconButton';

import s from './Card.module.scss';

type CardProps = {
  imageUrl?: string;
  imagePlaceholder?: string;
  price: string | number;
  title: string;
  isFavorite?: boolean;
  onFavoriteClick?: () => void;
  onAddToCart?: () => void;
  onClick?: () => void;
  className?: string;
};

const Card = ({
  imageUrl,
  imagePlaceholder,
  price,
  title,
  isFavorite = false,
  onFavoriteClick,
  onAddToCart,
  onClick,
  className,
}: CardProps): React.ReactElement => {
  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onFavoriteClick?.();
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    onAddToCart?.();
  };

  return (
    <div className={clsx(s.card, onClick && s.clickable, className)} onClick={onClick}>
      <div className={s.image}>
        {imageUrl ? (
          <img src={imageUrl} alt={title} className={s['image-content']} />
        ) : (
          <div className={s['image-placeholder']}>
            {imagePlaceholder && <span>{imagePlaceholder}</span>}
          </div>
        )}
      </div>

      <div className={s.content}>
        <div className={s.text}>
          <p className={s.price}>{price}</p>
          <p className={s.title}>{title}</p>
        </div>

        <div className={s.actions}>
          <Button
            size="s"
            color="default"
            onClick={handleAddToCart}
            className={s['add-to-cart-button']}
          >
            В корзину
          </Button>

          <IconButton
            variant="favorite"
            active={isFavorite}
            icon={<HeartIcon />}
            onClick={handleFavoriteClick}
            alt={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
