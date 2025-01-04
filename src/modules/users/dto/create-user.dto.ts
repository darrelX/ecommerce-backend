import { IsString, IsOptional, IsEmail, IsDate, IsNumber } from 'class-validator';
import { User } from '@prisma/client';

export class CreateUserDto implements User {

    @IsOptional()
    @IsNumber({}, { message: 'L\'ID doit être un nombre.' })
    id: number;

    @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
    name: string;

    @IsEmail({}, { message: 'L\'email doit être une adresse valide.' })
    email: string;

    @IsOptional()
    @IsString({ message: 'La ville doit être une chaîne de caractères.' })
    city: string;

    @IsString({ message: 'Le numéro de téléphone (tel) est requis et doit être une chaîne.' })
    tel: string;

    @IsString({ message: 'Le mot de passe doit être une chaîne de caractères.' })
    password: string;

    @IsOptional()
    @IsDate({ message: 'La date de création (createdAt) doit être une date valide.' })
    createdAt: Date;

    @IsOptional()
    @IsDate({ message: 'La date de mise à jour (updatedAt) doit être une date valide.' })
    updatedAt: Date;

    @IsOptional()
    @IsDate({ message: 'L\'anniversaire (birthday) doit être une date valide.' })
    birthday: Date;
}
