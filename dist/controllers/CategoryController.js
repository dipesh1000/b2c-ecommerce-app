"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllCategory = exports.AddCategory = void 0;
const Category_1 = require("../models/Category");
const AddCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const reqData = req.body;
    const catAvailable = yield Category_1.Category.findOne({ name: reqData.name });
    if (catAvailable !== null) {
        return res.status(401).json({
            error: true,
            message: "Data available please try with another"
        });
    }
    const cat = new Category_1.Category;
    cat.name = reqData.name;
    cat.parent = reqData.parent;
    /** ----- Updating Image -------- */
    const files = req.files;
    const images = files.map((file) => file.filename);
    (_a = cat.image) === null || _a === void 0 ? void 0 : _a.push(...images);
    const result = yield cat.save();
    res.status(201).json({
        message: "Category Created Successful",
        data: result
    });
});
exports.AddCategory = AddCategory;
const GetAllCategory = (Req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Category_1.Category.find();
    res.status(201).json({
        message: "All Category",
        data: result
    });
});
exports.GetAllCategory = GetAllCategory;
//# sourceMappingURL=CategoryController.js.map