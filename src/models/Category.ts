import { Schema, connect, model } from "mongoose";


// 1. Create an interface representing a document in MongoDB.
interface ICategory {
    name: string;
    parent: any;
}

// 2. Create a Schema corresponding to the document interface.
const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Category' }
  }, 
  { 
    timestamps: true 
    });


// 3. Create a Model.
const Category = model<ICategory>('Category', categorySchema);

export {Category};
  
  