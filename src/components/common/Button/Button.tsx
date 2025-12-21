import clsx from 'clsx';
import * as React from 'react';

import s from './Button.module.scss';
import type { ButtonColor, ButtonSize } from './types';

type ButtonProps = {
  size?: ButtonSize;
  color?: ButtonColor;
  className?: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ size = 'm', color = 'default', className, children, ...rest }, ref) => (
    <button
      ref={ref}
      className={clsx(s.root, s[`size_${size}`], s[`color_${color}`], className)}
      {...rest}
    >
      {children}
    </button>
  ),
);

Button.displayName = 'Button';

export default Button;
