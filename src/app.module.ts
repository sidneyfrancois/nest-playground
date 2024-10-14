import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { ChainModule } from './chain/chain.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { configValidationSchema } from './config/config.schema';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.resolve(
        process.cwd(),
        `env/.env.${process.env.NODE_ENV}`,
      ),
      validationSchema: configValidationSchema,
    }),
    TodoModule,
    ChainModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
