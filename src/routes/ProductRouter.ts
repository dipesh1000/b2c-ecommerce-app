import express from 'express';
import multer from 'multer';
import { AddProductColors, Addproduct, GetAllProducts, UpdateProduct } from '../controllers';
import { UseAuthenticate } from '../middlewares';

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './src/images')
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString()+'_'+file.originalname);
    }
})

const imageService = multer({storage: imageStorage}).array('image', 10)

const router = express.Router();

/** ----------Get Product -------------- */
router.get('/', GetAllProducts)

/** ----------Add Product -------------- */
router.use(UseAuthenticate)
router.post('/product-colors', imageService, AddProductColors)
router.post('/', imageService, Addproduct);

/** ----------Add Product -------------- */
router.put('/:productId', UpdateProduct)

export {router as ProductRouter}