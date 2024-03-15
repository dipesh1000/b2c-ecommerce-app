"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv = __importStar(require("dotenv"));
const UserRouter_1 = require("./routes/UserRouter");
dotenv.config();
const app = (0, express_1.default)();
// Define the CORS options
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'http://localhost:3001', 'https://shoppingkart-3lox.onrender.com/'] // Whitelist the domains you want to allow
};
app.use((0, cors_1.default)(corsOptions));
const port = process.env.PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
app.use(express_1.default.json());
app.use('/api/cart', routes_1.CartRouter);
app.use('/api/category', routes_1.CategoryRouter);
app.use('/api/product', routes_1.ProductRouter);
app.use('/api/admin', routes_1.AdminRouter);
app.use('/api/vendor', routes_1.VendorRouter);
app.use('/api/user', UserRouter_1.UserRouter);
app.use('/images', express_1.default.static('./src/images/'));
const dbURI = process.env.NODE_ENV === 'production' ? `mongodb+srv://${user}:${password}@cluster0.vukvwps.mongodb.net/?retryWrites=true&w=majority` : process.env.LOCAL_DB_URI;
mongoose_1.default.connect(dbURI)
    .then((response) => console.log("Database Connected Successfull, Compelete what you Start"))
    .catch((err) => console.log(err, "from Err"));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map