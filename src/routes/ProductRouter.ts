import express from 'express';
import multer from 'multer';
import { Addproduct, GetAllProducts, UpdateProduct } from '../controllers';

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

/** ----------Add Product -------------- */
router.post('/', imageService, Addproduct);

/** ----------Add Product -------------- */
router.get('/', GetAllProducts)

/** ----------Add Product -------------- */
router.put('/:productId', UpdateProduct)

export {router as ProductRouter}