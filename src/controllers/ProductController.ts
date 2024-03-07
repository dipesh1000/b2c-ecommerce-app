import { NextFunction, Request, Response } from "express";
import { CreateProductColorInterface, CreateProductInputs } from "../dto";
import { Product } from "../models/Products";
import { Product_Colors, Vendor } from "../models";
// import path from "path";
// import fs from 'fs'

 
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

export const UpdateProductColors = async (req: Request, res: Response, next: NextFunction) => {
    const reqData = <CreateProductColorInterface>req.body;
    const color = await Product_Colors.findById(req.params.id)
    // const color = new Product_Colors;
    color.name = reqData.name || color.name;
    color.color_code = reqData.color_code || color.color_code;

    /** ----- Updating Image -------- */
    const files = req.files as [Express.Multer.File];
    const images = files.map((file: Express.Multer.File) => file.filename)
    color.image?.push(...images);

    const results = await color.save();
    res.status(201).json({
        message: 'Product Updated Success',
        data: results
    })  
}

export const Addproduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    data.discount_amount = reqData.discount_amount;
    data.discount_percentage = reqData.discount_percentage;
    data.product_type = reqData.product_type;
    data.quantity = reqData.quantity;
    data.sold_quantity = reqData.sold_quantity;
    data.size = reqData.size;
    data.sku_code = reqData.sku_code;
    data.category = reqData.category;
    data.color = reqData.color;

    data.is_trending= reqData.is_trending;
    data.flash_sale= reqData.flash_sale;
    data.in_stock= reqData.in_stock;
    data.view_count= reqData.view_count;
    data.custom_outfit= reqData.custom_outfit;

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
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the product' });
    }
}

export const UpdateProductById = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    const vendorExist = await Vendor.findById(req.user._id);
    if (vendorExist === null) {
        return res.status(401).json({error: true, message: 'User Not Found!'})
    }
    const data  = await Product.findById(productId);
    if (data === null) {
        return res.status(401).json({error: true, message: 'Request Product Not Found!'})
    }
    const reqData = <CreateProductInputs>req.body;

    data.vendor = req.user._id;
    data.name = reqData.name;
    data.content = reqData.content;
    data.price = reqData.price;
    data.discount_amount = reqData.discount_amount;
    data.discount_percentage = reqData.discount_percentage;
    data.product_type = reqData.product_type;
    data.quantity = reqData.quantity;
    data.sold_quantity = reqData.sold_quantity;
    data.size = reqData.size;
    data.sku_code = reqData.sku_code;
    data.category = reqData.category;
    data.color = reqData.color;

    data.is_trending= reqData.is_trending;
    data.flash_sale= reqData.flash_sale;
    data.in_stock= reqData.in_stock;
    data.view_count= reqData.view_count;
    data.custom_outfit= reqData.custom_outfit;
    if (req?.files?.length) {
        const files = req.files as [Express.Multer.File];
        const images = files?.map((file: Express.Multer.File) => file.filename)
        data.image?.push(...images);
    }

    try {
        const results = await data.save({ validateBeforeSave: false });
        if (results) {
            res.status(201).json({
                message: 'Product Updated  Success',
                data: results
            })    
        } else {
            res.status(401).json({
                error: true,
                message: "Something Went Wrong"
            })
        }
        
    } catch (error) {
        console.log(error, "from error");
        res.status(500).json({ error: 'An error occurred while updating the product' });
    }
   
}


export const GetProductsByCategory = async (req: Request, res: Response, next: NextFunction) => {
    const { categoryIds } = req.params;
    const catIds = categoryIds.split(',');
    // const catIds: mongoose.Types.ObjectId[] = categoryIdArray.map(id => new mongoose.Types.ObjectId(id));
    const page: number = Number.parseInt(req.query.page as string) || 1;
    const pageSize: number = Number.parseInt(req.query.pageSize as string) || 10;

    try {
        // const count: number = await Product.countDocuments({category: { $in: catIds }});
        // const totalPages: number = Math.ceil(count / pageSize);
        const data = await Product.find({category: { $in: catIds }}).populate(['color', 'category']).skip((page - 1) * pageSize).limit(pageSize);
        const count: number = data.length;
        const totalPages: number = Math.ceil(count / pageSize);
        res.status(201).json({
            message: 'Get All Product Success',
            data,
            count,
            totalPages,
            currentPage: page
        })
    } catch (error) {
        throw error;
    }
}

export const GetAllProductColors = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await Product_Colors.find().exec();
        res.status(201).json({
            message: 'Get All Product Colors',
            data,
        })
    } catch (error) {
        throw error;
    }
}

export const GetAllProducts = async (req: Request, res: Response, next: NextFunction) => {
    const page: number = Number.parseInt(req.query.page as string) || 1;
    const pageSize: number = Number.parseInt(req.query.pageSize as string) || 10;
    const categoryIds = req.query.category as string;
    const catIds = categoryIds && categoryIds.split(',');

    // check Category Exist or not
    let query = {}
    if (catIds && catIds.length > 0) {
        query = { category: { $in: catIds } };
      }

    console.log(query);

    try {
        // const count: number = await Product.countDocuments();
        // const totalPages: number = Math.ceil(count / pageSize);
        const data = await Product.find(query).skip((page - 1) * pageSize).limit(pageSize).populate('category').exec();
        const count: number = data.length;
        const totalPages: number = Math.ceil(count / pageSize);
        res.status(201).json({
            message: 'Get All Product Success',
            data,
            count,
            totalPages,
            currentPage: page
        })
    } catch (error) {
        throw error;
    }
}


// Get Product By Id
export const GetProductByType = async (req: Request, res: Response, next: NextFunction) => {
    const typeQuery = req.query.type;
    let data;
    if(typeQuery === 'is_trending') {
        data = await Product.find().where({ is_trending: true })
    }
    res.status(201).json({
        message: 'Trending Product Fetch Successful',
        data
    })
}

// Get Product By Id
export const GetProductByFlashSale = async (req: Request, res: Response, next: NextFunction) => {
    const data = await Product.where({flash_sale: true})
    res.status(200).json({
        message: 'Data Fetch Successfully',
        data
    })
}

export const DeleteProductById = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    const vendorExist = await Vendor.findById(req.user._id);
    if (vendorExist === null) {
        return res.status(401).json({error: true, message: 'User Not Found!'})
    }
    const data  = await Product.findById(productId);
    if (data === null) {
        return res.status(401).json({error: true, message: 'Requested Product Not Found!'})
    }

    // try {
    //     for (const image of data.image) {
    //       // Construct the path to the image file
    //       const imagePath = path.join(__dirname, 'uploads', image);
      
    //       // Check if the image file exists
    //       if (fs.existsSync(imagePath)) {
    //         // Delete the image file
    //         fs.unlinkSync(imagePath);
    //       }
    //     }
    //   } catch (error) {
    //     // Handle any errors that occur during image deletion
    //     return res.status(500).json({ error: true, message: 'Error deleting product images' });
    //   }



    try {
        const results = await Product.deleteOne({_id: data._id});
        if (results) {
            res.status(201).json({
                message: 'Product Deleted  Success',
                data: results,
                deletedProduct: data 
            })    
        } else {
            res.status(401).json({
                error: true,
                message: "Something Went Wrong"
            })
        }
        
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while updating the product' });
    }
   
}

export const GetProductById = async (req: Request, res: Response, next: NextFunction) => {
    const productId = req.params.productId;
    const data = await Product.findById(productId).populate(['color', 'category']).exec();
    res.status(201).json({
        data: data,
        message: 'Get Product Details'
    })
}

export const UpdateProduct = (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({
        message: 'Product Update Success'
    })    
}