import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
// import * as Joi from 'joi';

@Injectable()
export class ValidationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // const schema = Joi.object({
    //   name: Joi.string().min(3).required(),
    //   email: Joi.string().email().required(),
    // });

    // const { error } = schema.validate(req.body);

    // if (error) {
    //   return res.status(400).json({
    //     message: 'Invalid data',
    //     details: error.details,
    //   });
    // }

    next();
  }
}
