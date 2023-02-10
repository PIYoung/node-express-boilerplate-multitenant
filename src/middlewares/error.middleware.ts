import { Request, Response } from 'express';

export function errorHandler(err: any, req: Request, res: Response) {
  const { headers = {}, query = {}, params = {}, body = {}, path = '', method = '' } = req;
  const status = err.status || 500;
  const message = err.message || 'Unknown error occurred';

  return res.status(status).json({
    result: false,
    data: {
      status,
      message,
      path,
      method,
      request: {
        headers,
        query,
        params,
        body,
      },
    },
  });
}
