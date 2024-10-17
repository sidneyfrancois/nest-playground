import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    BadRequestException,
} from '@nestjs/common';

@Injectable()
export class StringValidation implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata) {
        if (typeof value === 'string' && value.length === 0) {
            throw new BadRequestException(
                'Validation failed: Value cannot be empty.',
            );
        }
        return value;
    }
}
