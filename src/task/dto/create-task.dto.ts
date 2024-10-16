import { IsInt, IsString } from 'class-validator';

export class CreateTaskDto {
    @IsString()
    readonly name: string;
    @IsInt()
    readonly time: number;
}
