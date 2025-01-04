"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetailModule = void 0;
const common_1 = require("@nestjs/common");
const orderDetail_service_1 = require("./orderDetail.service");
const orderDetail_controller_1 = require("./orderDetail.controller");
const prisma_service_1 = require("../../prisma.service");
let OrderDetailModule = class OrderDetailModule {
};
exports.OrderDetailModule = OrderDetailModule;
exports.OrderDetailModule = OrderDetailModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [orderDetail_controller_1.OrderDetailController],
        providers: [orderDetail_service_1.OrderDetailService, prisma_service_1.PrismaService],
    })
], OrderDetailModule);
//# sourceMappingURL=orderDetail.module.js.map