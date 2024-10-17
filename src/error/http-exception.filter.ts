import { Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Request } from 'express';
import { StackBaseLoggingFilter } from './stack-base-loggin.filter';

@Catch(HttpException)
export class HttpExceptionLoggerFilter extends StackBaseLoggingFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        const { httpExceptionOptions: responseBody } =
            HttpException.extractDescriptionAndOptionsFrom(
                exception.getResponse(),
            );

        const cause = (exception instanceof Error && (exception as any))?.cause
            ? (exception as any).cause.toString()
            : 'No cause provided';

        this.logger.error(
            JSON.stringify({
                status,
                responseBody,
                path: request.url,
                cause,
            }),
        );

        super.catch(exception, host);
    }
}
