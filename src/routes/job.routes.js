import express from 'express'
const router=express.Router();
import isCompany from '../middlewares/isCompany.middleware.js';
import { createJob } from '../controllers/job.controller.js';
import verifyJWT from '../middlewares/auth.middleware.js';

router.post("/createJob",verifyJWT,isCompany,createJob);


export default router;