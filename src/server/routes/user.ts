import express from 'express';
import Services from '@server/lib/services/Services';

export function userApi(app: express.Application) {
  const router = express.Router();

  app.use('/api/user', router);

  router.post(
    '/getUserByToken',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { body } = req;
        const { token } = req.cookies;
        const payload = { token, ...body };

        const { data, status } = await Services.post(
          'user/getUserByToken',
          payload,
          token
        );

        data.data.isSigned = true;

        return res.status(status).json(data);
      } catch (error) {
        return next(error);
      }
    }
  );
}
