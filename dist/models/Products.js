"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    content: { type: String, required: true },
    price: { type: Number, required: true },
    discount_amount: { type: Number },
    discount_percentage: { type: String },
    vendor: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Vendor', required: true },
    image: { type: [String] },
    category: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category', required: true },
    product_type: { type: String },
    quantity: { type: Number, default: 1 },
    color: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Product_Colors' }],
    sold_quantity: { type: Number, default: 0 },
    is_trending: { type: Boolean, default: false },
    flash_sale: { type: Boolean, default: false },
    in_stock: { type: Boolean, default: true },
    view_count: { type: Number, default: 0 },
    custom_outfit: { type: Boolean, default: false },
    size: [
        { type: String }
    ],
    sku_code: { type: String }
}, { toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    }, timestamps: true });
// 3. Create a Model.
const Product = (0, mongoose_1.model)('Product', productSchema);
exports.Product = Product;
//# sourceMappingURL=Products.js.map