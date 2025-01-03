import { UserService } from './user.service';
import { User } from '@prisma/client';
import { Prisma } from '@prisma/client';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    getUsers(skip?: number, take?: number, cursor?: string, where?: string, orderBy?: string): Promise<User[]>;
    getUser(id: string): Promise<User | null>;
    updateUser(id: string, data: Prisma.UserUpdateInput): Promise<User>;
}
