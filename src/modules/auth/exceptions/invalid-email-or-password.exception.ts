import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidEmailOrPasswordException extends HttpException {
    constructor() {
        super({
            statusCode: HttpStatus.NOT_FOUND,
            message: 'User not found',
            error: 'Not Found',
        }, HttpStatus.NOT_FOUND);

    }
}