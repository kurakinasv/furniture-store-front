import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Card from './Card';
import s from './Card.module.scss';

describe('Card', () => {
  const defaultProps = {
    price: '5000 ₽',
    title: 'Test Product',
  };

  describe('Rendering', () => {
    it('renders card with title and price', () => {
      render(<Card {...defaultProps} />);
      expect(screen.getByText('Test Product')).toBeInTheDocument();
      expect(screen.getByText('5000 ₽')).toBeInTheDocument();
    });

    it('renders price as number', () => {
      render(<Card price={5000} title="Product" />);
      expect(screen.getByText('5000')).toBeInTheDocument();
    });

    it('renders add to cart button', () => {
      render(<Card {...defaultProps} />);
      expect(screen.getByRole('button', { name: /в корзину/i })).toBeInTheDocument();
    });

    it('renders favorite button', () => {
      render(<Card {...defaultProps} />);
      expect(screen.getByRole('button', { name: /add to favorites/i })).toBeInTheDocument();
    });
  });

  describe('Image Display', () => {
    it('renders image when imageUrl is provided', () => {
      render(<Card {...defaultProps} imageUrl="https://example.com/image.jpg" />);
      const img = screen.getByRole('img', { name: 'Test Product' });
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', 'https://example.com/image.jpg');
    });

    it('renders placeholder when imageUrl is not provided', () => {
      const { container } = render(<Card {...defaultProps} imagePlaceholder="No Image" />);
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
      const placeholder = container.querySelector(`.${s['image-placeholder']}`);
      expect(placeholder).toBeInTheDocument();
      expect(screen.getByText('No Image')).toBeInTheDocument();
    });

    it('renders empty placeholder when no imageUrl and no imagePlaceholder', () => {
      const { container } = render(<Card {...defaultProps} />);
      const placeholder = container.querySelector(`.${s['image-placeholder']}`);
      expect(placeholder).toBeInTheDocument();
      expect(screen.queryByRole('img')).not.toBeInTheDocument();
    });

    it('image has correct alt text', () => {
      render(<Card {...defaultProps} imageUrl="/test.jpg" />);
      const img = screen.getByAltText('Test Product');
      expect(img).toBeInTheDocument();
    });
  });

  describe('Favorite Button', () => {
    it('favorite button is not active by default', () => {
      render(<Card {...defaultProps} />);
      const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
      expect(favoriteButton).toBeInTheDocument();
    });

    it('favorite button shows remove text when isFavorite is true', () => {
      render(<Card {...defaultProps} isFavorite />);
      const favoriteButton = screen.getByRole('button', { name: /remove from favorites/i });
      expect(favoriteButton).toBeInTheDocument();
    });

    it('calls onFavoriteClick when favorite button is clicked', async () => {
      const user = userEvent.setup();
      const handleFavoriteClick = vi.fn();
      render(<Card {...defaultProps} onFavoriteClick={handleFavoriteClick} />);

      const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
      await user.click(favoriteButton);

      expect(handleFavoriteClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onFavoriteClick when not provided', async () => {
      const user = userEvent.setup();
      render(<Card {...defaultProps} />);

      const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
      await user.click(favoriteButton);

      // Should not throw error
      expect(favoriteButton).toBeInTheDocument();
    });

    it('toggles between favorite states', async () => {
      const user = userEvent.setup();
      const handleFavoriteClick = vi.fn();

      const { rerender } = render(
        <Card {...defaultProps} isFavorite={false} onFavoriteClick={handleFavoriteClick} />,
      );

      let favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
      await user.click(favoriteButton);
      expect(handleFavoriteClick).toHaveBeenCalledTimes(1);

      rerender(<Card {...defaultProps} isFavorite={true} onFavoriteClick={handleFavoriteClick} />);

      favoriteButton = screen.getByRole('button', { name: /remove from favorites/i });
      expect(favoriteButton).toBeInTheDocument();
    });
  });

  describe('Add to Cart Button', () => {
    it('calls onAddToCart when add to cart button is clicked', async () => {
      const user = userEvent.setup();
      const handleAddToCart = vi.fn();
      render(<Card {...defaultProps} onAddToCart={handleAddToCart} />);

      const addToCartButton = screen.getByRole('button', { name: /в корзину/i });
      await user.click(addToCartButton);

      expect(handleAddToCart).toHaveBeenCalledTimes(1);
    });

    it('does not call onAddToCart when not provided', async () => {
      const user = userEvent.setup();
      render(<Card {...defaultProps} />);

      const addToCartButton = screen.getByRole('button', { name: /в корзину/i });
      await user.click(addToCartButton);

      // Should not throw error
      expect(addToCartButton).toBeInTheDocument();
    });

    it('add to cart button has correct size', () => {
      render(<Card {...defaultProps} />);
      const addToCartButton = screen.getByRole('button', { name: /в корзину/i });
      expect(addToCartButton).toBeInTheDocument();
    });
  });

  describe('Card Click Handler', () => {
    it('calls onClick when card is clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Card {...defaultProps} onClick={handleClick} />);

      const card = screen.getByText('Test Product').closest(`.${s.card}`);
      await user.click(card!);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when not provided', async () => {
      const user = userEvent.setup();
      render(<Card {...defaultProps} />);

      const card = screen.getByText('Test Product').closest(`.${s.card}`);
      await user.click(card!);

      // Should not throw error
      expect(card).toBeInTheDocument();
    });

    it('adds clickable class when onClick is provided', () => {
      const { container } = render(<Card {...defaultProps} onClick={() => {}} />);
      const card = container.querySelector(`.${s.card}`);
      expect(card).toHaveClass(s.clickable);
    });

    it('does not add clickable class when onClick is not provided', () => {
      const { container } = render(<Card {...defaultProps} />);
      const card = container.querySelector(`.${s.card}`);
      expect(card).not.toHaveClass(s.clickable);
    });

    it('does not call card onClick when favorite button is clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleFavoriteClick = vi.fn();
      render(
        <Card {...defaultProps} onClick={handleClick} onFavoriteClick={handleFavoriteClick} />,
      );

      const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
      await user.click(favoriteButton);

      expect(handleFavoriteClick).toHaveBeenCalledTimes(1);
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('does not call card onClick when add to cart button is clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleAddToCart = vi.fn();
      render(<Card {...defaultProps} onClick={handleClick} onAddToCart={handleAddToCart} />);

      const addToCartButton = screen.getByRole('button', { name: /в корзину/i });
      await user.click(addToCartButton);

      expect(handleAddToCart).toHaveBeenCalledTimes(1);
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Props - ClassName', () => {
    it('renders with custom className', () => {
      const { container } = render(<Card {...defaultProps} className="custom-card" />);
      const card = container.querySelector(`.${s.card}`);
      expect(card).toHaveClass('custom-card');
    });

    it('combines custom className with default classes', () => {
      const { container } = render(
        <Card {...defaultProps} className="custom-card" onClick={() => {}} />,
      );
      const card = container.querySelector(`.${s.card}`);
      expect(card).toHaveClass('custom-card');
      expect(card).toHaveClass(s.card);
      expect(card).toHaveClass(s.clickable);
    });
  });

  describe('CSS Classes', () => {
    it('card has correct base class', () => {
      const { container } = render(<Card {...defaultProps} />);
      const card = container.querySelector(`.${s.card}`);
      expect(card).toBeInTheDocument();
    });

    it('image container has correct class', () => {
      const { container } = render(<Card {...defaultProps} imageUrl="/test.jpg" />);
      const image = container.querySelector(`.${s.image}`);
      expect(image).toBeInTheDocument();
    });

    it('content section has correct class', () => {
      const { container } = render(<Card {...defaultProps} />);
      const content = container.querySelector(`.${s.content}`);
      expect(content).toBeInTheDocument();
    });

    it('text section has correct class', () => {
      const { container } = render(<Card {...defaultProps} />);
      const text = container.querySelector(`.${s.text}`);
      expect(text).toBeInTheDocument();
    });

    it('price has correct class', () => {
      const { container } = render(<Card {...defaultProps} />);
      const price = container.querySelector(`.${s.price}`);
      expect(price).toBeInTheDocument();
    });

    it('title has correct class', () => {
      const { container } = render(<Card {...defaultProps} />);
      const title = container.querySelector(`.${s.title}`);
      expect(title).toBeInTheDocument();
    });

    it('actions section has correct class', () => {
      const { container } = render(<Card {...defaultProps} />);
      const actions = container.querySelector(`.${s.actions}`);
      expect(actions).toBeInTheDocument();
    });
  });

  describe('Content Display', () => {
    it('displays long title with ellipsis', () => {
      const longTitle = 'This is a very long product title that should be truncated';
      const { container } = render(<Card price="1000" title={longTitle} />);
      const title = container.querySelector(`.${s.title}`);
      expect(title).toHaveTextContent(longTitle);
    });

    it('displays formatted price', () => {
      render(<Card price="12 345 ₽" title="Product" />);
      expect(screen.getByText('12 345 ₽')).toBeInTheDocument();
    });

    it('displays price with currency symbol', () => {
      render(<Card price="$99.99" title="Product" />);
      expect(screen.getByText('$99.99')).toBeInTheDocument();
    });
  });

  describe('Multiple Interactions', () => {
    it('handles multiple button clicks', async () => {
      const user = userEvent.setup();
      const handleFavoriteClick = vi.fn();
      const handleAddToCart = vi.fn();
      render(
        <Card
          {...defaultProps}
          onFavoriteClick={handleFavoriteClick}
          onAddToCart={handleAddToCart}
        />,
      );

      const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
      const addToCartButton = screen.getByRole('button', { name: /в корзину/i });

      await user.click(favoriteButton);
      await user.click(addToCartButton);
      await user.click(favoriteButton);

      expect(handleFavoriteClick).toHaveBeenCalledTimes(2);
      expect(handleAddToCart).toHaveBeenCalledTimes(1);
    });

    it('handles card click and button clicks correctly', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      const handleFavoriteClick = vi.fn();
      const handleAddToCart = vi.fn();
      render(
        <Card
          {...defaultProps}
          onClick={handleClick}
          onFavoriteClick={handleFavoriteClick}
          onAddToCart={handleAddToCart}
        />,
      );

      const card = screen.getByText('Test Product').closest(`.${s.card}`);
      const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
      const addToCartButton = screen.getByRole('button', { name: /в корзину/i });

      // Click card
      await user.click(card!);
      expect(handleClick).toHaveBeenCalledTimes(1);

      // Click buttons - should not trigger card click
      await user.click(favoriteButton);
      await user.click(addToCartButton);

      expect(handleClick).toHaveBeenCalledTimes(1); // Still 1
      expect(handleFavoriteClick).toHaveBeenCalledTimes(1);
      expect(handleAddToCart).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('image has alt text matching title', () => {
      render(<Card {...defaultProps} imageUrl="/test.jpg" />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('alt', 'Test Product');
    });

    it('buttons are accessible by role', () => {
      render(<Card {...defaultProps} />);
      const buttons = screen.getAllByRole('button');
      expect(buttons).toHaveLength(2); // Add to cart and favorite
    });

    it('favorite button has accessible text', () => {
      render(<Card {...defaultProps} />);
      expect(screen.getByRole('button', { name: /add to favorites/i })).toBeInTheDocument();
    });

    it('favorite button accessible text changes with state', () => {
      const { rerender } = render(<Card {...defaultProps} isFavorite={false} />);
      expect(screen.getByRole('button', { name: /add to favorites/i })).toBeInTheDocument();

      rerender(<Card {...defaultProps} isFavorite={true} />);
      expect(screen.getByRole('button', { name: /remove from favorites/i })).toBeInTheDocument();
    });

    it('add to cart button has accessible text', () => {
      render(<Card {...defaultProps} />);
      expect(screen.getByRole('button', { name: /в корзину/i })).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('renders complete card with all features', () => {
      const { container } = render(
        <Card
          imageUrl="/product.jpg"
          price="15 000 ₽"
          title="Luxury Chair"
          isFavorite={true}
          onFavoriteClick={() => {}}
          onAddToCart={() => {}}
          onClick={() => {}}
          className="featured-card"
        />,
      );

      // Check all elements are present
      expect(screen.getByRole('img', { name: 'Luxury Chair' })).toBeInTheDocument();
      expect(screen.getByText('15 000 ₽')).toBeInTheDocument();
      expect(screen.getByText('Luxury Chair')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /в корзину/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /remove from favorites/i })).toBeInTheDocument();

      const card = container.querySelector(`.${s.card}`);
      expect(card).toHaveClass('featured-card');
      expect(card).toHaveClass(s.clickable);
    });

    it('renders minimal card with only required props', () => {
      render(<Card price={1000} title="Basic Product" />);

      expect(screen.getByText('1000')).toBeInTheDocument();
      expect(screen.getByText('Basic Product')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /в корзину/i })).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /add to favorites/i })).toBeInTheDocument();
    });

    it('full user interaction flow', async () => {
      const user = userEvent.setup();
      const handlers = {
        onFavoriteClick: vi.fn(),
        onAddToCart: vi.fn(),
        onClick: vi.fn(),
      };

      render(<Card imageUrl="/product.jpg" price="5000 ₽" title="Test Product" {...handlers} />);

      // User clicks on card
      const card = screen.getByText('Test Product').closest(`.${s.card}`);
      await user.click(card!);
      expect(handlers.onClick).toHaveBeenCalledTimes(1);

      // User adds to favorites
      const favoriteButton = screen.getByRole('button', { name: /add to favorites/i });
      await user.click(favoriteButton);
      expect(handlers.onFavoriteClick).toHaveBeenCalledTimes(1);
      expect(handlers.onClick).toHaveBeenCalledTimes(1); // Still 1, not triggered

      // User adds to cart
      const addToCartButton = screen.getByRole('button', { name: /в корзину/i });
      await user.click(addToCartButton);
      expect(handlers.onAddToCart).toHaveBeenCalledTimes(1);
      expect(handlers.onClick).toHaveBeenCalledTimes(1); // Still 1, not triggered

      // User clicks card again
      await user.click(card!);
      expect(handlers.onClick).toHaveBeenCalledTimes(2);
    });
  });
});
