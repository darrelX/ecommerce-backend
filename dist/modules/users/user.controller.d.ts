import { UserService } from './user.service';
import { User } from '@prisma/client';
import { Prisma } from '@prisma/client';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(skip?: string, take?: string, cursor?: string, where?: string, orderBy?: string, page?: string): Promise<{
        total: number;
        page: number;
        data: User[];
    }>;
    getUser(id: string): Promise<User | null>;
    updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User>;
    createUser(userData: Prisma.UserCreateInput): Promise<User>;
    deleteUser(id: string): Promise<User>;
}
