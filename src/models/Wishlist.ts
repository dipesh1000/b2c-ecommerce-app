import { Schema, model } from "mongoose";


// 1. Create an interface representing a document in MongoDB.
interface IWishList {
    product_id: any,
    quantity: number,
    price: number,
    discounted_price: number,
    user_id: string,
}

// 2. Create a Schema corresponding to the document interface.
const wishList = new Schema<IWishList>({
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
   
  }, 
  { 
    timestamps: true 
    });
// 3. Create a Model.
const wish_list = model<IWishList>('wish_list', wishList);

export {wish_list};
  
  