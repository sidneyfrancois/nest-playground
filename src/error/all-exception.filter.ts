import { Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { StackBaseLoggingFilter } from './stack-base-loggin.filter';

@Catch()
export class AllExceptionsFilter extends StackBaseLoggingFilter {
    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const status = HttpStatus.INTERNAL_SERVER_ERROR;
        const errorMessage =
            (exception instanceof Error && (exception as any))?.message ||
            'Internal server error';

        this.logger.error(
            JSON.stringify({
                status,
                response: errorMessage,
                path: request.url,
                cause: 'no cause provided',
            }),
        );

        super.catch(exception, host);
    }
}
