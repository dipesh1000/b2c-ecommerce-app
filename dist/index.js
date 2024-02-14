"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const app = (0, express_1.default)();
// Define the CORS options
const corsOptions = {
    credentials: true,
    origin: ['http://localhost:3000', 'https://shoppingkart-3lox.onrender.com/'] // Whitelist the domains you want to allow
};
app.use((0, cors_1.default)(corsOptions));
const port = process.env.PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
app.use(express_1.default.json());
app.use('/api/category', routes_1.CategoryRouter);
app.use('/api/product', routes_1.ProductRouter);
app.use('/api/admin', routes_1.AdminRouter);
app.use('/api/vendor', routes_1.VendorRouter);
const dbURI = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_DB_URI : process.env.LOCAL_DB_URI;
mongoose_1.default.connect(dbURI)
    .then((response) => console.log("Database Connected Successfull, Compelete what you Start"))
    .catch((err) => console.log(err, "from Err"));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map