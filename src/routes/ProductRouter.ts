import express from 'express';
import multer from 'multer';
import { AddProductColors, Addproduct, DeleteProductById, GetAllProductColors, GetAllProducts, GetProductByFlashSale, GetProductById, GetProductByMostViewed, GetProductByType, GetProductsByCategory, UpdateProduct, UpdateProductById, UpdateProductColors } from '../controllers';
import { UseAuthenticate } from '../middlewares';

import fs from 'fs';


let currDate = new Date('2024-03-26');
let year = currDate.getFullYear();
let month = currDate.getMonth();

const path = `./src/images/${year}/${month}/`;

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        fs.access(path, (error) => {
            if (error) {
                path.split('/').reduce((directories, directory) => {
                    
                    directories += `${directory}/`;
                    if (!fs.existsSync(directories)) {
                        fs.mkdirSync(directories);
                    }
                    return directories;
                }, '');
                cb(null, path)
                    
            } else {
                cb(null, path)
            }
        });
       
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString()+'_'+file.originalname.replace(/\s/g, "_"));
    }
})

export const imageService = multer({storage: imageStorage}).array('image', 10)

const router = express.Router();

/** ----------Get Product Colors -------------- */
router.get('/colors', GetAllProductColors)

/** ----------Get Product -------------- */
router.get('/', GetAllProducts);


/** ----------Get Product by Category -------------- */
router.get('/category/:categoryIds', GetProductsByCategory)

/** ----------Get Product by Flash Sale -------------- */
router.get('/flash_sale', GetProductByFlashSale)

/** ----------Get Product by type -------------- */
router.get('/search', GetProductByType)

/** Get Most View Product */
router.get('/most-viewed-products', GetProductByMostViewed)

/** ----------Get Product by ID -------------- */
router.get('/:productId', GetProductById)

/** ----------Add Product -------------- */
router.use(UseAuthenticate)
router.post('/product-colors', imageService, AddProductColors)
router.put('/product-colors/:id', imageService, UpdateProductColors)
router.post('/', imageService, Addproduct);
router.put('/:productId', imageService, UpdateProductById);
router.delete('/:productId', DeleteProductById);
/** ----------Add Product -------------- */

export {router as ProductRouter}