import { BrowserRouter, Navigate, Route, Routes } from 'react-router';
import { HomePage, ProductDetailPage, ProductsListPage, UIKitPage } from './pages';
import { RoutesEnum } from './config/routes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutesEnum.HOME} element={<HomePage />} />
        <Route path={RoutesEnum.PRODUCTS} element={<ProductsListPage />} />
        <Route path={`${RoutesEnum.PRODUCT}/:id`} element={<ProductDetailPage />} />
        <Route path={RoutesEnum.UI_KIT} element={<UIKitPage />} />
        <Route path="*" element={<Navigate to={RoutesEnum.HOME} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
