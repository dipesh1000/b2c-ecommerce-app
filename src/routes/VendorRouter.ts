import express from 'express'
import { RegisterVendor } from '../controllers';

const router = express.Router();

router.post('/', RegisterVendor)

export {router as VendorRouter};