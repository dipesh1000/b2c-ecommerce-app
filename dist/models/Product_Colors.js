"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product_Colors = void 0;
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const imageColorSchema = new mongoose_1.Schema({
    name: { type: String },
    color_code: { type: String },
    image: [String]
}, {
    timestamps: true
});
// 3. Create a Model.
const Product_Colors = (0, mongoose_1.model)('Product_Colors', imageColorSchema);
exports.Product_Colors = Product_Colors;
//# sourceMappingURL=Product_Colors.js.map