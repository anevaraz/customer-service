import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/alive', 301)
  toAliveRedirect(): void {
    return;
  }

  @Get('/alive')
  alive(): string {
    return this.appService.alive();
  }
}
