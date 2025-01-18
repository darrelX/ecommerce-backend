"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOrderDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const library_1 = require("@prisma/client/runtime/library");
class CreateOrderDto {
}
exports.CreateOrderDto = CreateOrderDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'L\'ID doit être un nombre.' }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID du client' }),
    (0, class_validator_1.IsNumber)({}, { message: 'L\'ID du client doit être un nombre.' }),
    __metadata("design:type", Number)
], CreateOrderDto.prototype, "user_id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'OrderDetails' }),
    (0, class_validator_1.IsArray)({ message: "L' orderDetail doit etre un Array" }),
    __metadata("design:type", Array)
], CreateOrderDto.prototype, "orderDetails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Le statut de la commande' }),
    (0, class_validator_1.IsEnum)(['Pending', 'Completed', 'Cancelled'], { message: "Le status n'est pas correct" }),
    __metadata("design:type", String)
], CreateOrderDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Prix total de la commande' }),
    (0, class_validator_1.IsNumber)({}, { message: 'Le prix total doit être un nombre.' }),
    __metadata("design:type", library_1.Decimal)
], CreateOrderDto.prototype, "amount", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'La date de création (createdAt) doit être une date valide.' }),
    __metadata("design:type", Date)
], CreateOrderDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'La date de mise à jour (updatedAt) doit être une date valide.' }),
    __metadata("design:type", Date)
], CreateOrderDto.prototype, "updatedAt", void 0);
//# sourceMappingURL=create-order.dto.js.map