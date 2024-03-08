import { Request, NextFunction, Response } from 'express'
import { AuthPayload } from '../dto/Auth.dto';
import jwt  from 'jsonwebtoken';



declare global {
    namespace Express {
        interface Request {
            user?: AuthPayload
        }
    }
}

const ValidateSingnature = async (req: Request) => {
    const signature = req.get('Authorization');
    let secretKey = process.env.SECRET_KEY;
    try {
        if(signature) {
            const payload = await jwt.verify(signature.split(' ')[1], secretKey) as AuthPayload;
            req.user = payload;
            return true;
        }
        return false;
    } catch (error) {
        console.log(error);
        return false;
    }
    
}   

export const UseAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
    
    const signature = await ValidateSingnature(req);

    if(signature){
        return next()
    } else{
        return res.json({message: "User Not authorised"});
    }
}

