import { Injectable } from '@nestjs/common';
import { Task } from './interfaces/task.interface';

@Injectable()
export class TaskService {
    private readonly cats: Task[] = [];

    create(cat: Task) {
        this.cats.push(cat);
    }

    findAll(): Task[] {
        return this.cats;
    }
}
