import { Schema, connect, model } from "mongoose";


// 1. Create an interface representing a document in MongoDB.
interface ICategory {
    name: string;
    parent: any;
    image: string[];
}

// 2. Create a Schema corresponding to the document interface.
const categorySchema = new Schema<ICategory>({
    name: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Category' },
    image: [String]
  }, 
  {
    toJSON: {
      transform(doc, ret) {
          delete ret.__v
          delete ret.createdAt;
          delete ret.updatedAt;
      }, 
    },
    timestamps: true 
    });
// 3. Create a Model.
const Category = model<ICategory>('Category', categorySchema);

export {Category};
  
  