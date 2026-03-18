import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ErrorHandlingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      next(); // Cho phép các middleware tiếp theo hoặc controller xử lý yêu cầu
    } catch (err) {
      console.error('Error caught by middleware:', err);
      res.status(500).json({
        statusCode: 500,
        message: 'Something went wrong, please try again later.',
      });
    }
  }
}
