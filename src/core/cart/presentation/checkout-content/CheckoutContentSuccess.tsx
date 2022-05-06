import React, { useEffect } from 'react';
// Components
import { SvgAnimatedCheck } from '@core/components/svg/svg-animated-error-success/SvgAnimatedCheck';
import { CardContainer } from '@core/components/card-container/CardContainer';
import { Link } from 'react-router-dom';
// BLoC
import { useCartBloc } from '@core/bloc/CartBlocContext';
// styles
import styles from './CheckoutContent.scss';
import classNames from 'classnames';

export const CheckoutContentSuccess = () => {
  const bloc = useCartBloc();

  useEffect(() => {
    bloc.paidCart();
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className={classNames(styles[`checkout__content`])}>
        <CardContainer
          ClassName={classNames(styles[`card-container`], 'h-full')}
          withBg={true}>
          <div className="w-5/6" />
          <div className="w-full mx-auto flex flex-col items-center justify-center pl-4 pr-16 py-12">
            <h3 className="w-full text-center text-3xl">Compra Exitosa</h3>
            <div className="w-full my-4">
              <SvgAnimatedCheck />
            </div>

            <p className="w-full text-base text-center">
              Muchas gracias por su compra.
            </p>
            <p className="w-full text-base text-center">
              Te esperamos de vuelta muy pronto.
            </p>

            <Link to="/home" className="mt-4 py-2 px-4">
              Volver al catálogo
            </Link>
          </div>
        </CardContainer>
      </div>
    </div>
  );
};
