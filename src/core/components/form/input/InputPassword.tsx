import React, { useState, useEffect, useRef } from 'react';
// components
import { SvgEye } from '@core/components/svg/svg-eye/SvgEye';
// types
import { InputInterface } from '@core/features/types/';
// styles
import styles from './Input.scss';
import classNames from 'classnames';

export const InputPassword = ({
  validator,
  handleStatusForm,
  name,
  label,
  initialVal,
  hasError
}: InputInterface) => {
  const [value, setValue] = useState<string | number>('');
  const [message, setMessage] = useState<string | undefined>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setValue(initialVal);
  }, [initialVal]);

  useEffect(() => {
    if (hasError) {
      const { message } = validator.getField(name);
      setMessage(message);
    }
  }, [hasError]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name; // tslint:disable-line
    const value = event.target.value; // tslint:disable-line

    const { val, message } = validator.applyValidation(name, label, value); // tslint:disable-line

    setValue(val);

    setMessage(message);

    handleStatusForm(!validator.isCompleted());
  };

  const handleFocusInput = () => {
    if (null !== inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div
      className={classNames(
        styles[`content-input-default`],
        'pt-4',
        'relative'
      )}>
      <input
        type={showPassword ? 'text' : 'password'}
        className={classNames(
          styles[`content-input-default--input`],
          { [`${styles[`shadow`]}`]: !message },
          'w-full',
          'h-12',
          'rounded-full',
          'outline-none',
          'px-4',
          'z-30'
        )}
        name={name}
        value={value}
        onChange={e => handleInputChange(e)}
        ref={inputRef}
      />
      <label
        className={classNames(
          styles[`content-input-default--label`],
          'z-40',
          'rounded-full'
        )}
        onClick={() => handleFocusInput()}>
        {label}
      </label>
      <span
        className={classNames(
          styles[`content-input-default--show-password`],
          'cursor-pointer',
          'z-30'
        )}
        onClick={() => handleShowPassword()}>
        <SvgEye />
      </span>
      {message && (
        <div
          className={classNames(
            styles[`content-input-default--text-error`],
            'pl-4',
            'z-10'
          )}>
          {message}
        </div>
      )}
    </div>
  );
};
