import { JwtService } from '@nestjs/jwt';
import { JwtUserMiddleware } from './jwt-user.middleware';

describe('JwtUserMiddleware', () => {
  it('should be defined', () => {
    expect(new JwtUserMiddleware(new JwtService())).toBeDefined();
  });
});
