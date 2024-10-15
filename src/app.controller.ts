import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';
import { Observable } from 'rxjs';

interface MessageEvent {
  data: string | object;
  id?: string;
  type?: string;
  retry?: number;
}

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

  @Get('status')
  @Sse('status-stream')
  getStatus(): Observable<MessageEvent> {
    let count = 0;
    return new Observable((observer) => {
      const interval = setInterval(() => {
        observer.next({
          data: { status: `Uploading ${count++}` },
          type: 'notification',
        });
      }, 1000);

      const timeout = setTimeout(() => {
        clearInterval(interval);
        observer.complete();
      }, 5000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    });
  }
}
