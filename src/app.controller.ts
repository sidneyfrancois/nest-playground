import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  private readonly databaseConnection: string;

  constructor(
    private readonly appService: AppService,
    config: ConfigService,
  ) {
    this.databaseConnection = config.get('DATABASE_URL');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
