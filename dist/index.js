"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes");
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
require("dotenv/config");
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.use('/category', routes_1.CategoryRouter);
app.use('/product', routes_1.ProductRouter);
app.use('/admin', routes_1.AdminRouter);
app.use('/vendor', routes_1.VendorRouter);
mongoose_1.default.connect(config_1.MONGO_URI)
    .then((response) => console.log("Database Connected Successfull, Compelete what you Start"))
    .catch((err) => console.log(err, "from Err"));
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map