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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const hash_config_1 = require("../../../config/hash.config");
const email_already_used_exception_1 = require("./exceptions/email-already-used.exception");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async user(userWhereUniqueInput) {
        return this.prisma.user.findUnique({
            where: userWhereUniqueInput,
        });
    }
    async users(params) {
        const { skip, take, cursor, where, orderBy } = params;
        return this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
    }
    async createUser(createUserDto) {
        try {
            const hashedPassword = (0, hash_config_1.generateHash)(createUserDto.password);
            const lowerCaseEmail = createUserDto.email.toLowerCase();
            const data = {
                ...createUserDto,
                updatedAt: new Date(),
                email: lowerCaseEmail,
                password: hashedPassword,
            };
            const existingUser = await this.prisma.user.findUnique({
                where: { email: data.email },
            });
            if (existingUser) {
                console.log('Email already used');
                throw new email_already_used_exception_1.EmailAlreadyUsedException();
            }
            return await this.prisma.user.create({
                data,
            });
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async updateUser(params) {
        const { where, data } = params;
        return this.prisma.user.update({
            data,
            where,
        });
    }
    async countUsers(where) {
        return this.prisma.user.count({
            where: where,
        });
    }
    async deleteUser(where) {
        return this.prisma.user.delete({
            where,
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map