import { merge } from 'ramda';

export interface AppConfig {
  env: string;
  isDev: boolean;
  apiUrl: string;
  baseUrl: string;
  useRender: boolean;
  isBrowser: boolean;
  stripeApiKey: string;
}

type Environment = 'common' | 'development' | 'production';

type Config = { [key in Environment]: Partial<AppConfig> };

// tslint:disable no-string-literal
const isBrowser = process && process['browser'];
const env = process.env.NODE_ENV || 'development';
const devBaseUrl = `${process.env.DEV_BASE_URL}:${process.env.DEV_PORT}`;
const prodBaseUrl = `${process.env.PROD_BASE_URL}:${process.env.DEV_PORT}`;

const defaultConfig: Config = {
  common: {
    env,
    isBrowser,
    isDev: process.env.NODE_ENV !== 'production',
    useRender: Boolean(isBrowser && localStorage.getItem('useRender'))
  },
  development: {
    baseUrl: devBaseUrl,
    apiUrl: `${devBaseUrl}/api`,
    stripeApiKey: process.env.DEV_STRIPE_API_PUBLIC_KEY
  },
  production: {
    baseUrl: prodBaseUrl,
    apiUrl: `${prodBaseUrl}/api`,
    stripeApiKey: process.env.PROD_STRIPE_API_PUBLIC_KEY
  }
};

export const config: AppConfig = merge(
  defaultConfig.common,
  defaultConfig[env]
);
