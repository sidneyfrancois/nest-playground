import {
    Controller,
    Get,
    Post,
    Patch,
    Param,
    Delete,
    Version,
    Query,
    UsePipes,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { RemoveTrim } from 'src/pipes/validations/remove-trim.pipe';
import { StringValidation } from 'src/pipes/transformers/string-validation.pipe';

@Controller('todo')
export class TodoController {
    constructor(private readonly todoService: TodoService) {}

    @Post()
    create() {
        return this.todoService.create();
    }

    @Get()
    findAll() {
        return this.todoService.findAll();
    }

    @Version('1.1')
    @Get()
    findAllV2() {
        return this.todoService.newFindAll();
    }

    @Get('pipes')
    @UsePipes(RemoveTrim, StringValidation)
    findOneValid(@Query('name') name: string) {
        return this.todoService.findOne(name);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.todoService.findOne(id);
    }

    @Patch()
    update() {
        return this.todoService.update();
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.todoService.remove(+id);
    }
}
