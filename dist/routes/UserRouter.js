"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRouter = void 0;
const express_1 = __importDefault(require("express"));
const CustomerController_1 = require("../controllers/CustomerController");
const router = express_1.default.Router();
exports.UserRouter = router;
/** User Authentication  */
router.post('/register', CustomerController_1.UserRegister);
router.post('/login', CustomerController_1.UserLogin);
//# sourceMappingURL=UserRouter.js.map