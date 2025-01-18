"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshJwtConfig = exports.accessJwtConfig = void 0;
exports.accessJwtConfig = {
    secret: process.env.ACCESS_JWT_SECRET,
    expiresIn: '15m',
};
exports.refreshJwtConfig = {
    secret: process.env.REFRESH_JWT_SECRET,
    expiresIn: '90d',
};
//# sourceMappingURL=jwt.config.js.map