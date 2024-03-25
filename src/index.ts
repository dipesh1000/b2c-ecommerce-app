import express from 'express';
import { AdminRouter, CartRouter, CategoryRouter, ProductRouter, VendorRouter } from './routes';
import mongoose from 'mongoose';
import cors from 'cors';
import * as dotenv from 'dotenv';
import path from 'path';
import { UserRouter } from './routes/UserRouter';
dotenv.config();
const app = express();

// Define the CORS options
const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://shoppingkart-3lox.onrender.com/'] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions))
const port = process.env.PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/cart', CartRouter);
app.use('/api/category', CategoryRouter);
app.use('/api/product', ProductRouter);
app.use('/api/admin', AdminRouter);
app.use('/api/vendor', VendorRouter);
app.use('/api/user', UserRouter);
app.use('/images', express.static('./src/images/'));

const dbURI = process.env.NODE_ENV === 'production' ? `mongodb+srv://${user}:${password}@cluster0.vukvwps.mongodb.net/?retryWrites=true&w=majority`  : process.env.LOCAL_DB_URI;

mongoose.connect(dbURI)
.then((response) => console.log("Database Connected Successfull, Compelete what you Start"))
.catch((err) => console.log(err, "from Err"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
