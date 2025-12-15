import * as React from 'react';
import { Button as AntdButton, type ButtonProps } from 'antd';

const Button: React.FC<React.PropsWithChildren<ButtonProps>> = ({ children, ...props }) => {
  return <AntdButton {...props}>{children}</AntdButton>;
};

export default Button;
