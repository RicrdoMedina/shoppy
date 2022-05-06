import React from 'react';
import Container from '@core/app/Container';
// Component
import { SvgNotice } from '@core/components/svg/svg-notice/SvgNotice';
// Utils
import { HistoryHandlerUtils } from '@core/utils';
// Styles
import styles from './NoFoundContent.scss';
import classnames from 'classnames';

export const NoFoundContent = () => {
  const HistoryHandlerUtils = Container.resolve<HistoryHandlerUtils>(
    'HistoryHandlerUtils'
  );

  return (
    <div
      className={classnames(
        styles[`no-found`],
        'flex',
        'flex-col',
        'items-center',
        'justify-items-center'
      )}>
      <div className="w-full h-full flex flex-col items-center justify-center min-h-screen">
        <div className={classnames(styles[`no-foud__content`])}>
          <span className={classnames(styles[`no-foud__content--num`])}>4</span>
          <span className={classnames(styles[`no-foud__content--svg`])}>
            <SvgNotice />
          </span>
          <span className={classnames(styles[`no-foud__content--num`])}>4</span>
        </div>

        <h1 className="text-5xl text-center">No Found!</h1>
        <p className="text-3xl text-center">
          Lo sentimos, el recurso no se encuentra disponible.
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
