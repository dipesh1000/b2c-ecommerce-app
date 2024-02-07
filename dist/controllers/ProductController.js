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
exports.UpdateProduct = exports.GetProductByFlashSale = exports.GetProductByType = exports.GetAllProducts = exports.Addproduct = exports.AddProductColors = void 0;
const Products_1 = require("../models/Products");
const models_1 = require("../models");
const AddProductColors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, color_code, image } = req.body;
    const color = new models_1.Product_Colors;
    color.name = name;
    color.color_code = color_code;
    /** ----- Updating Image -------- */
    const files = req.files;
    const images = files.map((file) => file.filename);
    (_a = color.image) === null || _a === void 0 ? void 0 : _a.push(...images);
    const results = yield color.save();
    res.status(201).json({
        message: 'Added Success',
        data: results
    });
});
exports.AddProductColors = AddProductColors;
const Addproduct = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    console.log(req.user, "from req");
    const vendorExist = yield models_1.Vendor.findById(req.user._id);
    if (vendorExist === null) {
        return res.status(401).json({ error: true, message: 'User Not Found!' });
    }
    const reqData = req.body;
    const data = new Products_1.Product();
    data.vendor = req.user._id;
    data.name = reqData.name;
    data.content = reqData.content;
    data.price = reqData.price;
    data.discount = reqData.discount;
    data.discount_percentage = reqData.discount_percentage;
    data.product_type = reqData.product_type;
    data.quantity = reqData.quantity;
    data.sold_quantity = reqData.sold_quantity;
    data.size = reqData.size;
    data.sku_code = reqData.sku_code;
    data.category = reqData.category;
    data.color = reqData.color;
    data.is_trending = reqData.is_trending;
    data.flash_sale = reqData.flash_sale;
    data.in_stock = reqData.in_stock;
    data.view_count = reqData.view_count;
    data.custom_outfit = reqData.custom_outfit;
    const files = req.files;
    const images = files === null || files === void 0 ? void 0 : files.map((file) => file.filename);
    (_b = data.image) === null || _b === void 0 ? void 0 : _b.push(...images);
    const results = yield data.save();
    if (results) {
        res.status(201).json({
            message: 'Added Success',
            data: results
        });
    }
    else {
        res.status(401).json({
            error: true,
            message: "Something Went Wrong"
        });
    }
});
exports.Addproduct = Addproduct;
const GetAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Products_1.Product.find().populate(['color', 'category']);
    res.status(201).json({
        message: 'Get All Product Success',
        data
    });
});
exports.GetAllProducts = GetAllProducts;
// Get Product By Id
const GetProductByType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const typeQuery = req.query.type;
    let data;
    if (typeQuery === 'is_trending') {
        data = yield Products_1.Product.find().where({ is_trending: true });
    }
    res.status(201).json({
        message: 'Trending Product Fetch Successful',
        data
    });
});
exports.GetProductByType = GetProductByType;
// Get Product By Id
const GetProductByFlashSale = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Products_1.Product.where({ flash_sale: true });
    res.status(200).json({
        message: 'Data Fetch Successfully',
        data
    });
});
exports.GetProductByFlashSale = GetProductByFlashSale;
const UpdateProduct = (req, res, next) => {
    res.status(201).json({
        message: 'Product Update Success'
    });
};
exports.UpdateProduct = UpdateProduct;
//# sourceMappingURL=ProductController.js.map