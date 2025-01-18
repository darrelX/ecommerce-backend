"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidEmailOrPasswordException = void 0;
const common_1 = require("@nestjs/common");
class InvalidEmailOrPasswordException extends common_1.HttpException {
    constructor() {
        super({
            statusCode: common_1.HttpStatus.NOT_FOUND,
            message: 'User not found',
            error: 'Not Found',
        }, common_1.HttpStatus.NOT_FOUND);
    }
}
exports.InvalidEmailOrPasswordException = InvalidEmailOrPasswordException;
//# sourceMappingURL=invalid-email-or-password.exception.js.map