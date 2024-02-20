import express from 'express';
import multer from 'multer';
import { AddProductColors, Addproduct, DeleteProductById, GetAllProductColors, GetAllProducts, GetProductByFlashSale, GetProductByType, GetProductsByCategory, UpdateProduct, UpdateProductById } from '../controllers';
import { UseAuthenticate } from '../middlewares';

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './src/images')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString()+'_'+file.originalname);
    }
})

export const imageService = multer({storage: imageStorage}).array('image', 10)

const router = express.Router();

/** ----------Get Product Colors -------------- */
router.get('/colors', GetAllProductColors)

/** ----------Get Product -------------- */
router.get('/', GetAllProducts)


/** ----------Get Product by Category -------------- */
router.get('/category/:categoryIds', GetProductsByCategory)

/** ----------Get Product by Flash Sale -------------- */
router.get('/flash_sale', GetProductByFlashSale)

/** ----------Get Product by type -------------- */
router.get('/search', GetProductByType)

/** ----------Add Product -------------- */
router.use(UseAuthenticate)
router.post('/product-colors', imageService, AddProductColors)
router.post('/', imageService, Addproduct);
router.put('/:productId', imageService, UpdateProductById);
router.delete('/:productId', DeleteProductById);
/** ----------Add Product -------------- */
// router.put('/:productId', UpdateProduct)

export {router as ProductRouter}