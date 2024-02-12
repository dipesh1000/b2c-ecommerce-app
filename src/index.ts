import express from 'express';
import { AdminRouter, CategoryRouter, ProductRouter, VendorRouter } from './routes';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config'

const app = express();

// Define the CORS options
const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000', 'https://shoppingkart-3lox.onrender.com/'] // Whitelist the domains you want to allow
};

app.use(cors(corsOptions))
const port = process.env.PORT;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;


app.use(express.json());
app.use('/category', CategoryRouter);
app.use('/product', ProductRouter);
app.use('/admin', AdminRouter);
app.use('/vendor', VendorRouter);

mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.vukvwps.mongodb.net/?retryWrites=true&w=majority`)
.then((response) => console.log("Database Connected Successfull, Compelete what you Start"))
.catch((err) => console.log(err, "from Err"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
