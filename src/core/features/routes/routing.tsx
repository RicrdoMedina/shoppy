import * as React from 'react';
import { Switch, Route } from 'react-router';
import { NoFound } from '@core/screens/common/NoFound';
import { PrivateRoutesInterface, PublicRoutesInterface } from './routes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export function renderRouting(
  publicRoutes: PublicRoutesInterface[],
  privateRoutes: PrivateRoutesInterface[]
) {
  return (
    <Switch>
      {publicRoutes.map((props, index) => (
        <PublicRoute {...props} key={index} />
      ))}
      {privateRoutes.map((props, index) => (
        <PrivateRoute {...props} key={index} />
      ))}
      <Route key="error404" component={NoFound} />
    </Switch>
  );
}
