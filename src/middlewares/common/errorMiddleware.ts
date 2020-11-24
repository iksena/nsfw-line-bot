import { ErrorRequestHandler } from 'express';

const errorMiddleware: ErrorRequestHandler = (error, req, res, _) => {
  const errorResponse = {
    message: error.message || 'Something went wrong',
    statusCode: error.statusCode || 500,
  };

  return res.status(errorResponse.statusCode).json(errorResponse);
};

export default errorMiddleware;
