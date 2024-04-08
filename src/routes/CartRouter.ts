import express from 'express';
import { UseAuthenticate } from '../middlewares';
import { AddToCartController, DeleteAllCartItem, DeleteCartById, GetAllCart, UpdateToCart } from '../controllers/CartController';

const router = express.Router();

/** ----------Add Product -------------- */
router.use(UseAuthenticate)

/** ----------Get Cart -------------- */
router.get('/', GetAllCart);

/** ----------Add to Cart -------------- */
router.post('/', AddToCartController);

/** ----------Delete Cart By Id -------------- */
router.delete('/emptycart', DeleteAllCartItem);

/** ----------Get Cart by ID -------------- */
// router.get('/cart/:cart_id', UpdateToCart)

/** ----------Update Cart By Id -------------- */
router.put('/:cart_id', UpdateToCart);

/** ----------Delete Cart By Id -------------- */
router.delete('/:cart_id', DeleteCartById);




export {router as CartRouter}