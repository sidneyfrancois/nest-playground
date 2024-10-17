import {
    ForbiddenException,
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class TodoService {
    constructor(private readonly taskService: TaskService) {}

    create() {
        throw new ForbiddenException('test message for the client frontend', {
            cause: new Error('test cause for forbidden'),
            description: 'description for the error',
        });
    }

    findAll() {
        return this.taskService.findAll();
    }

    newFindAll() {
        return `This action returns all todo in version 1.1`;
    }

    findOne(id: number) {
        return `This action returns a #${id} todo`;
    }

    update() {
        throw new HttpException(
            {
                status: HttpStatus.NOT_FOUND,
                message: 'this is a custom message for the client',
                httpExceptionOptions: {},
            },
            HttpStatus.NOT_FOUND,
            {
                cause: new Error('test error cause post'),
            },
        );
    }

    remove(id: number) {
        return `This action removes a #${id} todo`;
    }
}
