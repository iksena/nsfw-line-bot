import { Handler } from 'express';

import { MessageService } from '../../services';

const withMessageService: Handler = (req, res, next) => {
  const { logger, lineClient } = req.app.locals;

  res.locals.message = new MessageService(logger, lineClient);

  return next();
};

export default withMessageService;
