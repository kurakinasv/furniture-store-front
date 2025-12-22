import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import * as React from 'react';

import Input from './Input';
import s from './Input.module.scss';

describe('Input', () => {
  describe('Rendering', () => {
    it('renders input element', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('renders with placeholder', () => {
      render(<Input placeholder="Enter text" />);
      expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
    });

    it('renders with label', () => {
      render(<Input label="Username" id="username" />);
      expect(screen.getByText('Username')).toBeInTheDocument();
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
    });

    it('renders without label when not provided', () => {
      render(<Input />);
      const labels = document.querySelectorAll('label');
      expect(labels).toHaveLength(0);
    });
  });

  describe('Props - Size', () => {
    it('renders with default size (m)', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass(s.size_m);
    });

    it('renders with size="m"', () => {
      render(<Input size="m" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass(s.size_m);
    });

    it('renders with size="l"', () => {
      render(<Input size="l" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass(s.size_l);
    });

    it('input wrapper has correct size class', () => {
      const { container } = render(<Input size="l" />);
      const wrapper = container.querySelector(`.${s['input-wrapper']}`);
      expect(wrapper).toHaveClass(s.size_l);
    });
  });

  describe('Props - ClassName', () => {
    it('renders with custom className on input', () => {
      render(<Input className="custom-input-class" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-input-class');
    });

    it('renders with custom wrapperClassName', () => {
      const { container } = render(<Input wrapperClassName="custom-wrapper-class" />);
      const wrapper = container.querySelector(`.${s.wrapper}`);
      expect(wrapper).toHaveClass('custom-wrapper-class');
    });

    it('combines custom className with default classes', () => {
      render(<Input className="custom-class" size="l" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('custom-class');
      expect(input).toHaveClass(s.input);
      expect(input).toHaveClass(s.size_l);
    });
  });

  describe('Props - Value and DefaultValue', () => {
    it('renders with value', () => {
      render(<Input value="test value" onChange={() => {}} />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('test value');
    });

    it('renders with defaultValue', () => {
      render(<Input defaultValue="default text" />);
      const input = screen.getByRole('textbox') as HTMLInputElement;
      expect(input.value).toBe('default text');
    });

    it('can be typed into when uncontrolled', async () => {
      const user = userEvent.setup();
      render(<Input />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'Hello');

      expect(input).toHaveValue('Hello');
    });

    it('updates when controlled', async () => {
      const user = userEvent.setup();
      const TestComponent = () => {
        const [value, setValue] = React.useState('');
        return <Input value={value} onChange={(e) => setValue(e.target.value)} />;
      };
      render(<TestComponent />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'Hello');

      expect(input).toHaveValue('Hello');
    });
  });

  describe('Props - Disabled', () => {
    it('renders disabled input', () => {
      render(<Input disabled />);
      const input = screen.getByRole('textbox');
      expect(input).toBeDisabled();
    });

    it('is not disabled by default', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).not.toBeDisabled();
    });

    it('cannot be typed into when disabled', async () => {
      const user = userEvent.setup();
      render(<Input disabled />);
      const input = screen.getByRole('textbox');

      await user.type(input, 'Hello');

      expect(input).toHaveValue('');
    });
  });

  describe('Props - Type', () => {
    it('renders with default type="text"', () => {
      render(<Input />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'text');
    });

    it('renders with type="password"', () => {
      render(<Input type="password" />);
      const input = document.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
    });

    it('renders with type="email"', () => {
      render(<Input type="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('type', 'email');
    });
  });

  describe('Clear Button', () => {
    it('does not show clear button by default', () => {
      render(<Input />);
      const clearButton = screen.queryByRole('button');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('does not show clear button when showClearButton is false', () => {
      render(<Input showClearButton={false} value="text" onChange={() => {}} />);
      const clearButton = screen.queryByRole('button');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('shows clear button when showClearButton is true and input has value', () => {
      render(<Input showClearButton value="text" onChange={() => {}} />);
      const clearButton = screen.getByRole('button', { name: /очистить поле/i });
      expect(clearButton).toBeInTheDocument();
    });

    it('shows clear button when showClearButton is true and input is focused', async () => {
      const user = userEvent.setup();
      render(<Input showClearButton />);

      const input = screen.getByRole('textbox');
      await user.click(input);

      const clearButton = screen.getByRole('button', { name: /очистить поле/i });
      expect(clearButton).toBeInTheDocument();
    });

    it('hides clear button when input is blurred and has no value', async () => {
      const user = userEvent.setup();
      render(<Input showClearButton />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab();

      const clearButton = screen.queryByRole('button');
      expect(clearButton).not.toBeInTheDocument();
    });

    it('shows clear button with defaultValue', () => {
      render(<Input showClearButton defaultValue="text" />);
      const clearButton = screen.getByRole('button', { name: /очистить поле/i });
      expect(clearButton).toBeInTheDocument();
    });

    it('calls onClear when clear button is clicked', async () => {
      const user = userEvent.setup();
      const handleClear = vi.fn();
      render(<Input showClearButton value="text" onChange={() => {}} onClear={handleClear} />);

      const clearButton = screen.getByRole('button', { name: /очистить поле/i });
      await user.click(clearButton);

      expect(handleClear).toHaveBeenCalledTimes(1);
    });

    it('prevents default and stops propagation when clear button is clicked', () => {
      const handleClear = vi.fn();
      render(<Input showClearButton value="text" onChange={() => {}} onClear={handleClear} />);

      const clearButton = screen.getByRole('button', { name: /очистить поле/i });
      const event = new MouseEvent('click', { bubbles: true, cancelable: true });
      const preventDefault = vi.spyOn(event, 'preventDefault');
      const stopPropagation = vi.spyOn(event, 'stopPropagation');

      clearButton.dispatchEvent(event);

      expect(preventDefault).toHaveBeenCalled();
      expect(stopPropagation).toHaveBeenCalled();
    });
  });

  describe('Focus and Blur', () => {
    it('applies active class to label when focused', async () => {
      const user = userEvent.setup();
      const { container } = render(<Input label="Username" />);

      const input = screen.getByRole('textbox');
      await user.click(input);

      const label = container.querySelector(`.${s.label}`);
      expect(label).toHaveClass(s.label_active);
    });

    it('removes active class from label when blurred without value', async () => {
      const user = userEvent.setup();
      const { container } = render(<Input label="Username" />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab();

      const label = container.querySelector(`.${s.label}`);
      expect(label).not.toHaveClass(s.label_active);
    });

    it('keeps active class on label when input has value', async () => {
      const user = userEvent.setup();
      const { container } = render(<Input label="Username" />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'Hello');
      await user.tab();

      const label = container.querySelector(`.${s.label}`);
      expect(label).toHaveClass(s.label_active);
    });

    it('label has active class when input has defaultValue', () => {
      const { container } = render(<Input label="Username" defaultValue="John" />);
      const label = container.querySelector(`.${s.label}`);
      expect(label).toHaveClass(s.label_active);
    });

    it('calls onFocus handler when focused', async () => {
      const user = userEvent.setup();
      const handleFocus = vi.fn();
      render(<Input onFocus={handleFocus} />);

      const input = screen.getByRole('textbox');
      await user.click(input);

      expect(handleFocus).toHaveBeenCalledTimes(1);
    });

    it('calls onBlur handler when blurred', async () => {
      const user = userEvent.setup();
      const handleBlur = vi.fn();
      render(<Input onBlur={handleBlur} />);

      const input = screen.getByRole('textbox');
      await user.click(input);
      await user.tab();

      expect(handleBlur).toHaveBeenCalledTimes(1);
    });
  });

  describe('Event Handlers', () => {
    it('calls onChange handler when typing', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      render(<Input onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'a');

      expect(handleChange).toHaveBeenCalled();
    });

    it('calls onKeyDown handler', async () => {
      const user = userEvent.setup();
      const handleKeyDown = vi.fn();
      render(<Input onKeyDown={handleKeyDown} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'a');

      expect(handleKeyDown).toHaveBeenCalled();
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref correctly', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);

      expect(ref.current).toBeInstanceOf(HTMLInputElement);
      expect(ref.current?.tagName).toBe('INPUT');
    });

    it('can call focus on ref', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} />);

      ref.current?.focus();

      expect(ref.current).toHaveFocus();
    });

    it('can access value via ref', () => {
      const ref = React.createRef<HTMLInputElement>();
      render(<Input ref={ref} defaultValue="test" />);

      expect(ref.current?.value).toBe('test');
    });
  });

  describe('Accessibility', () => {
    it('is accessible by role', () => {
      render(<Input />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('label is associated with input via htmlFor', () => {
      render(<Input label="Username" id="username-input" />);
      const input = screen.getByLabelText('Username');
      expect(input).toHaveAttribute('id', 'username-input');
    });

    it('clear button has accessible label', () => {
      render(<Input showClearButton value="text" onChange={() => {}} />);
      const clearButton = screen.getByRole('button', { name: /очистить поле/i });
      expect(clearButton).toBeInTheDocument();
    });

    it('renders with aria-label', () => {
      render(<Input aria-label="Search field" />);
      const input = screen.getByLabelText('Search field');
      expect(input).toBeInTheDocument();
    });

    it('renders with aria-describedby', () => {
      render(<Input aria-describedby="error-message" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'error-message');
    });
  });

  describe('Additional HTML Attributes', () => {
    it('renders with name attribute', () => {
      render(<Input name="username" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('name', 'username');
    });

    it('renders with id attribute', () => {
      render(<Input id="custom-id" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('id', 'custom-id');
    });

    it('renders with maxLength attribute', () => {
      render(<Input maxLength={10} />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('maxLength', '10');
    });

    it('renders with required attribute', () => {
      render(<Input required />);
      const input = screen.getByRole('textbox');
      expect(input).toBeRequired();
    });

    it('renders with readOnly attribute', () => {
      render(<Input readOnly />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('readOnly');
    });

    it('renders with autoComplete attribute', () => {
      render(<Input autoComplete="email" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('autoComplete', 'email');
    });

    it('renders with data attributes', () => {
      render(<Input data-testid="test-input" />);
      expect(screen.getByTestId('test-input')).toBeInTheDocument();
    });
  });

  describe('CSS Classes', () => {
    it('wrapper has correct class', () => {
      const { container } = render(<Input />);
      const wrapper = container.querySelector(`.${s.wrapper}`);
      expect(wrapper).toBeInTheDocument();
    });

    it('input has correct classes', () => {
      render(<Input size="l" />);
      const input = screen.getByRole('textbox');
      expect(input).toHaveClass(s.input);
      expect(input).toHaveClass(s.size_l);
    });

    it('input-wrapper has correct classes', () => {
      const { container } = render(<Input size="m" />);
      const inputWrapper = container.querySelector(`.${s['input-wrapper']}`);
      expect(inputWrapper).toHaveClass(s['input-wrapper']);
      expect(inputWrapper).toHaveClass(s.size_m);
    });

    it('clear button has correct class', () => {
      const { container } = render(<Input showClearButton value="text" onChange={() => {}} />);
      const clearButton = container.querySelector(`.${s['clear-button']}`);
      expect(clearButton).toBeInTheDocument();
    });
  });

  describe('Integration Tests', () => {
    it('full flow: type, clear, type again', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      const handleClear = vi.fn();

      const TestComponent = () => {
        const [value, setValue] = React.useState('');
        return (
          <Input
            showClearButton
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              handleChange(e);
            }}
            onClear={() => {
              setValue('');
              handleClear();
            }}
          />
        );
      };

      render(<TestComponent />);

      const input = screen.getByRole('textbox');

      // Type text
      await user.type(input, 'Hello');
      expect(input).toHaveValue('Hello');
      expect(handleChange).toHaveBeenCalled();

      // Clear
      const clearButton = screen.getByRole('button', { name: /очистить поле/i });
      await user.click(clearButton);
      expect(input).toHaveValue('');
      expect(handleClear).toHaveBeenCalledTimes(1);

      // Type again
      await user.type(input, 'World');
      expect(input).toHaveValue('World');
    });

    it('label interaction with value changes', async () => {
      const user = userEvent.setup();
      const { container } = render(<Input label="Email" />);

      const input = screen.getByRole('textbox');
      const label = container.querySelector(`.${s.label}`);

      // Initially not active
      expect(label).not.toHaveClass(s.label_active);

      // Focus - becomes active
      await user.click(input);
      expect(label).toHaveClass(s.label_active);

      // Type - stays active
      await user.type(input, 'test@example.com');
      expect(label).toHaveClass(s.label_active);

      // Blur with value - stays active
      await user.tab();
      expect(label).toHaveClass(s.label_active);

      // Clear value
      await user.clear(input);

      // Blur without value - not active
      await user.click(input);
      await user.tab();
      expect(label).not.toHaveClass(s.label_active);
    });
  });
});
