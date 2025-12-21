import clsx from 'clsx';
import * as React from 'react';

import s from './Typography.module.scss';
import type { TypographyColor, TypographyTag, TypographyVariant } from './types';

type TypographyProps = {
  tag?: TypographyTag;
  variant?: TypographyVariant;
  color?: TypographyColor;
  align?: React.CSSProperties['textAlign'];
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<TypographyTag>, 'color' | 'align'>;

const Typography = ({
  tag,
  variant = 'text-base',
  color = 'black',
  align = 'start',
  className,
  children,
  ...rest
}: TypographyProps): React.ReactElement => {
  const Component = (tag ?? 'span') as TypographyTag;

  return (
    <Component
      className={clsx(s[`variant_${variant}`], s[`color_${color}`], className)}
      style={{ textAlign: align }}
      {...rest}
    >
      {children}
    </Component>
  );
};

export default Typography;
