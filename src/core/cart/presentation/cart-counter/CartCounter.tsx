import React from 'react';
// BLoC
import { useCartBloc } from '@core/bloc/CartBlocContext';
import { BlocBuilder } from '@core/bloc';
// State
import { UpdatedCartState, CartState } from '@core/cart/presentation/CartState';
// Styles
import styles from './CartCounter.scss';
import classNames from 'classnames';

export const CartCounter = () => {
  const cartBloc = useCartBloc();
  return (
    <div className={classNames(styles[`cart`])}>
      <BlocBuilder
        bloc={cartBloc}
        builder={(state: CartState) => {
          const totalItems =
            cartBloc.state.kind === 'UpdatedCartState'
              ? (cartBloc.state as UpdatedCartState).totalItems
              : 0;

          return (
            <div onClick={() => cartBloc.openCart()}>
              <span className={classNames(styles[`cart--counter`])}>
                {totalItems}
              </span>
              Cart
            </div>
          );
        }}
      />
    </div>
  );
};
