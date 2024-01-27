import { Schema, model } from "mongoose";


// 1. Create an interface representing a document in MongoDB.
interface ImageInterface {
    url: string,
}

// 2. Create a Schema corresponding to the document interface.
const imagesSchema = new Schema<ImageInterface>({
    url: {type: String}
  }, 
  { 
    timestamps: true 
    });


// 3. Create a Model.
const Images = model<ImageInterface>('Images', imagesSchema);

export {Images};
  
  