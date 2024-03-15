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
exports.UserLogin = exports.UserRegister = void 0;
const Users_1 = require("../models/Users");
const utility_1 = require("../utility");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserRegister = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqData = req.body;
    try {
        const user = new Users_1.User();
        if (!reqData.email) {
            return res.status(400).json({
                message: 'Please Enter Email'
            });
        }
        if (!reqData.password) {
            return res.status(400).json({
                message: 'Please Enter Password'
            });
        }
        user.name = reqData.name;
        user.email = reqData.email;
        const salt = yield (0, utility_1.GenerateSalt)();
        const hashedPwd = yield (0, utility_1.GeneratePassword)(reqData.password, salt);
        user.password = hashedPwd;
        const response = yield user.save();
        res.status(201).json({
            message: 'User Register Success',
            data: response
        });
    }
    catch (error) {
        res.status(500).json({
            error: true,
            message: error
        });
    }
});
exports.UserRegister = UserRegister;
const UserLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const reqData = req.body;
    let secretKey = process.env.SECRET_KEY;
    if (!reqData.email) {
        return res.status(400).json({
            message: 'Please Enter Email'
        });
    }
    if (!reqData.password) {
        return res.status(400).json({
            message: 'Please Enter Password'
        });
    }
    try {
        const user = yield Users_1.User.findOne({ email: reqData.email });
        if (user === null) {
            return res.status(401).json({ error: true, message: 'User Not Found!!' });
        }
        const verify = yield bcrypt_1.default.compare(reqData.password, user.password);
        if (!verify) {
            return res.status(401).json({ error: true, message: 'Password not match' });
        }
        let token = yield jsonwebtoken_1.default.sign({ data: user.email, _id: user._id }, secretKey, { expiresIn: '1h' });
        res.status(201).json({
            message: 'User Register Success',
            token: token,
            user
        });
    }
    catch (error) {
        res.status(500).json({
            error: true,
            message: error
        });
    }
});
exports.UserLogin = UserLogin;
//# sourceMappingURL=CustomerController.js.map