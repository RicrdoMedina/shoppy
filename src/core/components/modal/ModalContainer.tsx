// tslint:disable: no-any
import React from 'react';
import { createPortal } from 'react-dom';

type ModalContainerProps = {
  children: React.ReactNode;
};

export const ModalContainer = ({ children }: ModalContainerProps) => {
  const modalContainer: any = document.getElementById('modal');

  return createPortal(children, modalContainer);
};
