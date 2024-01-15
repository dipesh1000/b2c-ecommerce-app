import express from 'express'
import { testRouters } from '../controllers';


const router = express.Router();

router.get('/', testRouters)

export {router as AdminRouter}