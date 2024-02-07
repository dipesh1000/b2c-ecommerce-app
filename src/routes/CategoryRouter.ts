import express from 'express'
import { AddCategory, GetAllCategory } from '../controllers/CategoryController';
import { imageService } from './ProductRouter';

const router = express.Router();

router.post('/', imageService, AddCategory);

router.get('/', GetAllCategory);

export {router as CategoryRouter}