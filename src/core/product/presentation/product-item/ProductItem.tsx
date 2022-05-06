import React from 'react';
// Components
import { SimpleButton } from '@core/components/button/simple-button/SimpleButton';
// BLoC
import { Product } from '../../domain/Product';
import { useCartBloc } from '@core/bloc/CartBlocContext';
// Utils
import NumberHandlerUtils from '@core/utils/NumberHandlerUtils';
// Styles
import styles from './ProductItem.scss';
import classNames from 'classnames';

interface ProductListProps {
  product: Product;
}

export const ProductItem: React.FC<ProductListProps> = ({ product }) => {
  const NumberHandle = NumberHandlerUtils;
  const bloc = useCartBloc();
  const image: string = product.images.length > 0 ? product.images[0] : '';

  const handleAddCart = (product: Product) => {
    bloc.state.totalItems === 0
      ? bloc.addProductToCart(product)
      : bloc.updateProductToCart(product);
  };

  return (
    <div className={classNames(styles[`card`])}>
      <div className={classNames(styles[`card__media`])}>
        <img src={image} alt="" />
      </div>
      <div className={classNames(styles[`card_content`])}>
        <h3 className={classNames(styles[`card__content--title`])}>
          {product.name}
        </h3>
        <strong className={classNames(styles[`card__content--price`])}>
          {NumberHandle.toUsd(product.unit_amount)}
        </strong>
      </div>
      <div
        className={classNames(
          styles[`card__actions`],
          'flex',
          'items-center',
          'justify-center'
        )}>
        <SimpleButton
          title="AGREGAR"
          size="s-sm"
          onClick={() => handleAddCart(product)}
        />
      </div>
    </div>
  );
};
