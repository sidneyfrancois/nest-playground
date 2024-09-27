import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { ChainModule } from './chain/chain.module';

@Module({
  imports: [TodoModule, ChainModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
