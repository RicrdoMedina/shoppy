// tslint:disable: no-any
import express from 'express';
import Services from '@server/lib/services/Services';
import { decodeJwt } from '../lib/utils/auth/decodeJwt';
import { config } from '@server/config';

export function stripeApi(app: express.Application) {
  const router = express.Router();
  const STRIPEAPIKEY = config.stripeApiSecretKey;
  const DEV_BASE_URL = `${config.baseUrl}:${config.port}`;
  const PROD_BASE_URL = `${config.baseUrl}`;
  const BASE_URL = config.dev ? DEV_BASE_URL : PROD_BASE_URL;

  app.use('/api/stripe', router);

  const stripe = require('stripe')(STRIPEAPIKEY);

  router.get('/', async function(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { token } = req.cookies;
      const { client } = req.body;
      const payload = {
        client
      };

      const { status, data } = await Services.get('product/', payload, token);

      return res.status(status).json(data);
    } catch (error) {
      return next(error);
    }
  });

  router.post('/create-checkout-session', async function(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    try {
      const { client } = req.body;
      const { token } = req.cookies;
      const { sub: id } = decodeJwt(token);

      const payload = {
        token,
        client
      };

      const { data } = await Services.get(
        `cart/getCartByUser/${id}`,
        payload,
        token
      );

      if (data) {
        const { data: cart } = data;
        const cartItems = cart.items;

        const items: Array<any> = [];

        cartItems.map((item: any) => {
          const { quantity, priceId: price } = item;
          items.push({ quantity, price });
        });

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ['card'],
          line_items: items,
          mode: 'subscription',
          success_url: `${BASE_URL}/checkout/success`,
          cancel_url: `${BASE_URL}/checkout/cancel`
        });

        return res.status(200).json({ sessionId: session.id });
      }

      return res.status(200).json({ sessionId: null, message: 'cart empty' });
    } catch (error) {
      return next(error);
    }
  });
}
