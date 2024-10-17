import {
    Catch,
    ArgumentsHost,
    Logger,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Response } from 'express';

@Catch()
export class StackBaseLoggingFilter extends BaseExceptionFilter {
    protected readonly logger = new Logger(StackBaseLoggingFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const stack = (exception as any)?.stack || 'no stack provided';
        const status = HttpStatus.INTERNAL_SERVER_ERROR;

        this.logger.debug(stack);

        if (exception instanceof HttpException) {
            super.catch(exception, host);
            return;
        }

        response.status(status).json({
            status,
            error: (exception as any)?.message || 'Internal server error',
        });
    }
}
