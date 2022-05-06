import { ContentModalInterface } from '@core/features/types/';

export interface CloseModalState {
  kind: 'CloseModalState';
  open: boolean;
  fadeOut: boolean;
}

export interface FadeOutModalState {
  kind: 'FadeOutModalState';
  fadeOut: boolean;
  open: boolean;
}
export interface OpenModalState {
  kind: 'OpenModalState';
  open: boolean;
  fadeOut: boolean;
  contentModal: ContentModalInterface;
}

export type ModalState = OpenModalState | FadeOutModalState | CloseModalState;

export const ModalInitialState: ModalState = {
  kind: 'CloseModalState',
  open: false,
  fadeOut: false
};
