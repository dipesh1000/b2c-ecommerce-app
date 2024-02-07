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

export const GetAllCategory = async (Req: Request, res: Response, next: NextFunction) => {
    const result = await Category.find();
    res.status(201).json({
        message: "All Category",
        data: result
    })
}