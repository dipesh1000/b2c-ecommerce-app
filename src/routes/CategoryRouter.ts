import express from 'express'
import { AddCategory, GetAllCategory } from '../controllers/CategoryController';
import { imageService } from './ProductRouter';

const router = express.Router();

router.get('/', GetAllCategory);

router.post('/', imageService, AddCategory);


export {router as CategoryRouter}