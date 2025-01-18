"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const client_1 = require("@prisma/client");
const create_user_dto_1 = require("./dto/create-user.dto");
const validation_exception_filter_1 = require("../../filters/validation-exception.filter");
const swagger_1 = require("@nestjs/swagger");
const date_fns_1 = require("date-fns");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async getUsers(skip, take, cursor, where, sort, sortbyOrder, page = '1') {
        try {
            const parseJSON = (input) => {
                if (!input)
                    return undefined;
                try {
                    return JSON.parse(input);
                }
                catch {
                    return input;
                }
            };
            const createUserOrderByInput = (field, direction) => {
                if (field && direction) {
                    return {
                        [field]: direction,
                    };
                }
                return undefined;
            };
            const pageSize = take ? Number(take) : 15;
            const currentPage = Number(page);
            const skip = (currentPage - 1) * pageSize;
            const params = {
                skip,
                take: pageSize,
                cursor: parseJSON(cursor),
                where: parseJSON(where),
                orderBy: createUserOrderByInput(sort, sortbyOrder),
            };
            const [users, total] = await Promise.all([
                this.userService.users(params),
                this.userService.countUsers(params.where),
            ]);
            const totalPages = Math.ceil(total / pageSize);
            if (currentPage > totalPages) {
                throw new common_1.HttpException({ message: `Page ${currentPage} exceeds total pages.` }, common_1.HttpStatus.BAD_REQUEST);
            }
            return {
                total,
                page: currentPage,
                totalPages,
                data: users,
            };
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'An error occurred', error: error.message || error }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getUser(id) {
        return await this.userService.user({ id: id ? Number(id) : undefined });
    }
    async updateUser(id, data) {
        return await this.userService.updateUser({
            where: { id: Number(id) },
            data,
        });
    }
    async createUser(createUserDto) {
        try {
            if (typeof createUserDto.birthday === 'string') {
                try {
                    createUserDto.birthday = (0, date_fns_1.parse)(createUserDto.birthday, 'dd-MM-yyyy', new Date());
                    console.log(createUserDto.birthday);
                }
                catch (error) {
                    throw new common_1.HttpException({ message: 'An error occurred', error: error.message || error }, common_1.HttpStatus.BAD_REQUEST);
                }
            }
            return this.userService.createUser(createUserDto);
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'An error occurred', error: error.message || error }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteUser(id) {
        try {
            return await this.userService.deleteUser({ id: Number(id) });
        }
        catch (error) {
            throw new common_1.HttpException({ message: 'An error occurred .', error: error.message || error }, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get users' }),
    (0, swagger_1.ApiQuery)({ name: 'skip', required: false, type: String, example: '0' }),
    (0, swagger_1.ApiQuery)({ name: 'take', required: false, type: String, example: '10' }),
    (0, swagger_1.ApiQuery)({ name: 'cursor', required: false, type: String, example: '' }),
    (0, swagger_1.ApiQuery)({ name: 'where', required: false, type: String, example: '' }),
    (0, swagger_1.ApiQuery)({ name: 'sort', required: false, type: String, example: 'name' }),
    (0, swagger_1.ApiQuery)({
        name: 'sortby_order',
        required: false,
        enum: ['asc', 'desc'],
        example: 'asc'
    }),
    (0, swagger_1.ApiQuery)({ name: 'page', required: false, type: String, example: '1' }),
    (0, swagger_1.ApiResponse)({
        status: 200, description: 'List of users returned successfully.',
        schema: {
            example: {
                "total": 1,
                "page": 1,
                "data": [
                    {
                        "id": 2,
                        "email": "@gmail.com",
                        "password": "password",
                        "name": "XX",
                        "city": "Douala",
                        "tel": "6******",
                        "role": "USER",
                        "birthday": "10/06/2001",
                        "createdAt": "2025-01-05T15:54:59.837Z",
                        "updatedAt": "2025-01-05T15:54:59.835Z"
                    }
                ]
            }
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request.',
        schema: {
            example: {
                statusCode: 400,
                message: 'Invalid input data',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 500,
        description: 'Internal Server Error.',
        schema: {
            example: {
                statusCode: 500,
                message: 'Internal server error',
            },
        },
    }),
    __param(0, (0, common_1.Query)('skip')),
    __param(1, (0, common_1.Query)('take')),
    __param(2, (0, common_1.Query)('cursor')),
    __param(3, (0, common_1.Query)('where')),
    __param(4, (0, common_1.Query)('sort')),
    __param(5, (0, common_1.Query)('sortby_order')),
    __param(6, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new user' }),
    (0, swagger_1.ApiBody)({
        type: create_user_dto_1.CreateUserDto,
        schema: {
            type: 'create',
            example: {
                email: 'example@gmail.com',
                password: 'password123',
                name: 'John Doe',
                city: 'Douala',
                tel: '612345678',
                role: 'USER',
                birthday: 'dd-MM-yyyy',
            },
        },
    }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'User created successfully.',
        schema: {
            example: {
                "id": 2,
                "email": "@gmail.com",
                "password": "password",
                "name": "XX",
                "city": "Douala",
                "tel": "6******",
                "role": "USER",
                "birthday": "10/06/2001",
                "createdAt": "2025-01-05T15:54:59.837Z",
                "updatedAt": "2025-01-05T15:54:59.835Z"
            }
        }
    }),
    (0, swagger_1.ApiResponse)({
        status: 400,
        description: 'Bad Request.',
        schema: {
            example: {
                statusCode: 400,
                message: 'Invalid input data',
            },
        },
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.UseFilters)(validation_exception_filter_1.ValidationExceptionFilter),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map