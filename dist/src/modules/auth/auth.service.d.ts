import { PrismaService } from '../../prisma.service';
import { UserToken } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { LoginResponse } from './dto/login.response';
export declare class AuthService {
    private readonly userService;
    private readonly jwtService;
    private readonly prismaService;
    constructor(userService: UserService, jwtService: JwtService, prismaService: PrismaService);
    login(email: string, password: string, browserInfo?: string): Promise<LoginResponse>;
    logout(refreshToken: string): Promise<void>;
    logoutAll(user_id: number): Promise<void>;
    findAllTokens(userId: number): Promise<UserToken[]>;
    private generateAccessToken;
    private saveRefreshToken;
    private createRefreshToken;
    private validateUser;
    private rotateRefreshToken;
    private getUserRole;
}
