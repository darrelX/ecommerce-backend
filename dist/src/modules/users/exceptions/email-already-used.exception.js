"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedAccessException = exports.InvalidPasswordException = exports.UserNotFoundException = exports.EmailAlreadyUsedException = void 0;
const common_1 = require("@nestjs/common");
class EmailAlreadyUsedException extends common_1.HttpException {
    constructor() {
        super({
            statusCode: common_1.HttpStatus.BAD_REQUEST,
            message: 'Email already used',
            error: 'Bad Request',
        }, common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.EmailAlreadyUsedException = EmailAlreadyUsedException;
class UserNotFoundException extends common_1.HttpException {
    constructor() {
        super({
            statusCode: common_1.HttpStatus.NOT_FOUND,
            message: 'User not found',
            error: 'Not Found',
        }, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.UserNotFoundException = UserNotFoundException;
class InvalidPasswordException extends common_1.HttpException {
    constructor() {
        super({
            statusCode: common_1.HttpStatus.FORBIDDEN,
            message: 'Invalid password',
            error: 'Forbidden',
        }, common_1.HttpStatus.FORBIDDEN);
    }
}
exports.InvalidPasswordException = InvalidPasswordException;
class UnauthorizedAccessException extends common_1.HttpException {
    constructor() {
        super({
            statusCode: common_1.HttpStatus.UNAUTHORIZED,
            message: 'Unauthorized access',
            error: 'Unauthorized',
        }, common_1.HttpStatus.UNAUTHORIZED);
    }
}
exports.UnauthorizedAccessException = UnauthorizedAccessException;
//# sourceMappingURL=email-already-used.exception.js.map