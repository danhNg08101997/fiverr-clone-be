import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization'];
    if (!token) {
      return res.status(403).json({ message: 'No token provided' });
    }

    // Xử lý xác thực token ở đây, ví dụ: kiểm tra JWT token
    // Nếu token hợp lệ, gọi next(), nếu không trả về lỗi
    try {
      // const decoded = jwt.verify(token, 'secretKey'); // Đoạn này cần tùy chỉnh với JWT
      // req.user = decoded;
      next();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  }
}
