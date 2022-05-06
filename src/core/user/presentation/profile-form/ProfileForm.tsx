import React from 'react';
// Components
import { CardContainer } from '@core/components/card-container/CardContainer';
import { Form } from '@core/components/form/Form';
// types
import { ComponentFormValidatorInterface } from '@core/features/types/';
// Styles
import styles from './ProfileForm.scss';
import classNames from 'classnames';

// Utils
import FormValidator from '@core/features/common/FormValidator';

const validations = {
  name: [`required`],
  lastName: [`required`],
  username: [`required', 'email`],
  password: [
    'required',
    { min: 3, key: 'minLegth' },
    { max: 15, key: 'maxLegth' }
  ]
};

export const ProfileForm = () => {
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
    alert('');
  };

  return (
    <div
      className={classNames(
        styles[`profile`],
        'w-full',
        'h-full',
        'flex',
        'items-center',
        'justify-center'
      )}>
      <div className={classNames(styles[`profile__content`], 'mx-auto')}>
        <CardContainer
          withBg={true}
          ClassName={classNames(styles[`card-container`], 'h-full')}>
          <div className="w-5/6" />
          <div className="w-full flex items-center justify-center pl-4 pr-16 py-12">
            <Form
              textButton="Actualizar"
              components={components}
              validator={formValidator}
              handleSendForm={handleSendForm}
            />
          </div>
        </CardContainer>
      </div>
    </div>
  );
};
