import express from 'express'
import { LoginVendor, RegisterVendor } from '../controllers';
import { UserLogin, UserRegister } from '../controllers/CustomerController';

const router = express.Router();

/** User Authentication  */
router.post('/register', UserRegister);
router.post('/login', UserLogin);

export {router as UserRouter};