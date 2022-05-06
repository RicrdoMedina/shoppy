import React from 'react';
// Components
import { Confirmation } from './components/Confirmation';
// types
import {
  ModalConfirmationComponentInterface,
  ModalComponentsPropsInterface
} from '@core/features/types/';

type IModalComponents = {
  confirmation({ img, text }: ModalConfirmationComponentInterface): JSX.Element;
};

export const ComponentCollection = ({
  name,
  config
}: ModalComponentsPropsInterface) => {
  const components: IModalComponents = {
    confirmation: Confirmation
  };

  const ComponentCollection = components[name.toLowerCase()]; // tslint:disable-line

  return <ComponentCollection {...config} />;
};
