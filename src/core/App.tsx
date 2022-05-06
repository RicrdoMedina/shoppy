import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import ErrorBoundary from '@core/components/error-boundary/ErrorBoundary';
// context
import { CartBlocProvider } from '@core/bloc/CartBlocContext';
import { UserBlocProvider } from '@core/bloc/UserBlocContext';
import { ProductBlocProvider } from '@core/bloc/ProductBlocContect';
import { AppBlocProvider } from '@core/bloc/AppBlocContext';
import { ModalBlocProvider } from '@core/bloc/ModalBlocContext';
import { NotificationBarBlocProvider } from '@core/bloc/NotificationBarBlocContext';
// routes
import {
  AppPrivateRoutes,
  AppPublicRoutes
} from '@core/features/routes/routes';
import { renderRouting } from '@core/features/routes/routing';
// styles
import '@core/assets/styles/global.scss';

export const App = hot(() => {
  return (
    <ErrorBoundary>
      <AppBlocProvider>
        <NotificationBarBlocProvider>
          <ModalBlocProvider>
            <ProductBlocProvider>
              <UserBlocProvider>
                <CartBlocProvider>
                  {renderRouting(AppPublicRoutes, AppPrivateRoutes)}
                </CartBlocProvider>
              </UserBlocProvider>
            </ProductBlocProvider>
          </ModalBlocProvider>
        </NotificationBarBlocProvider>
      </AppBlocProvider>
    </ErrorBoundary>
  );
});
