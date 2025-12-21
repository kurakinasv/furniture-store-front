import * as React from 'react';
import clsx from 'clsx';

import s from './PageWrapper.module.scss';
import { Header } from '../Header';
import { Footer } from '../Footer';

const PageWrapper: React.FC<DefaultProps> = ({ children, className }) => {
  return (
    <div className={clsx(s.root, className)}>
      <Header />
      <main className={s.main}>{children}</main>
      <Footer />
    </div>
  );
};

export default PageWrapper;
