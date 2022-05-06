import React from 'react';
// Components
import { CardContainer } from '@core/components/card-container/CardContainer';
// Styles
import productListStyles from '../product-list/ProductList.scss';
import styles from './ProductItem.scss';
import classnames from 'classnames';

export const SkeletonProductItem = () => {
  const elements: Array<Number> = [
    1,
    2,
    3,
    4,
    5,
    6,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20
  ];

  return (
    <CardContainer
      title="Productos"
      ClassName={classnames(
        productListStyles[`product-list__products`],
        'pt-12'
      )}>
      {elements.map((el, i) => (
        <div className={classnames(styles[`card`], styles[`skeleton`])} key={i}>
          <div className={classnames(styles[`card__media`])} />
          <div className={classnames(styles[`card_content`])}>
            <h3 className={classnames(styles[`card__content--title`])} />
            <strong className={classnames(styles[`card__content--price`])} />
          </div>
          <div className={classnames(styles[`card__actions`])}>
            <button className={classnames(styles[`card__actions--button`])} />
          </div>
        </div>
      ))}
    </CardContainer>
  );
};
