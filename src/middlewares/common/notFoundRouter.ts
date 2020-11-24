import { Handler, Router } from 'express';
import { NotFound } from 'http-errors';

const notFoundRouter = Router();

const notFoundHandler: Handler = (req, res, next) => {
  if (res.headersSent) {
    return next();
  }

  return next(new NotFound(`${req.method} ${req.url} not found`));
};

notFoundRouter.all('*', notFoundHandler);

export default notFoundRouter;
