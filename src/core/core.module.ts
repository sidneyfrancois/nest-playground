import { Module } from '@nestjs/common';
import { TaskModule } from 'src/task/task.module';

@Module({
    imports: [TaskModule],
    exports: [TaskModule],
})
export class CoreModule {}
