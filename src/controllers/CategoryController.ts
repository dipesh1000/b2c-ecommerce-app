import { NextFunction, Request, Response } from "express";
import { Category } from "../models/Category";

interface ICategory {
    name: string,
    parent?: string;
    
}

export const AddCategory = async (req: Request, res:Response, next: NextFunction) => {
    const reqData = <ICategory>req.body;
    const catAvailable = await Category.findOne({name: reqData.name});
    if(catAvailable !== null) {
        return res.status(401).json({
            error: true,
            message: "Data available please try with another"
        })
    }
    const cat = new Category;
    cat.name = reqData.name;
    cat.parent = reqData.parent;

     /** ----- Updating Image -------- */
     const files = req.files as [Express.Multer.File];
     const images = files.map((file: Express.Multer.File) => file.filename)
     cat.image?.push(...images);

    const result = await cat.save();
    res.status(201).json({
        message: "Category Created Successful",
        data: result
    })
}

export const GetParentChildCategory = async (req: Request, res: Response, next: NextFunction) => {
    const {catId} = req.params;
    
    try {
        const result = await Category.find({parent: catId});
        res.status(201).json({
            message: "All Category",
            data: result
        })
    } catch (error) {
        res.status(201).json({
            error: true,
            message: error
        })
    }
}

export const GetParentCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Category.find({parent: null});
        res.status(201).json({
            message: "All Category",
            data: result
        })
    } catch (error) {
        res.status(201).json({
            error: true,
            message: error
        })
    }
}

export const GetAllCategory = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await Category.find();
       
        res.status(201).json({
            message: "All Category",
            data: result
        })
    } catch (error) {
        res.status(201).json({
            error: true,
            message: error
        })
    }
   
}