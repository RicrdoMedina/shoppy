import * as React from 'react';
import { unnest } from 'ramda';
import { privateRoutes, publicRoutes } from '@core/features/common/routes';

export interface PublicRoutesInterface {
  name: string;
  path: string;
  component: React.ComponentType;
  exact: true;
  urlRedirect: string;
  key: number;
}

export interface PrivateRoutesInterface {
  name: string;
  path: string;
  component: React.ComponentType;
  exact: true;
  ignoreScopes?: boolean;
  urlRedirect: string;
  allowedScopes: Array<string>;
  key: number;
}

export const AppPublicRoutes = unnest([
  publicRoutes
]) as PublicRoutesInterface[];

export const AppPrivateRoutes = unnest([
  privateRoutes
]) as PrivateRoutesInterface[];
