
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'crypto';
import { generateHash } from 'config/hash.config';
import { EmailAlreadyUsedException } from './exceptions/email-already-used.exception';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = generateHash(createUserDto.password);
      const lowerCaseEmail = createUserDto.email.toLowerCase();
      const data = {
        ...createUserDto,
           updatedAt: new Date(),
        email: lowerCaseEmail,
        password: hashedPassword,
      }
      const existingUser = await this.prisma.user.findUnique({
        where: { email: data.email },
      });
    
      if (existingUser) {
        console.log('Email already used');
        
        throw new EmailAlreadyUsedException();
      }
      
      return await this.prisma.user.create({
        data,
      });

    } catch (error) {
      // throw new BadRequestException(error);
      throw new HttpException(error,HttpStatus.BAD_REQUEST);
    }

  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async countUsers(where?: Prisma.UserWhereInput): Promise<number> {
    return this.prisma.user.count({
      where: where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
