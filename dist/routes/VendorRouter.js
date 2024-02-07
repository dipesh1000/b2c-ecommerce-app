"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendorRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const router = express_1.default.Router();
exports.VendorRouter = router;
router.post('/register', controllers_1.RegisterVendor);
router.post('/login', controllers_1.LoginVendor);
//# sourceMappingURL=VendorRouter.js.map