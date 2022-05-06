import React from 'react';
// Components
import { SvgDelete } from '@core/components/svg/svg-delete/SvgDelete';
// Bloc
import { useNotificationBarBloc } from '@core/bloc/NotificationBarBlocContext';
// CONSTANTS
import {
  NOTIFICATION_BAR_ERROR,
  NOTIFICATION_BAR_INFO,
  NOTIFICATION_BAR_SUCCESSFULL,
  NOTIFICATION_BAR_WARNING
} from '@core/features/constants/';
// Types
import { NotificationBarInterface } from '@core/features/types/';

// Styles
import styles from './NotificationBar.scss';
import classNames from 'classnames';

export const ContentNotificationBar = ({
  type,
  message
}: NotificationBarInterface): JSX.Element => {
  const bloc = useNotificationBarBloc();

  const handleClose = () => {
    bloc.hiddenNotification();
  };

  return (
    <div
      className={classNames(
        styles['notification-bar'],
        { [`${styles.error}`]: type === NOTIFICATION_BAR_ERROR },
        { [`${styles.info}`]: type === NOTIFICATION_BAR_INFO },
        { [`${styles.warning}`]: type === NOTIFICATION_BAR_WARNING },
        {
          [`${styles.success}`]: type === NOTIFICATION_BAR_SUCCESSFULL
        },
        'w-full',
        'fixed',
        'top-0',
        'flex',
        'items-center',
        'justify-center',
        'text-sm',
        'h-10',
        'z-10'
      )}>
      {message}
      <span
        className={classNames(
          styles['notification-bar__close'],
          'cursor-pointer'
        )}
        onClick={() => handleClose()}>
        <SvgDelete />
      </span>
    </div>
  );
};
