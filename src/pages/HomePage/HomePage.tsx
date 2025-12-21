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

  const onClickUIKit = () => {
    navigate(RoutesEnum.UI_KIT);
  };

  const onClickProducts = () => {
    navigate(RoutesEnum.PRODUCTS);
  };

  return (
    <PageWrapper>
      <h1>HomePage Component</h1>
      <Button onClick={onClick}>Go to detail</Button>
      <Button onClick={onClickProducts}>Go to Products List</Button>
      <Button onClick={onClickUIKit}>Go to UI Kit</Button>
    </PageWrapper>
  );
};

export default HomePage;
