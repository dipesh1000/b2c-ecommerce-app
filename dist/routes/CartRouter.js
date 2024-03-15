"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const CartController_1 = require("../controllers/CartController");
const router = express_1.default.Router();
exports.CartRouter = router;
/** ----------Add Product -------------- */
router.use(middlewares_1.UseAuthenticate);
/** ----------Get Cart -------------- */
router.get('/cart', controllers_1.GetAllProducts);
/** ----------Add to Cart -------------- */
router.post('/', CartController_1.AddToCartController);
/** ----------Get Cart by ID -------------- */
router.get('/cart/:cart_id', controllers_1.GetProductById);
/** ----------Update Cart By Id -------------- */
router.put('/cart/:cart_id', controllers_1.GetAllProducts);
/** ----------Delete Cart By Id -------------- */
router.delete('/cart/:cart_id', controllers_1.GetAllProducts);
/** ----------Delete Cart By Id -------------- */
router.delete('/cart/all', controllers_1.GetAllProducts);
//# sourceMappingURL=CartRouter.js.map