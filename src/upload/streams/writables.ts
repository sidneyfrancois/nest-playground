import { Writable } from 'stream';
import { Logger } from '@nestjs/common';
import { RowWithColumns } from 'excel-row-stream';

export const getAllWritableStreams = (logger: Logger) => {
    const resultStream = new Writable({
        objectMode: true,
        write: (row: RowWithColumns, _encoding, callback) => {
            // uncomment only if you want to see all the lines printed during stream
            logger.debug(row.columns);
            callback();
        },
    });

    return { resultStream };
};
