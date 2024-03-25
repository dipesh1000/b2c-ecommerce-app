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

const ValidateSingnature = async (req: Request, res: Response) => {
    try {
        const signature = req.get('Authorization');
        console.log(signature, "from signature");
        if (signature === null) {
            return res.status(401).json({ error: "Token is missing" });
        }
        let secretKey = process.env.SECRET_KEY;
            const payload = await jwt.verify(signature.split(' ')[1], secretKey) as AuthPayload;
            req.user = payload;
            return true;
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            console.error("JsonWebTokenError:", error.message);
            return res.status(401).json({ error: "Invalid token" });
        }
        console.error("Unhandled error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
    
}   

export const UseAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const signature = await ValidateSingnature(req, res);
        if(signature){
            return next()
        } 
    } catch (error) {
        return res.json({error: true, message: "User Not authorised"});
    }
    
}

