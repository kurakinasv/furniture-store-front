import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';

import IconButton from './IconButton';
import s from './IconButton.module.scss';

// Mock icon component
const TestIcon = () => (
  <svg data-testid="test-icon">
    <path d="M0 0" />
  </svg>
);

describe('IconButton', () => {
  const defaultProps = {
    icon: <TestIcon />,
    alt: 'Test button',
  };

  describe('Rendering', () => {
    it('renders button with icon', () => {
      render(<IconButton {...defaultProps} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders with alt text', () => {
      render(<IconButton {...defaultProps} />);
      expect(screen.getByRole('button', { name: 'Test button' })).toBeInTheDocument();
    });

    it('alt text is visually hidden', () => {
      const { container } = render(<IconButton {...defaultProps} />);
      const altText = container.querySelector('.visually-hidden');
      expect(altText).toBeInTheDocument();
      expect(altText).toHaveTextContent('Test button');
    });

    it('renders different icon', () => {
      const CustomIcon = () => <svg data-testid="custom-icon" />;
      render(<IconButton icon={<CustomIcon />} alt="Custom" />);
      expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
    });
  });

  describe('Props - Size', () => {
    it('renders with default size (m)', () => {
      render(<IconButton {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.size_m);
    });

    it('renders with size="s"', () => {
      render(<IconButton {...defaultProps} size="s" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.size_s);
    });

    it('renders with size="m"', () => {
      render(<IconButton {...defaultProps} size="m" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.size_m);
    });

    it('renders with size="l"', () => {
      render(<IconButton {...defaultProps} size="l" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.size_l);
    });
  });

  describe('Props - Variant', () => {
    it('renders with default variant (default)', () => {
      render(<IconButton {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.variant_default);
    });

    it('renders with variant="default"', () => {
      render(<IconButton {...defaultProps} variant="default" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.variant_default);
    });

    it('renders with variant="favorite"', () => {
      render(<IconButton {...defaultProps} variant="favorite" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.variant_favorite);
    });
  });

  describe('Props - Active', () => {
    it('is not active by default', () => {
      render(<IconButton {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass(s.active);
    });

    it('renders with active=false', () => {
      render(<IconButton {...defaultProps} active={false} />);
      const button = screen.getByRole('button');
      expect(button).not.toHaveClass(s.active);
    });

    it('renders with active=true', () => {
      render(<IconButton {...defaultProps} active />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.active);
    });

    it('active state works with favorite variant', () => {
      render(<IconButton {...defaultProps} variant="favorite" active />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.variant_favorite);
      expect(button).toHaveClass(s.active);
    });

    it('active state works with default variant', () => {
      render(<IconButton {...defaultProps} variant="default" active />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.variant_default);
      expect(button).toHaveClass(s.active);
    });
  });

  describe('Props - ClassName', () => {
    it('renders with custom className', () => {
      render(<IconButton {...defaultProps} className="custom-class" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });

    it('combines custom className with default classes', () => {
      render(
        <IconButton
          {...defaultProps}
          className="custom-class"
          size="l"
          variant="favorite"
          active
        />,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass(s.root);
      expect(button).toHaveClass(s.size_l);
      expect(button).toHaveClass(s.variant_favorite);
      expect(button).toHaveClass(s.active);
    });
  });

  describe('Props - Disabled', () => {
    it('renders disabled button', () => {
      render(<IconButton {...defaultProps} disabled />);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('is not disabled by default', () => {
      render(<IconButton {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
    });

    it('does not call onClick when disabled', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<IconButton {...defaultProps} onClick={handleClick} disabled />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Props - Type', () => {
    it('always has type="button"', () => {
      render(<IconButton {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('type is always button even when not specified', () => {
      render(<IconButton {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('Props - Combination', () => {
    it('renders with all props combined', () => {
      render(
        <IconButton {...defaultProps} size="l" variant="favorite" active className="custom" />,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.root);
      expect(button).toHaveClass(s.size_l);
      expect(button).toHaveClass(s.variant_favorite);
      expect(button).toHaveClass(s.active);
      expect(button).toHaveClass('custom');
    });

    it('renders small default variant', () => {
      render(<IconButton {...defaultProps} size="s" variant="default" />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.size_s);
      expect(button).toHaveClass(s.variant_default);
    });
  });

  describe('Event Handlers', () => {
    it('calls onClick when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<IconButton {...defaultProps} onClick={handleClick} />);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('calls onMouseEnter handler', async () => {
      const user = userEvent.setup();
      const handleMouseEnter = vi.fn();
      render(<IconButton {...defaultProps} onMouseEnter={handleMouseEnter} />);

      const button = screen.getByRole('button');
      await user.hover(button);

      expect(handleMouseEnter).toHaveBeenCalledTimes(1);
    });

    it('calls onFocus handler', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<IconButton {...defaultProps} onFocus={handleFocus} />);

      screen.getByRole('button');
      await user.tab();

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur handler', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<IconButton {...defaultProps} onBlur={handleBlur} />);

      screen.getByRole('button');
      await user.tab();
      await user.tab();

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<IconButton {...defaultProps} ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLButtonElement);
      expect(ref.current?.tagName).toBe('BUTTON');
    });

    it('can call focus on ref', () => {
      const ref = React.createRef<HTMLButtonElement>();
      render(<IconButton {...defaultProps} ref={ref} />);

      ref.current?.focus();

      expect(ref.current).toHaveFocus();
    });
  });

  describe('Accessibility', () => {
    it('is accessible by role', () => {
      render(<IconButton {...defaultProps} />);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('has accessible name from alt prop', () => {
      render(<IconButton icon={<TestIcon />} alt="Close dialog" />);
      expect(screen.getByRole('button', { name: 'Close dialog' })).toBeInTheDocument();
    });

    it('alt text is in visually-hidden span for screen readers', () => {
      const { container } = render(<IconButton {...defaultProps} alt="Important action" />);
      const hiddenSpan = container.querySelector('.visually-hidden');
      expect(hiddenSpan).toHaveTextContent('Important action');
    });

    it('button is keyboard accessible', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<IconButton {...defaultProps} onClick={handleClick} />);

      await user.tab();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('can be activated with Space key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<IconButton {...defaultProps} onClick={handleClick} />);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{ }');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders with aria-label', () => {
      render(<IconButton {...defaultProps} aria-label="Custom label" />);
      const button = screen.getByRole('button', { name: 'Custom label' });
      expect(button).toBeInTheDocument();
    });

    it('aria-label overrides alt text for accessibility name', () => {
      render(<IconButton icon={<TestIcon />} alt="Alt text" aria-label="Aria label" />);
      expect(screen.getByRole('button', { name: 'Aria label' })).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('always includes root class', () => {
      render(<IconButton {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.root);
    });

    it('always includes size class', () => {
      render(<IconButton {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.size_m);
    });

    it('always includes variant class', () => {
      render(<IconButton {...defaultProps} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.variant_default);
    });

    it('includes active class only when active=true', () => {
      const { rerender } = render(<IconButton {...defaultProps} active={false} />);
      let button = screen.getByRole('button');
      expect(button).not.toHaveClass(s.active);

      rerender(<IconButton {...defaultProps} active />);
      button = screen.getByRole('button');
      expect(button).toHaveClass(s.active);
    });

    it('includes all required classes', () => {
      render(<IconButton {...defaultProps} size="l" variant="favorite" active />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.root);
      expect(button).toHaveClass(s.size_l);
      expect(button).toHaveClass(s.variant_favorite);
      expect(button).toHaveClass(s.active);
    });
  });

  describe('Additional HTML Attributes', () => {
    it('renders with data attributes', () => {
      render(<IconButton {...defaultProps} data-testid="icon-btn" />);
      expect(screen.getByTestId('icon-btn')).toBeInTheDocument();
    });

    it('renders with id attribute', () => {
      render(<IconButton {...defaultProps} id="custom-id" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('id', 'custom-id');
    });

    it('renders with title attribute', () => {
      render(<IconButton {...defaultProps} title="Tooltip text" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('title', 'Tooltip text');
    });

    it('renders with aria-describedby', () => {
      render(<IconButton {...defaultProps} aria-describedby="description" />);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-describedby', 'description');
    });
  });

  describe('Multiple Interactions', () => {
    it('handles multiple clicks', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<IconButton {...defaultProps} onClick={handleClick} />);

      const button = screen.getByRole('button');
      await user.click(button);
      await user.click(button);
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(3);
    });

    it('toggles between active states', () => {
      const { rerender } = render(
        <IconButton {...defaultProps} variant="favorite" active={false} />,
      );

      let button = screen.getByRole('button');
      expect(button).not.toHaveClass(s.active);

      rerender(<IconButton {...defaultProps} variant="favorite" active />);
      button = screen.getByRole('button');
      expect(button).toHaveClass(s.active);

      rerender(<IconButton {...defaultProps} variant="favorite" active={false} />);
      button = screen.getByRole('button');
      expect(button).not.toHaveClass(s.active);
    });
  });

  describe('Favorite Variant Use Case', () => {
    it('renders inactive favorite button', () => {
      render(<IconButton {...defaultProps} variant="favorite" active={false} />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.variant_favorite);
      expect(button).not.toHaveClass(s.active);
    });

    it('renders active favorite button', () => {
      render(<IconButton {...defaultProps} variant="favorite" active />);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.variant_favorite);
      expect(button).toHaveClass(s.active);
    });

    it('favorite button click interaction', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(
        <IconButton
          {...defaultProps}
          variant="favorite"
          active={false}
          onClick={handleClick}
          alt="Add to favorites"
        />,
      );

      const button = screen.getByRole('button', { name: 'Add to favorites' });
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('changes alt text based on favorite state', () => {
      const { rerender } = render(
        <IconButton icon={<TestIcon />} variant="favorite" active={false} alt="Add to favorites" />,
      );

      expect(screen.getByRole('button', { name: 'Add to favorites' })).toBeInTheDocument();

      rerender(
        <IconButton icon={<TestIcon />} variant="favorite" active alt="Remove from favorites" />,
      );

      expect(screen.getByRole('button', { name: 'Remove from favorites' })).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('complete favorite button flow', async () => {
      const user = userEvent.setup();
      let isActive = false;
      const handleToggle = vi.fn(() => {
        isActive = !isActive;
      });

      const { rerender } = render(
        <IconButton
          icon={<TestIcon />}
          variant="favorite"
          active={isActive}
          onClick={handleToggle}
          alt={isActive ? 'Remove from favorites' : 'Add to favorites'}
        />,
      );

      // Initial state - not active
      let button = screen.getByRole('button', { name: 'Add to favorites' });
      expect(button).not.toHaveClass(s.active);

      // Click to activate
      await user.click(button);
      expect(handleToggle).toHaveBeenCalledTimes(1);

      // Rerender with active state
      rerender(
        <IconButton
          icon={<TestIcon />}
          variant="favorite"
          active
          onClick={handleToggle}
          alt="Remove from favorites"
        />,
      );

      button = screen.getByRole('button', { name: 'Remove from favorites' });
      expect(button).toHaveClass(s.active);
    });

    it('renders icon button with all features', () => {
      const CustomIcon = () => (
        <svg data-testid="heart-icon">
          <path d="M0 0" />
        </svg>
      );

      render(
        <IconButton
          icon={<CustomIcon />}
          alt="Add to favorites"
          size="l"
          variant="favorite"
          active={false}
          className="favorite-btn"
          onClick={() => {}}
        />,
      );

      const button = screen.getByRole('button', { name: 'Add to favorites' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass(s.root);
      expect(button).toHaveClass(s.size_l);
      expect(button).toHaveClass(s.variant_favorite);
      expect(button).toHaveClass('favorite-btn');
      expect(screen.getByTestId('heart-icon')).toBeInTheDocument();
    });
  });
});
