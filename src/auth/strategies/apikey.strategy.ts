import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';
import { AuthService } from '../auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
  HeaderAPIKeyStrategy,
  'apikey',
) {
  constructor(private authService: AuthService) {
    super(
      { header: 'apikey' },
      true,
      (apikey: string, done: any, req: Request) => {
        const checkKey = this.authService.validateApiKey(apikey);
        if (!checkKey) {
          return done(false);
        }
        return done(true);
      },
    );
  }
}
