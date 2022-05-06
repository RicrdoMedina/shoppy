import {
  PrivateRoutesInterface,
  PublicRoutesInterface
} from '@core/features/routes/routes';
import { SignIn } from '@core/screens/public/SignIn';
import { SignUp } from '@core/screens/public/SignUp';
import { Home } from '@core/screens/private/Home';
import { Profile } from '@core/screens/private/Profile';
import { Cart } from '@core/screens/private/Cart';
import { CheckoutCancel } from '@core/screens/private/CheckoutCancel';
import { CheckoutSuccess } from '@core/screens/private/CheckoutSuccess';

export const publicRoutes: PublicRoutesInterface[] = [
  {
    name: 'signIn',
    path: '/',
    component: SignIn,
    urlRedirect: '/home',
    exact: true,
    key: 1
  },
  {
    name: 'signUp',
    path: '/sign-up',
    component: SignUp,
    urlRedirect: '/home',
    exact: true,
    key: 2
  }
];

export const privateRoutes: PrivateRoutesInterface[] = [
  {
    name: 'home',
    path: '/home',
    component: Home,
    exact: true,
    allowedScopes: [],
    ignoreScopes: true,
    urlRedirect: '/',
    key: 3
  },
  {
    name: 'profile',
    path: '/profile',
    component: Profile,
    allowedScopes: ['create:users'],
    exact: true,
    urlRedirect: '/',
    key: 4
  },
  {
    name: 'cart',
    path: '/cart',
    component: Cart,
    allowedScopes: [],
    exact: true,
    ignoreScopes: true,
    urlRedirect: '/',
    key: 5
  },
  {
    name: 'checkout-success',
    path: '/checkout/success',
    component: CheckoutSuccess,
    allowedScopes: [],
    exact: true,
    ignoreScopes: true,
    urlRedirect: '/',
    key: 6
  },
  {
    name: 'checkout-cancel',
    path: '/checkout/cancel',
    component: CheckoutCancel,
    allowedScopes: [],
    exact: true,
    ignoreScopes: true,
    urlRedirect: '/',
    key: 7
  }
];
