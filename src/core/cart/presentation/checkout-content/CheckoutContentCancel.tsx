import React from 'react';
import { Link } from 'react-router-dom';
// Components
import { SvgAnimatedError } from '@core/components/svg/svg-animated-error-success/SvgAnimatedError';
import { CardContainer } from '@core/components/card-container/CardContainer';
// styles
import styles from './CheckoutContent.scss';
import classnames from 'classnames';

export const CheckoutContentCancel = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className={classnames(styles[`checkout__content`])}>
        <CardContainer
          ClassName={classnames(styles[`card-container`], 'h-full')}
          withBg={true}>
          <div className="w-5/6">
            <span />
          </div>
          <div className="w-full mx-auto flex flex-col items-center justify-center pl-4 pr-16 py-12">
            <h3 className="w-full text-center text-3xl">Compra Cancelada</h3>
            <div className="w-full my-4">
              <SvgAnimatedError />
            </div>

            <p className="w-full text-base text-center">
              Su compra no fue procesada.
            </p>
            <p className="w-full text-base text-center">
              Por favor verifique sus datos y vuelva a intentarlo.
            </p>

            <Link to="/cart" className="mt-4 py-2 px-4">
              Volver al carrtito
            </Link>
          </div>
        </CardContainer>
      </div>
    </div>
  );
};
