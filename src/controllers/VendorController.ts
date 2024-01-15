import {Request, Response, NextFunction } from 'express'
import { CreateVendorInput, LoginVendorInput } from '../dto'
import { Vendor } from '../models';
import { GeneratePassword, GenerateSalt } from '../utility';


export const RegisterVendor = async (req: Request, res: Response, Next: NextFunction) => {
    const {name, email, password} = <CreateVendorInput>req.body;
    const userExist = await Vendor.findOne({email: email}).exec();
    if(userExist) {
        return res.status(404).json('Email already exist!!!');
    }
    // generate a salt
    const salt = await GenerateSalt();
    const userPassword = await GeneratePassword(password, salt)

    const result = new Vendor(
        { size: 'small' }
    );
    result.name = name;
    result.email = email;
    result.password = userPassword;
    const response = await result.save();
    res.status(201).json({message: 'Create Successful', data: response})
}

export const LoginVendor = async (req: Request, res:Response, next:NextFunction) => {
    const {email, password} = <LoginVendorInput>req.body;
}