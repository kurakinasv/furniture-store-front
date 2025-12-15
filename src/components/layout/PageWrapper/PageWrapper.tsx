import * as React from 'react';
import clsx from 'clsx';

import s from './PageWrapper.module.scss';
import { Header } from '../Header';

const PageWrapper: React.FC<DefaultProps> = ({ children, className }) => {
  return (
    <div className={clsx(s.root, className)}>
      <Header />
      <main className={s.main}>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export default PageWrapper;
