import React from 'react';
// Component
import { SvgExclamation } from '@core/components/svg/svg-exclamation/SvgExclamation';
// Styles
import classnames from 'classnames';
import styles from './ErrorMessage.scss';

export const ErrorMessage = () => {
  const handleReload = () => {
    const url = window.location.href;

    window.location.replace(url);
  };

  return (
    <div
      className={classnames(
        styles[`error-message`],
        'flex',
        'flex-col',
        'items-center',
        'justify-items-center'
      )}>
      <div className="w-full h-full flex flex-col items-center justify-center min-h-screen">
        <div className={classnames(styles[`error-message__content`])}>
          <span className={classnames(styles[`error-message__content--svg`])}>
            <SvgExclamation />
          </span>
        </div>

        <h1 className="text-5xl text-center">Opps!</h1>
        <p className="text-3xl text-center">Ocurrio un error inesperado.</p>

        <button
          className={classnames('text-3xl', 'py-2', 'px-8', 'mt-4')}
          onClick={() => handleReload()}>
          Intentar de nuevo
        </button>
      </div>
    </div>
  );
};
