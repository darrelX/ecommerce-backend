import { User } from '@prisma/client';
export declare class CreateUserDto implements User {
    id: number;
    name: string;
    email: string;
    city: string;
    tel: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    birthday: Date;
}
