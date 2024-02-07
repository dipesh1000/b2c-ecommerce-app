"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Images = void 0;
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const imagesSchema = new mongoose_1.Schema({
    url: { type: String }
}, {
    timestamps: true
});
// 3. Create a Model.
const Images = (0, mongoose_1.model)('Images', imagesSchema);
exports.Images = Images;
//# sourceMappingURL=Images.js.map