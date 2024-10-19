import { Logger, UnprocessableEntityException } from '@nestjs/common';
import { Readable } from 'stream';
import { getAllDuplexStreams } from '../streams/duplexes';
import { getAllWritableStreams } from '../streams/writables';
import { FileInfo } from 'busboy';

export const excelFilePipe = (
    logger: Logger,
    fileStream: Readable,
    fileInfo: FileInfo,
) => {
    const { filename, ..._ } = fileInfo;
    const { workbookStream, withColumnsStream } = getAllDuplexStreams();
    const { resultStream } = getAllWritableStreams(logger);

    logger.verbose(`${filename} EXCEL STREAM HAS STARTED`);

    const excelProcessingPipe = new Promise<void>(
        (resolveFileStream, rejectFileStream) => {
            fileStream
                .pipe(workbookStream)
                .pipe(withColumnsStream)
                .pipe(resultStream)
                .on('error', (error) => {
                    rejectFileStream(
                        new UnprocessableEntityException(
                            `Error while processing the file, maybe the file ${filename} is currupted`,
                            {
                                cause: error,
                                description: `ERROR WHILE PROCESSING THE FILE ${filename} IN THE PIPE STREAM`,
                            },
                        ),
                    );
                })
                .on('finish', () => {
                    logger.verbose(
                        `STREAM XLSX ${filename} PROCESSING FINISHED`,
                    );
                    resolveFileStream();
                });
        },
    );

    return excelProcessingPipe;
};
