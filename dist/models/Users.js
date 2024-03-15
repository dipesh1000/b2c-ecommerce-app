"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const userSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String, required: true },
    avatar: { type: String },
    wishList: [String],
    password: { type: String, required: true },
    phone: { type: String }
});
// 3. Create a Model.
const User = (0, mongoose_1.model)('User', userSchema);
exports.User = User;
//# sourceMappingURL=Users.js.map