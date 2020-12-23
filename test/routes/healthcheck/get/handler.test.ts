import { Request } from 'express';

import handler from '../../../../src/routes/healthcheck/get/handler';

describe('GET /healthcheck handler', () => {
  const req = {} as Request;
  const next = jest.fn();
  let res: any;

  beforeEach(() => {
    res = {
      json: jest.fn(),
      app: {
        locals: {
          logger: {
            error: jest.fn(),
          },
        },
      },
    };
  });

  it('should call res.json with message', () => {
    const expectedResponse = {
      message: 'NSFW service is healthy.',
    };

    handler(req, res, next);

    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it('should call logger.error when res.json is rejected', () => {
    const error = {};
    const expectedMessage = 'Something is wrong with NSFW service.';
    res.json.mockImplementationOnce(() => {
      throw error;
    });

    handler(req, res, next);

    expect(res.app.locals.logger.error).toHaveBeenCalledWith(error, expectedMessage);
  });
});
