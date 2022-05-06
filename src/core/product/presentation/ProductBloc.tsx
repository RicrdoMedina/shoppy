import GetProductsUseCase from '../domain/GetProductsUseCase';
import { Bloc } from '@core/bloc';
import { ProductsState, productsInitialState } from './ProductsState';

export class ProductBloc extends Bloc<ProductsState> {
  getProductsUseCase: GetProductsUseCase;
  
  constructor({
    GetProductsUseCase
  }: {
    GetProductsUseCase: GetProductsUseCase;
  }) {
    super(productsInitialState);
    this.getProductsUseCase = GetProductsUseCase;
  }

  search(filter: string) {
    this.getProductsUseCase
      .execute(filter)
      .then(products => {
        this.changeState({
          kind: 'LoadedProductsState',
          products: products,
          searchTerm: this.state.searchTerm
        });
      })
      .catch(error =>
        this.changeState({
          kind: 'ErrorProductsState',
          error,
          searchTerm: this.state.searchTerm
        })
      );
  }
}
