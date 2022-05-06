// tslint:disable: no-any
import express from 'express';
import passport from 'passport';
import { config } from '@server/config';
import Services from '@server/lib/services/Services';

export function authApi(app: express.Application) {
  const router = express.Router();

  app.use('/api/auth', router);

  router.post(
    '/signIn',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      const { client } = req.body;

      passport.authenticate('basic', (error: any, data: any) => {
        try {
          if (error || !data) {
            return next(error);
          }

          req.login(data, { session: false }, async (err: any) => {
            if (err) {
              return next(err);
            }

            const {
              token,
              user,
              user: { username }
            } = data;

            user.isSigned = true;

            const payload = {
              ...client,
              username,
              token
            };

            await Services.post('connection/', payload);

            res.cookie('token', token, {
              httpOnly: !config.dev,
              secure: !config.dev
            });

            return res.status(200).json({ token, user });
          });
        } catch (err) {
          return next(err);
        }
      })(req, res, next);
    }
  );

  router.post('/signUp', async function(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { client, name, lastName, username, password } = req.body;

      const payload = {
        role: 'public',
        name,
        lastName,
        username,
        password,
        client
      };
      const { status, data } = await Services.post('auth/signUp', payload);

      return res.status(status).json(data);
    } catch (error) {
      return next(error);
    }
  });

  router.post('/signOut', async function(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { username, client } = req.body;
      const { token } = req.cookies;

      const payload = {
        username,
        client
      };
      const { status, data } = await Services.post(
        'auth/signOut',
        payload,
        token
      );

      res.clearCookie('token');
      return res.status(status).json(data);
    } catch (error) {
      return next(error);
    }
  });
}
