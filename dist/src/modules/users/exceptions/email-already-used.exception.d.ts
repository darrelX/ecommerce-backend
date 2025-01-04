import { HttpException } from '@nestjs/common';
export declare class EmailAlreadyUsedException extends HttpException {
    constructor();
}
export declare class UserNotFoundException extends HttpException {
    constructor();
}
export declare class InvalidPasswordException extends HttpException {
    constructor();
}
export declare class UnauthorizedAccessException extends HttpException {
    constructor();
}
