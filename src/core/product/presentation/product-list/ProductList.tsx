import React, { useEffect } from 'react';
// Components
import { ProductItem } from '../product-item/ProductItem';
import { SkeletonProductItem } from '../product-item/ SkeletonProductItem';
import { CardContainer } from '@core/components/card-container/CardContainer';
// BLoC
import { useProductBloc } from '@core/bloc/ProductBlocContect';
import { BlocBuilder } from '@core/bloc';
// States
import { ProductsState } from '../ProductsState';
// Styles
import styles from './ProductList.scss';
import classNames from 'classnames';

export const ProductList = () => {
  const bloc = useProductBloc();

  useEffect(() => {
    const searchProducts = async (filter: string) => {
      bloc.search(filter);
    };

    searchProducts('Element');
  }, [bloc]);

  return (
    <BlocBuilder
      bloc={bloc}
      builder={(state: ProductsState) => {
        switch (state.kind) {
          case 'LoadingProductsState': {
            return (
              <div className={classNames(styles['product-list'])}>
                <SkeletonProductItem />
              </div>
            );
          }
          case 'ErrorProductsState': {
            return <div>{state.error}</div>;
          }
          case 'LoadedProductsState': {
            return (
              <div className={classNames(styles['product-list'], 'pt-12')}>
                <CardContainer
                  title="Productos"
                  ClassName={styles['product-list__products']}>
                  {state.products.map((product, index) => (
                    <ProductItem product={product} key={index} />
                  ))}
                </CardContainer>
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
