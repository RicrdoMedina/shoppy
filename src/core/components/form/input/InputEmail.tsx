import React, { useState, useEffect, useRef } from 'react';
// types
import { InputInterface } from '@core/features/types/';
// styles
import styles from './Input.scss';
import classNames from 'classnames';

export const InputEmail = ({
  validator,
  handleStatusForm,
  label,
  name,
  initialVal,
  hasError
}: InputInterface) => {
  const [value, setValue] = useState<string | number>('');
  const [message, setMessage] = useState<string | undefined>('');

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
    const name = event.target.name;
    const value = event.target.value;

    const { val, message } = validator.applyValidation(name, label, value);

    setValue(val);

    setMessage(message);

    handleStatusForm(!validator.isCompleted());
  };

  const handleFocusInput = () => {
    if (null !== inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className={classNames(
        styles[`content-input-default`],
        'pt-4',
        'relative'
      )}>
      <input
        type="email"
        className={classNames(
          styles[`content-input-default--input`],
          { [`${styles[`shadow`]}`]: !message },
          'w-full',
          'h-12',
          'rounded-full',
          'outline-none',
          'px-4',
          'relative',
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
      {message && (
        <div
          className={classNames(
            styles[`content-input-default--text-error`],
            'text-sm',
            'pl-4',
            'z-10'
          )}>
          {message}
        </div>
      )}
    </div>
  );
};
