"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cart = void 0;
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const CartSchema = new mongoose_1.Schema({
    product_id: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true }],
    color: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Product_Colors', required: true }],
    size: [{ String }],
    quantity: { type: Number },
    user_id: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Product', required: true }
}, { toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    }, timestamps: true });
// 3. Create a Model.
const Cart = (0, mongoose_1.model)('Cart', CartSchema);
exports.Cart = Cart;
//# sourceMappingURL=Cart.js.map