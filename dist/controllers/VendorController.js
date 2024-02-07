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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginVendor = exports.RegisterVendor = void 0;
const models_1 = require("../models");
const utility_1 = require("../utility");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const RegisterVendor = (req, res, Next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = req.body;
    const userExist = yield models_1.Vendor.findOne({ email: email }).exec();
    if (userExist) {
        return res.status(404).json('Email already exist!!!');
    }
    // generate a salt
    const salt = yield (0, utility_1.GenerateSalt)();
    const userPassword = yield (0, utility_1.GeneratePassword)(password, salt);
    const result = new models_1.Vendor({ size: 'small' });
    result.name = name;
    result.email = email;
    result.password = userPassword;
    const response = yield result.save();
    res.status(201).json({ message: 'Create Successful', data: response });
});
exports.RegisterVendor = RegisterVendor;
const LoginVendor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const availableVendor = yield models_1.Vendor.findOne({ email });
    if (availableVendor === null) {
        return res.status(401).json({ error: true, message: 'User Not Found!!' });
    }
    const verify = yield bcrypt_1.default.compare(password, availableVendor.password);
    if (!verify) {
        return res.status(401).json({ error: true, message: 'Password not match' });
    }
    let token = yield jsonwebtoken_1.default.sign({ data: availableVendor.email, _id: availableVendor._id }, config_1.SECRET_JWT_KEY, { expiresIn: '1h' });
    return res.status(201).json({ error: false, message: "Login Success", token });
});
exports.LoginVendor = LoginVendor;
//# sourceMappingURL=VendorController.js.map