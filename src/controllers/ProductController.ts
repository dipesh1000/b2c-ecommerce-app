import { NextFunction, Request, Response } from "express";
import { CreateProductColorInterface, CreateProductInputs } from "../dto";
import { Product } from "../models/Products";
import { Product_Colors, Vendor } from "../models";
 
export const AddProductColors = async (req: Request, res: Response, next: NextFunction) => {
    const {name, color_code, image} = <CreateProductColorInterface>req.body;
    const color = new Product_Colors;
    color.name = name;
    color.color_code = color_code;

    /** ----- Updating Image -------- */
    const files = req.files as [Express.Multer.File];
    const images = files.map((file: Express.Multer.File) => file.filename)
    color.image?.push(...images);

    const results = await color.save();
    res.status(201).json({
        message: 'Added Success',
        data: results
    })   
}

export const Addproduct = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.user, "from req");
    const vendorExist = await Vendor.findById(req.user._id);
    if (vendorExist === null) {
        return res.status(401).json({error: true, message: 'User Not Found!'})
    }
    
    const reqData = <CreateProductInputs>req.body;
    const data = new Product();
    data.vendor = req.user._id;
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
    data.color = reqData.color;
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

export const GetAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    const data = await Product.find();
    res.status(201).json({
        message: 'Get All Product Success',
        data
    })    
}

export const UpdateProduct = (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({
        message: 'Product Update Success'
    })    
}