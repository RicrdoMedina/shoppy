import React from 'react';
import styles from './SplashScreen.scss';
import classNames from 'classnames';
import Img from '../../assets/images/Logo.svg';

export const SplashScreen = () => {
  return (
    <div className={classNames(styles[`splash-screen`])}>
      <img className={classNames(styles[`logo`])} src={Img} alt="Logo" />
    </div>
  );
};
