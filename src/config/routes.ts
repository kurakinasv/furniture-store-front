export enum RoutesEnum {
  HOME = '/',
  PRODUCT = '/product',
  UI_KIT = '/ui-kit',
}

export const routes = {
  [RoutesEnum.HOME]: {
    path: RoutesEnum.HOME,
  },
  [RoutesEnum.PRODUCT]: {
    path: RoutesEnum.PRODUCT,
    id: (id: string) => `${RoutesEnum.PRODUCT}/${id}`,
  },
  [RoutesEnum.UI_KIT]: {
    path: RoutesEnum.UI_KIT,
  },
};
