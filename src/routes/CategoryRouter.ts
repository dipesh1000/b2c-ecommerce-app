import express from 'express'
import { AddCategory, GetAllCategory } from '../controllers/CategoryController';

const router = express.Router();

router.post('/', AddCategory);

router.get('/', GetAllCategory);

export {router as CategoryRouter}