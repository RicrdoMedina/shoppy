import React from 'react';
// State
import { FadeOutModalState, ModalState, OpenModalState } from './ModalState';
// BLoC
import { useModalBloc } from '@core/bloc/ModalBlocContext';
import { BlocBuilder } from '@core/bloc';
// Components
import { ModalContainer } from './ModalContainer';
import { ContentModal } from './ContentModal';

export const Modal = () => {
  const bloc = useModalBloc();

  return (
    <BlocBuilder
      bloc={bloc}
      builder={(state: ModalState) => {
        const open = (bloc.state as OpenModalState).open;
        const fadeOut = (bloc.state as FadeOutModalState).fadeOut;
        const contentModal = (bloc.state as OpenModalState).contentModal;

        switch (state.kind) {
          case 'FadeOutModalState':
          case 'OpenModalState': {
            return (
              <ModalContainer>
                <ContentModal
                  open={open}
                  fadeOut={fadeOut}
                  contentModal={contentModal}
                />
              </ModalContainer>
            );
            break;
          }
          default:
            return <></>;
        }
      }}
    />
  );
};
