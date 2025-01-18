import { $Enums, User } from '@prisma/client';
export declare class CreateUserDto implements User {
    id: number;
    name: string;
    email: string;
    city: string;
    tel: string;
    password: string;
    role: $Enums.Role;
    createdAt: Date;
    updatedAt: Date;
    birthday: Date;
}
