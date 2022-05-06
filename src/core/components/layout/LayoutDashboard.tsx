import React from 'react';
// Components
import { Header } from '@core/components/header/Header';
import { SideBar } from '@core/components/side-bar/SideBar';
import { Account } from '@core/components/account/Account';
import { NotificationBar } from '@core/components/notification-bar/NotificationBar';
import { Modal } from '@core/components/modal/Modal';
// Styles
import classnames from 'classnames';
import styles from './Layout.scss';

export const LayoutDashboard: React.FC = ({ children }): JSX.Element => {
  return (
    <div
      className={classnames(
        styles[`dashboard`],
        'flex',
        'flex-col',
        'items-center',
        'justify-center'
      )}>
      <NotificationBar />
      <Modal />
      <div className={classnames(styles[`dashboard__content`], 'flex')}>
        <div
          className={classnames(
            styles[`dashboard__content--menu`],
            'flex-shrink-0',
            'h-full',
            'relative'
          )}>
          <Header />
          <SideBar />
          <Account />
        </div>
        <div
          className={classnames(
            styles[`dashboard__content--body`],
            'flex-1',
            'w-full',
            'h-full'
          )}>
          {children}
        </div>
      </div>
    </div>
  );
};
