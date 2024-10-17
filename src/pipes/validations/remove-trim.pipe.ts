import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class RemoveTrim implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (typeof value === 'string') {
            return value.trim();
        }
        return value;
    }
}
