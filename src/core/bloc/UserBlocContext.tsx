import React from 'react';
import { createContext } from './createContext';
import Container from '@core/app/Container';
import { UserBloc } from '@core/user/presentation/UserBloc';

const UserBlocContext = createContext<UserBloc>();

type ProviderProps = {
  children: React.ReactNode;
};

export const UserBlocProvider = ({ children }: ProviderProps) => {
  const userBloc = Container.resolve<UserBloc>('UserBloc');
  const userState: UserBloc = userBloc;

  return (
    <UserBlocContext.Provider value={userState}>
      {children}
    </UserBlocContext.Provider>
  );
};

export const useUserBloc = function useContext() {
  const ctx = React.useContext(UserBlocContext);
  if (!ctx) throw new Error('context must be inside a Provider with a value');
  return ctx;
};
