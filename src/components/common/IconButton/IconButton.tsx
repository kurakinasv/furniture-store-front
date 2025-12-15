import clsx from 'clsx';
import * as React from 'react';

import s from './IconButton.module.scss';
import type { IconButtonSize, IconButtonVariant } from './types';

type IconButtonProps = {
  size?: IconButtonSize;
  variant?: IconButtonVariant;
  active?: boolean;
  icon: React.ReactNode;
  className?: string;
  alt: string;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>;

const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ size = 'm', variant = 'default', active = false, icon, className, alt, ...rest }, ref) => (
    <button
      ref={ref}
      type="button"
      className={clsx(
        s.root,
        s[`size_${size}`],
        s[`variant_${variant}`],
        active && s.active,
        className,
      )}
      {...rest}
    >
      {icon}
      <span className="visually-hidden">{alt}</span>
    </button>
  ),
);

IconButton.displayName = 'IconButton';

export default IconButton;
