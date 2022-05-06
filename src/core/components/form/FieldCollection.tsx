import React from 'react';
// components
import { InputText } from './input/InputText';
import { InputEmail } from './input/InputEmail';
import { InputPassword } from './input/InputPassword';
import { RedirectLink } from '../redirect/RedirectLink';
// types
import {
  RedirectLinkInterface,
  ConfigFieldCollectionInterface,
  FieldCollectionInterface
} from '@core/features/types/';

type ComponentsProps = {
  basic({
    handleStatusForm,
    hasError,
    initialVal,
    label,
    name,
    type,
    validator
  }: ConfigFieldCollectionInterface): JSX.Element;
  text({
    handleStatusForm,
    hasError,
    initialVal,
    label,
    name,
    type,
    validator
  }: ConfigFieldCollectionInterface): JSX.Element;
  email({
    handleStatusForm,
    hasError,
    initialVal,
    label,
    name,
    type,
    validator
  }: ConfigFieldCollectionInterface): JSX.Element;
  password({
    handleStatusForm,
    hasError,
    initialVal,
    label,
    name,
    type,
    validator
  }: ConfigFieldCollectionInterface): JSX.Element;
  redirectlink({ text, url }: RedirectLinkInterface): JSX.Element;
};

const components: ComponentsProps = {
  basic: InputText,
  text: InputText,
  email: InputEmail,
  password: InputPassword,
  redirectlink: RedirectLink
};

export const FieldCollection = ({
  type,
  confing
}: FieldCollectionInterface) => {
  const Input = components[type.toLowerCase() || 'basic'];

  return <Input {...confing} />;
};
