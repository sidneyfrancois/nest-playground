import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { Logger } from '@nestjs/common';
import { HttpExceptionLoggerFilter } from './error/http-exception.filter';
import { AllExceptionsFilter } from './error/all-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));
    app.useGlobalFilters(new HttpExceptionLoggerFilter(httpAdapter));

    await app.listen(process.env.PORT);

    Logger.verbose(`Application is running on port ${process.env.PORT}`, 'API');
}
bootstrap();
