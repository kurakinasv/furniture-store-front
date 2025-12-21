export interface ILocalStorageModel<T> {
  get(): T | null;
  set(value: T): void;
  remove(): void;
}
