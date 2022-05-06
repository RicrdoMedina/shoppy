import dotenv from 'dotenv';
import { merge } from 'ramda';

dotenv.config();

export interface AppConfig {
  dev: boolean;
  baseUrl: string;
  port: string;
  host: string;
  apiUrl: string;
  apiKeyToken: string;
  stripeApiSecretKey: string;
  googleClientId: string;
  googleClientSecret: string;
  sessionSecret: string;
  twitterComsumerKey: string;
  twitterComsumerSecret: string;
  facebookClientId: string;
  facebookClientSecret: string;
}

type Environment = 'common' | 'development' | 'production';

type Config = { [key in Environment]: Partial<AppConfig> };

const dev = process.env.NODE_ENV === 'development';
const env = process.env.NODE_ENV || 'development';

const defaultConfig: Config = {
  common: {
    dev
  },
  development: {
    baseUrl: process.env.DEV_BASE_URL,
    port: process.env.DEV_PORT,
    host: process.env.DEV_HOST,
    apiUrl: process.env.DEV_API_URL,
    apiKeyToken: process.env.DEV_API_KEY_TOKEN,
    stripeApiSecretKey: process.env.DEV_STRIPE_API_SECRET_KEY,
    googleClientId: process.env.DEV_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.DEV_GOOGLE_CLIENT_SECRET,
    sessionSecret: process.env.DEV_SESSION_SECRET,
    twitterComsumerKey: process.env.DEV_TWITTER_COMSUMER_KEY,
    twitterComsumerSecret: process.env.DEV_TWITTER_COMSUMER_SECRET,
    facebookClientId: process.env.DEV_FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.DEV_FACEBOOK_CLIENT_SECRET
  },
  production: {
    baseUrl: process.env.PROD_BASE_URL,
    port: process.env.PROD_PORT,
    host: process.env.PROD_HOST,
    apiUrl: process.env.PROD_API_URL,
    apiKeyToken: process.env.PROD_API_KEY_TOKEN,
    stripeApiSecretKey: process.env.PROD_STRIPE_API_SECRET_KEY,
    googleClientId: process.env.PROD_GOOGLE_CLIENT_ID,
    googleClientSecret: process.env.PROD_GOOGLE_CLIENT_SECRET,
    sessionSecret: process.env.PROD_SESSION_SECRET,
    twitterComsumerKey: process.env.PROD_TWITTER_COMSUMER_KEY,
    twitterComsumerSecret: process.env.PROD_TWITTER_COMSUMER_SECRET,
    facebookClientId: process.env.PROD_FACEBOOK_CLIENT_ID,
    facebookClientSecret: process.env.PROD_FACEBOOK_CLIENT_SECRET
  }
};

export const config: AppConfig = merge(
  defaultConfig.common,
  defaultConfig[env]
);
