import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import { ChainModule } from './chain/chain.module';
import { ConfigModule } from '@nestjs/config';
import * as path from 'path';
import { configValidationSchema } from './config/config.schema';
import { TaskModule } from './task/task.module';

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
        TaskModule,
    ],
})
export class AppModule {}
