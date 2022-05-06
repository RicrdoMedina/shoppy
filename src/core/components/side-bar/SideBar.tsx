import React from 'react';
// Components
import { Link } from 'react-router-dom';
import { CartCounter } from '@core/cart/presentation/cart-counter/CartCounter';
// States
import { SignedUserState } from '@core/user/presentation/UserState';
// Bloc
import { useUserBloc } from '@core/bloc/UserBlocContext';
// Styles
import styles from './SideBar.scss';
import classnames from 'classnames';

export const SideBar = () => {
  const userBloc = useUserBloc();

  const handleSignOut = (): void => {
    const user = (userBloc.state as SignedUserState).user;
    userBloc.signOut(user);
  };
  return (
    <nav className={classnames(styles[`side-bar`], 'w-full')}>
      <ul className="side-bar__content w-full flex flex-col items-center justify-center">
        <li
          className={classnames(
            styles[`side-bar__content--item`],
            'md:text-xl',
            'lg:text-xl',
            'xl:text-xl'
          )}>
          <Link to="/">Home</Link>
        </li>
        <li
          className={classnames(
            styles[`side-bar__content--item`],
            'md:text-xl',
            'lg:text-xl',
            'xl:text-xl'
          )}>
          <Link to="/cart" className="flex items-center justify-center">
            <CartCounter />
          </Link>
        </li>
        <li
          className={classnames(
            styles[`side-bar__content--item`],
            'md:text-xl',
            'lg:text-xl',
            'xl:text-xl',
            'cursor-pointer'
          )}
          onClick={() => handleSignOut()}>
          Log Out
        </li>
      </ul>
    </nav>
  );
};
