import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import path from 'path';
import requestIp from 'request-ip';
import useragent from 'express-useragent';
import passport from 'passport';
import cookieParser from 'cookie-parser';
require('express-async-errors');

// utils
import { getRequire } from './lib/utils';
import { router } from './router';
import { config } from './config';
import './exitHandler';
// middleware
import {
  userAgentMiddleware,
  errorHandler,
  logErrors,
  wrapErrors,
  assetsParser
} from '@server/middlewares/';
// routes
import { authApi } from './routes/auth';
import { providerApi } from './routes/providerAuth';
import { cartApi } from './routes/cart';
import { stripeApi } from './routes/stripe';
import { userApi } from './routes/user';

// tslint:disable:no-console

const isProduction = !config.dev;
const host = config.host;
const port = config.port;
const secretKeySession = config.sessionSecret;
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    unset: 'destroy',
    cookie: {
      maxAge: 5 * 60 * 1000, // minutes in ms NOTE: Expanded after successful auth
      secure: false,
      sameSite: 'lax' // NOTE: Current auth necessity
    },
    rolling: true,
    secret: secretKeySession
    // store: sessionStore
  })
);

app.disable('x-powered-by');
app.use(helmet());
app.use(requestIp.mw());
app.use(useragent.express());
app.use(userAgentMiddleware);

if (isProduction) {
  // In real app better to use nginx for static assets
  const httpHeaders = { maxAge: 31536000, redirect: false, lastModified: true };
  app.use(express.static(path.resolve(process.cwd(), 'dist'), httpHeaders));
}

if (!isProduction) {
  const webpackConfig = getRequire()(
    path.resolve(process.cwd(), 'webpack.config')
  );
  const compiler = webpack(webpackConfig);
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      serverSideRender: true,
      stats: 'errors-only',
      logLevel: 'error'
    })
  );
  app.use(webpackHotMiddleware(compiler, { log: console.log }));
}

app.use(assetsParser(isProduction));

authApi(app);
providerApi(app);
userApi(app);
stripeApi(app);
cartApi(app);

app.use('/', router);
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.use(
  (
    err: string,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (!isProduction) {
      return res.status(500).send(err);
    }

    return res.sendStatus(500);
  }
);

app.listen(port, () => {
  console.info(`✅✅✅ Server is running at http://${host}:${port} ✅✅✅`);
});
