export interface IFavouritesStore {
  favouriteIds: Set<number>;
  isFavourite(productId: number): boolean;
  addFavourite(productId: number): void;
  removeFavourite(productId: number): void;
  toggleFavourite(productId: number): void;
  clearFavourites(): void;
}
