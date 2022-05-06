import React from 'react';
import Container from '@core/app/Container';
// Component
import { SvgPadLock } from '@core/components/svg/svg-padlock/SvgPadLock';
// Utils
import { HistoryHandlerUtils } from '@core/utils';
// Styles
import styles from './PadLock.scss';
import classnames from 'classnames';

export const PadLock = () => {
  const HistoryHandlerUtils = Container.resolve<HistoryHandlerUtils>(
    'HistoryHandlerUtils'
  );

  return (
    <div
      className={classnames(
        styles[`padlock`],
        'flex',
        'flex-col',
        'items-center',
        'justify-items-center'
      )}>
      <div className="w-full h-full flex flex-col items-center justify-center min-h-screen">
        <div className={classnames(styles[`padlock__content`])}>
          <span className={classnames(styles[`padlock__content--num`])}>4</span>
          <span className={classnames(styles[`padlock__content--svg`])}>
            <SvgPadLock />
          </span>
          <span className={classnames(styles[`padlock__content--num`])}>3</span>
        </div>

        <h1 className="text-5xl text-center">Access Denied!</h1>
        <p className="text-3xl text-center">
          Lo sentimos, no tiene acceso a este recurso.
        </p>

        <button
          className={classnames('text-3xl', 'py-2', 'px-8', 'mt-4')}
          onClick={() => HistoryHandlerUtils.goBack()}>
          Regresar
        </button>
      </div>
    </div>
  );
};
