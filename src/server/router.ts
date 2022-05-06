import { StaticRouterContext } from 'react-router';
import express from 'express';
import { renderApp, renderHtml } from './lib/render';

export const router = express.Router();

router.get('*', async (req, res, next) => {
  try {
    const { css: styles, js: scripts } = res.locals.assets;
    const context: StaticRouterContext = {};
    const content = renderApp(context, req.url);

    if (context.statusCode && String(context.statusCode).startsWith('30') && context.url) {
      return res.redirect(context.statusCode, context.url);
    }

    if (context.statusCode === 404) {
      res.status(404);
    }

    res.send(renderHtml({ content, styles, scripts }));
  } catch (error) {
    next(error);
  }
});
