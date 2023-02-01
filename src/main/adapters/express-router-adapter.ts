import { type Request, type Response } from 'express';
import { type Controller } from '@/interfaces/protocols/controller';

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body ?? {})
    };
    const httpResponse = await controller.handle(request);
    if (httpResponse.statusCode >= 200 && httpResponse.statusCode <= 299) {
      res.status(httpResponse.statusCode).json(httpResponse.data);
    } else {
      res.status(httpResponse.statusCode).json({
        error: httpResponse.data.message
      });
    }
  };
};
