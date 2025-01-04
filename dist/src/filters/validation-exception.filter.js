"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
let ValidationExceptionFilter = class ValidationExceptionFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();
        if (exceptionResponse.error[0] instanceof class_validator_1.ValidationError) {
            console.log('Validation error');
            const validationErrors = exceptionResponse.error.map((err) => ({
                field: err.property,
                value: err.value,
                errors: Object.values(err.constraints || {}),
            }));
            response.status(common_1.HttpStatus.BAD_REQUEST).json({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                message: 'Erreur de validation.',
                error: validationErrors,
                path: request.url,
                timestamp: new Date().toISOString(),
            });
            return;
        }
        response.status(status).json({
            statusCode: status,
            message: exceptionResponse.message || 'Une erreur est survenue',
            error: exceptionResponse.error || 'Erreur',
            path: request.url,
            timestamp: new Date().toISOString(),
        });
    }
};
exports.ValidationExceptionFilter = ValidationExceptionFilter;
exports.ValidationExceptionFilter = ValidationExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], ValidationExceptionFilter);
//# sourceMappingURL=validation-exception.filter.js.map