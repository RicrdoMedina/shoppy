// tslint:disable: no-any
import express from 'express';
import passport from 'passport';
import { config } from '@server/config';
import Services from '@server/lib/services/Services';
import boom from '@hapi/boom';

require('../lib/utils/auth/strategies/basic');
require('../lib/utils/auth/strategies/google');
require('../lib/utils/auth/strategies/twitter');
require('../lib/utils/auth/strategies/facebook');

export function providerApi(app: express.Application) {
  const router = express.Router();

  app.use('/auth', router);

  router.get(
    '/google',
    passport.authenticate('google', {
      scope: ['email', 'profile', 'openid']
    })
  );

  router.get(
    '/google/callback',
    passport.authenticate('google', { session: false }),
    async (req: any, res: express.Response, next: express.NextFunction) => {
      try {
        if (!req.user) {
          return next(boom.unauthorized());
        }

        const {
          user: { user, token }
        } = req;

        user.isSigned = true;

        const { client } = req.body;

        const payload = {
          ...client,
          username: user.username,
          token
        };

        await Services.post('connection/', payload);

        res.cookie('token', token, {
          httpOnly: !config.dev,
          secure: !config.dev
        });

        return res.redirect('/home');
      } catch (error) {
        return next(error);
      }
    }
  );

  router.get('/twitter', passport.authenticate('twitter'));

  router.get(
    '/twitter/callback',
    passport.authenticate('twitter', { session: false }),
    async (req: any, res: express.Response, next: express.NextFunction) => {
      try {
        if (!req.user) {
          return next(boom.unauthorized());
        }

        const { user, token } = req.user;

        const { client } = req.body;

        const payload = {
          ...client,
          username: user.username,
          token
        };

        user.isSigned = true;

        await Services.post('connection/', payload);

        res.cookie('token', token, {
          httpOnly: !config.dev,
          secure: !config.dev
        });

        return res.redirect('/home');
      } catch (error) {
        return next(error);
      }
    }
  );

  router.get('/facebook', passport.authenticate('facebook'));

  router.get(
    '/facebook/callback',
    passport.authenticate('facebook', { session: false }),
    async (req: any, res: express.Response, next: express.NextFunction) => {
      try {
        if (!req.user) {
          return next(boom.unauthorized());
        }

        const { user, token } = req.user;

        user.isSigned = true;

        const { client } = req.body;

        const payload = {
          ...client,
          username: user.username,
          token
        };

        await Services.post('connection/', payload);

        res.cookie('token', token, {
          httpOnly: !config.dev,
          secure: !config.dev
        });

        return res.redirect('/home');
      } catch (error) {
        return next(error);
      }
    }
  );
}
