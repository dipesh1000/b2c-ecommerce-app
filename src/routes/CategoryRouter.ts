import express from 'express'
import { AddCategory, GetAllCategory, GetParentCategory, GetParentChildCategory } from '../controllers/CategoryController';
import { imageService } from './ProductRouter';

const router = express.Router();

router.get('/parent/:catId', GetParentChildCategory);

router.get('/parent', GetParentCategory);

router.get('/', GetAllCategory);

router.post('/', imageService, AddCategory);


export {router as CategoryRouter}