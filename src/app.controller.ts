import { Controller, Get, Redirect } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@Controller()
@ApiTags('Alive')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/alive', 301)
  @ApiOperation({ summary: 'root path redirects to health check' })
  @ApiResponse({ status: 301, description: 'redirect to health check' })
  toAliveRedirect(): void {
    return;
  }

  @Get('/alive')
  @ApiOperation({ summary: 'health check application' })
  @ApiResponse({ status: 200, description: 'alive' })
  @ApiResponse({ status: 500, description: 'server error' })
  alive(): string {
    return this.appService.alive();
  }
}
