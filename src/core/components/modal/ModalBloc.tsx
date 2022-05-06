import { ModalState, ModalInitialState } from './ModalState';
import { Bloc } from '@core/bloc';
import { ContentModalInterface } from '@core/features/types';

export class ModalBloc extends Bloc<ModalState> {
  constructor() {
    super(ModalInitialState);
  }

  getModalState() {
    const state = this.getState();
    return state;
  }

  closeModal() {
    this.changeState({
      kind: 'CloseModalState',
      open: false,
      fadeOut: false
    });
  }

  fadeOutModal() {
    this.changeState({
      open: true,
      fadeOut: true,
      kind: 'FadeOutModalState'
    });
  }

  openModal(config: ContentModalInterface) {
    this.changeState({
      kind: 'OpenModalState',
      open: true,
      fadeOut: false,
      contentModal: config
    });
  }
}
