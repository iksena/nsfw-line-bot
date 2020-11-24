import { Handler } from 'express';

const postMessage: Handler = async (req, res, next) => {
  const { events } = req.body;
  const { logger, message } = res.locals;

  try {
    await message.replyMessage(events);

    res.sendStatus(200);
  } catch (error) {
    logger.error(error, 'Something went wrong.');

    next(error);
  }
};

export default postMessage;
