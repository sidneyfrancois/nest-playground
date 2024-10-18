import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Logger,
    HttpStatus,
    Req,
    Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import * as Busboy from 'busboy';
import createExcelWorkbookStream, { RowWithColumns } from 'excel-row-stream';
import * as ExcelRowStream from 'excel-row-stream';
import { Writable } from 'stream';

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

    @Post('stream')
    streamUpload(@Req() req: Request, @Res() res: Response) {
        const busboy = Busboy({ headers: req.headers });
        busboy.on('file', async (fieldName, fileStream, fileInfo) => {
            const { filename, ..._ } = fileInfo;
            this.logger.verbose(`${filename} UPLOAD STREAM HAS STARTED`);

            const workbookStream = createExcelWorkbookStream({
                matchSheet: /Sheet1/i,
                dropEmptyRows: true,
            });

            const withColumnsStream =
                ExcelRowStream.createRowToRowWithColumnsStream({
                    sanitizeColumnName: (columnName) => {
                        return columnName.toLowerCase().replace(/\W/g, '_');
                    },
                });

            const resultStream = new Writable({
                objectMode: true,
                write: (row: RowWithColumns, _encoding, callback) => {
                    // uncomment only if you want to see all the lines printed during stream
                    // this.logger.debug(row.columns);
                    callback();
                },
            });

            fileStream
                .pipe(workbookStream)
                .pipe(withColumnsStream)
                .pipe(resultStream)
                .on('finish', () => {
                    this.logger.verbose(
                        `STREAM XLSX ${filename} PROCESSING FINISHED`,
                    );
                });
        });

        busboy.on('close', () => {
            this.logger.verbose('STREAM UPLOAD FINISHED');
            res.end();
        });

        req.pipe(busboy);
    }
}
