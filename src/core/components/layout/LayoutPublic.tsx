import React from 'react';
// Components
import { NotificationBar } from '@core/components/notification-bar/NotificationBar';
import { Modal } from '@core/components/modal/Modal';
// Styles
import styles from './Layout.scss';

export const LayoutPublic: React.FC = ({ children }): JSX.Element => {
  return (
    <div className={styles[`wrapper`]}>
      <NotificationBar />
      {children}
      <Modal />
    </div>
  );
};
