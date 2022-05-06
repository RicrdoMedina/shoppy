export interface ModalButtonSuccessInterface {
  title: 'Aceptar' | 'Enviar';
  callback: Function;
}

export interface ModalButtonCancelInterface {
  title: 'Cancelar' | 'Cerrar';
  callback: Function;
}

export interface ModalPropsInterface {
  name: 'confirmation';
  config: ModalInterface;
}

export interface ModalConfirmationComponentInterface {
  img: string;
  text: string;
}

export interface ModalComponentsPropsInterface {
  name: 'confirmation';
  config: ModalConfirmationComponentInterface;
}

export interface ModalInterface {
  open: boolean;
  fadeOut: boolean;
  contentModal: ContentModalInterface;
}

export interface ContentModalInterface {
  title: string;
  buttonSuccess: ModalButtonSuccessInterface;
  buttonCancel: ModalButtonCancelInterface;
  component: ModalComponentsPropsInterface;
}
