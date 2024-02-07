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
exports.GeneratePassword = exports.GenerateSalt = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const GenerateSalt = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.genSalt();
});
exports.GenerateSalt = GenerateSalt;
const GeneratePassword = (password, salt) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcrypt_1.default.hash(password, salt);
});
exports.GeneratePassword = GeneratePassword;
// export const validatePassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
//     return await GeneratePassword(enteredPassword, salt) === savedPassword;
//    }
//    export const GenerateSignature = async (payload: AuthPayload) => {
//        return jwt.sign(payload, APP_SECRET, {expiresIn: '1d'});
//    }
// export const ValidateSingnature = async (req: Request) => {
//     const signature = req.get('Authorization');
//     if(signature) {
//         const payload = await jwt.verify(signature.split(' ')[1], SECRET_JWT_KEY) as AuthPayload;
//         req.user = payload;
//         return true;
//     }
//     return false;
// }   
//# sourceMappingURL=PasswordUtility.js.map