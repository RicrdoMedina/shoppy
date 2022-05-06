import React from 'react';
// BLoC
import { useCartBloc } from '@core/bloc/CartBlocContext';
import { useModalBloc } from '@core/bloc/ModalBlocContext';
import { ContentModalInterface } from '@core/features/types/';
// States
import { CartItemState } from '../CartState';
// Components
import { SvgDelete } from '@core/components/svg/svg-delete/SvgDelete';
import { InputNumber } from '@core/components/form/input-number/InputNumber';
// Utils
import NumberHandlerUtils from '@core/utils/NumberHandlerUtils';
// styles
import styles from './CartItem.scss';
import classNames from 'classnames';

type CartProps = {
  key: number;
  cartItem: CartItemState;
};

export const CartItem = ({ cartItem }: CartProps) => {
  const NumberHandle = NumberHandlerUtils;
  const bloc = useCartBloc();
  const blocModal = useModalBloc();
  const image: string = cartItem.images.length > 0 ? cartItem.images[0] : '';

  const handleChangeInput = (val: number) => {
    bloc.editQuantityCartItem(cartItem, val);
  };

  const handleOpenModal = () => {
    const contentModal: ContentModalInterface = {
      title: 'Eliminar del carrito',
      buttonSuccess: {
        title: 'Aceptar',
        callback: function() {
          bloc.removeCartItem(cartItem);
          blocModal.fadeOutModal();
        }
      },
      buttonCancel: {
        title: 'Cancelar',
        callback: function() {
          blocModal.fadeOutModal();
        }
      },
      component: {
        name: 'confirmation',
        config: { img: image, text: `¿Deseas eliminar ${cartItem.name}?` }
      }
    };

    blocModal.openModal(contentModal);
  };

  return (
    <div className={classNames(styles[`cart-item`])}>
      <div
        className={classNames(
          styles[`cart-item__img`],
          'flex',
          'items-center',
          'justify-center',
          'flex-grow-0'
        )}>
        <img width="80" src={image} alt={cartItem.name} />
      </div>
      <div
        className={classNames(
          styles[`cart-item__description`],
          'flex',
          'flex-col',
          'flex-grow',
          'w-full'
        )}>
        <h3>{cartItem.name}</h3>
        <div className={classNames(styles[`cart_item__description--quantity`])}>
          <InputNumber
            label="Cantidad"
            minDefault={0}
            maxDefault={20}
            initialValue={cartItem.quantity}
            fnCallback={handleChangeInput}
          />
          <div
            className={classNames(
              styles[`price`],
              'w-full',
              'mt-4',
              'pl-4',
              'flex',
              'items-center',
              'justify-start'
            )}>
            {NumberHandle.toUsd(cartItem.unit_amount)}
          </div>
        </div>
      </div>
      <div
        className={classNames(
          styles[`cart-item_actions`],
          'flex',
          'items-center',
          'justify-center',
          'flex-grow-0',
          'cursor-pointer'
        )}>
        <span onClick={() => handleOpenModal()}>
          <SvgDelete />
        </span>
      </div>
    </div>
  );
};
