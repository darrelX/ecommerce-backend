import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsDate, IsEnum, IsNumber, IsOptional } from "class-validator";
import { $Enums, Order } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

export class CreateOrderDto implements Order {
    @IsOptional()
    @IsNumber({}, { message: 'L\'ID doit être un nombre.' })
    id: number;

    @ApiProperty({ description: 'ID du client' })
    @IsNumber({}, { message: 'L\'ID du client doit être un nombre.' })
    user_id: number;

    @ApiProperty({ description: 'OrderDetails' })
    @IsArray({ message: "L' orderDetail doit etre un Array" })
    orderDetails: Array<{
        product_id: number;
        quantity: number;
        price: number;
    }>;

    @ApiProperty({ description: 'Le statut de la commande' })
    @IsEnum(['Pending', 'Completed', 'Cancelled'], { message: "Le status n'est pas correct" })
    status: $Enums.Status;

    @ApiProperty({ description: 'Prix total de la commande' })
    @IsNumber({}, { message: 'Le prix total doit être un nombre.' })
    amount: Decimal;

    @IsOptional()
    @IsDate({ message: 'La date de création (createdAt) doit être une date valide.' })
    createdAt: Date;

    @IsOptional()
    @IsDate({ message: 'La date de mise à jour (updatedAt) doit être une date valide.' })
    updatedAt: Date;
}