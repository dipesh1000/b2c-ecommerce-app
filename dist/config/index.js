"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET_JWT_KEY = exports.MONGO_URI = void 0;
exports.MONGO_URI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vukvwps.mongodb.net/?retryWrites=true&w=majority`;
exports.SECRET_JWT_KEY = process.env.SECRET_KEY;
//# sourceMappingURL=index.js.map