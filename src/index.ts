import Express from 'express';
import BodyParser from 'body-parser';
import Bunyan, { LoggerOptions } from 'bunyan';
import CORS from 'cors';
import { middleware, Client } from '@line/bot-sdk';

import config from '../config';
import middlewares from './middlewares';
import routes from './routes';

const { port, loggerOptions, line } = config;
const { errorMiddleware, notFoundRouter } = middlewares;

const logger = Bunyan.createLogger(loggerOptions as LoggerOptions);

const start = () => {
  const app = Express();

  app.use(CORS());
  app.use(middleware(line));
  app.use(BodyParser.urlencoded({ extended: true }));
  app.use(BodyParser.json());
  app.locals.logger = logger;
  app.locals.config = config;
  app.locals.lineClient = new Client(line);

  routes.forEach((route) => app.use(route));

  app.use(notFoundRouter);
  app.use(errorMiddleware);

  app.listen(port, () => logger.info(`Listening to port ${port}`));
};

start();
