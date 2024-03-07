import { Schema, model } from "mongoose";


// 1. Create an interface representing a document in MongoDB.
interface IProduct {
    name: string;
    content: string;
    price: number;
    discount_amount: number;
    discount_percentage: string;
    vendor: any,
    image?: string[];
    product_type: string;
    quantity: number;
    category: any;
    sold_quantity: number;
    size?: string[];
    sku_code: string;
    color?: string[];
    is_trending: boolean;
    flash_sale: boolean;
    in_stock: boolean;
    view_count: number;
    custom_outfit: boolean;
}

// 2. Create a Schema corresponding to the document interface.
const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    content: { type: String, required: true },
    price: { type: Number, required: true },
    discount_amount: { type: Number},
    discount_percentage: { type: String },
    vendor: { type: Schema.Types.ObjectId, ref: 'Vendor', required: true },
    image: {type: [String]},
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    product_type: { type: String },
    quantity: {type: Number, default: 1 },
    color: [{type: Schema.Types.ObjectId, ref: 'Product_Colors'}],
    sold_quantity: {type: Number, default: 0 },
    is_trending: {type: Boolean, default: false},
    flash_sale: {type: Boolean, default: false},
    in_stock: {type: Boolean, default: true},
    view_count: {type: Number, default: 0},
    custom_outfit: {type: Boolean, default: false},
    size: [
            {type: String}
    ],
    sku_code: {type: String}
  }, { toJSON: {
        transform(doc, ret) {
            delete ret.__v
            delete ret.createdAt;
            delete ret.updatedAt;
        }
    },timestamps: true });


// 3. Create a Model.
const Product = model<IProduct>('Product', productSchema);

export {Product};
  
  