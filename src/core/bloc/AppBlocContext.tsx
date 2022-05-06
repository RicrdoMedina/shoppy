import * as React from 'react';
import { createContext } from '@core/bloc/Context';
import { AppBloc } from '@core/app/AppBloc';
import Container from '@core/app/Container';

const [AppBlocContext, useApp] = createContext<AppBloc>();

export const useAppBloc = useApp;

type AppBlocProps = {
  children: React.ReactNode;
};

export const AppBlocProvider = ({ children }: AppBlocProps) => {
  const appBloc = Container.resolve<AppBloc>('AppBloc');
  const appState: AppBloc = appBloc;

  return (
    <AppBlocContext.Provider value={appState}>
      {children}
    </AppBlocContext.Provider>
  );
};
