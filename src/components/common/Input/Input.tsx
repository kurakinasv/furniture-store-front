import clsx from 'clsx';
import * as React from 'react';

import s from './Input.module.scss';
import type { InputSize } from './types';
import CrossIcon from 'assets/icons/cross.svg?react';

type InputProps = {
  size?: InputSize;
  label?: string;
  showClearButton?: boolean;
  onClear?: () => void;
  className?: string;
  wrapperClassName?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { size = 'm', label, showClearButton = false, onClear, className, wrapperClassName, ...rest },
    ref,
  ) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const hasValue = Boolean(rest.value || rest.defaultValue);

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onClear?.();
    };

    const showClear = showClearButton && (isFocused || hasValue);

    return (
      <div className={clsx(s.wrapper, wrapperClassName)}>
        {label && (
          <label
            className={clsx(s.label, isFocused || hasValue ? s.label_active : '')}
            htmlFor={rest.id}
          >
            {label}
          </label>
        )}
        <div className={clsx(s['input-wrapper'], s[`size_${size}`])}>
          <input
            ref={ref}
            className={clsx(s.input, s[`size_${size}`], className)}
            onFocus={(e) => {
              setIsFocused(true);
              rest.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              rest.onBlur?.(e);
            }}
            {...rest}
          />
          {showClear && (
            <button type="button" className={s['clear-button']} onClick={handleClear}>
              <CrossIcon />
              <span className="visually-hidden">Очистить поле</span>
            </button>
          )}
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
