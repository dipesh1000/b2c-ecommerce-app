import { NextFunction, Request, Response } from "express";
import { CreateProductColorInterface, CreateProductInputs, InterfaceAddToCart } from "../dto";
import { Product } from "../models/Products";
import { Cart, Product_Colors, Vendor } from "../models";
import { User } from "../models/Users";
// import path from "path";
// import fs from 'fs'

export const AddToCartController = async (req: Request, res: Response, next: NextFunction) => {
    try {
    const UserExist = await User.findById(req.user._id);
    if (UserExist === null) {
        return res.status(401).json({error: true, message: 'User Not Found!'})
    }
    const reqData = <InterfaceAddToCart>req.body;
    const productExist = await Product.findById(reqData.product_id);
   
    if (productExist === null) {
        return res.status(401).json({error: true, message: 'Product Not Found'})
    }
    // const data = new Cart();
    // data.user_id = req.user._id;
    // data.quantity = reqData.quantity
    // data.size = reqData.size;
    // data.color = reqData.color;
    // data.product_id = reqData.product_id
// Options for findOneAndUpdate()
const options = { 
    upsert: true, // Create a new document if no match is found
    new: true, // Return the updated document
    setDefaultsOnInsert: true // Set default values if upserting
};
    // Find and update (or create) the document
    const results =  await Cart.findOneAndUpdate({product_id: reqData.product_id}, {
            user_id: req.user._id,
            quantity : reqData.quantity,
            size : reqData.size,
            color : reqData.color,
            product_id : reqData.product_id
    }, options);

    // const results = await data.save();
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

export const UpdateToCart = async (req: Request, res: Response, next: NextFunction) => {
    // check user id
    // check cart exist
    // update -> qty, color, size

    let reqData = req.body;
    let cartId = req.params.cart_id;
    let UserExist = await User.findById(req.user._id)

    if (!UserExist) {
        return res.status(404).json({message: 'User Not Found!!!'});
    }
    let data = await Cart.findById(cartId);
    data.quantity = reqData.quantity;
    data.color = reqData.color;
    data.size = reqData.size;
    try {
        const results = await data.save({ validateBeforeSave: false });
        if (results) {
            res.status(201).json({
                message: 'Cart Updated  Success',
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


export const GetAllCart = async (req: Request, res: Response, next: NextFunction) => {
    const userExist = await User.findById(req.user._id);
    if (userExist === null) {
        return res.status(401).json({error: true, message: 'User Not Found!'})
    }
    const page: number = Number.parseInt(req.query.page as string) || 1;
    const pageSize: number = Number.parseInt(req.query.pageSize as string) || 10;
    try {
        // const count: number = await Product.countDocuments({category: { $in: catIds }});
        // const totalPages: number = Math.ceil(count / pageSize);
        const data = await Cart.find({user_id: req.user._id}).populate(['color', 'product_id']).skip((page - 1) * pageSize).limit(pageSize);
        const count: number = data.length;
        const totalPages: number = Math.ceil(count / pageSize);
        res.status(201).json({
            message: 'Get All Cart Success',
            data,
            count,
            totalPages,
            currentPage: page
        })
    } catch (error) {
        throw error;
    }
}

export const DeleteCartById = async (req: Request, res: Response, next: NextFunction) => {
    const cartId = req.params.cart_id;
    const userExist = await User.findById(req.user._id);
    if (userExist === null) {
        return res.status(401).json({error: true, message: 'User Not Found!'})
    }
    const data  = await Cart.findById(cartId);
    if (data === null) {
        return res.status(401).json({error: true, message: 'Requested Cart Item Not Found!'})
    }

    try {
        const results = await Cart.findByIdAndDelete(cartId);
        if (results) {
            res.status(201).json({
                message: 'Cart Deleted  Success',
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


export const DeleteAllCartItem = async (req: Request, res: Response, next: NextFunction) => {
  
    
    const userExist = await User.findById(req.user._id);
    if (userExist === null) {
        return res.status(401).json({error: true, message: 'User Not Found!'})
    }

    try {
        const results = await Cart.deleteMany({user_id: userExist._id});
        if (results) {
            res.status(201).json({
                message: 'Cart Deleted  Success',
                data: results,
              
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