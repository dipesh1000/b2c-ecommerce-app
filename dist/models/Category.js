"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const categorySchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    parent: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Category' },
    image: [String]
}, {
    toJSON: {
        transform(doc, ret) {
            delete ret.__v;
            delete ret.createdAt;
            delete ret.updatedAt;
        },
    },
    timestamps: true
});
// 3. Create a Model.
const Category = (0, mongoose_1.model)('Category', categorySchema);
exports.Category = Category;
//# sourceMappingURL=Category.js.map