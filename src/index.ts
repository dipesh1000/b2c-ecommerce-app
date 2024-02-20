import express from 'express';
import { AdminRouter, CategoryRouter, ProductRouter, VendorRouter } from './routes';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'
import path from 'path';

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
app.use('/api/category', CategoryRouter);
app.use('/api/product', ProductRouter);
app.use('/api/admin', AdminRouter);
app.use('/api/vendor', VendorRouter);
app.use('/images', express.static('./src/images/'));

const dbURI = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_DB_URI : process.env.LOCAL_DB_URI;

mongoose.connect(dbURI)
.then((response) => console.log("Database Connected Successfull, Compelete what you Start"))
.catch((err) => console.log(err, "from Err"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
