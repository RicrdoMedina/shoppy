// tslint:disable: no-any
import boom from '@hapi/boom';
import express from 'express';
import { config } from '@server/config';

const withErrorStack = (error: any, stack: any) => {
  if (config.dev) {
    return { ...error, stack };
  }
  return error;
};

export const wrapErrors = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!err.isBoom) {
    next(boom.badImplementation(err));
  }

  return next(err);
};

export const logErrors = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  return next(err);
};

export const errorHandler = (
  err: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if ('response' in err) {
    const statusCode = err.response.status;
    const payload = err.response.data;

    return res.status(statusCode).json(withErrorStack(payload, err.stack));
  }
  const statusCode = err.output.statusCode;
  const payload = { message: err.message };

  return res.status(statusCode).json(withErrorStack(payload, err.stack));
};
