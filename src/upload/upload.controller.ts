import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Logger,
    HttpStatus,
    Req,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
    protected readonly logger = new Logger(UploadController.name);
    constructor(private readonly uploadService: UploadService) {}

    @Post('simple')
    @UseInterceptors(FileInterceptor('file'))
    simpleUpload(@UploadedFile() file: Express.Multer.File) {
        this.logger.debug(`uploaded file: ${file.originalname}`);
        return {
            status: HttpStatus.CREATED,
            message: `${file.originalname} uploaded with success`,
        };
    }

    @Post('stream')
    async streamUpload(@Req() req: Request): Promise<{ message: string }> {
        return await this.uploadService.processUpload(req);
    }
}
