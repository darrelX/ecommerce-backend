"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateHash = generateHash;
const crypto_1 = require("crypto");
function generateHash(data, algorithm = 'sha256') {
    const hasher = (0, crypto_1.createHash)(algorithm);
    hasher.update(data);
    return hasher.digest('hex');
}
//# sourceMappingURL=hash.config.js.map