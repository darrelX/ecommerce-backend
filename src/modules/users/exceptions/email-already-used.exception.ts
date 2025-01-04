import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyUsedException extends HttpException {
    constructor() {
        super({
            statusCode: HttpStatus.BAD_REQUEST,
            message: 'Email already used',
            error: 'Bad Request',
        }, HttpStatus.BAD_REQUEST);
    }
}

export class UserNotFoundException extends HttpException {
    constructor() {
        super({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'User not found',
            error: 'Not Found',
        }, HttpStatus.NOT_FOUND);
    }
}

export class InvalidPasswordException extends HttpException {
    constructor() {
        super({
            statusCode: HttpStatus.FORBIDDEN,
            message: 'Invalid password',
            error: 'Forbidden',
        }, HttpStatus.FORBIDDEN);
    }
}

export class UnauthorizedAccessException extends HttpException {
    constructor() {
        super({
            statusCode: HttpStatus.UNAUTHORIZED,
            message: 'Unauthorized access',
            error: 'Unauthorized',
        }, HttpStatus.UNAUTHORIZED);
    }
}
