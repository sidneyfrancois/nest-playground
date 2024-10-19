import { Transform } from 'stream';
import { Logger } from '@nestjs/common';

export function logTransformer(filename: string) {
    const logger = new Logger('LogTransformer');
    return new Transform({
        transform(chunk, encoding, callback) {
            logger.debug(`File ${filename} got ${chunk.length} bytes`);
            callback(null, chunk);
        },
    });
}

export function uppercaseTransformer() {
    return new Transform({
        transform(chunk, encoding, callback) {
            const uppercased = chunk.toString().toUpperCase();
            callback(null, Buffer.from(uppercased));
        },
    });
}
