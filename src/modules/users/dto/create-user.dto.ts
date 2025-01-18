import { IsString, IsOptional, IsEmail, IsDate, IsNumber, IsEnum } from 'class-validator';
import { $Enums, User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements User {
    @IsOptional()
    @IsNumber({}, { message: 'L\'ID doit être un nombre.' })
    id: number;

    @ApiProperty({ description: 'Email address of the user' })
    @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
    name: string;

    @ApiProperty({ description: 'Email address of the user' })
    @IsEmail({}, { message: 'L\'email doit être une adresse valide.' })
    email: string;

    @ApiProperty({ description: 'Email address of the user' })
    @IsOptional()
    @IsString({ message: 'La ville doit être une chaîne de caractères.' })
    city: string;

    @ApiProperty({ description: 'Email address of the user' })
    @IsString({ message: 'Le numéro de téléphone (tel) est requis et doit être une chaîne.' })
    tel: string;

    @ApiProperty({ description: 'Email address of the user' })
    @IsString({ message: 'Le mot de passe doit être une chaîne de caractères.' })
    password: string;

    @IsOptional()
    @IsEnum(['USER', 'ADMIN'], { message: 'Le rôle doit être USER ou ADMIN.' })
    role: $Enums.Role;

    @IsOptional()
    @IsDate({ message: 'La date de création (createdAt) doit être une date valide.' })
    createdAt: Date;

    @IsOptional()
    @IsDate({ message: 'La date de mise à jour (updatedAt) doit être une date valide.' })
    updatedAt: Date;

    @ApiProperty({ description: 'Email address of the user', example:"dd-MM-yyyy" })
    @IsOptional()
    @IsDate({ message: 'L\'anniversaire (birthday) doit être une date valide.' })
    birthday: Date;
}
