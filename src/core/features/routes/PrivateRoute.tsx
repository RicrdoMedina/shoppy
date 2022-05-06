import * as React from 'react';
// Libraries
import { Route } from 'react-router';
// BLoC
import { User } from '@core/user/domain/User';
import { useUserBloc } from '@core/bloc/UserBlocContext';
import { useNotificationBarBloc } from '@core/bloc/NotificationBarBlocContext';
// Components
import { AccessDenied } from '@core/screens/common/AccessDenied';
import { RedirectTo } from '@core/features/routes/Redirect';
import { SplashScreen } from '@core/components/splash-screen/SplashScreen';
// types
import { PrivateRoutesInterface } from '@core/features/routes/routes';
// Constants
import {
  NOTIFICATION_BAR_WARNING,
  MESSAGE_SESSION_EXPIRED
} from '@core/features/constants/';
// Utils
import { CookieHandlerUtils } from '@core/utils/';
import { SignedUserState } from '@core/user/presentation/UserState';

export const PrivateRoute = ({
  component: Component,
  ...rest
}: PrivateRoutesInterface): JSX.Element => {
  const [isSigned, setIsSigned] = React.useState<boolean>(false);
  const [hasAccess, setHasAccess] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [currentRoute, setCurrentRoute] = React.useState<string>('');
  const [applyRedirect, setApplyRedirect] = React.useState<boolean>(false);
  const notificationBloc = useNotificationBarBloc();
  const userBloc = useUserBloc();
  const { urlRedirect, name: route } = rest;
  const cookieHandler = CookieHandlerUtils;
  const token: string | null = cookieHandler.get('token');
  let navigatorBetweenPages = false;

  React.useEffect(() => {
    setCurrentRoute(route);
  }, []);

  React.useEffect(() => {
    const { user } = userBloc.state as SignedUserState;

    if (!user.hasOwnProperty('id')) {
      if (typeof window !== 'undefined') {
        getUserData();
      }
    } else {
      verifyScppes(user);
    }
  }, [currentRoute]);

  if (!token) {
    userBloc.forceSignOut();
  }

  if (currentRoute && route !== currentRoute) {
    setCurrentRoute(route);
    setIsLoading(true);
    setApplyRedirect(false);
    navigatorBetweenPages = true;
  }

  const getUserData = async () => {
    if (token) {
      const user = await userBloc.getCredentials();
      verifyScppes(user);
    } else {
      notificationBloc.showNotification({
        message: MESSAGE_SESSION_EXPIRED,
        type: NOTIFICATION_BAR_WARNING
      });
      setApplyRedirect(true);
    }
  };

  const verifyScppes = (user: User) => {
    const ignoreScopes = 'ignoreScopes' in rest ? rest.ignoreScopes : false;
    const allowedScopes = 'allowedScopes' in rest ? rest.allowedScopes : [];

    const { isSigned, scopes } = user;

    if (scopes.length > 0) {
      if (ignoreScopes) {
        setHasAccess(true);
      } else {
        let hasAccessAux: boolean = false;

        allowedScopes
          .map((allowedScope: string) => scopes.includes(allowedScope))
          .find((allowed: boolean) => {
            hasAccessAux = allowed;
          });

        setHasAccess(hasAccessAux);
      }

      setIsSigned(isSigned);
      setIsLoading(false);
    }
  };

  if (applyRedirect) {
    return <Route render={props => <RedirectTo url={urlRedirect} />} />;
  }

  if (isLoading || navigatorBetweenPages) {
    return <Route {...rest} render={props => <SplashScreen />} />;
  }

  return (
    <Route
      {...rest}
      render={() => (isSigned && hasAccess ? <Component /> : <AccessDenied />)}
    />
  );
};
