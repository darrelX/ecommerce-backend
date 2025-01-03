import { Controller, Get, Query, Param, Post, Delete, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { Prisma } from '@prisma/client';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

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

    
    const users = await this.userService.users(params);
    const total = await this.userService.countUsers(params.where);
    return {
      total : total,
       page: Number(page),
       data : users,
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
    return this.userService.createUser(userData);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    return this.userService.deleteUser({ id: Number(id) });
  }
}