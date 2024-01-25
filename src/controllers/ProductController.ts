import { NextFunction, Request, Response } from "express";

export const Addproduct = (req: Request, res: Response, next: NextFunction) => {
    res.status(201).json({
        message: 'Added Success'
    })    
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