import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';

@Controller('v1/auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiOperation({ summary: 'users login to generate access token' })
  @ApiResponse({ status: 200, description: 'authorized' })
  @ApiResponse({ status: 401, description: 'unauthorized' })
  async login(@Req() req: any) {
    return await this.authService.login(req.user);
  }
}
