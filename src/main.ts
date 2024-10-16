import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableVersioning({
        type: VersioningType.URI,
        defaultVersion: '1',
    });

    await app.listen(process.env.PORT);

    Logger.verbose(`Application is running on port ${process.env.PORT}`, 'API');
}
bootstrap();
