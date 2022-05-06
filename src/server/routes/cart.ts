import express from 'express';
import Services from '@server/lib/services/Services';
import { decodeJwt } from '../lib/utils/auth/decodeJwt';

export function cartApi(app: express.Application) {
  const router = express.Router();

  app.use('/api/cart', router);

  router.get(
    '/',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { client } = req.body;
        const { token } = req.cookies;
        const { sub: id } = decodeJwt(token);

        const payload = {
          token,
          client
        };

        const { data, status } = await Services.get(
          `cart/getCartByUser/${id}`,
          payload,
          token
        );

        return res.status(status).json(data);
      } catch (error) {
        return next(error);
      }
    }
  );

  router.post(
    '/',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { body } = req;
        const { token } = req.cookies;
        const { sub: id } = decodeJwt(token);

        const payload = {
          userId: id,
          ...body
        };

        const { data, status } = await Services.post('cart', payload, token);

        return res.status(status).json(data);
      } catch (error) {
        return next(error);
      }
    }
  );

  router.post(
    '/paid',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const { cartId, client } = req.body;
        const { token } = req.cookies;

        const payload = {
          cartId,
          client
        };

        const { data, status } = await Services.post(
          'cart/paid',
          payload,
          token
        );

        return res.status(status).json(data);
      } catch (error) {
        return next(error);
      }
    }
  );

  router.patch(
    '/',
    async (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      try {
        const {
          body: { cart, client }
        } = req;

        const { token } = req.cookies;

        const { id } = cart;

        delete cart.id;

        const payload = {
          cart,
          client
        };

        const { data, status } = await Services.patch(
          `cart/${id}`,
          payload,
          token
        );

        return res.status(status).json(data);
      } catch (error) {
        return next(error);
      }
    }
  );
}
