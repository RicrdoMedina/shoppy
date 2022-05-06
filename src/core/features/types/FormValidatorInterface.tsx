// tslint:disable: no-any
import FormValidator from '@core/features/common/FormValidator';

export interface InputInterface {
  name: string;
  label: string;
  validator: FormValidator;
  initialVal: string;
  handleStatusForm: Function;
  hasError: boolean;
}

export interface ApplyValidationInterface {
  val: string;
  message: string;
}

export interface InputValuesInterface {
  [key: string]: string;
}

export interface SchemaFieldInterface {
  val: string | number;
  message?: string;
  label?: string;
  isValid: boolean;
  name: string;
  applyValidation: Array<string>;
}

export interface FieldsInterface {
  [key: string]: any;
}

export interface ValidationsInterface {
  [key: string]: any;
}

export interface RegexInterface {
  email: RegExp;
  number: RegExp;
  string: RegExp;
}

export interface ErrorsInterface {
  showMessage: string;
  field: string;
  message: string;
}

export interface HandleValidationInterface {
  required: Function;
  email: Function;
  minLegth: Function;
  maxLegth: Function;
  string: Function;
}

export interface ComponentFormValidatorInterface {
  type: 'email' | 'text' | 'password';
  name: string;
  label: string;
  initialVal: string;
  validator: FormValidator;
  handleStatusForm: Function;
  hasError: boolean;
}

export interface ConfigFieldCollectionInterface {
  handleStatusForm: Function;
  hasError: boolean;
  initialVal: string;
  label: string;
  name: string;
  type: string;
  validator: FormValidator;
}

export interface FieldCollectionInterface {
  type: string;
  confing: ConfigFieldCollectionInterface;
}

export interface RedirectLinkInterface {
  url: string;
  text: string;
}
