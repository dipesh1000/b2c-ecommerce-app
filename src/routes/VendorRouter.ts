import express from 'express'
import { LoginVendor, RegisterVendor } from '../controllers';

const router = express.Router();

router.post('/register', RegisterVendor);
router.post('/login', LoginVendor);

export {router as VendorRouter};