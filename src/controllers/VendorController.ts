import {Request, Response, NextFunction } from 'express'
import { CreateVendorInput, LoginVendorInput } from '../dto'
import { Vendor } from '../models';
import { GeneratePassword, GenerateSalt } from '../utility';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { SECRET_JWT_KEY } from '../config';

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
    const availableVendor = await Vendor.findOne({email});
    if(availableVendor === null) {
        return res.status(401).json({error: true, message: 'User Not Found!!'})
    }
    const verify = await bcrypt.compare(password, availableVendor.password);
    if(!verify) {
        return res.status(401).json({error: true, message: 'Password not match'})
    }
    let token = await jwt.sign({ data: availableVendor.email, _id: availableVendor._id }, SECRET_JWT_KEY, { expiresIn: '1h' });
    return res.status(201).json({error: false, message: "Login Success", token})
}