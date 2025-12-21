export enum RoutesEnum {
  HOME = '/',
  PRODUCTS = '/products',
  PRODUCT = '/product',
  UI_KIT = '/ui-kit',
  FAVOURITES = '/favourites',
}

export const routes = {
  [RoutesEnum.HOME]: {
    path: RoutesEnum.HOME,
  },
  [RoutesEnum.PRODUCTS]: {
    path: RoutesEnum.PRODUCTS,
  },
  [RoutesEnum.PRODUCT]: {
    path: RoutesEnum.PRODUCT,
    id: (id: string) => `${RoutesEnum.PRODUCT}/${id}`,
  },
  [RoutesEnum.UI_KIT]: {
    path: RoutesEnum.UI_KIT,
  },
  [RoutesEnum.FAVOURITES]: {
    path: RoutesEnum.FAVOURITES,
  },
};
