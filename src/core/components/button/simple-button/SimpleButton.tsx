// tslint:disable: no-any
import React from 'react';
// components
import Spinner from '../../svg/svg-spinner/SvgSpinner';
// styles
import styles from './SimpleButton.scss';
import classNames from 'classnames';

type SimpleButtonProp = {
  title: string;
  ClassName?: string;
  isLoading?: boolean;
  onClick?: Function | null;
  disabled?: boolean;
  type?: any;
  size?: 's-xs' | 's-sm' | 's-md' | 's-lg' | 's-xl' | 's-full';
};

export const SimpleButton = ({
  title,
  ClassName = '',
  isLoading = false,
  onClick = null,
  disabled,
  type = 'button',
  size = 's-full'
}: SimpleButtonProp) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={classNames(
        styles['simple-button'],
        styles[`${size}`],
        { [`${styles.disabled}`]: disabled },
        ClassName
      )}
      onClick={handleClick}>
      <button
        className={classNames(styles['simple-button--btn'], {
          [`${styles.disabled}`]: disabled
        })}
        type={type}
        disabled={disabled}>
        {isLoading ? <Spinner color="#fff" /> : <span>{title}</span>}
      </button>
    </div>
  );
};
