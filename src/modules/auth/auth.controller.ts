
import { Controller, Get, Query, Param, Post, Delete, Put, Body, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma, UserToken } from '@prisma/client';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginResponse } from './dto/login.response';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { LogoutDto } from './dto/logout.dto';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  /** Authenticates the User */
  @ApiOperation({ summary: 'Logs in user' })
  @ApiOperation({
    
  })
  @ApiBody({
    description: 'Login credentials',
    // type: LoginCredentialsDto,
    schema: {
    type: 'LoginCredentialsDto',

      example: {
        email: "email",
        password: "password"
      }
    }
  })
  @Post('login')
  async login(
    @Body() { email, password }: LoginCredentialsDto,
    @Req() request: Request,
  ): Promise<LoginResponse> {
    console.log(request);

    const browserInfo =
      `${request.headers['user-agent']} ${request.headers['accept-language']}`.replace(
        / undefined/g,
        '',
      );
    return this.authService.login(email, password, browserInfo);
  }

  /** Logs out the User from the current session */
  @ApiOperation({ summary: 'Logs out user' })
  @ApiBearerAuth()
  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Body() { refreshToken }: LogoutDto): Promise<void> {
    return this.authService.logout(refreshToken);
  }

  // /** Returns all user's active tokens */
  // @ApiOperation({ summary: 'Returns all user active tokens' })
  // @ApiBearerAuth()
  // @Get('tokens')
  // async findAllTokens(@Req() request: Request): Promise<UserToken[]> {
  //   const { userId } = request.user as { userId: number };

  //   return this.authService.findAllTokens(userId);
  // }

}
