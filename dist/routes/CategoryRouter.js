"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const CategoryController_1 = require("../controllers/CategoryController");
const ProductRouter_1 = require("./ProductRouter");
const router = express_1.default.Router();
exports.CategoryRouter = router;
router.post('/', ProductRouter_1.imageService, CategoryController_1.AddCategory);
router.get('/', CategoryController_1.GetAllCategory);
//# sourceMappingURL=CategoryRouter.js.map