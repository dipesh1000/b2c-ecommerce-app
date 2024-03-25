import { Schema, connect, model } from "mongoose";


// 1. Create an interface representing a document in MongoDB.
interface IUser {
    name: string;
    email: string;
    avatar?: string;
    products?: string[];
    password: string;
    role: string;
    phone?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String },
    products: [String],
    password: {type: String, required: true},
    phone: {type: String}
  });


// 3. Create a Model.
const Vendor = model<IUser>('Vendor', userSchema);

export {Vendor};
  
  