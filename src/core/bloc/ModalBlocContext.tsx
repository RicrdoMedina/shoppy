import React from 'react';
import { createContext } from './createContext';
import Container from '@core/app/Container';
import { ModalBloc } from '@core/components/modal/ModalBloc';

const ModalBlocContext = createContext<ModalBloc>();

type ProviderProps = {
  children: React.ReactNode;
};

export const ModalBlocProvider = ({ children }: ProviderProps) => {
  const modalBloc = Container.resolve<ModalBloc>('ModalBloc');
  const modalState: ModalBloc = modalBloc;

  return (
    <ModalBlocContext.Provider value={modalState}>
      {children}
    </ModalBlocContext.Provider>
  );
};

export const useModalBloc = function useContext() {
  const ctx = React.useContext(ModalBlocContext);
  if (!ctx) throw new Error('context must be inside a Provider with a value');
  return ctx;
};
