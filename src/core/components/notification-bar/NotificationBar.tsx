import React from 'react';
// Component
import { ContentNotificationBar } from './ContentNotificationBar';
// State
import {
  NotificationState,
  ShowNotificationBarState
} from '@core/components/notification-bar/NotificationBarState';
// Bloc
import { BlocBuilder } from '@core/bloc';
import { useNotificationBarBloc } from '@core/bloc/NotificationBarBlocContext';

export const NotificationBar = () => {
  const bloc = useNotificationBarBloc();

  return (
    <BlocBuilder
      bloc={bloc}
      builder={(state: NotificationState) => {
        const {
          message,
          type
        } = (bloc.state as ShowNotificationBarState).config;

        switch (state.kind) {
          case 'ShowNotificationState': {
            return <ContentNotificationBar type={type} message={message} />;
            break;
          }
          default:
            return <></>;
        }
      }}
    />
  );
};
