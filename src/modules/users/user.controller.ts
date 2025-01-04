import { Controller, Get, Query, Param, Post, Delete, Put, Body, BadRequestException, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToClass } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';

@UseFilters(ValidationExceptionFilter)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getUsers(
    @Query('skip') skip?: string,
    @Query('take') take?: string,
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,
    @Query('page') page: string = '1'
  ): Promise<{ total: number, page: number, data: User[] }> {
    const params = {
      skip: skip ? Number(skip) : undefined,
      take: take ? Number(take) : undefined,
      cursor: cursor ? JSON.parse(cursor) : undefined,
      where: where ? JSON.parse(where) : undefined,
      orderBy: orderBy ? JSON.parse(orderBy) : undefined,
    };

    console.log(params.where);

    const users = await this.userService.users(params);
    const total = await this.userService.countUsers(params.where);
    return {
      total: total,
      page: Number(page),
      data: users,
    };
  }

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | null> {
    return this.userService.user({ id: Number(id) });
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.userService.updateUser({
      where: { id: Number(id) },
      data,
    });
  }

  @Post('')
  async createUser(@Body() userData: Prisma.UserCreateInput): Promise<User> {
    try {
      const userDto = plainToClass(CreateUserDto, userData);
      await validateOrReject(userDto);
      // const userCreateInput: Prisma.UserCreateInput = {
      //   name: userDto.name,
      //   email: userDto.email,
      //   tel: userDto.tel,
      //   password: userDto.password,
      //   updatedAt: new Date(),
      //   // Ajoutez d'autres propriétés nécessaires ici
      // };
      return this.userService.createUser(userDto);

    } catch (error) {
      // console.error(error);
      // if (Array.isArray(error)) {
      //   const validationErrors = error.map((err: ValidationError) => ({
      //     field: err.property,
      //     value: err.value,
      //     errors: Object.values(err.constraints || {}),
      //   }));

      //   console.log(validationErrors);
        
      //   throw new HttpException(
      //     {
      //       statusCode: HttpStatus.BAD_REQUEST,
      //       message: 'Erreur de validation.',
      //       error: validationErrors,
      //     },
      //     HttpStatus.BAD_REQUEST,
      //   );
      // }

      throw new HttpException({
        statusCode: 500,
        // message: 'Email already used',
        error: error,
      }, 404);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}