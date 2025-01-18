"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = getTokenExpirationDate;
const ms_1 = require("ms");
const date_fns_1 = require("date-fns");
const jwt_config_1 = require("../../config/jwt.config");
const date_fns_2 = require("date-fns");
function getTokenExpirationDate() {
    console.log("Starting token expiration calculation");
    const expiresIn = jwt_config_1.refreshJwtConfig.expiresIn;
    const match = expiresIn.match(/^(\d+)([smhd])$/);
    if (!match) {
        throw new Error('Invalid expiration format in refreshJwtConfig.expiresIn. Ensure it is a valid format like "7d", "24h", "30m", etc.');
    }
    const value = parseInt(match[1], 10);
    const unit = match[2];
    let expiresAt;
    const now = new Date();
    switch (unit) {
        case 's':
            expiresAt = (0, date_fns_1.addMinutes)(now, value / 60);
            break;
        case 'm':
            expiresAt = (0, date_fns_1.addMinutes)(now, value);
            break;
        case 'h':
            expiresAt = (0, date_fns_1.addHours)(now, value);
            break;
        case 'd':
            expiresAt = (0, date_fns_2.addDays)(now, value);
            break;
        default:
            throw new Error('Unsupported time unit in refreshJwtConfig.expiresIn');
    }
    console.log("Token expiration calculated successfully:", expiresAt);
    return expiresAt;
}
function getDaysFromDuration(duration) {
    const milliseconds = (0, ms_1.default)(duration);
    const seconds = milliseconds / 1000;
    const minutes = seconds / 60;
    const hours = minutes / 60;
    return hours / 24;
}
function addDaysFromNow(days) {
    const result = new Date();
    result.setDate(result.getDate() + days);
    return result;
}
//# sourceMappingURL=getTokenExpirationDate.js.map