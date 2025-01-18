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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../users/user.service");
const jwt_config_1 = require("../../../config/jwt.config");
const uuid_1 = require("uuid");
const invalid_email_or_password_exception_1 = require("./exceptions/invalid-email-or-password.exception");
const bcrypt_1 = require("bcrypt");
const getTokenExpirationDate_1 = require("../../utils/getTokenExpirationDate");
let AuthService = class AuthService {
    constructor(userService, jwtService, prismaService) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.prismaService = prismaService;
    }
    async login(email, password, browserInfo) {
        try {
            const user = await this.validateUser(email, password);
            const payload = { sub: user.id, userRole: user.role };
            const accessToken = await this.generateAccessToken(payload);
            const refreshToken = await this.createRefreshToken({ sub: payload.sub }, browserInfo);
            return {
                accessToken,
                refreshToken,
            };
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async logout(refreshToken) {
        try {
            await this.prismaService.userToken.deleteMany({ where: { refreshToken } });
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async logoutAll(user_id) {
        try {
            await this.prismaService.userToken.deleteMany({ where: { user_id } });
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAllTokens(userId) {
        const tokens = await this.prismaService.userToken.findMany({
            where: { user_id: userId },
        });
        return tokens;
    }
    async generateAccessToken(payload) {
        try {
            const accessToken = await this.jwtService.signAsync(payload, jwt_config_1.accessJwtConfig);
            return accessToken;
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async saveRefreshToken(refreshTokenCredentials) {
        try {
            const expiresAt = (0, getTokenExpirationDate_1.default)();
            console.log(expiresAt);
            console.log("okk");
            await this.prismaService.userToken.create({
                data: { ...refreshTokenCredentials, expiresAt },
            });
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async createRefreshToken(payload, browserInfo) {
        try {
            if (!payload.tokenFamily) {
                payload.tokenFamily = (0, uuid_1.v4)();
            }
            const refreshToken = await this.jwtService.signAsync({ ...payload }, jwt_config_1.refreshJwtConfig);
            await this.saveRefreshToken({
                user_id: payload.sub,
                refreshToken,
                family: payload.tokenFamily,
                browserInfo,
            });
            return refreshToken;
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async validateUser(email, password) {
        try {
            const user = await this.userService.findByEmail(email);
            if (user) {
                const isPasswordValid = await (0, bcrypt_1.compare)(password, user.password);
                if (isPasswordValid) {
                    return { ...user, password: undefined };
                }
            }
            throw new invalid_email_or_password_exception_1.InvalidEmailOrPasswordException();
        }
        catch (error) {
            throw new invalid_email_or_password_exception_1.InvalidEmailOrPasswordException();
        }
    }
    async rotateRefreshToken(refreshToken, refreshTokenContent, browserInfo) {
        await this.prismaService.userToken.deleteMany({ where: { refreshToken } });
        const newRefreshToken = await this.createRefreshToken({
            sub: Number(refreshTokenContent.sub),
            tokenFamily: refreshTokenContent.tokenFamily,
        }, browserInfo);
        return newRefreshToken;
    }
    async getUserRole(userId) {
        try {
            const user = await this.userService.findById(userId);
            return user.role;
        }
        catch (error) {
            throw new common_1.HttpException(error, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map