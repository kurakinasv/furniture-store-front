import * as React from 'react';
import { Button } from 'components/common';

import { PageWrapper } from 'components/layout';
import { useNavigate } from 'react-router';
import { routes, RoutesEnum } from 'config/routes';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(routes[RoutesEnum.PRODUCT].id('1'));
  };

  return (
    <PageWrapper>
      <h1>HomePage Component</h1>
      <Button onClick={onClick}>Go to detail</Button>
    </PageWrapper>
  );
};

export default HomePage;
