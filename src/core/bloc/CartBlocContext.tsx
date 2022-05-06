import React from 'react';
import { createContext } from './createContext';
import Container from '@core/app/Container';
import { CartBloc } from '@core/cart/presentation/CartBloc';

const CartBlocContext = createContext<CartBloc>();

type ProviderProps = {
  children: React.ReactNode;
};

export const CartBlocProvider = ({ children }: ProviderProps) => {
  const cartBloc = Container.resolve<CartBloc>('CartBloc');
  const cartState: CartBloc = cartBloc;

  return (
    <CartBlocContext.Provider value={cartState}>
      {children}
    </CartBlocContext.Provider>
  );
};

export const useCartBloc = function useContext() {
  const ctx = React.useContext(CartBlocContext);
  if (!ctx) throw new Error('context must be inside a Provider with a value');
  return ctx;
};
