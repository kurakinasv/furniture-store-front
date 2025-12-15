import * as React from 'react';
import clsx from 'clsx';

import s from './PageWrapper.module.scss';

const PageWrapper: React.FC<DefaultProps> = ({ children, className }) => {
  return (
    <div className={clsx(s.root, className)}>
      <header>
        <h1>Header</h1>
      </header>
      <main className={s.main}>{children}</main>
      <footer>Footer</footer>
    </div>
  );
};

export default PageWrapper;
