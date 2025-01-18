import { UserService } from './user.service';
import { User } from '@prisma/client';
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(skip?: string, take?: string, cursor?: string, where?: string, sort?: string, sortbyOrder?: 'asc' | 'desc', page?: string): Promise<{
        total: number;
        page: number;
        totalPages: number;
        data: User[];
    }>;
    getUser(id: string): Promise<User | {}>;
    updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User>;
    createUser(createUserDto: CreateUserDto): Promise<User>;
    deleteUser(id: string): Promise<User>;
}
