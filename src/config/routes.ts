export enum RoutesEnum {
  HOME = '/',
  PRODUCT = '/product',
}

export const routes = {
  [RoutesEnum.HOME]: {
    path: RoutesEnum.HOME,
  },
  [RoutesEnum.PRODUCT]: {
    path: RoutesEnum.PRODUCT,
    id: (id: string) => `${RoutesEnum.PRODUCT}/${id}`,
  },
};
