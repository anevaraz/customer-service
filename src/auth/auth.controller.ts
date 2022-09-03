import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UnauthorizedUserSwagger } from './swagger/unauthorized.auth.swagger';
import { AuthService } from './auth.service';
import { LoginUserDto } from '../app/users/dto/login-user.dto';

@Controller('v1/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({ type: LoginUserDto })
  @ApiOperation({ summary: 'users login to generate token' })
  @ApiResponse({ status: 201, description: 'token generated' })
  @ApiResponse({ status: 401, type: UnauthorizedUserSwagger })
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}
