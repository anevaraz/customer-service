import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as passport from 'passport';
import { MessagesHelper } from '../helpers/messages.helper';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    passport.authenticate('apikey', { session: false }, (value) => {
      if (value) {
        next();
      } else {
        throw new UnauthorizedException(MessagesHelper.UNAUTHORIZED);
      }
    })(req, res, next);
  }
}
