import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TaskService } from 'src/task/task.service';

@Injectable()
export class TodoService {
    constructor(private readonly taskService: TaskService) {}

    create(createTodoDto: CreateTodoDto) {
        return 'This action adds a new todo';
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

    update(id: number, updateTodoDto: UpdateTodoDto) {
        return `This action updates a #${id} todo`;
    }

    remove(id: number) {
        return `This action removes a #${id} todo`;
    }
}
