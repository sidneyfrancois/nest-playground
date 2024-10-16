import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskService } from './task.service';
import { Task } from './interfaces/task.interface';

@Controller('task')
export class TaskController {
    constructor(private catsService: TaskService) {}

    @Post()
    async create(@Body() taskDto: CreateTaskDto) {
        this.catsService.create(taskDto);
    }

    @Get()
    async findAll(): Promise<Task[]> {
        return this.catsService.findAll();
    }
}
