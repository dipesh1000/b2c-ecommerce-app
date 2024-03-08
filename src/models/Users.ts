import { Schema,  model } from "mongoose";


// 1. Create an interface representing a document in MongoDB.
interface IUser {
    name: string;
    email: string;
    avatar?: string;
    password: string;
    wishList: string[];
    phone?: string;
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
    name: { type: String },
    email: { type: String, required: true },
    avatar: { type: String },
    wishList: [String],
    password: {type: String, required: true},
    phone: {type: String}
  });


// 3. Create a Model.
const User = model<IUser>('User', userSchema);

export {User};
  
  