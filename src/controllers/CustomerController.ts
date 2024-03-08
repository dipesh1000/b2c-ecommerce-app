import { NextFunction, Request, Response } from "express";
import { LoginInputForCustomer, RegisterInputForCustomer } from "../dto";
import { User } from "../models/Users";
import { GeneratePassword, GenerateSalt } from "../utility";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const UserRegister = async (req:Request, res: Response, next: NextFunction) => {
    const reqData = <RegisterInputForCustomer>req.body;
    try {
        const user = new User();
        if(!reqData.email) {
            return res.status(400).json({
                message: 'Please Enter Email'
            })
        }

        if(!reqData.password) {
            return res.status(400).json({
                message: 'Please Enter Password'
            })
        }
        user.name = reqData.name;
        user.email = reqData.email;
        const salt = await GenerateSalt();
        const hashedPwd = await GeneratePassword(reqData.password, salt)
        user.password = hashedPwd;
    
        const response = await user.save();
        res.status(201).json({
            message: 'User Register Success',
            data: response
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error
        })
    }
}

export const UserLogin = async (req:Request, res: Response, next: NextFunction) => {
    const reqData = <LoginInputForCustomer>req.body;
    let secretKey = process.env.SECRET_KEY;
    if(!reqData.email) {
        return res.status(400).json({
            message: 'Please Enter Email'
        })
    }
    if(!reqData.password) {
        return res.status(400).json({
            message: 'Please Enter Password'
        })
    }
    try {
        const user = await User.findOne({email: reqData.email});
        if(user === null) {
            return res.status(401).json({error: true, message: 'User Not Found!!'})
        }
        const verify = await bcrypt.compare(reqData.password, user.password)

        if(!verify) {
            return res.status(401).json({error: true, message: 'Password not match'})
        }
        let token = await jwt.sign({ data: user.email, _id: user._id }, secretKey, { expiresIn: '1h' });
        res.status(201).json({
            message: 'User Register Success',
            token: token,
            user
        })
    } catch (error) {
        res.status(500).json({
            error: true,
            message: error
        })
    }
}