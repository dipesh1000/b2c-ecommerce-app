import { Schema, model } from "mongoose";


// 1. Create an interface representing a document in MongoDB.
interface ICart {
    product_id: any;
    color: any;
    size: string[];
    quantity: number;
    user_id: any;
}

// 2. Create a Schema corresponding to the document interface.
const CartSchema = new Schema<ICart>({
    product_id: [{type: Schema.Types.ObjectId, ref: 'Product', required: true}],
    color: [{type: Schema.Types.ObjectId, ref: 'Product_Colors', required: true}],
    size: [{String}],
    quantity: {type: Number},
    user_id: {type: Schema.Types.ObjectId, ref: 'Product', required: true}
  }, { toJSON: {
        transform(doc, ret) {
            delete ret.__v
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },timestamps: true });

// 3. Create a Model.
const Cart = model<ICart>('Cart', CartSchema);

export {Cart};
  
  