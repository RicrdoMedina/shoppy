import React from 'react';
// components
import { Link } from 'react-router-dom';
// types
import { RedirectLinkInterface } from '@core/features/types/';
// styles
import styles from './RedirectLink.scss';
import classNames from 'classnames';

export const RedirectLink = ({ url, text }: RedirectLinkInterface) => {
  return (
    <div className={classNames(styles['a-redirect'], 'w-full', 'py-4', 'pl-2')}>
      <Link to={url}>{text}</Link>
    </div>
  );
};
