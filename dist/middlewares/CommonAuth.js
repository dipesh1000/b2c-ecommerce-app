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
exports.UseAuthenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ValidateSingnature = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const signature = req.get('Authorization');
    let secretKey = process.env.SECRET_KEY;
    try {
        if (signature) {
            const payload = yield jsonwebtoken_1.default.verify(signature.split(' ')[1], secretKey);
            req.user = payload;
            return true;
        }
        return false;
    }
    catch (error) {
        console.log(error);
        return false;
    }
});
const UseAuthenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const signature = yield ValidateSingnature(req);
    if (signature) {
        return next();
    }
    else {
        return res.json({ message: "User Not authorised" });
    }
});
exports.UseAuthenticate = UseAuthenticate;
//# sourceMappingURL=CommonAuth.js.map