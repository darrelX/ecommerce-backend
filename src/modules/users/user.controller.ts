import { Controller, Get, Query, Param, Post, Delete, Put, Body, BadRequestException, UseFilters, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { plainToClass } from 'class-transformer';
import { IsOptional, validateOrReject, ValidationError } from 'class-validator';
import { ValidationExceptionFilter } from 'src/filters/validation-exception.filter';
import { ApiBody, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { parse } from 'date-fns';

@ApiTags('users')
@UseFilters(ValidationExceptionFilter)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @ApiOperation({ summary: 'Get users' })
  @ApiQuery({ name: 'skip', required: false, type: String, example: '0' })
  @ApiQuery({ name: 'take', required: false, type: String, example: '10' })
  @ApiQuery({ name: 'cursor', required: false, type: String, example: '' })
  @ApiQuery({ name: 'where', required: false, type: String, example: '' })
  @ApiQuery({ name: 'sort', required: false, type: String, example: 'name' })
  @ApiQuery({
    name: 'sortby_order',
    required: false,
    enum: ['asc', 'desc'],
    example: 'asc'
  })
  @ApiQuery({ name: 'page', required: false, type: String, example: '1' })
  @ApiResponse({
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
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid input data',
      },
    },
  })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error.',
    schema: {
      example: {
        statusCode: 500,
        message: 'Internal server error',
      },
    },
  })
  async getUsers(
    @Query('skip') skip?: string,
    @Query('take') take?: string, // Nombre d'éléments par page
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('sort') sort?: string, // Champ de tri
    @Query('sortby_order') sortbyOrder?: 'asc' | 'desc', // Direction du tri
    @Query('page') page: string = '1', // Numéro de la page
  ): Promise<{ total: number; page: number; totalPages: number; data: User[] }> {
    try {
      // Fonction pour parser les entrées JSON
      const parseJSON = (input: string | undefined): any => {
        if (!input) return undefined; // Si pas de valeur, retourner `undefined`
        try {
          return JSON.parse(input); // Essayer de parser si c'est une chaîne
        } catch {
          return input; // Retourner tel quel si ce n'est pas un JSON valide
        }
      };

      // Fonction pour créer le paramètre `orderBy` basé sur `sort` et `sortby_order`
      const createUserOrderByInput = (
        field: string | undefined,
        direction: 'asc' | 'desc' | undefined
      ): Prisma.UserOrderByWithRelationInput | undefined => {
        if (field && direction) {
          return {
            [field]: direction,
          };
        }
        return undefined; // Si aucun paramètre n'est fourni pour `sort` ou `sortby_order`, retourner undefined
      };

      // Définir le nombre d'éléments par page (par défaut à 15 si non spécifié)
      const pageSize = take ? Number(take) : 15;
      const currentPage = Number(page);

      // Calculer skip en fonction de la page actuelle et du nombre d'éléments par page
      const skip = (currentPage - 1) * pageSize;

      // Construire les paramètres de la requête
      const params = {
        skip,
        take: pageSize,
        cursor: parseJSON(cursor),
        where: parseJSON(where),
        orderBy: createUserOrderByInput(sort, sortbyOrder),
      };



      // Récupérer les utilisateurs et le nombre total
      const [users, total] = await Promise.all([
        this.userService.users(params),
        this.userService.countUsers(params.where),
      ]);

      // Calculer le nombre total de pages
      const totalPages = Math.ceil(total / pageSize);

      // Si la page demandée dépasse le nombre total de pages, lancer une exception
      if (currentPage > totalPages) {
        throw new HttpException(
          { message: `Page ${currentPage} exceeds total pages.` },
          HttpStatus.BAD_REQUEST,
        );
      }

      // Retourner les résultats avec les informations de pagination
      return {
        total,
        page: currentPage,
        totalPages,
        data: users,
      };
    } catch (error) {
      throw new HttpException(
        { message: 'An error occurred', error: error.message || error },
        HttpStatus.BAD_REQUEST,
      );
    }
  }


  @Get(':id')
  async getUser(@Param('id') id: string): Promise<User | {}> {
    return await this.userService.user({ id: id ? Number(id) : undefined });
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return await this.userService.updateUser({
      where: { id: Number(id) },
      data,
    });
  }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
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
  })
  @ApiResponse({
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
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request.',
    schema: {
      example: {
        statusCode: 400,
        message: 'Invalid input data',
      },

    },
  })
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      if (typeof createUserDto.birthday === 'string') {
        try {

          createUserDto.birthday = parse(
            createUserDto.birthday,
            'dd-MM-yyyy',
            new Date(),
          ) as unknown as Date; // Conversion en Date.
          console.log(createUserDto.birthday);


        } catch (error) {
          throw new HttpException(
            { message: 'An error occurred', error: error.message || error },
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      return this.userService.createUser(createUserDto);
    } catch (error) {
      throw new HttpException(
        { message: 'An error occurred', error: error.message || error },
        HttpStatus.BAD_REQUEST,
      );

    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<User> {
    try {
      return await this.userService.deleteUser({ id: Number(id) });

    } catch (error) {
      throw new HttpException(
        { message: 'An error occurred .', error: error.message || error },
        HttpStatus.BAD_REQUEST,
      );

    }
  }
}