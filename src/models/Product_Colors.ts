import { Schema, model } from "mongoose";


// 1. Create an interface representing a document in MongoDB.
interface ImageInterface {
    name: string,
    color_code: string;
    image: string[];
}

// 2. Create a Schema corresponding to the document interface.
const imageColorSchema = new Schema<ImageInterface>({
    name: { type: String },
    color_code: {type: String},
    image: [String]
  }, 
  { 
    timestamps: true 
    });
// 3. Create a Model.
const Product_Colors = model<ImageInterface>('Product_Colors', imageColorSchema);

export {Product_Colors};
  
  