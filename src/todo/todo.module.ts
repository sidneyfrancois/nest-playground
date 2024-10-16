import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { CoreModule } from 'src/core/core.module';

@Module({
    imports: [CoreModule],
    controllers: [TodoController],
    providers: [TodoService],
})
export class TodoModule {}
