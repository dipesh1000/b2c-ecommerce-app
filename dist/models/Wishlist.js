"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wish_list = void 0;
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const wishList = new mongoose_1.Schema({
    product_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true },
}, {
    timestamps: true
});
// 3. Create a Model.
const wish_list = (0, mongoose_1.model)('wish_list', wishList);
exports.wish_list = wish_list;
//# sourceMappingURL=Wishlist.js.map