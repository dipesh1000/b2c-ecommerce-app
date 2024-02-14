"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRouter = exports.imageService = void 0;
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const imageStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/images');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString() + '_' + file.originalname);
    }
});
exports.imageService = (0, multer_1.default)({ storage: imageStorage }).array('image', 10);
const router = express_1.default.Router();
exports.ProductRouter = router;
/** ----------Get Product -------------- */
router.get('/', controllers_1.GetAllProducts);
/** ----------Get Product by Category -------------- */
router.get('/category/:categoryId', controllers_1.GetProductsByCategory);
/** ----------Get Product by Flash Sale -------------- */
router.get('/flash_sale', controllers_1.GetProductByFlashSale);
/** ----------Get Product by type -------------- */
router.get('/search', controllers_1.GetProductByType);
/** ----------Add Product -------------- */
router.use(middlewares_1.UseAuthenticate);
router.post('/product-colors', exports.imageService, controllers_1.AddProductColors);
router.post('/', exports.imageService, controllers_1.Addproduct);
/** ----------Add Product -------------- */
router.put('/:productId', controllers_1.UpdateProduct);
//# sourceMappingURL=ProductRouter.js.map