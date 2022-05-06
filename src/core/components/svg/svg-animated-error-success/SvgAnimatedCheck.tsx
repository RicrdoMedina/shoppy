import React from 'react';
// Styles
import styles from './SvgAnimated.scss';
import classNames from 'classnames';

type Props = {
  message?: string;
};

export const SvgAnimatedCheck = ({ message }: Props) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130.2 130.2"
        className={classNames(styles[`svg-success-animated`])}>
        <circle
          className={classNames(styles[`path`], styles[`circle`])}
          fill="none"
          stroke="#73AF55"
          strokeWidth="6"
          strokeMiterlimit="10"
          cx="65.1"
          cy="65.1"
          r="62.1"
        />
        <polyline
          className={classNames(styles[`path`], styles[`check`])}
          fill="none"
          stroke="#73AF55"
          strokeWidth="6"
          strokeLinecap="round"
          strokeMiterlimit="10"
          points="100.2,40.2 51.5,88.8 29.8,67.5 "
        />
      </svg>
      <p className={classNames(styles[`message-success`])}>{message}</p>
    </div>
  );
};
