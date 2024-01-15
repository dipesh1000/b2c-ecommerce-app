import express from 'express';
import { AdminRouter, VendorRouter } from './src/routes';
import mongoose from 'mongoose';
import { MONGO_URI } from './src/config';

const app = express();
const port = 3000;
app.use(express.json());
app.use('/admin', AdminRouter);
app.use('/vendor', VendorRouter);

mongoose.connect(MONGO_URI)
.then((response) => console.log("Database Connected Successfull, Compelete what you Start"))
.catch((err) => console.log(err, "from Err"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
