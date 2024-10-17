import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Logger,
    HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
    protected readonly logger = new Logger(UploadController.name);

    @Post('simple')
    @UseInterceptors(FileInterceptor('file'))
    simpleUpload(@UploadedFile() file: Express.Multer.File) {
        this.logger.debug(`uploaded file: ${file.originalname}`);
        return {
            status: HttpStatus.CREATED,
            message: `${file.originalname} uploaded with success`,
        };
    }
}
