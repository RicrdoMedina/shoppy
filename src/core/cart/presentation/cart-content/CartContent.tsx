// tslint:disable: no-any
import React from 'react';
// Components
import { Link } from 'react-router-dom';
import { CartItem } from '../cart-item/CartItem';
import { SvgEmptyCart } from '@core/components/svg/svg-empty-cart/SvgEmptyCart';
import { CardContainer } from '@core/components/card-container/CardContainer';
// Styles
import { CartState, CartItemState } from '../CartState';
// BLoC
import { useCartBloc } from '@core/bloc/CartBlocContext';
import { BlocBuilder } from '@core/bloc';
// Utils
import { config } from '@core/features/config';
import NumberHandlerUtils from '@core/utils/NumberHandlerUtils';
// Libraries
import { loadStripe } from '@stripe/stripe-js';
// styles
import styles from './CartContent.scss';
import classNames from 'classnames';

const STRIPE_API_KEY = config.stripeApiKey;

const stripePromise = loadStripe(STRIPE_API_KEY);

export const CartContent = () => {
  const bloc = useCartBloc();

  const NumberHandle = NumberHandlerUtils;

  const handleSubmit = async () => {
    const stripe: any = await stripePromise;
    const sessionId: string = await bloc.createCheckoutSesion();

    await stripe.redirectToCheckout({
      sessionId
    });
  };

  const cartContent = (items: Array<CartItemState>, totalPrice: number) => {
    return (
      <CardContainer title="Carrito de compras" ClassName="pt-12 px-8">
        <div className="w-full mb-4">
          {cartItems(items)}
          <div
            className={classNames(
              styles[`cart__total`],
              'flex',
              'flex-col',
              'items-end',
              'justify-center',
              'pr-8',
              'mb-4'
            )}>
            <div className="w-auto flex items-center">
              <span
                className={classNames(
                  styles[`price-total`],
                  'text-2xl',
                  'mr-2'
                )}>
                Total:
              </span>
              <span className={classNames(styles[`price`], 'text-2xl')}>
                {NumberHandle.toUsd(totalPrice)}
              </span>
            </div>
            <div className="w-auto flex items-center justify-between mt-4">
              <Link
                className={classNames(
                  styles[`button-back`],
                  'mr-2',
                  'py-2',
                  'px-4'
                )}
                to="/">
                Volver
              </Link>
              <button
                className={classNames(styles['button-sell'], 'py-2', 'px-4')}
                type="button"
                onClick={() => handleSubmit()}>
                Comprar
              </button>
            </div>
          </div>
        </div>
      </CardContainer>
    );
  };

  const cartItems = (items: CartItemState[]) => {
    return items.map((item, index) => <CartItem key={index} cartItem={item} />);
  };

  const emptyCartItems = () => (
    <CardContainer
      title="Carrito de compras"
      withBg={true}
      ClassName={classNames(styles[`card-container`], 'pt-12', 'px-8', 'flex')}>
      <div className="w-5/6">
        <span />
      </div>
      <div className="w-full mx-auto flex flex-col items-center justify-center pl-4 pr-16 py-12">
        <div
          className={classNames(
            styles[`cart__empty`],
            'flex',
            'flex-col',
            'items-center',
            'justify-center'
          )}>
          <SvgEmptyCart />
          <p className="w-full text-center text-base">Agrega un producto</p>
          <Link
            className={classNames(
              styles['button-back'],
              'mt-4',
              'mr-2',
              'py-2',
              'px-4'
            )}
            to="/home">
            Volver al catalogo
          </Link>
        </div>
      </div>
    </CardContainer>
  );

  const handleCart = (items: Array<CartItemState>, totalPrice: number) => {
    return cartContent(items, totalPrice);
  };

  return (
    <BlocBuilder
      bloc={bloc}
      builder={(state: CartState) => {
        switch (state.kind) {
          case 'LoadingCartState': {
            return <div />;
          }
          case 'ErrorCartState': {
            return <div>{state.error}</div>;
          }
          case 'UpdatedCartState': {
            const items = state.items;
            const totalPrice = Number(state.totalPrice);
            return (
              <div className="w-full h-full flex items-center justify-center">
                <div
                  className={classNames(
                    styles['cart-content'],
                    'flex',
                    'h-full',
                    'relative'
                  )}>
                  {state.items.length > 0
                    ? handleCart(items, totalPrice)
                    : emptyCartItems()}
                </div>
              </div>
            );
          }
          default:
            return <></>;
        }
      }}
    />
  );
};
