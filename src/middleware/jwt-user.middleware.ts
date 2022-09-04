import { ForbiddenException, Injectable, NestMiddleware } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { MessagesHelper } from '../helpers/messages.helper';

@Injectable()
export class JwtUserMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}
  use(req: Request, res: Response, next: NextFunction) {
    const token: string = req.headers.authorization.split(' ')[1];
    const decoded: any = this.jwtService.decode(token);
    if (decoded.sub === req.params.id) return next();

    throw new ForbiddenException(MessagesHelper.FORBIDDEN);
  }
}
