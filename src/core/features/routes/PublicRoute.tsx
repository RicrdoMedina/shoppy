import * as React from 'react';
// Libraries
import { Route } from 'react-router';
// Context
import { useUserBloc } from '@core/bloc/UserBlocContext';
// Components
import { RedirectTo } from '@core/features/routes/Redirect';
import { SignedUserState } from '@core/user/presentation/UserState';
// types
import { PublicRoutesInterface } from '@core/features/routes/routes';

export const PublicRoute = ({
  component: Component,
  ...rest
}: PublicRoutesInterface): JSX.Element => {
  const { urlRedirect } = rest;
  const userBloc = useUserBloc();
  const { user } = userBloc.state as SignedUserState;

  return (
    <Route
      {...rest}
      render={() => {
        return user.isSigned ? <RedirectTo url={urlRedirect} /> : <Component />;
      }}
    />
  );
};
