
import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User, Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
// import { hash } from 'crypto';
import { EmailAlreadyUsedException } from './exceptions/email-already-used.exception';
import { hashConfig } from 'config/hash.config';
import { hash } from 'bcrypt';
import { parse } from 'date-fns';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }
  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | {}> {
    try {
      const user = await this.prisma.user.findUnique({
        where: userWhereUniqueInput,
      });
      return user || {};
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    try {
      
      return this.prisma.user.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);

    }

  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const hashedPassword = await hash(
        createUserDto.password,
        hashConfig.saltRounds,
      );
      const lowerCaseEmail = createUserDto.email.toLowerCase();

    // Conversion du birthday au format ISO-8601
    // const birthday = parse(createUserDto.birthday, 'dd-MM-yyyy', new Date()).toISOString();

      const existingUser = await this.prisma.user.findUnique({
        where: { email: createUserDto.email },
      });


      if (existingUser) {
        throw new EmailAlreadyUsedException();
      }

      console.log(createUserDto.birthday);
      

      const data = {
        ...createUserDto,
        updatedAt: new Date(),
        email: lowerCaseEmail,
        password: hashedPassword,
      }
      return await this.prisma.user.create({
        data,
      });

    } catch (error) {
      // throw new BadRequestException(error);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

  }

  async findById(id: number): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    delete user.password;

    return user;
  }

  /** Finds user by email and returns the user with password.
   * Used mainly in login to compare if the inputted password matches
   * the hashed one.
   */
  async findByEmail(email: string): Promise<User> {
    const lowerCaseEmail = email.toLowerCase();

    return this.prisma.user.findUnique({ where: { email: lowerCaseEmail } });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    try {
      return this.prisma.user.update({
        data,
        where,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);

    }

  }

  async countUsers(where?: Prisma.UserWhereInput): Promise<number> {
    try {
      return this.prisma.user.count({
        where: where,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);

    }

  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    try {
      return this.prisma.user.delete({
        where,
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);

    }

  }
}
