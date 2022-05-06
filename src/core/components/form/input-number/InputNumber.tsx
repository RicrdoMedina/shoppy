import React, { useState, useEffect } from 'react';
// styles
import styles from './InputNumber.scss';
import classNames from 'classnames';

type InputNumberProps = {
  label: string;
  minDefault: number;
  maxDefault: number;
  initialValue: number;
  fnCallback: Function;
};

export const InputNumber = ({
  label,
  minDefault = 0,
  maxDefault = 20,
  initialValue = 0,
  fnCallback
}: InputNumberProps) => {
  const [value, setValue] = useState<number>(0);
  const min: number = minDefault;
  const max: number = maxDefault;

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const handleIncrease = () => {
    const nextVal = value + 1;
    if (nextVal <= max) {
      fnCallback(nextVal);
    }
  };

  const handleDecrease = () => {
    const nextVal = value - 1;
    if (nextVal >= min) {
      fnCallback(nextVal);
    }
  };

  return (
    <div className={classNames(styles[`content-input-number`])}>
      {label && <label>{label}</label>}
      <div className="flex items-center justify-start">
        <button
          className={classNames(
            styles[`btn-decrease`],
            'flex',
            'items-center',
            'justify-center',
            'mr-2',
            'outline-none'
          )}
          onClick={() => handleDecrease()}>
          -
        </button>
        <input
          className={classNames(styles[`content-input-number--input`])}
          min={min}
          max={max}
          value={value}
          readOnly={true}
          type="number"
        />
        <button
          className={classNames(
            styles[`btn-increase`],
            'flex',
            'items-center',
            'justify-center',
            'ml-2',
            'outline-none'
          )}
          onClick={() => handleIncrease()}>
          +
        </button>
      </div>
    </div>
  );
};
