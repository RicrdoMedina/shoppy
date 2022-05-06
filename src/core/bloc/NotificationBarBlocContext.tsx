import React from 'react';
import { createContext } from './createContext';
import Container from '@core/app/Container';
import { NotificationBarBloc } from '@core/components/notification-bar/NotificationBarBloc';

const NotificationBarBlocContext = createContext<NotificationBarBloc>();

type ProviderProps = {
  children: React.ReactNode;
};

export const NotificationBarBlocProvider = ({ children }: ProviderProps) => {
  const notificationBarBloc = Container.resolve<NotificationBarBloc>(
    'NotificationBarBloc'
  );
  const notificationBarState: NotificationBarBloc = notificationBarBloc;

  return (
    <NotificationBarBlocContext.Provider value={notificationBarState}>
      {children}
    </NotificationBarBlocContext.Provider>
  );
};

export const useNotificationBarBloc = function useContext() {
  const ctx = React.useContext(NotificationBarBlocContext);
  if (!ctx) throw new Error('context must be inside a Provider with a value');
  return ctx;
};
