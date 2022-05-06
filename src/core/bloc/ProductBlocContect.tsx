import React from 'react';
import { createContext } from './createContext';
import Container from '@core/app/Container';
import { ProductBloc } from '@core/product/presentation/ProductBloc';

const ProductBlocContext = createContext<ProductBloc>();

type ProviderProps = {
  children: React.ReactNode;
};

export const ProductBlocProvider = ({ children }: ProviderProps) => {
  const productBloc = Container.resolve<ProductBloc>('ProductBloc');
  const productState: ProductBloc = productBloc;

  return (
    <ProductBlocContext.Provider value={productState}>
      {children}
    </ProductBlocContext.Provider>
  );
};

export const useProductBloc = function useContext() {
  const ctx = React.useContext(ProductBlocContext);
  if (!ctx) throw new Error('context must be inside a Provider with a value');
  return ctx;
};
