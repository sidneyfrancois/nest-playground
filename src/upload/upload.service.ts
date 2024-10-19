import {
    Injectable,
    Logger,
    UnprocessableEntityException,
} from '@nestjs/common';
import * as Busboy from 'busboy';
import { Request } from 'express';
import { excelFilePipe } from './stream-pipes/excel-file-stream-pipe';

@Injectable()
export class UploadService {
    protected readonly logger = new Logger(UploadService.name);

    async processUpload(filesStream: Request): Promise<{ message: string }> {
        return new Promise((resolve, reject) => {
            const busboy = Busboy({ headers: filesStream.headers });

            busboy.on('file', async (fieldName, fileStream, fileInfo) => {
                const excelProcessingPipe = excelFilePipe(
                    this.logger,
                    fileStream,
                    fileInfo,
                );

                excelProcessingPipe.catch((error) => reject(error));
            });
            busboy.on('error', (error) => {
                reject(
                    new UnprocessableEntityException(
                        'Error while uploading file, maybe the file is currupted',
                        {
                            cause: error,
                            description: `ERROR IN BUSBOY STREAM WHILE PROCESSING ONE OF THE FILES`,
                        },
                    ),
                );
            });

            busboy.on('close', () => {
                this.logger.verbose(`BUSBOY STREAM UPLOAD CLOSED`);
                resolve({ message: 'upload close completed' });
            });

            busboy.on('finish', () => {
                this.logger.verbose('BUSBOY STREAM UPLOAD FINISHED');
                resolve({ message: 'upload finished completed' });
            });

            filesStream.pipe(busboy);
        });
    }
}
