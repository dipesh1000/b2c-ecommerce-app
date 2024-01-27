import { NextFunction, Request, Response } from "express";
import { CreateProductInputs } from "../dto";
import { Product } from "../models/Products";
import { Images } from "../models/Images";

export const Addproduct = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.file, "from the req");
    const reqData = <CreateProductInputs>req.body;
    const data = new Product();
    data.name = reqData.name;
    data.content = reqData.content;
    data.price = reqData.price;
    data.discount = reqData.discount;
    data.discount_percentage = reqData.discount_percentage;
    data.product_type = reqData.product_type;
    data.quantity = reqData.quantity;
    data.sold_quantity = reqData.sold_quantity;
    data.size = reqData.size;
    data.sku_code = reqData.sku_code;
    data.category = reqData.category;
    const files = req.files as [Express.Multer.File];
    const images = files?.map((file: Express.Multer.File) => file.filename)
    data.image?.push(...images);
    const results = await data.save();
    if (results) {
        res.status(201).json({
            message: 'Added Success',
            data: results
        })    
    } else {
        res.status(401).json({
            error: true,
            message: "Something Went Wrong"
        })
    }
   
}

export const GetAllProducts = (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({
        message: 'Get All Product Success'
    })    
}

export const UpdateProduct = (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({
        message: 'Product Update Success'
    })    
}