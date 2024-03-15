import express from 'express';
import multer from 'multer';
import { AddProductColors, Addproduct, DeleteProductById, GetAllProductColors, GetAllProducts, GetProductByFlashSale, GetProductById, GetProductByMostViewed, GetProductByType, GetProductsByCategory, UpdateProduct, UpdateProductById, UpdateProductColors } from '../controllers';
import { UseAuthenticate } from '../middlewares';
import { AddToCartController } from '../controllers/CartController';

const router = express.Router();

/** ----------Add Product -------------- */
router.use(UseAuthenticate)

/** ----------Get Cart -------------- */
router.get('/cart', GetAllProducts);

/** ----------Add to Cart -------------- */
router.post('/', AddToCartController);

/** ----------Get Cart by ID -------------- */
router.get('/cart/:cart_id', GetProductById)

/** ----------Update Cart By Id -------------- */
router.put('/cart/:cart_id', GetAllProducts);

/** ----------Delete Cart By Id -------------- */
router.delete('/cart/:cart_id', GetAllProducts);

/** ----------Delete Cart By Id -------------- */
router.delete('/cart/all', GetAllProducts);


export {router as CartRouter}