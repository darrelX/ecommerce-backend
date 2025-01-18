import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ValidationError } from 'class-validator';

@Catch(HttpException)
export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const exceptionResponse: any = exception.getResponse();

        // Vérifier si c'est une erreur de validation
        if (exceptionResponse.error != undefined &&
            exceptionResponse.error[0] instanceof ValidationError
        ) {
            const validationErrors = exceptionResponse.error.map((err: ValidationError) => ({
                field: err.property,
                value: err.value,
                errors: Object.values(err.constraints || {}),
            }));

            response.status(HttpStatus.BAD_REQUEST).json({
                statusCode: HttpStatus.BAD_REQUEST,
                message: 'Erreur de validation.',
                error: validationErrors,
                path: request.url,
                timestamp: new Date().toISOString(),
            });
            return;
        }

        // Pour toutes les autres erreurs
        response.status(status).json({
            statusCode: status,
            message: exceptionResponse.message || 'Une erreur est survenue',
            error: exceptionResponse.error || 'Erreur',
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
}
