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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)({}, { message: 'L\'ID doit être un nombre.' }),
    __metadata("design:type", Number)
], CreateUserDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email address of the user' }),
    (0, class_validator_1.IsString)({ message: 'Le nom doit être une chaîne de caractères.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email address of the user' }),
    (0, class_validator_1.IsEmail)({}, { message: 'L\'email doit être une adresse valide.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email address of the user' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)({ message: 'La ville doit être une chaîne de caractères.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "city", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email address of the user' }),
    (0, class_validator_1.IsString)({ message: 'Le numéro de téléphone (tel) est requis et doit être une chaîne.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "tel", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email address of the user' }),
    (0, class_validator_1.IsString)({ message: 'Le mot de passe doit être une chaîne de caractères.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(['USER', 'ADMIN'], { message: 'Le rôle doit être USER ou ADMIN.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'La date de création (createdAt) doit être une date valide.' }),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "createdAt", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'La date de mise à jour (updatedAt) doit être une date valide.' }),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "updatedAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Email address of the user', example: "dd-MM-yyyy" }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDate)({ message: 'L\'anniversaire (birthday) doit être une date valide.' }),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "birthday", void 0);
//# sourceMappingURL=create-user.dto.js.map