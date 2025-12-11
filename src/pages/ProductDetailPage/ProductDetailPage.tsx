import { Button } from 'components/common';
import { useNavigate } from 'react-router';
import * as React from 'react';
import { PageWrapper } from 'components/layout';

const ProductDetailPage: React.FC = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };

  return (
    <PageWrapper>
      <h1>ProductDetailPage Component</h1>
      <Button onClick={onClick}>Back</Button>
    </PageWrapper>
  );
};

export default ProductDetailPage;
