import { Handler } from 'express';
import { Client } from '@line/bot-sdk';

import { MessageService } from '../../services';

const withMessageService: Handler = (req, res, next) => {
  const { logger, config: { line } } = req.app.locals;

  const lineClient = new Client(line);
  res.locals.message = new MessageService(logger, lineClient);

  return next();
};

export default withMessageService;
