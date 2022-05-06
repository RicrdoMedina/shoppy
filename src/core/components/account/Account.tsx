import React from 'react';
import Container from '@core/app/Container';
// Components
import { SvgUser } from '../svg/svg-user/SvgUser';
// States
import { SignedUserState, UserState } from '@core/user/presentation/UserState';
// BLoC
import { BlocBuilder } from '@core/bloc';
import { useUserBloc } from '@core/bloc/UserBlocContext';
// Styles
import classnames from 'classnames';
import styles from './Account.scss';
import { HistoryHandlerUtils } from '@core/utils';

export const Account = () => {
  const userBloc = useUserBloc();
  const HistoryHandlerUtils = Container.resolve<HistoryHandlerUtils>(
    'HistoryHandlerUtils'
  );

  const handleNavigate = () => {
    HistoryHandlerUtils.push('/profile');
  };

  return (
    <BlocBuilder
      bloc={userBloc}
      builder={(state: UserState) => {
        const user = (userBloc.state as SignedUserState).user;
        switch (state.kind) {
          case 'SignedUserState': {
            return (
              <div
                className={classnames(
                  styles[`account`],
                  'account',
                  'w-full',
                  'flex',
                  'items-center',
                  'justify-center'
                )}>
                <div
                  className="account__content w-full flex flex-col items-center justify-center cursor-pointer"
                  onClick={() => handleNavigate()}>
                  <div className={classnames(styles[`circle-avatar`])}>
                    <SvgUser />
                  </div>
                  <p
                    className={classnames(
                      styles[`account__content--text`],
                      'md:text-xl',
                      'lg:text-xl',
                      'xl:text-xl'
                    )}>
                    {user.username}
                  </p>
                </div>
              </div>
            );
          }
          default: {
            return <></>;
          }
        }
      }}
    />
  );
};
