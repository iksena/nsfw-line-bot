import { Handler } from 'express';

const getHealthcheckHandler: Handler = (req, res, next) => {
  const { logger } = res.app.locals;

  try {
    res.json({ message: 'NSFW service is healthy.' });
  } catch (error) {
    logger.error(error, 'Something is wrong with NSFW service.');

    next(error);
  }
};

export default getHealthcheckHandler;
