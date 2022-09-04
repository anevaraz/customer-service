import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UnauthorizedSwagger } from '../helpers/swagger/unauthorized.swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../app/users/dto/login-user.dto';
import { TokenAuhtSwagger } from '../helpers/swagger/token.auth.swagger';

@Controller('v1/auth')
@ApiTags('Auth')
@ApiSecurity('apiKey')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({ summary: 'users login to generate token' })
  @ApiResponse({ status: 201, type: TokenAuhtSwagger })
  @ApiResponse({ status: 401, type: UnauthorizedSwagger })
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}
