import { Global, Module } from '@nestjs/common';
import { TaskModule } from 'src/task/task.module';

@Global()
@Module({
    imports: [TaskModule],
    exports: [TaskModule],
})
export class GlobalModule {}
