import React from 'react';
// state
import { CommonUserState, UserState } from '../UserState';
// BLoC
import { useUserBloc } from '@core/bloc/UserBlocContext';
import { BlocBuilder } from '@core/bloc';
// components
import { Form } from '@core/components/form/Form';
import { Link } from 'react-router-dom';
// utils
import FormValidator from '@core/features/common/FormValidator';
// types
import { UserSignUp } from '../../domain/User';
import {
  InputValuesInterface,
  ComponentFormValidatorInterface
} from '@core/features/types/';
// Styles
import styles from './SignInForm.scss';
import classNames from 'classnames';

const validations = {
  name: ['required', 'string'],
  lastName: ['required', 'string'],
  username: ['required', 'email'],
  password: [
    'required',
    { min: 3, key: 'minLegth' },
    { max: 15, key: 'maxLegth' }
  ]
};

export const SignUpForm = () => {
  const bloc = useUserBloc();
  const formValidator: FormValidator = new FormValidator(validations);

  const components: Array<ComponentFormValidatorInterface> = [
    {
      type: 'text',
      name: 'name',
      label: 'Nombres',
      initialVal: '',
      validator: formValidator,
      handleStatusForm: () => undefined,
      hasError: false
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Apellidos',
      initialVal: '',
      validator: formValidator,
      handleStatusForm: () => undefined,
      hasError: false
    },
    {
      type: 'email',
      name: 'username',
      label: 'Correo Electrónico',
      initialVal: '',
      validator: formValidator,
      handleStatusForm: () => undefined,
      hasError: false
    },
    {
      type: 'password',
      name: 'password',
      label: 'Contraseña',
      initialVal: '',
      validator: formValidator,
      handleStatusForm: () => undefined,
      hasError: false
    }
  ];

  const handleSendForm = () => {
    const data: InputValuesInterface = formValidator.getValues();

    const user: UserSignUp = {
      lastName: data.lastName,
      name: data.name,
      password: data.password,
      username: data.username
    };

    bloc.signUp(user);
  };

  return (
    <BlocBuilder
      bloc={bloc}
      builder={(state: UserState) => {
        const { error } = bloc.state as CommonUserState;
        const isLoading = state.kind === 'LoadingUserState';

        switch (state.kind) {
          case 'ErrorUserState':
          case 'SignInUserState':
          case 'LoadingUserState': {
            return (
              <div
                className={classNames(
                  styles['sign-in-box'],
                  'flex',
                  'flex-col',
                  'items-center',
                  'justify-center'
                )}>
                <div
                  className={classNames(
                    styles['form-sign-in'],
                    'pt-4',
                    'pb-12',
                    'px-12'
                  )}>
                  <h3 className="w-full text-center text-4xl my-4">Sign Up</h3>
                  <Form
                    textButton="Registrar"
                    components={components}
                    validator={formValidator}
                    handleSendForm={handleSendForm}
                    errors={error}
                    isLoading={isLoading}
                  />
                  <div className="flex flex-col items-center justify-center pt-12 pb-4">
                    <p className="w-full text-sm text-center pb-4">
                      ¿Already have an account?
                    </p>
                    <Link
                      to="/"
                      className={classNames(
                        styles['form-sign-in--link'],
                        'w-full',
                        'text-sm',
                        'text-center',
                        'cursor-pointer'
                      )}>
                      SIGN IN
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
          default:
            return <>default</>;
        }
      }}
    />
  );
};
