import express from 'express';
import { AdminRouter, CategoryRouter, ProductRouter, VendorRouter } from './routes';
import mongoose from 'mongoose';
import { MONGO_URI } from './config';
import 'dotenv/config'

const app = express();
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
