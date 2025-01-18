
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma, User, UserToken } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/user.service';
import { LoginResponse } from './dto/login.response';
import { accessJwtConfig, refreshJwtConfig } from 'config/jwt.config';
import { v4 as uuidV4 } from 'uuid';
import { InvalidEmailOrPasswordException } from './exceptions/invalid-email-or-password.exception';
import { RefreshTokenPayload } from './types/refresh-token-payload';
import { compare } from 'bcrypt';
import getTokenExpirationDate from 'src/utils/getTokenExpirationDate';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,) {

  }

  async login(
    email: string,
    password: string,
    browserInfo?: string,
  ): Promise<LoginResponse> {
    try {
      const user: User = await this.validateUser(email, password);


      const payload = { sub: user.id, userRole: user.role };

      // const payload = { sub: user.id };

      const accessToken = await this.generateAccessToken(payload);


      const refreshToken = await this.createRefreshToken(
        { sub: payload.sub },
        browserInfo,
      );

      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

  }



  /** Deletes the refreshToken from the database*/
  async logout(refreshToken: string): Promise<void> {
    try {
      await this.prismaService.userToken.deleteMany({ where: { refreshToken } });

    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);

    }
  }

  /** Deletes all user's refresh tokens */
  async logoutAll(user_id: number): Promise<void> {
    try {
      await this.prismaService.userToken.deleteMany({ where: {  user_id } });

    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);

    }
  }

  /** Returns all user's active tokens */
  async findAllTokens(userId: number): Promise<UserToken[]> {
    const tokens = await this.prismaService.userToken.findMany({
      where: { user_id: userId },
    });

    return tokens;
  }

  /** Generates user's access token */
  private async generateAccessToken(payload: {
    sub: number;
    userRole: string;
  }): Promise<string> {
    try {
      const accessToken = await this.jwtService.signAsync(
        payload,
        accessJwtConfig,
      );

      return accessToken;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);

    }

  }

  /** Saves the new refresh token hashed in the database */
  private async saveRefreshToken(refreshTokenCredentials:  {
    user_id: number;
    refreshToken: string;
    family: string;
    browserInfo?: string;
  } ): Promise<void> {
    try {
      const expiresAt = getTokenExpirationDate();
      console.log(expiresAt);
      
      console.log("okk");
      

      await this.prismaService.userToken.create({
        data: { ...refreshTokenCredentials, expiresAt },
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
      
    }

  }

  private async createRefreshToken(
    payload: {
      sub: number;
      tokenFamily?: string;
    },
    browserInfo?: string,
  ): Promise<string> {
    try {
      if (!payload.tokenFamily) {
        payload.tokenFamily = uuidV4();
      }

      const refreshToken = await this.jwtService.signAsync(
        { ...payload },
        refreshJwtConfig,
      );
      

      await this.saveRefreshToken({
        user_id: payload.sub,
        refreshToken,
        family: payload.tokenFamily,
        browserInfo,
      });
      

      return refreshToken;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);

    }

  }

  private async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.userService.findByEmail(email);


      if (user) {
        const isPasswordValid = await compare(password, user.password);


        if (isPasswordValid) {

          return { ...user, password: undefined };
        }
      }

      throw new InvalidEmailOrPasswordException();
    } catch (error) {
      throw new InvalidEmailOrPasswordException();

      // throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

  }

  /** Removes the old token from the database and creates a new one */
  private async rotateRefreshToken(
    refreshToken: string,
    refreshTokenContent: RefreshTokenPayload,
    browserInfo?: string,
  ): Promise<string> {
    await this.prismaService.userToken.deleteMany({ where: { refreshToken } });

    const newRefreshToken = await this.createRefreshToken(
      {
        sub: Number(refreshTokenContent.sub),
        tokenFamily: refreshTokenContent.tokenFamily,
      },
      browserInfo,
    );

    return newRefreshToken;
  }

  private async getUserRole(userId: number): Promise<string> {
    try {
      const user = await this.userService.findById(userId);

      return user.role;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);

    }

  }
}




