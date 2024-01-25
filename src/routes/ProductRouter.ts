import express from 'express';
import { Addproduct, GetAllProducts, UpdateProduct } from '../controllers';

const router = express.Router();

/** ----------Add Product -------------- */
router.post('/', Addproduct)

/** ----------Add Product -------------- */
router.get('/', GetAllProducts)

/** ----------Add Product -------------- */
router.put('/:productId', UpdateProduct)

export {router as ProductRouter}