import React from 'react';
// Styles
import styles from './SvgAnimated.scss';
import classNames from 'classnames';

type Props = {
  message?: string;
};

export const SvgAnimatedError = ({ message }: Props) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <svg
        className={classNames(styles[`svg-error-animated`])}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 130.2 130.2">
        <circle
          className={classNames(
            styles[`path`],
            styles[`circle`],
            styles[`circle-error`]
          )}
          fill="none"
          stroke="#D06079"
          strokeWidth="6"
          strokeMiterlimit="10"
          cx="65.1"
          cy="65.1"
          r="62.1"
        />
        <line
          className={classNames(
            styles[`path`],
            styles[`line`],
            styles[`line-error`]
          )}
          fill="none"
          stroke="#D06079"
          strokeWidth="6"
          strokeLinecap="round"
          strokeMiterlimit="10"
          x1="34.4"
          y1="37.9"
          x2="95.8"
          y2="92.3"
        />
        <line
          className={classNames(
            styles[`path`],
            styles[`line`],
            styles[`line-error`]
          )}
          fill="none"
          stroke="#D06079"
          strokeWidth="6"
          strokeLinecap="round"
          strokeMiterlimit="10"
          x1="95.8"
          y1="38"
          x2="34.4"
          y2="92.2"
        />
      </svg>
      <p className={classNames(styles[`message-error`])}>{message}</p>
    </div>
  );
};
