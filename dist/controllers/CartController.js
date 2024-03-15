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
exports.UpdateProduct = exports.SaveProductForLater = exports.GetProductByMostViewed = exports.GetProductById = exports.DeleteProductById = exports.GetProductByFlashSale = exports.GetProductByType = exports.GetAllProducts = exports.GetAllProductColors = exports.GetProductsByCategory = exports.UpdateProductById = exports.AddToCartController = void 0;
const Products_1 = require("../models/Products");
const models_1 = require("../models");
const Users_1 = require("../models/Users");
// import path from "path";
// import fs from 'fs'
const AddToCartController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserExist = yield Users_1.User.findById(req.user._id);
        if (UserExist === null) {
            return res.status(401).json({ error: true, message: 'User Not Found!' });
        }
        const reqData = req.body;
        const data = new models_1.Cart();
        data.user_id = req.user._id;
        data.quantity = reqData.quantity;
        data.size = reqData.size;
        data.color = reqData.color;
        data.product_id = reqData.product_id;
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
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the product' });
    }
});
exports.AddToCartController = AddToCartController;
const UpdateProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const productId = req.params.productId;
    const vendorExist = yield models_1.Vendor.findById(req.user._id);
    if (vendorExist === null) {
        return res.status(401).json({ error: true, message: 'User Not Found!' });
    }
    const data = yield Products_1.Product.findById(productId);
    if (data === null) {
        return res.status(401).json({ error: true, message: 'Request Product Not Found!' });
    }
    const reqData = req.body;
    data.vendor = req.user._id;
    data.name = reqData.name;
    data.content = reqData.content;
    data.price = reqData.price;
    data.discount_amount = reqData.discount_amount;
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
    if ((_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.length) {
        const files = req.files;
        const images = files === null || files === void 0 ? void 0 : files.map((file) => file.filename);
        (_b = data.image) === null || _b === void 0 ? void 0 : _b.push(...images);
    }
    try {
        const results = yield data.save({ validateBeforeSave: false });
        if (results) {
            res.status(201).json({
                message: 'Product Updated  Success',
                data: results
            });
        }
        else {
            res.status(401).json({
                error: true,
                message: "Something Went Wrong"
            });
        }
    }
    catch (error) {
        console.log(error, "from error");
        res.status(500).json({ error: 'An error occurred while updating the product' });
    }
});
exports.UpdateProductById = UpdateProductById;
const GetProductsByCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { categoryIds } = req.params;
    const catIds = categoryIds.split(',');
    // const catIds: mongoose.Types.ObjectId[] = categoryIdArray.map(id => new mongoose.Types.ObjectId(id));
    const page = Number.parseInt(req.query.page) || 1;
    const pageSize = Number.parseInt(req.query.pageSize) || 10;
    try {
        // const count: number = await Product.countDocuments({category: { $in: catIds }});
        // const totalPages: number = Math.ceil(count / pageSize);
        const data = yield Products_1.Product.find({ category: { $in: catIds } }).populate(['color', 'category']).skip((page - 1) * pageSize).limit(pageSize);
        const count = data.length;
        const totalPages = Math.ceil(count / pageSize);
        res.status(201).json({
            message: 'Get All Product Success',
            data,
            count,
            totalPages,
            currentPage: page
        });
    }
    catch (error) {
        throw error;
    }
});
exports.GetProductsByCategory = GetProductsByCategory;
const GetAllProductColors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield models_1.Product_Colors.find().exec();
        res.status(201).json({
            message: 'Get All Product Colors',
            data,
        });
    }
    catch (error) {
        throw error;
    }
});
exports.GetAllProductColors = GetAllProductColors;
const GetAllProducts = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number.parseInt(req.query.page) || 1;
    const pageSize = Number.parseInt(req.query.pageSize) || 10;
    const categoryIds = req.query.category;
    const catIds = categoryIds && categoryIds.split(',');
    // check Category Exist or not
    let query = {};
    if (catIds && catIds.length > 0) {
        query = { category: { $in: catIds } };
    }
    console.log(query);
    try {
        // const count: number = await Product.countDocuments();
        // const totalPages: number = Math.ceil(count / pageSize);
        const data = yield Products_1.Product.find(query).skip((page - 1) * pageSize).limit(pageSize).populate('category').exec();
        const count = data.length;
        const totalPages = Math.ceil(count / pageSize);
        res.status(201).json({
            message: 'Get All Product Success',
            data,
            count,
            totalPages,
            currentPage: page
        });
    }
    catch (error) {
        throw error;
    }
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
const DeleteProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const vendorExist = yield models_1.Vendor.findById(req.user._id);
    if (vendorExist === null) {
        return res.status(401).json({ error: true, message: 'User Not Found!' });
    }
    const data = yield Products_1.Product.findById(productId);
    if (data === null) {
        return res.status(401).json({ error: true, message: 'Requested Product Not Found!' });
    }
    // try {
    //     for (const image of data.image) {
    //       // Construct the path to the image file
    //       const imagePath = path.join(__dirname, 'uploads', image);
    //       // Check if the image file exists
    //       if (fs.existsSync(imagePath)) {
    //         // Delete the image file
    //         fs.unlinkSync(imagePath);
    //       }
    //     }
    //   } catch (error) {
    //     // Handle any errors that occur during image deletion
    //     return res.status(500).json({ error: true, message: 'Error deleting product images' });
    //   }
    try {
        const results = yield Products_1.Product.deleteOne({ _id: data._id });
        if (results) {
            res.status(201).json({
                message: 'Product Deleted  Success',
                data: results,
                deletedProduct: data
            });
        }
        else {
            res.status(401).json({
                error: true,
                message: "Something Went Wrong"
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the product' });
    }
});
exports.DeleteProductById = DeleteProductById;
const GetProductById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    try {
        yield Products_1.Product.findByIdAndUpdate(productId, { $inc: { view_count: 1 } });
        const data = yield Products_1.Product.findById(productId).populate(['color', 'category']).exec();
        res.status(201).json({
            data: data,
            message: 'Get Product Details'
        });
    }
    catch (error) {
        res.status(500).json({
            error: true,
            message: error
        });
    }
});
exports.GetProductById = GetProductById;
const GetProductByMostViewed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("most data");
        const data = yield Products_1.Product.find({ view_count: { $gt: 0 } }).sort({ view_count: -1 }).populate(['color', 'category']).limit(5).exec();
        res.status(201).json({
            data: data,
            message: 'Get Product Details'
        });
    }
    catch (error) {
        res.status(500).json({
            error: true,
            message: error
        });
    }
});
exports.GetProductByMostViewed = GetProductByMostViewed;
const SaveProductForLater = (req, res, next) => {
    const data = req.body;
    return res.send(data);
};
exports.SaveProductForLater = SaveProductForLater;
const UpdateProduct = (req, res, next) => {
    res.status(201).json({
        message: 'Product Update Success'
    });
};
exports.UpdateProduct = UpdateProduct;
//# sourceMappingURL=CartController.js.map