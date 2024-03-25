import express, { NextFunction, Request, Response } from 'express'
import { LoginVendor, RegisterVendor } from '../controllers';
import { UseAuthenticate } from '../middlewares';


const router = express.Router();

router.post('/register', RegisterVendor);
router.post('/login', LoginVendor);
router.use(UseAuthenticate)
router.get('/verify', (req: Request, res: Response, next: NextFunction) => {
    if(req.user) {
        res.status(200).json({
            auth: true,
            user: req.user
        })
    }
})



export {router as VendorRouter};