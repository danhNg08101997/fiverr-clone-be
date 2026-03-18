import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthorizationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // const userRole = req.user?.role; // Giả sử vai trò người dùng được giải mã từ token
    // if (userRole !== 'admin') {
    //   return res.status(403).json({ message: 'Access denied' });
    // }
    next();
  }
}
