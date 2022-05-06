import React, { useState, useEffect } from 'react';
// components
import { FieldCollection } from './FieldCollection';
import { SimpleButton } from '../button/simple-button/SimpleButton';
import { SvgAnimatedError } from '@core/components/svg/svg-animated-error-success/SvgAnimatedError';
import { SvgAnimatedCheck } from '@core/components/svg/svg-animated-error-success/SvgAnimatedCheck';
import FormValidator from '@core/features/common/FormValidator';
// Types
import {
  ComponentFormValidatorInterface,
  ApiErrorsInterface
} from '@core/features/types/';

type FormProps = {
  components: Array<ComponentFormValidatorInterface>;
  validator: FormValidator;
  handleSendForm: Function;
  textButton: string;
  errors?: ApiErrorsInterface;
  isLoading?: boolean;
};

export const Form = ({
  components,
  validator,
  handleSendForm,
  textButton,
  errors = { field: '', message: '', showMessage: 'NONE' },
  isLoading = false
}: FormProps) => {
  const [formIsCompleted, setFormIsCompleted] = useState<boolean>(true);
  const [fieldWithError, setFieldWithError] = useState<string>('');
  const [showMessageAlert, setShowMessageAlert] = useState<boolean>(false);
  const [typeMessage, setTypeMessage] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      setFieldWithError('');

      if (errors?.field) {
        const fieldName = errors.field;
        validator.setErrors(errors);
        setFieldWithError(fieldName);
      }

      if (errors?.showMessage) {
        const showMessage = errors.showMessage;
        if (showMessage) {
          setShowMessageAlert(true);
          setTypeMessage(showMessage);
        }
      }
    }
  }, [errors]);

  const sendData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setShowMessageAlert(false);

    if (validator.isCompleted()) {
      handleSendForm();
    }
  };

  const handleStatusForm = (status: boolean) => {
    setFormIsCompleted(status);
  };

  const renderComponents: Function = (): JSX.Element[] =>
    components.map(
      (component: ComponentFormValidatorInterface, index: number) => {
        component.handleStatusForm = handleStatusForm;
        component.hasError = component.name === fieldWithError ? true : false;

        return (
          <div key={index}>
            <FieldCollection type={component.type} confing={component} />
          </div>
        );
      }
    );

  return (
    <form className="form-container w-full" onSubmit={e => sendData(e)}>
      {showMessageAlert && (
        <div
          className={`${typeMessage} message w-full text-base py-2 px-4 flex items-center justify-center`}>
          {typeMessage === 'ERROR' && (
            <SvgAnimatedError message={errors.message} />
          )}

          {typeMessage === 'SUCCESS' && (
            <SvgAnimatedCheck message={errors.message} />
          )}
        </div>
      )}

      {renderComponents()}

      <div className="w-full mt-8">
        <SimpleButton
          title={textButton}
          isLoading={isLoading}
          disabled={formIsCompleted}
          type="submit"
        />
      </div>
    </form>
  );
};
