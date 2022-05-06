import { Product } from '../domain/Product';
import { ApiErrorsInterface } from '@core/features/types/';

export interface CommonProductsState {
  searchTerm: string;
}

export interface LoadingProductsState {
  kind: 'LoadingProductsState';
}

export interface LoadedProductsState {
  kind: 'LoadedProductsState';
  products: Array<Product>;
}

export interface ErrorProductsState {
  kind: 'ErrorProductsState';
  error: ApiErrorsInterface;
}

export type ProductsState = (
  | LoadingProductsState
  | LoadedProductsState
  | ErrorProductsState
) &
  CommonProductsState;

export const productsInitialState: ProductsState = {
  kind: 'LoadingProductsState',
  searchTerm: ''
};
