import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import Button from './Button';
import s from './Button.module.scss';

describe('Button', () => {
  describe('Rendering', () => {
    it('renders button with children', () => {
      render(
        <Button>
          <span>Click me</span>
        </Button>,
      );
      expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
    });

    it('renders button with text content', () => {
      render(<Button>Test Button</Button>);
      expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    it('renders button with JSX children', () => {
      render(
        <Button>
          <span data-testid="icon">Icon</span>
          <span>Click me</span>
        </Button>,
      );
      expect(screen.getByTestId('icon')).toBeInTheDocument();
      expect(screen.getByText('Click me')).toBeInTheDocument();
    });
  });

  describe('Props - Size', () => {
    it('renders with default size (m)', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.size_m);
    });

    it('renders with size="s"', () => {
      render(<Button size="s">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.size_s);
    });

    it('renders with size="m"', () => {
      render(<Button size="m">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.size_m);
    });

    it('renders with size="l"', () => {
      render(<Button size="l">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.size_l);
    });

    it('renders with size="xl"', () => {
      render(<Button size="xl">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.size_xl);
    });

    it('button with size="s" has border-radius 30px', () => {
      render(<Button size="s">Button</Button>);
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      expect(styles.borderRadius).toBe('30px');
    });

    it('button with size="m" has border-radius 15px', () => {
      render(<Button size="m">Button</Button>);
      const button = screen.getByRole('button');
      const styles = window.getComputedStyle(button);
      expect(styles.borderRadius).toBe('15px');
    });
  });

  describe('Props - Color', () => {
    it('renders with default color', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.color_default);
    });

    it('renders with color="default"', () => {
      render(<Button color="default">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.color_default);
    });

    it('renders with color="transparent"', () => {
      render(<Button color="transparent">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.color_transparent);
    });
  });

  describe('Props - Combination', () => {
    it('renders with both size and color props', () => {
      render(
        <Button size="l" color="transparent">
          Button
        </Button>,
      );
      const button = screen.getByRole('button');
      expect(button).toHaveClass(s.size_l);
      expect(button).toHaveClass(s.color_transparent);
    });
  });

  describe('Props - Disabled', () => {
    it('renders disabled button', () => {
      render(<Button disabled>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('is not disabled by default', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toBeDisabled();
    });
  });

  describe('Props - Type', () => {
    it('does not set type attribute by default', () => {
      render(<Button>Button</Button>);
      const button = screen.getByRole('button');
      expect(button).not.toHaveAttribute('type');
    });

    it('renders with type="submit"', () => {
      render(<Button type="submit">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'submit');
    });

    it('renders with type="reset"', () => {
      render(<Button type="reset">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'reset');
    });

    it('renders with type="button"', () => {
      render(<Button type="button">Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('type', 'button');
    });
  });

  describe('Event Handlers', () => {
    it('calls onClick handler when clicked', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Button</Button>);

      const button = screen.getByRole('button');
      await user.click(button);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      render(
        <Button onClick={handleClick} disabled>
          Button
        </Button>,
      );

      const button = screen.getByRole('button');
      fireEvent.click(button);

      expect(handleClick).not.toHaveBeenCalled();
    });

    it('can be focused and clicked via keyboard', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Button</Button>);

      await user.tab();
      await user.keyboard('{Enter}');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('can be clicked via Space key', async () => {
      const user = userEvent.setup();
      const handleClick = vi.fn();
      render(<Button onClick={handleClick}>Button</Button>);

      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{ }');

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    it('is accessible by role', () => {
      render(<Button>Button</Button>);
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('renders with aria-label', () => {
      render(<Button aria-label="Close dialog">X</Button>);
      const button = screen.getByRole('button', { name: /close dialog/i });
      expect(button).toBeInTheDocument();
    });
  });
});
